import { Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from "./cloudinary.service"
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {

    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))

    async uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ]
            }),
        ) file: Express.Multer.File) {
        return this.cloudinaryService.uploadFile(file);
    }

    @Get()
    async listImages() {
        const images = await this.cloudinaryService.listImages();
        return { images }
    }

    @Get(":public_id")
    async getImage(@Param("public_id") public_id: string) {
        const imageUrl = await this.cloudinaryService.getImage(public_id);
        return { imageUrl }
    }

    @Delete()
    async deleteImage(@Param("public_id") public_id: string) {
        await this.cloudinaryService.deleteImage(public_id);
        return { message: "Imagen eliminada con exito" }
    }

}
