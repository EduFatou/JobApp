/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports favorites.validators
 * @namespace validators
 */

const { body, param, query } = require("express-validator");


/**
 * Validaciones para la creación de favoritos.
 * @memberof validators
 * @constant {Array} validateCreateFavorite - Array de validaciones para la creación de favoritos.
 * @property {Function} body - Función de validación para el cuerpo de la solicitud.
 * @property {Function} body("email") - Validación para el campo "email".
 * @property {Function} body("job_id") - Validación para el campo "job_id".
 */

const validateCreateFavorite = [
    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    body("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];


/**
 * Validaciones para la lectura de favoritos.
 * @memberof validators
 * @constant {Array} validateReadFavorites - Array de validaciones para la lectura de favoritos.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("email") - Validación para el parámetro de consulta "email".
 */

const validateReadFavorites = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong")
]

/**
 * Validaciones para la eliminación de favoritos.
 * @memberof validators
 * @constant {Array} validateDeleteFavorite - Array de validaciones para la eliminación de favoritos.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("email") - Validación para el parámetro de consulta "email".
 * @property {Function} query("job_id") - Validación para el parámetro de consulta "job_id".
 */

const validateDeleteFavorite = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    query("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];

module.exports = {
    validateCreateFavorite,
    validateReadFavorites,
    validateDeleteFavorite
};