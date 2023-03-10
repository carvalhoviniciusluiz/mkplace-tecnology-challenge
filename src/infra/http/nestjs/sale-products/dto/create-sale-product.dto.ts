import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSaleProductDto {
  @ApiProperty({
    type: [Number],
    description: 'Seller code',
    name: 'seller_code',
    example: 6443
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'seller_code' })
  sellerCode: number;

  @ApiProperty({
    type: [String],
    description: 'Product slug',
    name: 'product_slug',
    example: 'fine-knit_shirt'
  })
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'product_slug' })
  productSlug: string;
}
