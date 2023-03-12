import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter } from 'stream';
import type { FindAllSaleProductsRepositoryInputInterface } from '~/domain/repositories/sale-products/inputs';
import type { CreateSaleProductUseCaseInterface } from '~/domain/usecases/sale-products';
import type { FindAllSaleProductsUseCaseInterface } from '~/domain/usecases/sale-products/find-all-sale-products-usecase.interface';
import { CreateSaleProductDto } from './dto';
import { SaleProductCreatedEvent } from './events/sale-product-created.event';

@Injectable()
export class SaleProductsService {
  constructor(
    @Inject('CreateSaleProductUseCase')
    private readonly createSaleProductUseCase: CreateSaleProductUseCaseInterface,
    @Inject('FindAllSaleProductsUseCase')
    private readonly findAllSaleProductsUseCase: FindAllSaleProductsUseCaseInterface,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createSaleProductDto: CreateSaleProductDto) {
    const { productSlug: slug, sellerCode: code } = createSaleProductDto;
    const input = { product: { slug }, seller: { code } };
    this.eventEmitter.emit('sale-product.created', new SaleProductCreatedEvent(input));
    return this.createSaleProductUseCase.execute(input);
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface) {
    return this.findAllSaleProductsUseCase.execute(input);
  }
}
