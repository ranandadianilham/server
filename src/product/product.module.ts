import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'product', schema: ProductSchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
