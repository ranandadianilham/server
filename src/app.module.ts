import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './auth/schema/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { WarrantyController } from './warranty/warranty.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { WarrantyService } from './warranty/warranty.service';
import { AuthService } from './auth/auth.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MulterModule.register({dest: './uploaded'}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController, WarrantyController],
  providers: [AppService, AuthService, WarrantyService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AppModule {}
