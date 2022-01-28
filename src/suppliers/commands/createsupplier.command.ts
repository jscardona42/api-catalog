import { CreateSupplierDto } from "../dto/supplier.dto";

export class CreateSupplierCommand {
    constructor(
        public readonly supplierdto: CreateSupplierDto,
    ) { }
}