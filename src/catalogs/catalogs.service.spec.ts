import { Test } from '@nestjs/testing';
import { SuppliersService } from '../suppliers/suppliers.service';
import { PrismaService } from '../prisma.service';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/catalog.dto';

describe('CatalogService', () => {
  let prismaService: PrismaService;
  let catalogsService: CatalogsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatalogsService, SuppliersService,
        {
          provide: PrismaService,
          useFactory: () => ({
            catalogs: {
              findMany: jest.fn(() => {
                return [
                  {
                    name: "Xiaomi 9T",
                    price: "600",
                    suppliers: {
                      supplier_id: 1
                    }
                  },
                ]
              }),
              create: jest.fn(),
            },
            users: {
              findUnique: jest.fn(() => { return { user_id: 1 } }),
            },
            suppliers: {
              findUnique: jest.fn(() => { return { supplier_id: 1 } }),
            }
          }),
        },
      ],
    }).compile();

    catalogsService = module.get<CatalogsService>(CatalogsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getFilterCatalogs method', () => {
    it('should invoke prismaService.catalogs.findMany', async () => {
      const term: string = "a";
      await catalogsService.getFilterCatalogs(term);
      expect(prismaService.catalogs.findMany).toHaveBeenCalled();
    });
  });

  describe('getCatalogByUserId method', () => {
    it('should invoke prismaService.catalogs.findMany', async () => {
      const user_id: number = 1;
      await catalogsService.getCatalogByUserId(user_id);
      expect(prismaService.catalogs.findMany).toHaveBeenCalled();
    });
  });

  describe('createCatalog method', () => {
    it('should invoke prismaService.catalogs.create', async () => {
      var input: CreateCatalogDto = {
        name: "Iphone 10",
        price: 1000,
        supplier_id: 1
      }
      await catalogsService.createCatalog(input);
      expect(prismaService.catalogs.create).toHaveBeenCalled();
    });
  });

})