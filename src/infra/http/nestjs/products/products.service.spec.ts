import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'CreateProductUseCase',
          useValue: jest.fn()
        },
        {
          provide: 'FindAllProductsUseCase',
          useValue: jest.fn()
        },
        {
          provide: 'FindOneProductBySlugUseCase',
          useValue: jest.fn()
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
