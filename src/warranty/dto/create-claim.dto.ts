import { IsString, IsEnum } from 'class-validator';
import { WarrantyStatus } from '../schema/warranty.schema';

export class CreateWarrantyClaimDto {
  @IsString()
  id: string;

  @IsString()
  productId: string;

  @IsString()
  customerId: string;

  @IsString()
  approverId: string;

  @IsString()
  claimDescription: string;

  @IsEnum(WarrantyStatus)
  status: string;
}
