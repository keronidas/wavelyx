import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { FacturasModule } from './facturas/facturas.module';
import { FilesModule } from './shared/files/files.module';

@Module({
  imports: [EmpleadosModule, MongooseModule.forRoot('mongodb://admin:adminpass@localhost:27017/-wavelyx', {
    authSource: 'admin',
    retryAttempts: 5,
    retryDelay: 1000
  }), UsuariosModule, PedidosModule, ProductosModule, FacturasModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {}
