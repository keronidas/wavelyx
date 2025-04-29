import { Type } from 'class-transformer';
import { IsString, MinLength, IsEmail, IsObject, ValidateNested, IsMongoId, IsBoolean, IsOptional } from 'class-validator';
import { Direccion } from 'src/shared/entities/direccion.entity';

export class UpdateUsuarioDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre: string

    @IsString()
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @MinLength(10)
    @IsOptional()
    password: string

    @IsOptional()
    @IsString()
    nivel_categoria: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Direccion)
    direccion: Direccion

    @IsString()
    @MinLength(6)
    telefono: string

    @IsMongoId()
    historial_pedidos: string[]

    @IsBoolean()
    esta_activo: boolean

}
