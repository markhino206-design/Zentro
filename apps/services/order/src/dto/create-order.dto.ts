import { IsArray, IsEnum, IsInt, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

export class CreateOrderDto {
  @IsString()
  buyerId!: string;

  @IsEnum(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
  status!: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}
