import { v2 as cloudinary } from 'cloudinary';

const cloud_name = process.env.CLOUDINARY_NAME
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_APY_SECRET);


export const CloudinaryProvider = {
    provide: "CLOUDINARY",
    useFactory: () => {
        return cloudinary.config({
            // cloud_name: "ddqre2yjq",
            // api_key: "316264752995379",
            // // api_secret: "WeI4OUpmb6Hb-R3SF6S56Q76Eso"
        })
    }
} 