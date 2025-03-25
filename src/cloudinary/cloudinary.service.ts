import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary-response';
import { v2 as cloudinary } from "cloudinary"
import * as streamifier from "streamifier";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {

    constructor(private configService: ConfigService) {

        cloudinary.config({
            cloud_name: this.configService.get<string>("CLOUDINARY_CLOUD_NAME"),
            api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
            api_secret: this.configService.get<string>("CLOUDINARY_API_SECRET")
        })
    }

    // ! METODO PARA SUBIR ARCHIVOS

    // ! GET MANY
    async listImages(): Promise<CloudinaryResponse> {
        try {

            const result = await cloudinary.api.resources();

            return result.resources.map(resource => resource.url);

        } catch (error) {
            console.log(error);

            throw new HttpException("Fallo al obtener imagenes", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ! GET ONE
    async getImage(public_id: string): Promise<string> {
        try {

            const result = await cloudinary.api.resource(public_id);

            return result.secure_url;

        } catch (error) {
            console.log(error);

            throw new HttpException("Fallo al obtener la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ! DELETE
    async deleteImage(public_id: string): Promise<void> {
        try {

            await cloudinary.uploader.destroy(public_id);

            console.log("Exito al eliminar la imagen");

        } catch (error) {
            console.log(error);

            throw new HttpException("Fallo al eliminar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<{ imageUrl: string }> {
        try {
            const uploadStream = await new Promise<CloudinaryResponse>((resolve, reject) => {
                const upload = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });

                streamifier.createReadStream(file.buffer).pipe(upload);
            });

            return { imageUrl: uploadStream.secure_url };

        } catch (error) {
            console.log(error);
            throw new HttpException("Fallo al subir la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
