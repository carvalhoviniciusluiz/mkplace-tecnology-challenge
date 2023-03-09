import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateProductUseCase, FindAllProductsUseCase, FindOneProductBySlugUseCase } from '~/application/usecases/products';
import { Product } from '~/domain/entities';
import { FindAllProductsRepositoryInterface, FindOneProductBySlugRepositoryInterface, InsertProductRepositoryInterface } from '~/domain/repositories/products';
import { ProductSchema, ProductTypeOrmRepository } from '~/infra/database/repositories/typeorm/product';
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
      useFactory: (repository: InsertProductRepositoryInterface) => {
        return new CreateProductUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    },
    {
      provide: 'FindOneProductBySlugUseCase',
      useFactory: (repository: FindOneProductBySlugRepositoryInterface) => {
        return new FindOneProductBySlugUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    }
  ]
})
export class ProductsModule {}
