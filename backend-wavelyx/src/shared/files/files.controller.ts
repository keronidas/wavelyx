import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path)
  }


  @Post('products')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,

    // limits: { fileSize: 2000 }, //viene en KB
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File) {


    if (!file) {
      throw new BadRequestException('COmprueba que es una IMG')
    }

    const secureUrl = `http://localhost:3000/api/files/product/${file.filename}`

    return { secureUrl };
  }

}
