import { IsString, MinLength, IsNumber, Min, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProductoDto {

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
  @IsOptional()
  imagenes: string[];

  @IsArray()
  @MinLength(3, { each: true })
  categoria: string[];

  @IsBoolean()
  @IsOptional()
  esta_activo: boolean;

  @IsBoolean()
  es_biodegradable: boolean;

}
