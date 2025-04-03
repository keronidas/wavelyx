import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
   imports: [MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      }
    ])]
})
export class ProductosModule {}
