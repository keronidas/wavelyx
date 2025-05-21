import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Document } from "mongoose";

@Schema()
export class Pedido extends Document {
  @Prop({ type: String })
  pedido_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" })
  usuario_id: string;

  @Prop([{ type: String }])
  compra_productos: string[];

  @Prop({ min: 0, type: Number })
  coste_total: number;

  @Prop({ default: "recepcionado", type: String })
  estado: string;

  @Prop({ type: String, minlength: 12 })
  numero_seguimiento: string;

  @Prop({ type: Date, default: Date.now })
  fecha_pedido: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Empleado" })
  empleado_asignado: Types.ObjectId;

  @Prop({ type: Boolean, default: "false" })
  borrado_suave: false;
}

export class PedidoEntity {
  usuario_id: string;
  compra_productos: string[];
  coste_total: number;
  estado: string;
  numero_seguimiento: string;
  fecha_pedido: Date;
  empleado_asignado: string;
  borrado_suave: false;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
