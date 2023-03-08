export interface CreateSaleProductOutputInterface {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
  seller: {
    id: string;
    name: string;
    code: number;
  }
}
