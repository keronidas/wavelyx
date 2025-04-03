import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsMongoId, IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { Direccion } from "src/shared/entities/direccion.entity";

export class CreateUsuarioDto {


    @IsString()
    @MinLength(3)
    nombre: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(10)
    password_hash: string

    @IsObject()
    @ValidateNested()
    @Type(()=>Direccion)
    direccion: Direccion

    @IsString()
    @MinLength(6)
    telefono: string

    @IsMongoId()
    historial_pedidos: string[]

    @IsDate()
    fecha_registro: Date

    @IsBoolean()
    esta_activo: boolean

    @IsBoolean()
    borrado_suave: boolean;

}
