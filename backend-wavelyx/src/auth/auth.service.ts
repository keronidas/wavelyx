import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";
import { LoginDto } from "./login.dto";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { Types } from "mongoose";
import { EmpleadosService } from "src/empleados/empleados.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly employeService: EmpleadosService,
  ) {}

  async validateUser(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: any } | null> {
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

      const isBcryptHash =
        user.password_hash.startsWith("$2a$") ||
        user.password_hash.startsWith("$2b$");

      let passwordValid = false;

      if (isBcryptHash) {
        passwordValid = await bcrypt.compare(
          loginDto.password,
          user.password_hash,
        );
      } else {
        // Asegurarnos de que la contraseña no es undefined
        if (!loginDto.password) {
          console.log("No se recibió contraseña para comparación SHA-256");
          return null;
        }

        const sha256Hash = createHash("sha256")
          .update(loginDto.password) // Asegurar que es string
          .digest("hex");

        passwordValid = sha256Hash === user.password_hash;

        if (passwordValid) {
          const newHash = await bcrypt.hash(loginDto.password, 10);
          await this.usersService.updatePassword(
            (user._id as Types.ObjectId).toString(),
            newHash,
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
        user: {
          id: user._id,
          name: user.nombre,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Error en autenticación:", error);
      throw new Error("Error en el proceso de autenticación");
    }
  }
  async validateEmploye(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: any } | null> {
    try {
      // Verificación básica de los datos de entrada
      if (!loginDto?.email || !loginDto?.password) {
        console.log("Email o contraseña no proporcionados");
        return null;
      }

      const employe = await this.employeService.findByEmail(loginDto.email);
      console.log("Contraseña recibida:", loginDto.password); // Para debug
      console.log("Hash almacenado:", employe?.password_hash); // Para debug

      if (!employe || !employe.password_hash) {
        console.log("Usuario no encontrado o sin contraseña configurada");
        return null;
      }

      const isBcryptHash =
        employe.password_hash.startsWith("$2a$") ||
        employe.password_hash.startsWith("$2b$");

      let passwordValid = false;

      if (isBcryptHash) {
        passwordValid = await bcrypt.compare(
          loginDto.password,
          employe.password_hash,
        );
      } else {
        // Asegurarnos de que la contraseña no es undefined
        if (!loginDto.password) {
          console.log("No se recibió contraseña para comparación SHA-256");
          return null;
        }

        const sha256Hash = createHash("sha256")
          .update(loginDto.password) // Asegurar que es string
          .digest("hex");

        passwordValid = sha256Hash === employe.password_hash;

        if (passwordValid) {
          const newHash = await bcrypt.hash(loginDto.password, 10);
          await this.employeService.updatePassword(
            (employe._id as Types.ObjectId).toString(),
            newHash,
          );
        }
      }

      if (!passwordValid) {
        console.log("Contraseña inválida");
        return null;
      }

      return {
        access_token: this.jwtService.sign({
          sub: employe._id,
          email: employe.email,
        }),
        user: {
          id: employe._id,
          name: employe.nombre,
          email: employe.email,
        },
      };
    } catch (error) {
      console.error("Error en autenticación:", error);
      throw new Error("Error en el proceso de autenticación");
    }
  }
}
