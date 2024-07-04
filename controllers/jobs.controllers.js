/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports jobs.controllers
 * @namespace controllers
 */

const jobService = require('../services/jobs.services');
const { validationResult } = require("express-validator");


/**
 * Descripción de la función: Esta función crea un nuevo trabajo en la base de datos.
 * @memberof controllers
 * @async
 * @function createJobController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.title - El título del trabajo.
 * @param {string} req.body.description - La descripción del trabajo.
 * @param {Array<string>} req.body.skills - Las habilidades requeridas para el trabajo.
 * @param {string} req.body.client_location - La ubicación del cliente.
 * @param {string} req.body.url - La URL del trabajo.
 * @param {string} req.body.source - La fuente del trabajo.
 * @param {boolean} req.body.status - El estado del trabajo.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const createJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, skills, client_location, url, source, status } = req.body;
    if (title && description && skills && client_location && url && source && status !== undefined) {
        try {
            const response = await jobService.createJob(title, description, skills, client_location, url, source, status);
            res.status(201).json({
                "items_created": response
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
};
// Prueba Postman
// POST https://jobapp-w73i.onrender.com/api/jobs
// {
//     "title": "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     "description": "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     "skills": ["Shopify", "Web Design", "Data Entry"],
//     "client_location": "United States",
//     "url": "www.google.com",
//     "source": "scraping",
//     "status": true
// }

// READ all mongodb
// const readJobsController = async (req, res) => {
//     let jobs;
//     try {
//         jobs = await jobService.readJobs();
//         res.status(200).json(jobs); // [] con los jobs encontrados
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


/**
 * Descripción de la función: Esta función lee los trabajos desde la base de datos.
 * @memberof controllers
 * @async
 * @function readJobsController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} [req.body.keyword] - La palabra clave para filtrar trabajos.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
// READ 2.0
const readJobsController = async (req, res) => {
    let jobs;
    try {
        const keyword = req.body.keyword || null;
        jobs = await jobService.readJobs(keyword);
        res.status(200).json(jobs); // [] con los jobs encontrados
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman
// GET https://jobapp-w73i.onrender.com/api/jobs


/**
 * Descripción de la función: Esta función actualiza un trabajo en la base de datos.
 * @memberof controllers
 * @async
 * @function updateJobController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const updateJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    filter = req.query;
    update = req.body;
    try {
        const modifiedJob = await jobService.updateJob(filter, update);
        res.status(200).json(modifiedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman
// PUT https://jobapp-w73i.onrender.com/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages
// {
//     "title": "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     "description": "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     "skills": ["Shopify", "Web Design", "Data Entry"],
//     "client_location": "United States",
//     "url": "www.google.com",
//     "source": "scraping",
//     "status": false
// }


/**
 * Descripción de la función: Esta función elimina un trabajo de la base de datos.
 * @memberof controllers
 * @async
 * @function deleteJobController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} req.query.title - El título del trabajo a eliminar.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const deleteJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let jobs;
    try {
        jobs = await jobService.deleteJob(req.query.title);
        res.status(200).json(jobs); // [] con los jobs encontradas
    } catch (error) {
        res.status(500).json({ error: "Error from database" });
    }
};
// Prueba Postman
// DELETE https://jobapp-w73i.onrender.com/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages

module.exports = {
    createJobController,
    readJobsController,
    updateJobController,
    deleteJobController
}


