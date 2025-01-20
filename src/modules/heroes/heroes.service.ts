import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './schemas/hero.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HeroesService {

  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) { }

  async create(createHeroDto: CreateHeroDto) {

    const existHero = await this.heroModel.findOne({ name: createHeroDto.name });


    if (existHero) {
      throw new ConflictException(`El heroe ${existHero} ya existe`)
    }

    const createdHero = new this.heroModel(createHeroDto);
    return createdHero.save()

  }

  async findAll() {
    return await this.heroModel.find()
  }

  async findOne(name: string) {
    const existHero = await this.heroModel.findOne({ name: name })

    if (!existHero) {
      throw new ConflictException(`El heroe ${name} no existe`)
    }

    return existHero
  }

  async update(id: number, updateHeroDto: UpdateHeroDto) {
    // Buscar el héroe por su id
    const existHeroOg = await this.heroModel.findById(id);

    // Si el héroe no existe, lanzar una excepción
    if (!existHeroOg) {
      throw new ConflictException(`El héroe con id:${id} no existe`);
    }

    // Actualizar los campos del héroe con los datos recibidos en el DTO
    Object.assign(existHeroOg, updateHeroDto);  // Esto copia los valores de updateHeroDto al documento

    // Guardar el documento actualizado
    await existHeroOg.save();

    // Devolver el documento actualizado
    return existHeroOg;
  }


  async remove(id: number) {
    const existHero = await this.heroModel.findById(id);

    // Si el héroe no existe, lanzar una excepción
    if (!existHero) {
      throw new ConflictException(`El héroe con id:${id} no existe`);
    }

    await this.heroModel.deleteOne({ id });

    return existHero;
  }
}
