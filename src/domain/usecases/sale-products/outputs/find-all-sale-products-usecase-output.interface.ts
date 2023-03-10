export interface FindAllSaleProductsUseCaseOutputInterface {
  id: string;
  seller: {
    id: string;
    name: string;
    code: number;
  },
  product: {
    id: string;
    brand: string;
    name: string;
    price: number;
    slug: string;
  }
}
