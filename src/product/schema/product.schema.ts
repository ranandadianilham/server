import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSIC = 'Classic',
}

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;
  @Prop()
  price: number;

  @Prop()
  category: Category;
}


export const ProductSchema = SchemaFactory.createForClass(Product)