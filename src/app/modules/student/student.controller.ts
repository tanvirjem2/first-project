import { Request, Response } from "express";
import { StudentServices } from "./student.service";

// ---- Joi validation Schema -----

import studentSchema from "./student.validation";


const createStudent = async (req: Request, res: Response) => {

    try {

        // ---- Create a schema using Joi for validation ----

        // ------- -------------------------------------------

        const { student: studentData } = req.body;

        const { error } = studentSchema.validate(studentData)

        // console.log(error, value); -> For testing purpose

        // ---- Will Call Service Function to Send this Data ----

        const result = await StudentServices.createStudentIntoDB(studentData)

        if (error) {
            res.status(500).json({
                success: false,
                message: "An error has occurred",
                error: error.details
            })
        }


        // ---- Send Response ----

        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error has occurred",
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
    } catch (err) {
        console.log(err);
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
    } catch (err) {
        console.log(err);
    }
}

export const StudentControllers = { createStudent, getAllStudents, getSingleStudent }