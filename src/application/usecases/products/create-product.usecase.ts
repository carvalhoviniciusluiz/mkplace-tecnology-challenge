import { Product } from "~/domain/entities";
import type { InsertProductRepositoryInterface } from "~/domain/repositories/products";
import type { CreateProductUseCaseInterface, FindOneProductByBrandUseCaseInterface, FindOneProductByNameUseCaseInterface } from "~/domain/usecases/products";
import type { CreateProductUseCaseInputInterface } from "~/domain/usecases/products/inputs";
import type { CreateProductUseCaseOutputInterface } from "~/domain/usecases/products/outputs";

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(
    private readonly findOneProductByBrandUseCase: FindOneProductByBrandUseCaseInterface,
    private readonly findOneProductByNameUseCase: FindOneProductByNameUseCaseInterface,
    private readonly productRepository: InsertProductRepositoryInterface,
  ) {}

  async execute(input: CreateProductUseCaseInputInterface): Promise<CreateProductUseCaseOutputInterface> {
    const productByBrandPromise = this.findOneProductByBrandUseCase.execute(input.brand);
    const productByNamePromise = this.findOneProductByNameUseCase.execute(input.name);
    const [productByBrandExists, productByNameExists] = await Promise.all([productByBrandPromise, productByNamePromise]);
    if(productByBrandExists) {
      throw new Error(`${input.brand} already exists`);
    }
    if(productByNameExists) {
      throw new Error(`${input.name} already exists`);
    }
    const product = Product.create(input);
    await this.productRepository.insert(product);
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
    }
  }
}
