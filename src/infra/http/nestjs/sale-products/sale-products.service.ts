import { Inject, Injectable } from '@nestjs/common';
import type { FindAllSaleProductsRepositoryInputInterface } from '~/domain/repositories/sale-products/inputs';
import type { CreateSaleProductUseCaseInterface } from '~/domain/usecases/sale-products';
import type { FindAllSaleProductsUseCaseInterface } from '~/domain/usecases/sale-products/find-all-sale-products-usecase.interface';
import { CreateSaleProductDto } from './dto';

@Injectable()
export class SaleProductsService {
  constructor(
    @Inject('CreateSaleProductUseCase')
    private readonly createSaleProductUseCase: CreateSaleProductUseCaseInterface,
    @Inject('FindAllSaleProductsUseCase')
    private readonly findAllSaleProductsUseCase: FindAllSaleProductsUseCaseInterface
  ) {}

  async create(createSaleProductDto: CreateSaleProductDto) {
    const { productSlug: slug, sellerCode: code } = createSaleProductDto;
    return this.createSaleProductUseCase.execute({ product: { slug }, seller: { code } });
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface) {
    return this.findAllSaleProductsUseCase.execute(input);
  }
}
