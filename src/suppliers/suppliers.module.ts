import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaService } from '../prisma.service';
import { CreateSupplierHandler } from './handlers/createsupplier.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [SuppliersController],
  providers: [SuppliersService, PrismaService, CreateSupplierHandler]
})
export class SuppliersModule { }
