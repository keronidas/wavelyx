import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { FilesModule } from './shared/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [EnvConfiguration], validationSchema: JoiValidationSchema
  }), MongooseModule.forRoot(process.env.MONGODB!, {
    authSource: 'admin',
    retryAttempts: 5,
    retryDelay: 1000
  }), UsuariosModule, EmpleadosModule, PedidosModule, ProductosModule, FilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
