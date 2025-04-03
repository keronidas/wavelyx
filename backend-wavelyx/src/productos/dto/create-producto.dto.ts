import { IsBoolean, IsArray, IsString, Min, MinLength, IsOptional, IsNumber } from 'class-validator';

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

  @IsArray()
  @MinLength(10, { each: true })
  imagenes: string[];

  @IsArray()
  @MinLength(3, { each: true })
  categoria: string[];

  @IsBoolean()
  @IsOptional()
  es_biodegradable: boolean;

}
