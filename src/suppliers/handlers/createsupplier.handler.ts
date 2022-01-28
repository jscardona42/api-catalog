import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma.service";
import { CreateSupplierCommand } from "../commands/createsupplier.command";

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler implements ICommandHandler<CreateSupplierCommand> {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async execute(command: CreateSupplierCommand) {
        return this.prismaService.suppliers.create({
            data: command.supplierdto
        });
    }
}