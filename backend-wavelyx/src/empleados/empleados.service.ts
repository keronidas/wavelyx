import { Injectable } from "@nestjs/common";
import { UpdateEmpleadoDto } from "./dto/update-empleado.dto";
import { Model } from "mongoose";
import { Empleado } from "./entities/empleado.entity";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { CreateEmpleadoDto } from "./dto/create-empleado.dto";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectModel(Empleado.name)
    private readonly empleadoModel: Model<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
  
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(
      createEmpleadoDto.password,
      saltRounds,
    );

    const newEmpleado = new this.empleadoModel({
      ...createEmpleadoDto,
      password_hash: hashedPassword, 
      fecha_ingreso: new Date(),
      borrado_suave: false,
      empleado_id: uuidv4(),
    });

    return await newEmpleado.save();
  }
  async updatePassword(userId: string, newPasswordHash: string) {
    return this.empleadoModel
      .findByIdAndUpdate(
        userId,
        { password_hash: newPasswordHash },
        { new: true },
      )
      .exec();
  }
  async findByEmail(email: string) {
    const empleado = await this.empleadoModel.findOne({ email }).exec();

    console.log("Usuario encontrado en DB:", empleado); // Para debug

    if (!empleado || empleado.borrado_suave) {
      return null;
    }

    return empleado;
  }
  async findAll() {
    const empleados = await this.empleadoModel.find().exec();
    const empleadosDisponibles = empleados.filter(
      (item) => item.borrado_suave === false,
    );
    return empleadosDisponibles;
  }

  async findOne(id: string) {
    const empleado = await this.empleadoModel.findById(id).exec();
    if (!empleado || empleado.borrado_suave) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.empleadoModel
      .findByIdAndUpdate(id, updateEmpleadoDto, { new: true })
      .exec();
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async remove(id: string) {
    const empleado = await this.empleadoModel
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
    if (!empleado) {
      throw new NotFoundException(`Empleado con ${id} no encontrado`);
    }
    return empleado;
  }
}
