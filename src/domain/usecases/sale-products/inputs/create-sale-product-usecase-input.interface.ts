export interface CreateSaleProductUseCaseInputInterface {
  seller: {
    code: number;
  }
  product: {
    slug: string;
  }
}
