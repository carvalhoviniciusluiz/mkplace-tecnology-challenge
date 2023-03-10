import { Inject, Injectable } from '@nestjs/common';
import { FindOneProductBySlugUseCaseInterface } from '~/domain/usecases/products';
import { CreateSaleProductUseCaseInterface } from '~/domain/usecases/sale-products';
import { FindOneSellerByCodeUseCaseInterface } from '~/domain/usecases/sellers';
import { CreateSaleProductDto } from './dto';

@Injectable()
export class SaleProductsService {
  constructor(
    @Inject('CreateSaleProductUseCase')
    private readonly createSaleProductUseCase: CreateSaleProductUseCaseInterface,
    @Inject('FindOneProductBySlugUseCase')
    private readonly findOneProductBySlugUseCaseInterface: FindOneProductBySlugUseCaseInterface,
    @Inject('FindOneSellerByCodeUseCase')
    private readonly findOneSellerByCodeUseCaseInterface: FindOneSellerByCodeUseCaseInterface
  ) {}

  async create(createSaleProductDto: CreateSaleProductDto) {
    const { productSlug, sellerCode } = createSaleProductDto;
    const productPromise = this.findOneProductBySlugUseCaseInterface.execute(productSlug);
    const sellerPromise = this.findOneSellerByCodeUseCaseInterface.execute(sellerCode);
    const [product, seller] = await Promise.all([productPromise, sellerPromise]);
    if(!product || !seller) {
      throw new Error('Something went wrong, try again');
    }
    return this.createSaleProductUseCase.execute({ product, seller });
  }
}
