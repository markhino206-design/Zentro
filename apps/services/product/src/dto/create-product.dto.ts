import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  subCategory?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsArray()
  images!: string[];

  @IsInt()
  @Min(0)
  stock!: number;

  @IsString()
  sellerId!: string;

  @IsOptional()
  @IsString()
  condition?: string;
}
