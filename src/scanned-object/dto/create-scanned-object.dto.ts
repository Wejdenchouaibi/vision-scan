import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min,Max, MinLength, IsOptional } from "class-validator";

export class CreateScannedObjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    imageUrl: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsNotEmpty()
    @IsString()
    scanDate: Date;
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(1)
    confidence:number;

}
