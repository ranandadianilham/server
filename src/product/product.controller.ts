import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('product')
@UseGuards(AuthGuard('jwt')) // jwt auth guard
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Roles(Role.CUSTOMER) // custom decorator
  @UseGuards(RolesGuard) // roles guard
  async getAllProduct(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.UpdateById(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteById(id);
  }
}
