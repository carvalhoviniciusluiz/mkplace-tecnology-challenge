import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema, SaleProductSchema, SellerSchema } from '~/infra/database/repositories/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SaleProductsModule } from './sale-products/sale-products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5432,
      synchronize: true,
      logging: true,
      entities: [ProductSchema, SellerSchema, SaleProductSchema]
    }),
    ProductsModule,
    SaleProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
