/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports users.validators
 * @namespace validators
 */

const { body, param, query } = require("express-validator");


/**
 * Validaciones para la creación de un usuario.
 * @memberof validators
 * @constant {Array} validateCreateUser - Array de validaciones para la creación de un usuario.
 * @property {Function} body - Función de validación para el cuerpo de la solicitud.
 * @property {Function} body("name") - Validación para el campo "name".
 * @property {Function} body("email") - Validación para el campo "email".
 * @property {Function} body("password") - Validación para el campo "password".
 * @property {Function} body("role") - Validación para el campo "role".
 */

const validateCreateUser = [
    body("name")
        .exists().withMessage("Name of users is required")
        .isString().withMessage("Name should be string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .exists().withMessage("User password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 8 })
];


/**
 * Validaciones para obtener usuarios por correo electrónico.
 * @memberof validators
 * @constant {Array} validateGetUsersByEmail - Array de validaciones para obtener usuarios por correo electrónico.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("email") - Validación para el parámetro de consulta "email".
 */

const validateGetUsersByEmail = [
    query('email')
        .notEmpty().withMessage("Email should exist to get by email")
        .isEmail().withMessage("Wrong email format")
]


/**
 * Validaciones para la actualización de un usuario.
 * @memberof validators
 * @constant {Array} validateUpdateUser - Array de validaciones para la actualización de un usuario.
 * @property {Function} body - Función de validación para el cuerpo de la solicitud.
 * @property {Function} body("name") - Validación para el campo "name".
 * @property {Function} body("email") - Validación para el campo "email".
 * @property {Function} body("password") - Validación para el campo "password".
 * @property {Function} body("role") - Validación para el campo "role".
 * @property {Function} body("old_email") - Validación para el campo "old_email".
 * @property {Function} body("logged") - Validación para el campo "logged".
 * @property {Function} body("last_logged_date") - Validación para el campo "last_logged_date".
 */

const validateUpdateUser = [
    body("name")
        .optional()
        .isString().withMessage("Name should be string"),
    body("email")
        .optional()
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .optional()
        .isString().withMessage("Password should be string"),
    body("role")
        .optional()
        .isString().withMessage("Role should be string"),
    body("old_email")
        .optional()
        .isEmail().withMessage("Valid Old email is required"),
    body("logged")
        .optional()
        .isBoolean({ strict: true }).withMessage("Logged has to be boolean"),
    body("last_logged_date")
        .optional()
    // .isDate().withMessage("Last Logged Date should be date")
];

/**
 * Validaciones para la eliminación de un usuario.
 * @memberof validators
 * @constant {Array} validateDeleteUser - Array de validaciones para la eliminación de un usuario.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("email") - Validación para el parámetro de consulta "email".
 */

const validateDeleteUser = [
    query('email')
        .notEmpty().withMessage("Email should exist to delete an user")
        .isEmail().withMessage("Valid email is required")
];

module.exports = {
    validateCreateUser,
    validateGetUsersByEmail,
    validateUpdateUser,
    validateDeleteUser
};