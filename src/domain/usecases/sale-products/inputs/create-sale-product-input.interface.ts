export interface CreateSaleProductInputInterface {
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
