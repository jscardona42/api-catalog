import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Supplier } from './entities/supplier.entity';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

describe('SuppliersController', () => {
  let suppliersController: SuppliersController;
  let suppliersService: SuppliersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        SuppliersController,
        {
          provide: SuppliersService,
          useFactory: () => ({
            getSuppliersIds: jest.fn(),
            getSupplierById: jest.fn(),
          }),
        },
      ],
    }).compile();

    suppliersController = module.get<SuppliersController>(SuppliersController);
    suppliersService = module.get<SuppliersService>(SuppliersService);
  });

  const result: any[] = [{
    supplier_id: 1,
  }]

  const result2: Supplier = {
    supplier_id: 1,
    name: ""
  }

  describe('getSuppliersIds', () => {
    it('should return an object of suppliers ids', async () => {

      jest.spyOn(suppliersService, 'getSuppliersIds').mockImplementation(async () => result);
      expect(await suppliersService.getSuppliersIds()).toBe(result);
    });
  });

  describe('getSupplierById', () => {
    it('should return an array of catalogs', async () => {
      const supplier_id: number = 1;
      jest.spyOn(suppliersService, 'getSupplierById').mockImplementation(async () => result2);
      expect(await suppliersService.getSupplierById(supplier_id)).toBe(result2);
    });
  });
});