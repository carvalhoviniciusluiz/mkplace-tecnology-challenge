export interface CreateSaleProductUseCaseOutputInterface {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    slug: string;
  }
  seller: {
    id: string;
    name: string;
    code: number;
  }
}
