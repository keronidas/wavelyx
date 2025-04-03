import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdatePedidoDto {

    @IsOptional()
    @IsMongoId()
    usuario_id: string;

    @IsOptional()
    @IsMongoId()
    compra_productos: string[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    coste_total: number;

    @IsOptional()
    @IsString()
    @MinLength(5)
    estado: string;

    @IsOptional()
    @IsString()
    @Min(10)
    numero_seguimiento: string;

    @IsOptional()
    @IsMongoId()
    empleado_asignado: string;

    @IsOptional()
    @IsBoolean()
    borrado_suave: boolean;
}

