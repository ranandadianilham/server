import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum WarrantyStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

@Schema({
  timestamps: true,
})
export class WarrantyClaim {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  approverId: string;

  @Prop({ required: true })
  claimDescription: string;

  @Prop({ required: true, enum: WarrantyStatus })
  status: string;
}

export const WarrantyClaimSchema = SchemaFactory.createForClass(WarrantyClaim);
