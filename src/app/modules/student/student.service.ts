import { Student } from "../student.model";

import { TStudent } from "./student.interface";


// ---- Post ----

const createStudentIntoDB = async (studentData: TStudent) => {

    // ---- Build in "Static Method" (StudentModel)----

    if (await Student.isUserExists(studentData.id)) {

        throw new Error('User already exists!')

    }

    const result = await Student.create(studentData)


    // ---- Instance Method ----

    // const student = new Student(studentData)

    // if (await student.isUserExits(studentData.id)) {

    //     throw new Error('User already exists')

    // }


    // ---- Build In Method ----

    // const result = await student.save()

    return result; // result => will go to the Controller

}

// ---- Get All ----

const getAllStudentsFromDB = async () => {

    const result = await Student.find()

    return result;
}

// ---- Get One ----

const getSingleStudentFromDB = async (id: string) => {

    // const result = await Student.findOne({ id })

    const result = await Student.aggregate([{ $match: { id: id } }])

    return result;
}

// ---- Delete One ----

const deleteStudentFromDB = async (id: string) => {

    const result = await Student.updateOne({ id }, { isDeleted: true })

    return result;
}

export const StudentServices = {
    createStudentIntoDB, getAllStudentsFromDB, getSingleStudentFromDB, deleteStudentFromDB
}