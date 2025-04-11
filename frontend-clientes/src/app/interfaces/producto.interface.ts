export interface Producto {
    id_producto: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    categoria: string;
    esta_activo: boolean;
    es_biodegradable: boolean;
    fecha_creacion: string | Date;
}
