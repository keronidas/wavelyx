import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFIlter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('productos')
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File) {


    if(!file){
      throw new BadRequestException('COmprueba que es una IMG')
    }
      

    return { fileName: file.originalname };
  }

}
