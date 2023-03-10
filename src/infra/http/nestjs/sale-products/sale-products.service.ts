import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleProductUseCaseInterface } from '~/domain/usecases/sale-products';
import { CreateSaleProductDto } from './dto';

@Injectable()
export class SaleProductsService {
  constructor(
    @Inject('CreateSaleProductUseCase')
    private readonly createSaleProductUseCase: CreateSaleProductUseCaseInterface
  ) {}

  async create(createSaleProductDto: CreateSaleProductDto) {
    const { productSlug: slug, sellerCode: code } = createSaleProductDto;
    return this.createSaleProductUseCase.execute({ product: { slug }, seller: { code } });
  }
}
