export interface CarritoProducto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?:string;
  detalles?: {
    producto: any;
    seguro: any;
    extras: any;
  };
}