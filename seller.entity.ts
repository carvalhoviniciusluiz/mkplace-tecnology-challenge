import crypto from 'crypto';

type SellerProps = {
  name: string;
}

export class Seller {
  private constructor(
    private readonly props = {} as SellerProps,
    readonly id = crypto.randomUUID()
  ) {}

  static create(props: SellerProps, id?: string) {
    return new Seller(props, id);
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

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }
}
