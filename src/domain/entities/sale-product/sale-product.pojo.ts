export class SaleProductPojo {
  _id!: string;
  externalId!: string;
  seller!: {
    code: number;
    name: string;
  };
  product!: {
    brand: string;
    name: string;
    price: number;
    slug: string;
  };
}
