import { Student } from "../student.model";

import { TStudent } from "./student.interface";


// ---- Post ----

const createStudentIntoDB = async (studentData: TStudent) => {

    // ---- Build in "Static Method" (StudentModel)----

    // const result = await StudentModel.create(student)

    // ---- Instance Method ----

    const student = new Student(studentData)

    if (await student.isUserExits(studentData.id)) {

        throw new Error('User already exists')

        student.isUserExits

    }


    // ---- Build In Method ----

    const result = await student.save()

    return result; // result => will go to the Controller

}

// ---- Get All ----

const getAllStudentsFromDB = async () => {

    const result = await Student.find()

    return result;
}

// ---- Get One ----

const getSingleStudentFromDB = async (id: string) => {

    const result = await Student.findOne({ id })

    return result;
}

export const StudentServices = {
    createStudentIntoDB, getAllStudentsFromDB, getSingleStudentFromDB
}