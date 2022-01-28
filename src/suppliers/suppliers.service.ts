import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getSuppliersIds(): Promise<any> {
        return this.prismaService.suppliers.findMany({
            select: { supplier_id: true }
        });
    }

    async getSupplierById(supplier_id: number): Promise<Supplier> {
        return this.prismaService.suppliers.findUnique({
            where: { supplier_id: supplier_id },
            rejectOnNotFound: () => new NotFoundException(`Supplier with id ${supplier_id} does not exist`)
        });
    }
}
