import { CacheInterceptor, CacheModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { SaleProductsController } from './sale-products.controller';
import { SaleProductsService } from './sale-products.service';

describe('SaleProductsController', () => {
  let controller: SaleProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleProductsController],
      imports: [
        CacheModule.registerAsync({
          useClass: CacheService
        })
      ],
      providers: [ {
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor
      }, {
        provide: SaleProductsService,
        useValue: jest.fn()
      }],
    }).compile();
    controller = module.get<SaleProductsController>(SaleProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
