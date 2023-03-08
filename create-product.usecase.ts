import { InsertProductRepositoryInterface } from "./product-in-memory.repository";
import { Product } from "./product.entity";

interface CreateProductInputInterface {
  name: string;
  brand: string;
  price: number;
  slug?: string;
}
interface CreateProductOutputInterface {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
}
interface CreateProductUseCaseInterface {
  execute(input: CreateProductInputInterface): Promise<CreateProductOutputInterface>;
}

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private productRepository: InsertProductRepositoryInterface) {}

  async execute(input: CreateProductInputInterface): Promise<CreateProductOutputInterface> {
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
