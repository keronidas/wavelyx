import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Get('product/:imageName')
  findProductImage(
    @Param('imageName') imageName: string
  ) {
    
  }


  @Post('productos')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,

    // limits: { fileSize: 2000 },
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

    const secureUrl = `${file.filename}`

    return { secureUrl };
  }

}
