import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { CreateSaleProductDto } from './dto';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sale-products')
@Controller('sale-products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @ApiBadRequestResponse()
  @Post()
  create(@Body() createSaleProductDto: CreateSaleProductDto) {
    return this.saleProductsService.create(createSaleProductDto)
      .catch(error => {
        throw new BadRequestException(error.message, {
          cause: error
        });
      });
  }
}
