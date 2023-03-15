// import crypto from 'crypto';
import { EntityBase } from '~/domain/@shared/entity';
import { NotificationError } from '~/domain/@shared/errors';

type SellerProps = {
  id: string;
  code: number;
  name: string;
}

type ProductProps = {
  name: string;
  brand: string;
  price: number;
  slug?: string;
  sellers?: SellerProps[];
}

export class Product extends EntityBase {
  private constructor(private readonly props = {} as ProductProps) {
    super();
  }

  static create(props: ProductProps) {
    const product = new Product(props);
    product.validate();
    if(product.notification.hasError()) {
      throw new NotificationError(product.notification.errors());
    }
    return product;
  }

  validate() {
    if(!this.brand) {
      this.notification.addError({
        context: Product.name,
        message: "brand is required"
      });
    }
    if(!this.name) {
      this.notification.addError({
        context: Product.name,
        message: "name is required"
      });
    }
    if(!this.price) {
      this.notification.addError({
        context: Product.name,
        message: "price is required"
      });
    }
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }

  updateName(value: string) {
    this.name = value;
  }

  updateBrand(value: string) {
    this.brand = value;
  }

  updatePrice(value: number) {
    this.price = value;
  }

  updateSlug(value: string) {
    this.slug = Product.slugify(value);
  }

  static slugify(value: string) {
    return value.toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([^\w]+|\s+)/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/(^-+|-+$)/g, '');
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get brand() {
    return this.props.brand;
  }

  private set brand(value: string) {
    this.props.brand = value;
  }

  get price() {
    return this.props.price;
  }

  private set price(value: number) {
    this.props.price = value;
  }

  get slug() {
    const hasSlug = !!this.props.slug;
    if (!hasSlug) {
      this.slug = Product.slugify(this.brand + '_' + this.name);
    }
    return this.props.slug!;
  }

  private set slug(value: string) {
    this.props.slug = value;
  }

  get sellers() {
    return this.props.sellers;
  }

  private set sellers(value: SellerProps[]) {
    this.props.sellers = value;
  }
}
