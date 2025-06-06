import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PedidosService } from "./pedidos.service";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";

@Controller("pedidos")
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get("usuario/:usuario_id")
  findByUser(@Param("usuario_id") usuario_id: string) {
    return this.pedidosService.findByUserId(usuario_id);
  }
  
  @Get("empleado/:empleado_id")
  findByEmpleado(@Param("empleado_id") empleado_id: string) {
    return this.pedidosService.findByEmpleado(empleado_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pedidosService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pedidosService.remove(id);
  }
}
