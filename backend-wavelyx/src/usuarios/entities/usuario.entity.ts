import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Direccion } from 'src/shared/entities/direccion.entity';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true, type: String })
  nombre: string;

  @Prop({ unique: true, index: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password_hash: string;

  @Prop({ default: 'Bronce', type: String })
  nivel_categoria: string;

  @Prop({ required: true })
  direccion: Direccion;

  @Prop({ minlength: 6, required: true, type: String })
  telefono: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' })
  historial_pedidos: string[];

  @Prop({ type: Date, default: Date.now })
  fecha_registro: Date;

  @Prop({ default: true, type: Boolean })
  esta_activo: boolean;

  @Prop({ type: Boolean, default: 'false' })
  borrado_suave: false;
}


export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
