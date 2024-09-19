import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { WarrantyClaim, WarrantyStatus } from './schema/warranty.schema';
import { CreateWarrantyClaimDto } from './dto/create-claim.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { UpdateWarrantyClaimDto } from './dto/update-claim.dto';

@Injectable()
export class WarrantyService {
  constructor(private readonly warrantyModel: Model<WarrantyClaim>) {}

  async findAll(): Promise<WarrantyClaim[]> {
    const data = await this.warrantyModel.find();
    return data;
  }

  async create(data: CreateWarrantyClaimDto): Promise<WarrantyClaim> {
    const res = await this.warrantyModel.create(data);
    return res;
  }

  async findById(id: string): Promise<WarrantyClaim> {
    const data = await this.warrantyModel.findById(id);
    if (!data) {
      throw new NotFoundException('Claim not found.');
    }
    return data;
  }

  async updateStatusById(id: string, data: UpdateWarrantyClaimDto): Promise<WarrantyClaim> {
    return await this.warrantyModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
