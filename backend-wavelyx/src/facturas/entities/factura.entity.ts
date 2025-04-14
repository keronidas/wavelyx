import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";

@Schema()
export class Factura extends Document {
  @Prop({ type: String })
  factura_id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Pedido", required: true })
  pedido_id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  })
  usuario_id: mongoose.Types.ObjectId;

  @Prop({ type: Date })
  fecha_factura: Date;

  @Prop({ type: Number, min: 0, required: true })
  precio_total: number;

  @Prop({ type: String, minlength: 10 })
  archivo_pdf: string;

  @Prop({ type: Boolean, default: "false", required: true })
  esta_pagado: boolean;

  @Prop({ type: Boolean, default: "false" })
  borrado_suave: false;
}

export class FacturaEntity {
  pedido_id: mongoose.Types.ObjectId;
  usuario_id: mongoose.Types.ObjectId;
  fecha_factura: Date;
  precio_total: number;
  archivo_pdf: string;
  esta_pagado: boolean;
  borrado_suave: false;
}

export const FacturaSchema = SchemaFactory.createForClass(Factura);
