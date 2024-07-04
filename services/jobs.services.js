/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports jobs.services
 * @namespace services
 */

const Job = require('../models/jobs.model');
const mongoose = require("mongoose");


/**
 * Crea o actualiza un anuncio en la base de datos.
 * @memberof services
 * @function createJob
 * @async
 * @param {string} title - Título del anuncio.
 * @param {string} description - Descripción del anuncio.
 * @param {string} skills - Habilidades requeridas para el trabajo.
 * @param {string} client_location - Ubicación del cliente.
 * @param {string} url - URL del anuncio.
 * @param {string} source - Fuente del anuncio.
 * @param {boolean} status - Estado del anuncio.
 * @return {Promise<Object>} El objeto de anuncio creado o actualizado.
 * @throws {Error} Error al crear o actualizar el anuncio.
 */

const createJob = async (title, description, skills, client_location, url, source, status) => {
        try {
            // Busca el anuncio existente por título y descripción
            const existingJob = await Job.findOne({ title, description });
            if (existingJob) {
                // Si existe en mongodb, actualiza el anuncio
                existingJob.skills = skills;
                existingJob.client_location = client_location;
                existingJob.url = url;
                existingJob.source = source;
                existingJob.status = status;
                return await existingJob.save();
            } else {
                // Si no existe en mongodb, crea una nuevo
                const job = new Job({
                    title,
                    description,
                    skills,
                    client_location,
                    url,
                    source,
                    status
                });

                const result = await job.save();
                console.log(result);
                return result;
            }
        } catch (error) {
            console.log('Error creating job:', error);
        }
    };
// createJob('Twitter embed from website shared to twitter','having issue with embedding correctly an image into our twitter share . see screenhots where image is missing, quick and easy task, looking forward to hearing from you', 'Twitter/X, HTML, JavaScript', 'Spain', 'hola.com', 'scraping', 'true');

// const readJobs = async () => {
//     try {
//         const jobs = await Job
//             .find()
//             .select('title description skills client_location url source status -_id -__v')
//         console.log(jobs);
//         return jobs;
//     } catch (error) {
//         console.log('Error listing jobs:', error);
//     }
// };
// readJobs();


// READ 2.0
/**
 * Lee anuncios de la base de datos, opcionalmente filtrando por palabra clave.
 * @memberof services
 * @function readJobs
 * @async
 * @param {string} [keyword] - Palabra clave para filtrar los anuncios.
 * @return {Promise<Array>} Array de objetos de anuncio.
 * @throws {Error} Error al listar los anuncios.
 */

const readJobs = async (keyword) => {
    try {
        let filter = {};
        
        if (keyword) {
            filter = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } }, 
                    { description: { $regex: keyword, $options: 'i' } },
                    { client_location: { $regex: keyword, $options: 'i' } },
                    { skills: { $regex: keyword, $options: 'i' } }
                ]
            };
        }
        
        const jobs = await Job.find(filter)
            .select('title description skills client_location url source status _id')
            .limit(10); // Limitar a los primeros 10 resultados
        
        return jobs;
    } catch (error) {
        console.log('Error listing jobs:', error);
    }
};


// Filtro por skills
/**
 * Lee anuncios de la base de datos filtrando por habilidad.
 * @memberof services
 * @function readJobsBySkill
 * @async
 * @param {string} skill - Habilidad para filtrar los anuncios.
 * @return {Promise<Array>} Array de objetos de anuncio.
 * @throws {Error} Error al buscar anuncios por habilidad.
 */

const readJobsBySkill = async (skill) => {
    try {
        let filter = {};

        if (skill) {
            filter = {
                skills: { $regex: skill, $options: 'i' }
            };
        }

        const jobs = await Job.find(filter)
            .select('title description skills client_location url source status _id')
            .limit(10); // Limitar a los primeros 10 resultados
        
        return jobs;
    } catch (error) {
        console.log('Error searching jobs by skill:', error);
    }
};


// Filtro por objectId
/**
 * Lee anuncios de la base de datos filtrando por IDs.
 * @memberof services
 * @function readJobsByID
 * @async
 * @param {Array<string>} favoritesID - Array de IDs de anuncios.
 * @return {Promise<Array>} Array de objetos de anuncio.
 * @throws {Error} Error al buscar anuncios por ID.
 */

const readJobsByID = async (favoritesID) => {
    const jobsFiltered = [];
    try {
        for (const id of favoritesID) {
        
        // Verificar si el _id es válido y convertirlo a un ObjectId si es necesario
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        // Crear un filtro para buscar exactamente por _id
        const filter = { _id: new mongoose.Types.ObjectId(id) };
        console.log(filter)

        const job = await Job.findOne(filter)
            .select('title description skills client_location url source status _id')
            jobsFiltered.push(job)
        };
        return jobsFiltered;
    } catch (error) {
        console.log('Error searching jobs by skill:', error);
        return [];
    }
};


// Jobs solo hechos por Admin
/**
 * Lee anuncios creados solo por el administrador.
 * @memberof services
 * @function readJobsAdmin
 * @async
 * @return {Promise<Array>} Array de objetos de anuncio.
 * @throws {Error} Error al buscar anuncios por administrador.
 */

const readJobsAdmin = async () => {
    try {
        let filter = {
                source: 'admin'
            };

        const jobs = await Job.find(filter)
            .select('title description skills client_location url source status _id')
            .limit(10); // Limitar a los primeros 10 resultados
        
        return jobs;
    } catch (error) {
        console.log('Error searching jobs by skill:', error);
    }
};


/**
 * Actualiza un anuncio en la base de datos.
 * @memberof services
 * @function updateJob
 * @async
 * @param {Object} filter - Filtro para encontrar el anuncio a actualizar.
 * @param {Object} update - Datos a actualizar en el anuncio.
 * @return {Promise<Object>} El objeto de anuncio modificado.
 * @throws {Error} Error al actualizar el anuncio.
 */

const updateJob = async (filter, update) => {
    try {
        const modifiedJob = await Job
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedJob);
        return modifiedJob;
    } catch (error) {
        console.log('Cannot update job, error:', error)
    }
};
// updateJob({title: 'Twitter embed from website shared to twitter'},
// {
//     title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     skills: "Shopify, Web Design, Data Entry",
//     client_location: "United States",
//     url: 'hola.com',
//     source: 'scraping',
//     status: false
// });


/**
 * Elimina un anuncio de la base de datos por título.
 * @memberof services
 * @function deleteJob
 * @async
 * @param {string} filter - Título del anuncio a eliminar.
 * @return {Promise<Object>} Resultado de la eliminación.
 * @throws {Error} Error al eliminar el anuncio.
 */

const deleteJob = async (filter) => {
    try {
        const removedJob = await Job
            .deleteOne({ 'title': filter });
        console.log(removedJob);
        return removedJob;
    } catch (error) {
        console.log('Error deleting job:', error);
    }
};
//deleteJob("Experienced Virtual Assistant for Creating Shopify Landing/Product Pages");

module.exports = {
    createJob,
    readJobs,
    readJobsBySkill,
    readJobsByID,
    readJobsAdmin,
    updateJob,
    deleteJob
};