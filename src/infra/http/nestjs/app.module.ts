import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMikroORMSchema, SaleProductMikroORMSchema, SellerMikroORMSchema } from '~/infra/database/repositories/mikroorm';
import { ProductSchema, SaleProductSchema, SellerSchema } from '~/infra/database/repositories/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, DATABASE_LOGGING, DATABASE_SYNCHRONIZE, POSTGRES_PORT, MONGODB_URL } from './app.vars';
import { CacheService } from './cache.service';
import { ProductsModule } from './products/products.module';
import { SaleProductsModule } from './sale-products/sale-products.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheService
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: POSTGRES_PORT,
      synchronize: DATABASE_SYNCHRONIZE,
      logging: DATABASE_LOGGING,
      entities: [ProductSchema, SellerSchema, SaleProductSchema]
    }),
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl: MONGODB_URL,
      entities: [SellerMikroORMSchema, ProductMikroORMSchema, SaleProductMikroORMSchema],
      debug: DATABASE_LOGGING
    }),
    BullModule.forRoot({
      redis: {
        host: '0.0.0.0',
        port: 6379
      }
    }),
    ProductsModule,
    SaleProductsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule {}
