import { Test } from '@nestjs/testing';
import { SuppliersService } from '../suppliers/suppliers.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/user.dto';
import { CatalogsService } from '../catalogs/catalogs.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('UsersService', () => {
  let prismaService: PrismaService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CqrsModule,
        MailerModule.forRoot({
          transport: {
            host: process.env.HOST_MAILER,
            port: process.env.PORT_MAILER,
            auth: {
              user: process.env.USER_MAILER,
              pass: process.env.PASSWORD_MAILER
            },
          }
        }),
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRED_IN },
        }),
      ],
      providers: [
        UsersService, SuppliersService, CatalogsService,
        {
          provide: PrismaService,
          useFactory: () => ({
            users: {
              findMany: jest.fn(),
              findFirst: jest.fn(() => {
                return { salt: "$2b$10$6L5/NZVxXZuq36ME5hn2cO" }
              }),
              create: jest.fn(),
              update: jest.fn(),
            },
            suppliers: {
              findMany: jest.fn(() => { return [{ supplier_id: 1 }] }),
            }
          }),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('signInUser method', () => {
    it('should invoke prismaService.users.findFirst', async () => {
      const input: SignInUserDto = {
        email: "jsva@gmail.com",
        password: "12345"
      }
      await usersService.signInUser(input);
      expect(prismaService.users.findFirst).toHaveBeenCalled();
    });
  });

  describe('createUser method', () => {
    it('should invoke prismaService.users.create', async () => {
      const input: SignInUserDto = {
        email: "jsva@gmail.com",
        password: "12345"
      }
      await usersService.createUser(input);
      expect(prismaService.users.create).toHaveBeenCalled();
    });
  });

  // describe('createCatalog method', () => {
  //   it('should invoke prismaService.catalogs.create', async () => {
  //     var input: CreateCatalogDto = {
  //       name: "Iphone 10",
  //       price: 1000,
  //       supplier_id: 1
  //     }
  //     await usersService.createCatalog(input);
  //     expect(prismaService.catalogs.create).toHaveBeenCalled();
  //   });
  // });

})