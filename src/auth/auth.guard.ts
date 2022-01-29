import { ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from "jsonwebtoken";
import { PrismaService } from '../prisma.service';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        let token: any;

        if (request.headers.authorization !== undefined) {
            const authorization = request.headers.authorization;
            try {
                token = authorization.split(" ")[1]
                jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                throw new UnauthorizedException(error);
            }
        } else {
            throw new UnauthorizedException("Unauthorized user");
        }
        if (request.body.user_id !== undefined) {
            await this.validateToken(request.body.user_id, token);
        }
        return true;
    }

    async validateToken(user_id: number, token: string) {
        let prismaService = new PrismaService();
        let user = await prismaService.users.findUnique({
            where: { user_id },
            rejectOnNotFound: () => new NotFoundException(`User with id ${user_id} does not exist`)
        });


        if (user.token !== token) {
            throw new UnauthorizedException("The token does not belong to the user");
        }
    }
}
