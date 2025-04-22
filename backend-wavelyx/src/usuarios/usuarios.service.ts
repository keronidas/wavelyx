import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "./entities/usuario.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario = new this.usuarioModel(createUsuarioDto);
    newUsuario.fecha_registro = new Date();
    newUsuario.usuario_id = uuidv4();
    return await newUsuario.save();
  }
  async updatePassword(userId: string, newPasswordHash: string) {
    return this.usuarioModel
      .findByIdAndUpdate(
        userId,
        { password_hash: newPasswordHash },
        { new: true },
      )
      .exec();
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
  private readonly users = [
    {
      id: 1,
      email: "test@example.com",
      password: "$2b$10$xxxxx...", // hash generado con bcrypt
    },
  ];

  async findByEmail(email: string) {
    // Busca en MongoDB (no en el array `this.users`)
    const usuario = await this.usuarioModel.findOne({ email }).exec();

    console.log("Usuario encontrado en DB:", usuario); // Para debug

    if (!usuario || usuario.borrado_suave) {
      // Si no existe o está "borrado"
      return null;
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
