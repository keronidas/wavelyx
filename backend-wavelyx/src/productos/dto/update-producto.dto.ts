import { IsString, MinLength, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';

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


  @MinLength(10)
  @IsOptional()
  imagenes: string;

  @MinLength(3)
  categoria: string;

  @IsBoolean()
  @IsOptional()
  esta_activo: boolean;

  @IsBoolean()
  es_biodegradable: boolean;

}
