import { IsBoolean, IsDate, IsMongoId, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreatePedidoDto {

  @IsMongoId()
  usuario_id: string;

  @IsMongoId()
  compra_productos: string[];
  
  @IsNumber()
  @Min(0)
  coste_total: number;

  @IsString()
  @MinLength(5)
  estado: string;

  @IsString()
  @Min(10)
  numero_seguimiento: string;

  @IsMongoId()
  empleado_asignado: string;

  @IsBoolean()
  borrado_suave: boolean;
}
