import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('/signin')
  signInUser(@Body() input: SignInUserDto): Promise<any> {
    return this.usersService.signInUser(input);
  }
}
