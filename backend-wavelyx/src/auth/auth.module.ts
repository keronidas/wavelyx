import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { EmpleadosModule } from 'src/empleados/empleados.module';

@Module({
  imports: [
    UsuariosModule,
    EmpleadosModule,
    JwtModule.register({
      secret: 'JWT_SECRET', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
