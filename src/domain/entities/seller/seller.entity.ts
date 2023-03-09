import crypto from 'crypto';

type SellerProps = {
  code: number;
  name: string;
}

export class Seller {
  private constructor(
    private readonly props = {} as SellerProps,
    readonly id = crypto.randomUUID()
  ) {}

  static create(props: SellerProps, id?: string) {
    const seller = new Seller(props, id);
    if(!seller.code) {
      seller.updateCode(Seller.genCode());
    }
    return seller;
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
}
