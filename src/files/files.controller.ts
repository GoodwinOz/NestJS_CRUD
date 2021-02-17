import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from '../core/file.upload'

@Controller('files')
export class FilesController {
    constructor() {}
        //Upload single
    @Post()
    @UseInterceptors(
        FileInterceptor('image' , {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async UploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        }
        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully',
            data: response,
        }
    }

    @Post('uploadMultipleFiles')
    @UseInterceptors(
        FilesInterceptor('image', 10, {
            storage: diskStorage({
                destination: './uploads',
                filname: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = []
        files.forEach(file => {
            const fileResponse = {
                originalname: file.originalname,
                filename: file.filename,
            }
            response.push(fileResponse)
        });
        return {
            status: HttpStatus.OK,
            message: 'Images uploaded successfully',
            data: response,
        }
    }

    @Get(':imagename')
    getImage(@Param('imagename') image, @Res() res) {
        const response = res.sendFile(image, { root: './uploads'})
        return {
            status: HttpStatus.OK,
            data: response,
        }
    }
}
