import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const age = parseInt(value.age);

    if (isNaN(age)) {
      throw new HttpException("Age must be a number", HttpStatus.BAD_REQUEST);
    }

    return { ...value, age };
  }
}
