import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// ---- Will Call Controller Function ----

router.post('/create-student', StudentControllers.createStudent)

// ---- Will Call Controller Function ----

router.get('/', StudentControllers.getAllStudents)

// ---- Will Call Controller Function ----

router.get('/:studentId', StudentControllers.getSingleStudent)

// ---- Will Call Controller Function ----

router.delete('/:studentId', StudentControllers.deleteStudent)


export const StudentRoutes = router;

// Router --> Service --> Controller --> Back to Router