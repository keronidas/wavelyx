import { IsBoolean, IsString, Min, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateProductoDto {

  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @MinLength(10)
  imagen: string;

@IsString()
  @MinLength(2)
  categoria: string;

  @IsBoolean()
  @IsOptional()
  es_biodegradable: boolean;

}
