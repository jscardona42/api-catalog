import { Catalog } from "src/catalogs/entities/catalog.entity";
import { User } from "src/users/entities/user.entity";

export class Supplier {
    supplier_id: number;
    name: string;
    catalogs?: Catalog[]
    users?: User[]
}
