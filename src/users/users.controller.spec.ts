import { Test } from '@nestjs/testing';
import { SignInUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersController,
        {
          provide: UsersService,
          useFactory: () => ({
            signInUser: jest.fn(),
          }),
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  const result: User = {
    email: "jscad@gmail.com",
    password: "12345",
    salt: "",
    token: "",
    user_id: 1,
    suppliers: {
      name: "",
      supplier_id: 1
    }
  }

  const input: SignInUserDto = {
    email: "jscad@gmail.com",
    password: "12345",
  }

  describe('signInUser', () => {
    it('should return an object of catalogs', async () => {

      jest.spyOn(usersService, 'signInUser').mockImplementation(async () => result);
      expect(await usersController.signInUser(input)).toBe(result);
    });
  });
});