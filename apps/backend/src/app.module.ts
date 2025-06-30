import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ColorModule } from './colors/color.module';

@Module({
  imports: [CustomersModule, ColorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
