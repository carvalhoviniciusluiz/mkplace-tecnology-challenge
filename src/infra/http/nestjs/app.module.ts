import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { ProductSchema } from '~/infra/database/repositories/typeorm/product';
import { SaleProductSchema } from '~/infra/database/repositories/typeorm/sale-product';
import { SellerSchema } from '~/infra/database/repositories/typeorm/seller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, 'database.sqlite'),
      synchronize: true,
      logging: true,
      entities: [ProductSchema, SellerSchema, SaleProductSchema]
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
