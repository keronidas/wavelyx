import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import { Pedido } from "./entities/pedido.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { EmpleadosService } from "src/empleados/empleados.service";
import { Types } from "mongoose";

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<Pedido>,
    private readonly empleadosService: EmpleadosService,
  ) {}
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const nuevoPedido = new this.pedidoModel(createPedidoDto);

    nuevoPedido.numero_seguimiento = uuidv4();
    nuevoPedido.pedido_id = uuidv4();
    nuevoPedido.borrado_suave = false;
    nuevoPedido.fecha_pedido = new Date();

    if (!nuevoPedido.empleado_asignado) {
      const empleados = await this.empleadosService.findAll(); 
      if (empleados.length > 0) {
        const randomIndex = Math.floor(Math.random() * empleados.length);
        nuevoPedido.empleado_asignado = empleados[randomIndex]
          ._id as Types.ObjectId;
      }
    }

    return await nuevoPedido.save();
  }

  async findByUserId(usuario_id: string): Promise<Pedido[]> {
    return this.pedidoModel.find({ usuario_id }).exec();
  }
  async findAll() {
    const pedidos = await this.pedidoModel.find().exec();
    const pedidosDisponibles = pedidos.filter(
      (item) => item.borrado_suave === false,
    );
    return pedidosDisponibles;
  }

  async findOne(id: string) {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido || pedido.borrado_suave) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return pedido;
  }
  async findByEmpleado(empleadoId: string): Promise<Pedido[]> {
    return this.pedidoModel.find({ empleado_asignado: empleadoId }).exec();
  }
  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoModel
      .findByIdAndUpdate(id, updatePedidoDto, { new: true })
      .exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return pedido;
  }

  async remove(id: string) {
    const pedido = await this.pedidoModel
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
    if (!pedido) {
      throw new NotFoundException(`Pedido con ${id} no encontrado`);
    }
    return pedido;
  }
}
