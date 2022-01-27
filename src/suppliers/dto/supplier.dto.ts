import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Catalog } from 'src/catalogs/entities/catalog.entity';

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsNumber()
    supplier_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    catalog_id?: number

    @IsNotEmpty()
    @IsNumber()
    user_id: number
}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) { }
