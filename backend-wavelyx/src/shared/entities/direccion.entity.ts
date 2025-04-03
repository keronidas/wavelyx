import { Prop } from "@nestjs/mongoose";

export class Direccion{

    @Prop({minlength:10, required:true})
    calle:string;
    @Prop({minlength:2,required:true})
    ciudad:string
    @Prop({minlength:5,required:true})
    codigo_postal:string
    @Prop({minlength:2,required:true})
    pais:string

}