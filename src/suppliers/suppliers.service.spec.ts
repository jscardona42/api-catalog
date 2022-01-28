import { Test } from '@nestjs/testing';
import { SuppliersService } from '../suppliers/suppliers.service';
import { PrismaService } from '../prisma.service';

describe('SuppliersService', () => {
  let prismaService: PrismaService;
  let suppliersService: SuppliersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SuppliersService, SuppliersService,
        {
          provide: PrismaService,
          useFactory: () => ({
            suppliers: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          }),
        },
      ],
    }).compile();

    suppliersService = module.get<SuppliersService>(SuppliersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getSuppliersIds method', () => {
    it('should invoke prismaService.catalogs.findMany', async () => {
      await suppliersService.getSuppliersIds();
      expect(prismaService.suppliers.findMany).toHaveBeenCalled();
    });
  });

  describe('getSupplierById method', () => {
    it('should invoke prismaService.catalogs.findUnique', async () => {
      const supplier_id: number = 1;
      await suppliersService.getSupplierById(supplier_id);
      expect(prismaService.suppliers.findUnique).toHaveBeenCalled();
    });
  });

})