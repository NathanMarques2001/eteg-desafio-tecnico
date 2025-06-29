import { Controller, Get } from '@nestjs/common';
import { ColorService } from './color.service';

@Controller('colors')
export class ColorController {
  constructor(private readonly service: ColorService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
