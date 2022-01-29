import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { SuppliersService } from '../suppliers/suppliers.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly suppliersService: SuppliersService,
  ) { }

  async signInUser(input: SignInUserDto): Promise<any> {
    const salt = await this.prismaService.users.findFirst({
      where: { email: input.email },
      select: { salt: true },
    });

    if (salt === null) {
      this.logger.log('Email is not registered');
      return this.createUser(input);
    }

    const user = await this.prismaService.users.findFirst({
      where: { AND: [{ email: input.email, password: await bcrypt.hash(input.password, salt.salt) }] },
    });

    if (user === null) {
      this.logger.warn('Oops! wrong password');
      throw new UnauthorizedException('Oops! wrong password');
    }

    const token = this.jwtService.sign({ user_id: user.user_id });
    this.logger.log('Token is generated');
    return this.createToken(token, user);
  }

  async createUser(input: SignInUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();

    let supplier_id = await this.randomSupplierId();

    const token = this.jwtService.sign({ email: input.email });
    this.logger.log('Token is generated');

    let user = await this.prismaService.users.create({
      data: { email: input.email, password: await bcrypt.hash(input.password, salt), salt, supplier_id, token },
      select: { email: true, token: true, user_id: true }
    });

    await this.sendWelcomeMail(input);
    this.logger.log('Welcome mailing');
    return user;
  }

  async sendWelcomeMail(input: any): Promise<void> {
    await this
      .mailerService
      .sendMail({
        to: input.email,
        from: process.env.USER_MAILER,
        subject: '¡Te damos la bienvenida! ✔',
        text: 'Bienvenido(a)',
        html: '<b>Bienvenido(a)</b>',
      })
      .catch((err) => {
        this.logger.warn(err);
      });
  }

  async randomSupplierId(): Promise<number> {
    let suppliersIds = await this.suppliersService.getSuppliersIds();
    let arraySuppliersIds = [];

    suppliersIds.forEach(supplier => {
      arraySuppliersIds.push(supplier.supplier_id);
    });

    let rand = Math.floor(Math.random() * arraySuppliersIds.length);
    let randValue = arraySuppliersIds[rand];
    this.logger.log('Supplier is randomly selected');
    return randValue;
  }

  async createToken(token: string, user: any): Promise<any> {
    return this.prismaService.users.update({
      where: { user_id: user.user_id },
      data: { token: token },
      select: { email: true, token: true, user_id: true }
    });
  }

}
