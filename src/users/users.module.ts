import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CatalogsService } from '../catalogs/catalogs.service';
import { CqrsModule } from '@nestjs/cqrs';
import { SignInUserHandler } from './handlers/signuser.handler';

@Module({
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
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SuppliersService, CatalogsService, SignInUserHandler],
})
export class UsersModule { }
