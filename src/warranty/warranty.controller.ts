import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WarrantyService } from './warranty.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { WarrantyClaim } from './schema/warranty.schema';
import { UpdateWarrantyClaimDto } from './dto/update-claim.dto';
import { CreateWarrantyClaimDto } from './dto/create-claim.dto';

@Controller('warranty')
@UseGuards(AuthGuard('jwt'))
export class WarrantyController {
  constructor(private readonly warrantyClaimService: WarrantyService) {}

  @Get()
  @Roles(Role.CUSTOMER, Role.STAFF) // custom decorator
  @UseGuards(RolesGuard) // roles guard
  async getAllClaim(): Promise<WarrantyClaim[]> {
    return this.warrantyClaimService.findAll();
  }

  @Post()
  @Roles(Role.CUSTOMER)
  async createProduct(
    @Body() warranty: CreateWarrantyClaimDto,
  ): Promise<WarrantyClaim> {
    return this.warrantyClaimService.create(warranty);
  }

  @Get(':id')
  @Roles(Role.CUSTOMER, Role.STAFF)
  async getProduct(@Param('id') id: string): Promise<WarrantyClaim> {
    return this.warrantyClaimService.findById(id);
  }

  @Put(':id')
  @Roles(Role.STAFF)
  async updateProduct(
    @Param('id') id: string,
    @Body() warranty : UpdateWarrantyClaimDto,
  ): Promise<WarrantyClaim> {
    return this.warrantyClaimService.updateStatusById(id, warranty);
  }
}
