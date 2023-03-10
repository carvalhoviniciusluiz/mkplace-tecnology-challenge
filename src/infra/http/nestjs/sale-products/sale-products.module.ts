import { Module } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema, ProductTypeOrmRepository, SaleProductSchema, SaleProductTypeOrmRepository, SellerTypeOrmRepository } from '~/infra/database/repositories/typeorm';
import { DataSource } from 'typeorm';
import { Product, SaleProduct, Seller } from '~/domain/entities';
import { InsertSaleProductRepositoryInterface } from '~/domain/repositories/sale-products';
import { CreateSaleProductUseCase } from '~/application/usecases/sale-products';
import { FindOneProductBySlugRepositoryInterface } from '~/domain/repositories/products';
import { FindOneProductBySlugUseCase } from '~/application/usecases/products';
import { FindOneSellerByCodeUseCase } from '~/application/usecases/sellers';
import { FindOneSellerByCodeRepositoryInterface } from '~/domain/repositories/sellers';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProductSchema, ProductSchema]),],
  controllers: [SaleProductsController],
  providers: [
    SaleProductsService,
    {
      provide: SaleProductTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new SaleProductTypeOrmRepository(dataSource.getRepository(SaleProduct));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: ProductTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ProductTypeOrmRepository(dataSource.getRepository(Product));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: SellerTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new SellerTypeOrmRepository(dataSource.getRepository(Seller));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: 'FindOneProductBySlugUseCase',
      useFactory: (repository: FindOneProductBySlugRepositoryInterface) => {
        return new FindOneProductBySlugUseCase(repository);
      },
      inject: [ProductTypeOrmRepository]
    },
    {
      provide: 'FindOneSellerByCodeUseCase',
      useFactory: (repository: FindOneSellerByCodeRepositoryInterface) => {
        return new FindOneSellerByCodeUseCase(repository);
      },
      inject: [SellerTypeOrmRepository]
    },
    {
      provide: 'CreateSaleProductUseCase',
      useFactory: (repository: InsertSaleProductRepositoryInterface) => {
        return new CreateSaleProductUseCase(repository);
      },
      inject: [SaleProductTypeOrmRepository]
    },
  ]
})
export class SaleProductsModule {}
