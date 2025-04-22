import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
   imports: [MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      }
    ])],
    exports:[UsuariosService]
})
export class UsuariosModule {}
