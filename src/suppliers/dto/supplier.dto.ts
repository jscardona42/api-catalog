import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) { }
