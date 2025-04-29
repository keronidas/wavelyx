import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login/usuario")
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.validateUser(loginDto);
      if (!token) {
        throw new UnauthorizedException("Credenciales incorrectas");
      }
      return token;
    } catch {
      throw new UnauthorizedException("Error en el proceso de autenticación");
    }
  }
  @Post("login/empleado")
  async loginEmploye(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.validateEmploye(loginDto);
      if (!token) {
        throw new UnauthorizedException("Credenciales incorrectas");
      }
      return token;
    } catch {
      throw new UnauthorizedException("Error en el proceso de autenticación");
    }
  }
}
