import { BadRequestException, Body, CacheInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import type { FindAllProductsUseCaseInputInterface } from '~/domain/usecases/products/inputs';
import { CreateProductDto } from './dto';
import type { FindAllInputInterface } from './inputs';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll(@Query() query: FindAllInputInterface) {
    const { price, ...rest } = query;
    const params: FindAllProductsUseCaseInputInterface = { ...rest }
    const hasPrice = !!price;
    if(hasPrice) {
      const [minValue, maxValue] = price.split(',');
      params.priceRange = {
        maxValue: Number(maxValue),
        minValue: Number(minValue)
      }
    }
    return this.productsService.findAll(params);
  }
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
    .catch(error => {
      throw new BadRequestException(error.message, {
        cause: error
      });
    });
  }
  @Get('/:slug')
  async findBySlug(@Param('slug') value: string) {
    return this.productsService.findBySlug(value);
  }
}
