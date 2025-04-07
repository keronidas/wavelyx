import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ unique: true, minlength: 3, type: String, required: true })
  nombre: string;

  @Prop({ unique: true, minlength: 10, type: String, required: true })
  descripcion: string;

  @Prop({ min: 0, type: Number, required: true })
  precio: number;

  @Prop({ min: 0, type: Number, required: true })
  stock: number;

  @Prop({ type: String, required: true })
  imagen: string;

  @Prop({ type: String, required: true })
  categoria: string;

  @Prop({ default: 'true', type: Boolean })
  esta_activo: boolean;

  @Prop({ required: true, type: Boolean, default: 'false' })
  es_biodegradable: boolean;

  @Prop({ type: Date, default: Date.now })
  fecha_creacion: Date;

  @Prop({ type: Boolean, default: 'false' })
  borrado_suave: false;
}



export const ProductoSchema = SchemaFactory.createForClass(Producto);
