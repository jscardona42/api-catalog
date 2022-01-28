import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CreateCatalogDto } from './dto/catalog.dto';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly suppliersService: SuppliersService
  ) { }

  async getFilterCatalogs(term: string): Promise<any> {
    return this.prismaService.catalogs.findMany({
      where: { OR: [{ name: { contains: term, mode: "insensitive" } }, { suppliers: { name: { contains: term } } }] },
      orderBy: { catalog_id: "asc" },
      select: { name: true, price: true, suppliers: { select: { name: true } } }
    });
  }

  async getCatalogByUserId(user_id: number): Promise<any> {
    const supplier = await this.prismaService.users.findUnique({
      where: { user_id },
      rejectOnNotFound: () => new NotFoundException(`User with id ${user_id} does not exist`)
    });

    let supplier_id = supplier.supplier_id;

    let catalogs = await this.prismaService.catalogs.findMany({
      where: { supplier_id },
      orderBy: { catalog_id: "asc" },
      select: { name: true, price: true, suppliers: { select: { name: true } } }
    });

    catalogs.forEach((catalog, i) => {
      Object.assign(catalogs[i], { supplier: catalog.suppliers.name });
      delete catalogs[i].suppliers;
    });

    return catalogs;
  }

  async createCatalog(input: CreateCatalogDto): Promise<Catalog> {
    await this.suppliersService.getSupplierById(input.supplier_id);
    return this.prismaService.catalogs.create({
      data: input
    });
  }
}
