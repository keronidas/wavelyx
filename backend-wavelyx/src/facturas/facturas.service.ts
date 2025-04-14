import { Injectable } from "@nestjs/common";
import { CreateFacturaDto } from "./dto/create-factura.dto";
import { UpdateFacturaDto } from "./dto/update-factura.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Factura } from "./entities/factura.entity";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FacturasService {
  constructor(
    @InjectModel(Factura.name)
    private readonly facturaModel: Model<Factura>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const newFactura = new this.facturaModel(createFacturaDto);
    newFactura.fecha_factura = new Date();
    newFactura.factura_id = uuidv4();
    return await newFactura.save();
  }

  findAll() {
    return `This action returns all facturas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} factura`;
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
}
