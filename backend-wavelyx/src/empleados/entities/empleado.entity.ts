import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Empleado extends Document {
  @Prop({})
  empleado_id: string;

  @Prop({ minlength: 10, type: String, required: true })
  nombre: string;

  @Prop({ unique: true, index: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  rol: string[];

  @Prop({ type: Date, default: Date.now })
  fecha_ingreso: Date;

  @Prop({ default: true, type: Boolean })
  esta_activo: boolean;

  @Prop({ type: Boolean, default: "false" })
  borrado_suave: false;
}


export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
