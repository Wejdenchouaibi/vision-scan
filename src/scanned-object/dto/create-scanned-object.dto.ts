import { IsNotEmpty, IsNumber, IsString, Min,Max, MinLength } from "class-validator";

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
    imageUrl: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsNotEmpty()
    @IsString()
    scanDate: Date;
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(1)
    confidence:number;

}
