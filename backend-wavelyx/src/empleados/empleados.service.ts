import { Injectable } from "@nestjs/common";
import { UpdateEmpleadoDto } from "./dto/update-empleado.dto";
import { Model } from "mongoose";
import { Empleado } from "./entities/empleado.entity";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { CreateEmpleadoDto } from "./dto/create-empleado.dto";

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectModel(Empleado.name)
    private readonly empleadoModel: Model<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const empleado = new this.empleadoModel({
      ...createEmpleadoDto,
      fecha_ingreso: new Date(),
      borrado_suave: false,
    });
    return await empleado.save();
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
    const empleado = await this.empleadoModel.findByIdAndDelete(id).exec();
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return { message: "Empleado eliminado exitosamente" };
  }
}
