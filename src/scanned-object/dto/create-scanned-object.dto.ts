import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, Max, MinLength, IsOptional, IsDate } from "class-validator";

export class CreateScannedObjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
    @IsString()
    @IsOptional()
    imageUrl: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    scanDate: Date;
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(1)
    confidence: number;
    @Type(() => Number)
    @IsNumber()
    user: number;

}
