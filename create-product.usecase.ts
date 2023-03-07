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
  execute(input: CreateProductInputInterface): CreateProductOutputInterface;
}

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  execute(input: CreateProductInputInterface): CreateProductOutputInterface {
    const product = Product.create(input);
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
    }
  }
}
