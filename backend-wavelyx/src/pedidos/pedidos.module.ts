import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpleadosModule } from 'src/empleados/empleados.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [EmpleadosModule, MongooseModule.forFeature([
    {
      name: Pedido.name,
      schema: PedidoSchema,
    }
  ])]
})
export class PedidosModule { }
