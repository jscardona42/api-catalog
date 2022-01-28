import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSupplierCommand } from './commands/createsupplier.command';
import { CreateSupplierDto } from './dto/supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @Post('/create')
  createSupplier(@Body() input: CreateSupplierDto): Promise<Supplier> {
    return this.commandBus.execute(
      new CreateSupplierCommand(input)
    )
  }

}
