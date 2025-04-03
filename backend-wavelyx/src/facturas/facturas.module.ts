import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { Factura, FacturaSchema } from './entities/factura.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FacturasController],
  providers: [FacturasService],
   imports: [MongooseModule.forFeature([
      {
        name: Factura.name,
        schema: FacturaSchema,
      }
    ])]
})
export class FacturasModule {}
