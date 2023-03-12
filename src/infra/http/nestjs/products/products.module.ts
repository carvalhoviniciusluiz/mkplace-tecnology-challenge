import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateProductUseCase, FindAllProductsUseCase, FindOneProductByBrandUseCase, FindOneProductByNameUseCase, FindOneProductBySlugUseCase } from '~/application/usecases/products';
import { Product } from '~/domain/entities';
import type { FindAllProductsRepositoryInterface, FindOneProductByBrandRepositoryInterface, FindOneProductByNameRepositoryInterface, FindOneProductBySlugRepositoryInterface, InsertProductRepositoryInterface } from '~/domain/repositories/products';
import type { FindOneProductByBrandUseCaseInterface, FindOneProductByNameUseCaseInterface } from '~/domain/usecases/products';
import { ProductSchema, ProductTypeOrmRepository } from '~/infra/database/repositories/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema]),],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ProductTypeOrmRepository(dataSource.getRepository(Product));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: 'FindAllProductsUseCase',
      useFactory: (repository: FindAllProductsRepositoryInterface) => {
        return new FindAllProductsUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    },
    {
      provide: 'CreateProductUseCase',
      useFactory: (findOneProductByBrandUseCase: FindOneProductByBrandUseCaseInterface, findOneProductByNameUseCase: FindOneProductByNameUseCaseInterface, repository: InsertProductRepositoryInterface) => {
        return new CreateProductUseCase(findOneProductByBrandUseCase, findOneProductByNameUseCase, repository);
      },
      inject: ['FindOneProductByBrandUseCase', 'FindOneProductByNameUseCase', ProductTypeOrmRepository]
    },
    {
      provide: 'FindOneProductBySlugUseCase',
      useFactory: (repository: FindOneProductBySlugRepositoryInterface) => {
        return new FindOneProductBySlugUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    },
    {
      provide: 'FindOneProductByBrandUseCase',
      useFactory: (repository: FindOneProductByBrandRepositoryInterface) => {
        return new FindOneProductByBrandUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    },
    {
      provide: 'FindOneProductByNameUseCase',
      useFactory: (repository: FindOneProductByNameRepositoryInterface) => {
        return new FindOneProductByNameUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    }
  ]
})
export class ProductsModule {}
