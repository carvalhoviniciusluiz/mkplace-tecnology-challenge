import crypto from 'crypto';
import { Product } from './product.entity';
import { Seller } from './seller.entity';

type SaleProductProps = {
  seller: Seller;
  product: Product;
}

export class SaleProduct {
  private constructor(
    private readonly props = {} as SaleProductProps,
    readonly id = crypto.randomUUID()
  ) {}

  static create(props: SaleProductProps, id?: string) {
    return new SaleProduct(props, id);
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }

  updateSeller(value: Seller) {
    this.seller = value;
  }

  updateProduct(value: Product) {
    this.product = value;
  }

  get seller() {
    return this.props.seller;
  }

  private set seller(value: Seller) {
    this.props.seller = value;
  }

  get product() {
    return this.props.product;
  }

  private set product(value: Product) {
    this.props.product = value;
  }
}
