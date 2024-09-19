import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarrantyClaimSchema } from './schema/warranty.schema';
import { AuthModule } from 'src/auth/auth.module';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: 'warranty', schema: WarrantyClaimSchema}])
      ],
      controllers: [WarrantyController],
      providers: [WarrantyService]
})
export class WarrantyModule {}

