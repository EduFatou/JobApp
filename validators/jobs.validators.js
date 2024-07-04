/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports jobs.validators
 * @namespace validators
 */

const { body, param, query } = require("express-validator");


/**
 * Validaciones para la creación de un anuncio.
 * @memberof validators
 * @constant {Array} validateCreateJob - Array de validaciones para la creación de un anuncio.
 * @property {Function} body - Función de validación para el cuerpo de la solicitud.
 * @property {Function} body("title") - Validación para el campo "title".
 * @property {Function} body("description") - Validación para el campo "description".
 * @property {Function} body("skills") - Validación para el campo "skills".
 * @property {Function} body("client_location") - Validación para el campo "client_location".
 * @property {Function} body("url") - Validación para el campo "url".
 * @property {Function} body("source") - Validación para el campo "source".
 * @property {Function} body("status") - Validación para el campo "status".
 */

const validateCreateJob = [
    body("title")
        .exists().withMessage("Title of job is required")
        .isString().withMessage("Title should be a string"),
    body("description")
        .exists().withMessage("Job description is required")
        .isString().withMessage("Description should be a string"),
    body("skills")
        .exists().withMessage("Skills are required")
        .isArray().withMessage("Skills should be a array"),
    body("client_location")
        .exists().withMessage("Location is required")
        .isString().withMessage("Location should be a string"),
    body("url")
        .exists().withMessage("URL is required")
        .isString().withMessage("URL should be a string"),
    body("source")
        .exists().withMessage("Source is required")
        .isString().withMessage("Source should be a string"),
    body("status")
        .exists().withMessage("Status is required")
        .isBoolean({ strict: true }).withMessage("Status has to be boolean")
];


/**
 * Validaciones para la actualización de un anuncio.
 * @memberof validators
 * @constant {Array} validateUpdateJob - Array de validaciones para la actualización de un anuncio.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("title") - Validación para el parámetro de consulta "title".
 * @property {Function} body - Función de validación para el cuerpo de la solicitud.
 * @property {Function} body("title") - Validación para el campo "title".
 * @property {Function} body("description") - Validación para el campo "description".
 * @property {Function} body("skills") - Validación para el campo "skills".
 * @property {Function} body("client_location") - Validación para el campo "client_location".
 * @property {Function} body("url") - Validación para el campo "url".
 * @property {Function} body("source") - Validación para el campo "source".
 * @property {Function} body("status") - Validación para el campo "status".
 */

const validateUpdateJob = [
    query("title")
        .exists().withMessage("Old title is required")
        .isString().withMessage("Old title should be a string"),
    body("title")
        .optional()
        .isString().withMessage("Title should be a string"),
    body("description")
        .optional()
        .isString().withMessage("Description should be a string"),
    body("skills")
        .optional()
        .isArray().withMessage("Skills should be a string"),
    body("client_location")
        .optional()
        .isString().withMessage("Location should be a string"),
    body("url")
        .optional()
        .isString().withMessage("URL should be a string"),
    body("source")
        .optional()
        .isString().withMessage("Source should be a string"),
    body("status")
        .optional()
        .isBoolean({ strict: true }).withMessage("Status has to be boolean")
];


/**
 * Validaciones para la eliminación de un anuncio.
 * @memberof validators
 * @constant {Array} validateDeleteJob - Array de validaciones para la eliminación de un anuncio.
 * @property {Function} query - Función de validación para los parámetros de consulta.
 * @property {Function} query("title") - Validación para el parámetro de consulta "title".
 */

const validateDeleteJob = [
    query("title").notEmpty().withMessage("Title should exist to delete a job")
];

module.exports = {
    validateCreateJob,
    validateUpdateJob,
    validateDeleteJob
};