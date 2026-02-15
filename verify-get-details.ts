import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateScannedObjectDto } from './src/scanned-object/dto/create-scanned-object.dto';
import { ScannedObjectService } from './src/scanned-object/scanned-object.service';
import { ScannedObject } from './src/scanned-object/entities/scanned-object.entity';
import { NotFoundException } from '@nestjs/common';

async function verify() {
    console.log("=== 1. Verifying getDetails() ===");
    const obj = new ScannedObject();
    obj.id = 1;
    obj.name = "Test Object";
    obj.category = "Test Category";
    obj.confidence = 95.5;
    console.log("Details:", obj.getDetails());
    if (obj.getDetails() === "Object: Test Object, Category: Test Category, Confidence: 95.5%") {
        console.log("PASSED: getDetails() works.");
    } else {
        console.error("FAILED: getDetails() output mismatch.");
        process.exit(1);
    }

    console.log("\n=== 2. Verifying DTO Validation ===");
    // Simulate incoming JSON payload with invalid data
    const invalidPayload = {
        name: "Test",
        description: "Short", // Should fail (min 10)
        scanDate: "not-a-date", // Should fail (Type casting)
        // Missing category, confidence
    };

    const dto = plainToInstance(CreateScannedObjectDto, invalidPayload);

    const errors = await validate(dto);
    if (errors.length > 0) {
        console.log("PASSED: DTO Validation correctly failed with errors.");
        // Optional: Log errors to see what they are
        // errors.forEach(e => console.log(`- ${e.property}: ${Object.values(e.constraints || {})}`));
    } else {
        console.error("FAILED: DTO Validation should have failed but passed.");
        process.exit(1);
    }

    console.log("\n=== 3. Verifying Service 404 (NotFoundException) ===");
    // Mock Repository
    const mockRepo = {
        findOneBy: async () => null // Always return null to simulate not found
    } as any;

    const service = new ScannedObjectService(mockRepo);

    try {
        await service.findOne(999);
        console.error("FAILED: Service 404 Check failed (no exception thrown).");
        process.exit(1);
    } catch (error) {
        if (error instanceof NotFoundException) {
            console.log("PASSED: Service correctly threw NotFoundException.");
        } else {
            console.error("FAILED: Service threw unexpected error:", error);
            process.exit(1);
        }
    }

    console.log("\n--- ALL VERIFICATION SUCCESSFUL ---");
}

verify().catch(console.error);
