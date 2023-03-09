import { Module } from '@nestjs/common';
import { CreateProductUseCase, FindAllProductsUseCase } from '~/application/usecases/products';
import { FindAllProductsRepositoryInterface, InsertProductRepositoryInterface } from '~/domain/repositories/products';
import { ProductInMemoryRepository } from '~/infra/database/repositories/in-memoy';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductInMemoryRepository,
      useFactory: () => {
        return new ProductInMemoryRepository();
      }
    },
    {
      provide: 'FindAllProductsUseCase',
      useFactory: (repository: FindAllProductsRepositoryInterface) => {
        return new FindAllProductsUseCase(repository);
      },
      inject: [ProductInMemoryRepository]
    },
    {
      provide: 'CreateProductUseCase',
      useFactory: (repository: InsertProductRepositoryInterface) => {
        return new CreateProductUseCase(repository);
      },
      inject: [ProductInMemoryRepository]
    }
  ]
})
export class ProductsModule {}
