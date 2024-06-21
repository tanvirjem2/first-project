import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, TStudent, StudentModel, UserName } from './student/student.interface';
import bcrypt from 'bcrypt'

// ---- import Validator ----
import validator from 'validator';
import { boolean, func } from 'joi';
import config from '../config';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<UserName>({
    // ---- For Custom Error Message ----
    firstName: {
        type: String,
        required: [true, 'Please enter your first name. 📝'],
        // ---- Trim will remove the space ----
        trim: true,
        maxLength: [20, 'The name must not exceed 20 characters. 🚫'],

        // ---- Custom Validator ----

        validate: {
            validator: function (value: string) {

                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)

                return firstNameStr === value;
            },
            message: 'The {VALUE} is not in capitalized format'
        }

    },
    middleName: {
        type: String,
        // ---- Trim will remove the space ----
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        // ---- Trim will remove the space ----
        trim: true,

        // ---- Custom Validator ----

        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: 'The provided {VALUE} is not valid'
        }
    }
})

const guardianSchema = new Schema<Guardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxlength: [20, 'Password can not be more than  20 characters'] },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        // ---- Validate the enum ----
        type: String,
        enum: ['male', 'female'],
        required: true,
        message: 'Gender must be specified and should be either "male" or "female".'
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,

        // ---- Custom Validator ----

        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'The provided {VALUE} is not a valid email format'
        }
    },
    contactNumber: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImage: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


// ---- Document Middleware ---------------------------------------------


// ---- Pre save middleware / hook ----

studentSchema.pre('save', async function (next) {

    // console.log(this, 'pre hook: We will save the data');

    const user = this

    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

    next()
})

// ---- post save middleware / hook ----

studentSchema.post('save', function (doc, next) {

    doc.password = ''

    console.log(this, 'pre hook: We saved our data');

    next()
})

// -----------------------------------------------------------------------

// ---- Query Middleware -------------------------------------------------

// ---- Pre Middleware ----

studentSchema.pre('find', async function (next) {

})

// ---- Creating a Custom Static Method ----

studentSchema.statics.isUserExists = async function (id: string) {

    const existingUser = await Student.findOne({ id })

    return existingUser;

}

// 3. Create a Model.

// ---- Creating a Custom instance method ----

// studentSchema.methods.isUserExits = async function (id: string) {

//     const existingUser = await Student.findOne({ id })

//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)



