import { EntityBase } from '~/domain/@shared/entity';
import { NotificationError } from '~/domain/@shared/errors';

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

export class SaleProduct extends EntityBase {
  private constructor(private readonly props = {} as SaleProductProps) {
    super();
  }

  static create(props: SaleProductProps) {
    const saleProduct = new SaleProduct(props);
    saleProduct.validate();
    if(saleProduct.notification.hasError()) {
      throw new NotificationError(saleProduct.notification.errors());
    }
    return saleProduct;
  }

  validate() {
    if(!this.seller) {
      this.notification.addError({
        context: SaleProduct.name,
        message: "seller is required"
      });
    }
    if(!this.product) {
      this.notification.addError({
        context: SaleProduct.name,
        message: "product is required"
      });
    }
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props
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
