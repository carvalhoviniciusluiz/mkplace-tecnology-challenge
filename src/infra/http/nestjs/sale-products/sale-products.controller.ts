import { Controller, Post, Body, BadRequestException, Get, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { CreateSaleProductDto } from './dto';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import type { FindAllSaleProductsInputInterface } from './inputs';
import type { FindAllSaleProductsRepositoryInputInterface } from '~/domain/repositories/sale-products/inputs';

@ApiTags('sale-products')
@Controller('sale-products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createSaleProductDto: CreateSaleProductDto) {
    return this.saleProductsService.create(createSaleProductDto)
      .catch(error => {
        throw new BadRequestException(error.message, {
          cause: error
        });
      });
  }
  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll(@Query() query: FindAllSaleProductsInputInterface) {
    const { productBrand, productName, productSlug, productPrice, sellerCode, sellerName } = query;
    const params: FindAllSaleProductsRepositoryInputInterface = {
      product: {
        brand: productBrand,
        name: productName,
        slug: productSlug,
      },
      seller: {
        code: sellerCode,
        name: sellerName
      }
    }
    const hasPrice = !!productPrice;
    if(hasPrice) {
      const [minValue, maxValue] = productPrice.split(',');
      params.product.priceRange = {
        maxValue: Number(maxValue),
        minValue: Number(minValue)
      }
    }
    return this.saleProductsService.findAll(params);
  }
}
