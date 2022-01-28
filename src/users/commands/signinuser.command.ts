import { SignInUserDto } from "../dto/user.dto";

export class SignInUserCommand {
    constructor(
        public readonly userdto: SignInUserDto,
    ) { }
}