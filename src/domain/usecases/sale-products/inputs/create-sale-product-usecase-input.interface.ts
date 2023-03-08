export interface CreateSaleProductUseCaseInputInterface {
  seller: {
    code: number;
    name: string;
  }
  product: {
    name: string;
    brand: string;
    price: number;
    slug?: string;
  };
}
