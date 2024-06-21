import { Request, Response } from "express";
import { StudentServices } from "./student.service";

// ---- Joi validation Schema -----

// import studentSchema from "./student.validation";

// ---- Zod validation Schema ----

import studentValidationSchema from "./student.zod.validation";


const createStudent = async (req: Request, res: Response) => {

    try {

        // ---- Create a schema using Joi for validation ----

        // ------- ------------------------------------------

        // ---- Create a schema using Zod for validation ----

        // --------------------------------------------------

        const { student: studentData } = req.body;

        // ---- The studentSchema, created using Joi, is imported from the student.validation.ts file ----

        // const { error, value } = studentSchema.validate(studentData)

        // console.log(error, value); -> For testing purpose

        // ---- The studentValidationSchema, created using zod, is imported from the student.zod.validation.ts file ----

        const zodParseData = studentValidationSchema.parse(studentData)

        // ---- Will Call Service Function to Send this Data ----

        const result = await StudentServices.createStudentIntoDB(zodParseData)

        // --- For Joi part ----

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: "An error has occurred",
        //         error: error.details
        //     })
        // }


        // ---- Send Response ----

        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "An error has occurred",
            error: err,
        })
    }
}

const getAllStudents = async (req: Request, res: Response) => {

    try {
        const result = await StudentServices.getAllStudentsFromDB()

        // ---- Send Response ----

        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "An error has occurred",
            error: err,
        })
    }
}

const getSingleStudent = async (req: Request, res: Response) => {

    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentFromDB(studentId)

        // ---- Send Response ----

        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "An error has occurred",
            error: err,
        })
    }
}

const deleteStudent = async (req: Request, res: Response) => {

    try {
        const { studentId } = req.params;

        const result = await StudentServices.deleteStudentFromDB(studentId)

        // ---- Send Response ----

        res.status(200).json({
            success: true,
            message: "Student is deleted successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "An error has occurred",
            error: err,
        })
    }
}

export const StudentControllers = { createStudent, getAllStudents, getSingleStudent, deleteStudent }