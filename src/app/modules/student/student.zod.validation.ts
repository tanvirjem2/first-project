import { z } from "zod";

// Define Zod schema for UserName

const userNameSchema = z.object({
    firstName: z.string()
        .min(1, { message: 'Please enter your first name. 📝' })
        .max(20, { message: 'The name must not exceed 20 characters. 🚫' })
        .transform(value => value.trim())
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'The first name is not in capitalized format',
        }),
    middleName: z.string().optional()
        .transform(value => value ? value.trim() : value),
    lastName: z.string()
        .min(1, { message: 'Please enter your last name.' })
        .transform(value => value.trim())
        .refine(value => /^[A-Za-z]+$/.test(value), {
            message: 'The provided last name is not valid',
        })
});

// Define Zod schema for Guardian

const guardianSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

// Define Zod schema for LocalGuardian

const localGuardianSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

// Define Zod schema for Student

const studentValidationSchema = z.object({
    id: z.string().min(1),
    password: z.string().max(20),
    name: userNameSchema,
    gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be specified and should be either "male" or "female".' })
    }),
    dateOfBirth: z.string().optional(),
    email: z.string()
        .email({ message: 'The provided email is not a valid email format' })
        .min(1, { message: 'Please enter an email.' }),
    contactNumber: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean()
});

export default studentValidationSchema;