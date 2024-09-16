import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product')
    private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async create(product: Product): Promise<Product> {
    const res = await this.productModel.create(product);
    return res;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Book not found.');
    }
    return product;
  }

  async UpdateById(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
