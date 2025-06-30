import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateCustomerSchema,
  CreateCustomerDto,
} from './schemas/create-customer.schema';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCustomerSchema))
  create(@Body() dto: CreateCustomerDto) {
    return this.service.create(dto);
  }
}
