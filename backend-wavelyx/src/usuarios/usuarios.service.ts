import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "./entities/usuario.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new this.usuarioModel({
      ...createUsuarioDto,
      fecha_registro: new Date(),
      borrado_suave: false,
    });
    return await usuario.save();
  }

  async findAll() {
    const usuarios = await this.usuarioModel.find().exec();
    const usuariosDisponibles = usuarios.filter(
      (item) => item.borrado_suave === false,
    );
    return usuariosDisponibles;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario || usuario.borrado_suave) {
      throw new NotFoundException(`Usuario con ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ${id} no encontrado`);
    }
    return usuario;
  }

  async remove(id: string) {
    const usuario = await this.usuarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            borrado_suave: true,
          },
        },
        { new: true },
      )
      .exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ${id} no encontrado`);
    }
    return usuario;
  }
}
