export interface CarritoProducto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  detalles?: {
    producto: any;
    seguro: any;
    extras: any;
  };
}