import { Controller, Post, Body } from '@nestjs/common';
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
  create(
    @Body(new ZodValidationPipe(CreateCustomerSchema))
    dto: CreateCustomerDto,
  ) {
    return this.service.create(dto);
  }
}
