import { z } from 'zod';
import {EmployeeContractType, EmployeePriviligeLevel} from "../../../api-client.ts";

export const userEditFormSchema = (isEditing: boolean) =>
    z.object({
        email: z.string().min(1).nullish(), //TODO: create emailregex, valid schemas
        priviligeLevel: z.nativeEnum(EmployeePriviligeLevel),
        givenName: z.string().min(1),
        familyName: z.string().min(1),
        birthPlace: z.string().nullish(),
        birthDate: z.string().nullish(),
        phoneNumber: z.string().nullish(),
        address: z.string().nullish(),
        hireDate: z.string().nullish(),
        terminationDate: z.string().nullish(),
        jobTitle: z.string().nullish(),
        hourlyWage: z.number().nullish(),
        contractType: z.nativeEnum(EmployeeContractType).nullish(),
        expectedMonthlyHours: z.number().nullish(),
});

export type UserEditFormSchema = z.infer<ReturnType<typeof userEditFormSchema>>;