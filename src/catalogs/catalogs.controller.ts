import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/catalog.dto';
import { Catalog } from './entities/catalog.entity';

@Controller('catalogs')
export class CatalogsController {
  constructor(
    private readonly catalogsService: CatalogsService
  ) { }

  @Get('filter')
  @UseGuards(new JwtAuthGuard())
  getFilterCatalogs(@Body("term") term: string): Promise<any[]> {
    return this.catalogsService.getFilterCatalogs(term);
  }

  @Get('byuserid')
  @UseGuards(new JwtAuthGuard())
  getCatalogByUserId(@Body("user_id") user_id: number): Promise<any> {
    return this.catalogsService.getCatalogByUserId(user_id);
  }

  @Post('create')
  createCatalog(@Body() input: CreateCatalogDto): Promise<Catalog> {
    return this.catalogsService.createCatalog(input);
  }

}
