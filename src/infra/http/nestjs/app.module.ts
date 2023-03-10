import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema, SaleProductSchema, SellerSchema } from '~/infra/database/repositories/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, DATABASE_LOGGING, DATABASE_SYNCHRONIZE, POSTGRES_PORT } from './app.vars';
import { ProductsModule } from './products/products.module';
import { SaleProductsModule } from './sale-products/sale-products.module';

@Module({
  imports: [
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
    ProductsModule,
    SaleProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
