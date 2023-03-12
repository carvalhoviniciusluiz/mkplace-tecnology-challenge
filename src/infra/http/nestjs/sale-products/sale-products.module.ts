import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema, ProductTypeOrmRepository, SaleProductSchema, SaleProductTypeOrmRepository, SellerTypeOrmRepository } from '~/infra/database/repositories/typeorm';
import { DataSource } from 'typeorm';
import { Product, SaleProduct, Seller } from '~/domain/entities';
import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from '~/domain/repositories/sale-products';
import { CreateSaleProductUseCase } from '~/application/usecases/sale-products';
import type { FindOneProductBySlugRepositoryInterface } from '~/domain/repositories/products';
import { FindOneProductBySlugUseCase } from '~/application/usecases/products';
import { FindOneSellerByCodeUseCase } from '~/application/usecases/sellers';
import type { FindOneSellerByCodeRepositoryInterface } from '~/domain/repositories/sellers';
import type { FindOneProductBySlugUseCaseInterface } from '~/domain/usecases/products';
import type { FindOneSellerByCodeUseCaseInterface } from '~/domain/usecases/sellers';
import { FindAllSaleProductsUseCase } from '~/application/usecases/sale-products/find-all-sale-products.usecase';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishSaleProductCreatedListener } from './listeners/publish-sale-product-created.listener';
import { PersistSaleProductJob } from './jobs/persist-sale-product.job';
import { SaleProductMikroORMRepository } from '~/infra/database/repositories/mikroorm/resources';
import { EntityManager } from '@mikro-orm/mongodb';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleProductSchema, ProductSchema]),
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: 'sale-products-service',
      defaultJobOptions: {
        attempts: 1,
      }
    })
  ],
  controllers: [SaleProductsController],
  providers: [
    SaleProductsService,
    PublishSaleProductCreatedListener,
    PersistSaleProductJob,
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
    {
      provide: SaleProductMikroORMRepository,
      useFactory: (repository: EntityManager) => {
        return new SaleProductMikroORMRepository(repository);
      },
      inject: [EntityManager]
    },
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
      useFactory: (findOneProductBySlugUseCaseInterface: FindOneProductBySlugUseCaseInterface, findOneSellerByCodeUseCaseInterface: FindOneSellerByCodeUseCaseInterface, repository: InsertSaleProductRepositoryInterface) => {
        return new CreateSaleProductUseCase(findOneProductBySlugUseCaseInterface, findOneSellerByCodeUseCaseInterface, repository);
      },
      inject: ['FindOneProductBySlugUseCase', 'FindOneSellerByCodeUseCase', SaleProductTypeOrmRepository]
    },
    {
      provide: 'CreateSaleProduct_LOG_UseCase',
      useFactory: (findOneProductBySlugUseCaseInterface: FindOneProductBySlugUseCaseInterface, findOneSellerByCodeUseCaseInterface: FindOneSellerByCodeUseCaseInterface, repository: InsertSaleProductRepositoryInterface) => {
        return new CreateSaleProductUseCase(findOneProductBySlugUseCaseInterface, findOneSellerByCodeUseCaseInterface, repository);
      },
      inject: ['FindOneProductBySlugUseCase', 'FindOneSellerByCodeUseCase', SaleProductMikroORMRepository]
    },
    {
      provide: 'FindAllSaleProductsUseCase',
      useFactory: (repository: FindAllSaleProductsRepositoryInterface) => {
        return new FindAllSaleProductsUseCase(repository);
      },
      inject: [SaleProductTypeOrmRepository]
    },
    {
      provide: 'FindAllSaleProducts_LOG_UseCase',
      useFactory: (repository: FindAllSaleProductsRepositoryInterface) => {
        return new FindAllSaleProductsUseCase(repository);
      },
      inject: [SaleProductMikroORMRepository]
    }
  ]
})
export class SaleProductsModule {}
