import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FindAllProductsUseCaseInputInterface } from '~/domain/usecases/products/inputs';
import { CreateProductDto } from './dto';
import { FindAllInputInterface } from './inputs';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Get('/:slug')
  async findBySlug(@Param('slug') value: string) {
    return this.productsService.findBySlug(value);
  }
}
