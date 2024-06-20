import Joi from 'joi'

// ---- Create a schema using Joi for validation ----

const userNameSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .messages({
            'string.empty': 'Please enter your first name. 📝',
            'string.max': 'The name must not exceed 20 characters. 🚫',
            'any.required': 'Please enter your first name. 📝'
        })
        .custom((value, helpers) => {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            if (firstNameStr !== value) {
                return helpers.error('any.custom', { message: `The first name '${value}' is not in capitalized format` });
            }
            return value;
        }),
    middleName: Joi.string().trim().allow(''),
    lastName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Please enter your last name.',
            'any.required': 'Please enter your last name.'
        })
        .custom((value, helpers) => {
            if (!/^[A-Za-z]+$/.test(value)) {
                return helpers.error('any.custom', { message: `The provided last name '${value}' is not valid` });
            }
            return value;
        })
});

// Define Joi schema for Guardian
const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

// Define Joi schema for LocalGuardian
const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});

// Define Joi schema for Student
const studentSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameSchema.required(),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({
            'any.only': 'Gender must be specified and should be either "male" or "female".'
        }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'The provided email "{VALUE}" is not a valid email format',
            'any.required': 'Please enter an email.'
        }),
    contactNumber: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-").optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImage: Joi.string().optional(),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
});

export default studentSchema;

