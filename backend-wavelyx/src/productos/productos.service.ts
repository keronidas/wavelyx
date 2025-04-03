import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
  ) { }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const newProduct = new this.productoModel(createProductoDto);
    newProduct.fecha_creacion = new Date()
    newProduct.esta_activo = true;
    newProduct.borrado_suave = false;
    return await newProduct.save();
  }

  async findAll() {
    const productos = await this.productoModel.find().exec();
    const productosDisponibles = productos.filter(
      (item) => item.borrado_suave === false,
    );
    return productosDisponibles;
  }

  async findOne(id: string) {
    const producto = await this.productoModel.findById(id).exec();
    if (!producto || producto.borrado_suave) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoModel
      .findByIdAndUpdate(id, updateProductoDto, { new: true })
      .exec();
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
