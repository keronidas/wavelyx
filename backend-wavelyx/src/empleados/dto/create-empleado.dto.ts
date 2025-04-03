import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEmpleadoDto {
    
  @Min(10)
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  password_hash: string;

  @IsString()
  @MinLength(3)
  rol: string;

  @IsBoolean()
  @IsOptional()
  esta_activo: boolean;


}
