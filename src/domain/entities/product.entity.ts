import crypto from 'crypto';

type ProductProps = {
  name: string;
  brand: string;
  price: number;
  slug?: string;
}

export class Product {
  private constructor(
    private readonly props = {} as ProductProps,
    readonly id = crypto.randomUUID()
  ) {}

  static create(props: ProductProps, id?: string) {
    return new Product(props, id);
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
    this.slug = this.slugify(value);
  }

  private slugify(value: string) {
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
      this.slug = this.slugify(this.brand + '_' + this.name);
    }
    return this.props.slug!;
  }

  private set slug(value: string) {
    this.props.slug = value;
  }
}
