import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from 'bcrypt';
import { SignInUserCommand } from "../commands/signinuser.command";
import { UsersService } from "../users.service";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CatalogsService } from "src/catalogs/catalogs.service";

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly catalogsService: CatalogsService
    ) { }

    async execute(command: SignInUserCommand) {
        const salt = await this.prismaService.users.findFirst({
            where: { email: command.userdto.email },
            select: { salt: true },
        });

        if (salt === null) {
            return this.usersService.createUser(command.userdto);
        }

        const user = await this.prismaService.users.findFirst({
            where: { AND: [{ email: command.userdto.email, password: await bcrypt.hash(command.userdto.password, salt.salt) }] },
        });

        if (user === null) {
            throw new UnauthorizedException('Oops! wrong password');
        }

        const token = this.jwtService.sign({ user_id: user.user_id });
        return await this.usersService.createToken(token, user);
    }
}