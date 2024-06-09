import StudentModel from "../student.model";

import { Student } from "./student.interface";


// ---- Post ----

const createStudentIntoDB = async (student: Student) => {

    const result = await StudentModel.create(student)

    return result; // result => will go to the Controller

}

// ---- Get All ----

const getAllStudentsFromDB = async () => {

    const result = await StudentModel.find()

    return result;
}

// ---- Get One ----

const getSingleStudentFromDB = async (id: string) => {

    const result = await StudentModel.findOne({ id })

    return result;
}

export const StudentServices = {
    createStudentIntoDB, getAllStudentsFromDB, getSingleStudentFromDB
}