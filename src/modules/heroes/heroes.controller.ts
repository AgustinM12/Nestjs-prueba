import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.heroesService.findOne(name);
  }

  @Patch(':id')
  
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    console.log(id)
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}
