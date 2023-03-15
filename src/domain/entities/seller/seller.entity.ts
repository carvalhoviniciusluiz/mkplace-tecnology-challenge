import { EntityBase } from '~/domain/@shared/entity';
import { NotificationError } from '~/domain/@shared/errors';

type ProductProps = {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
}

type SellerProps = {
  code: number;
  name: string;
  products?: ProductProps[];
}

export class Seller extends EntityBase {
  private constructor(private readonly props = {} as SellerProps) {
    super();
  }

  static create(props: SellerProps) {
    const seller = new Seller(props);
    if(!seller.code) {
      seller.updateCode(Seller.genCode());
    }
    seller.validate();
    if(seller.notification.hasError()) {
      throw new NotificationError(seller.notification.errors());
    }
    return seller;
  }

  validate() {
    if(!this.name) {
      this.notification.addError({
        context: Seller.name,
        message: "name is required"
      });
    }
  }

  static genCode() {
    return Number(Math.floor(1000 + Math.random() * 9000));
  };

  toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }

  updateCode(value: number) {
    this.code = value;
  }

  updateName(value: string) {
    this.name = value;
  }

  get code() {
    return this.props.code;
  }

  private set code(value: number) {
    this.props.code = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get products() {
    return this.props.products;
  }

  private set products(value: ProductProps[]) {
    this.props.products = value;
  }
}
