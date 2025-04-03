import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
   imports: [MongooseModule.forFeature([
      {
        name: Pedido.name,
        schema: PedidoSchema,
      }
    ])]
})
export class PedidosModule {}
