import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  Req,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { fileNamer, fileFilter } from "./helpers";
import { Response } from "express";
import { Request } from "express";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get("product/:imageName")
  findProductImage(
    @Res() res: Response,
    @Param("imageName") imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post("products")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: fileFilter,

      // limits: { fileSize: 2000 }, //viene en KB
      storage: diskStorage({
        destination: "./static/products",
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException("Comprueba que es una imagen válida");
    }

    const host = req.get("host"); 
    const protocol = req.protocol; 

    const secureUrl = `${protocol}://${host}/api/files/product/${file.filename}`;

    return { secureUrl };
  }
}
