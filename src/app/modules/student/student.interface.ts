import { Model } from 'mongoose';

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

// 1. Create an interface representing a document in MongoDB.
export type TStudent = {
    id: string;
    password: string;
    name: TUserName;
    gender: "male" | "female";
    dateOfBirth?: string;
    email: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImage?: string;
    isActive: 'active' | 'blocked'
}


// ---- Creating Static Method ----

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}

// ---- Creating Instance Method ----

// export type StudentMethods = {
//     isUserExits(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;