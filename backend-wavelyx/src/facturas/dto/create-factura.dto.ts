import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateFacturaDto {

  @IsMongoId()
  pedido_id: string;

  @IsMongoId()
  usuario_id: string;

  @IsDate()
  @IsOptional()
  fecha_factura: Date;

  @Min(0)
  @IsNumber()
  precio_total: number;

  @IsString()
  @MinLength(10)
  archivo_pdf: string;

  @IsBoolean()
  esta_pagado: boolean;
}
