import { z } from 'zod';
import {EmployeeContractType, EmployeePriviligeLevel} from "../../../api-client.ts";

export const userEditFormSchema = (isEditing: boolean) =>
    z.object({
        email: z.string().min(1).nullish(), //TODO: create emailregex, valid schemas
        privilegeLevel: z.nativeEnum(EmployeePriviligeLevel),
        givenName: z.string().min(1),
        familyName: z.string().min(1),
        birthPlace: z.string().nullish(),
        birthDate: z.date().nullish(),
        phoneNumber: z.string().nullish(),
        address: z.string().nullish(),
        hireDate: z.date().nullish(),
        terminationDate: z.date().nullish(),
        jobTitle: z.string().nullish(),
        hourlyWage: z.number().nullish(),
        contractType: z.nativeEnum(EmployeeContractType).nullish(),
        expectedMonthlyHours: z.number().nullish(),
});

export type UserEditFormSchema = z.infer<ReturnType<typeof userEditFormSchema>>;