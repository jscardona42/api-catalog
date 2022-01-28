import { Supplier } from "src/suppliers/entities/supplier.entity";

export class User {
    user_id: number;
    email: string;
    password: string;
    salt: string;
    token: string;
    suppliers?: Supplier
}
