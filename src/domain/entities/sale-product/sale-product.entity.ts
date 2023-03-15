import crypto from 'crypto';

type SellerProps = {
  id: string;
  code: number;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
}

type SaleProductProps = {
  seller: SellerProps;
  product: ProductProps;
}

export class SaleProduct {
  private constructor(
    private readonly props = {} as SaleProductProps,
    readonly id = crypto.randomUUID()
  ) {}

  static create(props: SaleProductProps, id?: string) {
    const saleProduct = new SaleProduct(props, id);
    saleProduct.validate();
    return saleProduct;
  }

  validate() {
    if(!this.seller) {
      throw new Error('seller is requered');
    }
    if(!this.product) {
      throw new Error('product is requered');
    }
  }

  toJSON() {
    return {
      id: this.id,

      // needed because of typeorm..
      seller: this.props.seller.id ?? this.props.seller,
      product: this.props.product.id ?? this.props.product
    };
  }

  updateSeller(value: SellerProps) {
    this.seller = value;
  }

  updateProduct(value: ProductProps) {
    this.product = value;
  }

  get seller() {
    return this.props.seller;
  }

  private set seller(value: SellerProps) {
    this.props.seller = value;
  }

  get product() {
    return this.props.product;
  }

  private set product(value: ProductProps) {
    this.props.product = value;
  }
}
