import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { PrismaService } from '../prisma.service';
import { SuppliersService } from '../suppliers/suppliers.service';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService, PrismaService, SuppliersService]
})
export class CatalogsModule { }
