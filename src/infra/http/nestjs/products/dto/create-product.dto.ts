import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Product } from "~/domain/entities";

export class CreateProductDto {
  @ApiProperty({
    type: [String],
    description: 'Product brand',
    name: 'brand',
    example: 'fine knit'
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    type: [String],
    description: 'Product name',
    name: 'name',
    example: 'Shirt'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: [Number],
    description: 'Product price',
    name: 'price',
    example: 59.9
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    type: [String],
    description: 'Automatically created',
    name: 'slug',
    example: 'fine-knit_shirt'
  })
  @IsOptional()
  @IsString()
  @Transform(val => Product.slugify(val.value))
  slug?: string;
}
