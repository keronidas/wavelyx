import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";
import { LoginDto } from "./login.dto";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<{ access_token: string } | null> {
    try {
      // Verificación básica de los datos de entrada
      if (!loginDto?.email || !loginDto?.password) {
        console.log("Email o contraseña no proporcionados");
        return null;
      }

      const user = await this.usersService.findByEmail(loginDto.email);
      
      if (!user || !user.password_hash) {
        console.log("Usuario no encontrado o sin contraseña configurada");
        return null;
      }

      console.log("Contraseña recibida:", loginDto.password); // Para debug
      console.log("Hash almacenado:", user.password_hash); // Para debug

      const isBcryptHash = user.password_hash.startsWith("$2a$") || 
                          user.password_hash.startsWith("$2b$");

      let passwordValid = false;

      if (isBcryptHash) {
        passwordValid = await bcrypt.compare(loginDto.password, user.password_hash);
      } else {
        // Asegurarnos de que la contraseña no es undefined
        if (!loginDto.password) {
          console.log("No se recibió contraseña para comparación SHA-256");
          return null;
        }

        const sha256Hash = createHash('sha256')
                          .update(loginDto.password) // Asegurar que es string
                          .digest('hex');
        
        passwordValid = sha256Hash === user.password_hash;

        if (passwordValid) {
          const newHash = await bcrypt.hash(loginDto.password, 10);
          await this.usersService.updatePassword(
            (user._id as Types.ObjectId).toString(), 
            newHash
          );
        }
      }

      if (!passwordValid) {
        console.log("Contraseña inválida");
        return null;
      }

      return {
        access_token: this.jwtService.sign({
          sub: user._id,
          email: user.email,
        }),
      };
    } catch (error) {
      console.error("Error en autenticación:", error);
      throw new Error("Error en el proceso de autenticación");
    }
  }
}