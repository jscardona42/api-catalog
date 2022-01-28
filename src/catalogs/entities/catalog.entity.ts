import { Decimal } from "@prisma/client/runtime";
import { Supplier } from "src/suppliers/entities/supplier.entity";

export class Catalog {
    catalog_id: number;
    name: string;
    price: number;
    suppliers?: Supplier;
}
