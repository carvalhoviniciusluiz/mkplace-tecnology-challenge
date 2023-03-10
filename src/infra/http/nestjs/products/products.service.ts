import { Inject, Injectable } from '@nestjs/common';
import { CreateProductUseCaseInterface, FindAllProductsUseCaseInterface, FindOneProductByBrandUseCaseInterface, FindOneProductByNameUseCaseInterface, FindOneProductBySlugUseCaseInterface } from '~/domain/usecases/products';
import { CreateProductUseCaseInputInterface, FindAllProductsUseCaseInputInterface } from '~/domain/usecases/products/inputs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('FindAllProductsUseCase')
    private readonly findAllProductsUseCase: FindAllProductsUseCaseInterface,
    @Inject('CreateProductUseCase')
    private readonly createProductUseCase: CreateProductUseCaseInterface,
    @Inject('FindOneProductBySlugUseCase')
    private readonly findOneProductBySlugUseCase: FindOneProductBySlugUseCaseInterface
  ) {}

  async findAll(input: FindAllProductsUseCaseInputInterface) {
    return this.findAllProductsUseCase.execute(input);
  }
  async create(input: CreateProductUseCaseInputInterface) {
    return this.createProductUseCase.execute(input);
  }
  async findBySlug(value: string) {
    return this.findOneProductBySlugUseCase.execute(value);
  }
}
