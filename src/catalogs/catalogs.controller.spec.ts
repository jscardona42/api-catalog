import { Test } from '@nestjs/testing';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/catalog.dto';
import { Catalog } from './entities/catalog.entity';


describe('CatalogsController', () => {
  let catalogsController: CatalogsController;
  let catalogsService: CatalogsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatalogsController,
        {
          provide: CatalogsService,
          useFactory: () => ({
            getFilterCatalogs: jest.fn(),
            getCatalogByUserId: jest.fn(),
            createCatalog: jest.fn(),
          }),
        },
      ],
    }).compile();

    catalogsController = module.get<CatalogsController>(CatalogsController);
    catalogsService = module.get<CatalogsService>(CatalogsService);
  });

  const result: Catalog = {
    name: "",
    price: 11,
    catalog_id: 1,
    suppliers: {
      name: "",
      supplier_id: 1
    }
  }

  const resultArray: Catalog[] = [{
    name: "",
    price: 11,
    catalog_id: 1,
    suppliers: {
      name: "",
      supplier_id: 1
    }
  }]

  const input: CreateCatalogDto = {
    name: "",
    price: 100,
    supplier_id: 1
  }

  describe('createCatalog', () => {
    it('should return an object of catalogs', async () => {

      jest.spyOn(catalogsService, 'createCatalog').mockImplementation(async () => result);
      expect(await catalogsController.createCatalog(input)).toBe(result);
    });
  });

  describe('getFilterCatalogs', () => {
    it('should return an array of catalogs', async () => {
      const term: string = "a";
      jest.spyOn(catalogsService, 'getFilterCatalogs').mockImplementation(async () => resultArray);
      expect(await catalogsController.getFilterCatalogs(term)).toBe(resultArray);
    });
  });

  describe('getCatalogByUserId', () => {
    it('should return an array of catalogs', async () => {
      const user_id: number = 1;
      jest.spyOn(catalogsService, 'getCatalogByUserId').mockImplementation(async () => resultArray);
      expect(await catalogsController.getCatalogByUserId(user_id)).toBe(resultArray);
    });
  });
});