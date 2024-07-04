/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports web.controllers
 * @namespace controllers
 */

const jobService = require('../services/jobs.services');
const scraper = require('../utils/scraper');
const apiController = require('./jobs.controllers');
const usersModels = require('../models/users.models');
const favoritesModels = require('../models/favorites.models');

const urlToptal = 'https://www.toptal.com/freelance-jobs/developers/jobs/';
const urlFreelancer = 'https://www.freelancer.es/jobs/php_html_css_javascript_nodejs_java/?featured=true&languages=en';


/**
 * Descripción de la función: Esta función obtiene y muestra la página principal con los trabajos actualizados desde la base de datos.
 *
 * @async
 * @function getHome
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getHome = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        const keyword = req.body.keyword || null;
        let updatedJobs = await jobService.readJobs(keyword);

        // if(!req.logged){
        //     res.status(200).render("home.pug", {jobs: updatedJobs});
        //     return;
        // }
        const role = req.decoded?.role || "nologeado";
        const email = req.decoded?.email || "noemail@gmail.com"
        res.status(200).render("home.pug", { jobs: updatedJobs, role, email});
    } catch (error) {
        res.status(404).json({})
    }
}

/**
 * Descripción de la función: Esta función obtiene y muestra la página principal con los trabajos filtrados por habilidad desde la base de datos.
 *
 * @async
 * @function getHomeBySkill
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getHomeBySkill = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        const skill = req.body.skill || null;
        let updatedJobs = await jobService.readJobsBySkill(skill);
        console.log(updatedJobs)

        const role = req.decoded?.role || "nologeado";
        res.status(200).render("home.pug", { jobs: updatedJobs, role });
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función realiza scraping de trabajos desde URLs externas y actualiza la base de datos con los nuevos trabajos.
 *
 * @async
 * @function getScraping
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getScraping = async (req, res) => {
    try {
        // Primero obtenemos los jobs actuales en mongodb
        let currentJobs = await jobService.readJobs();

        // scraping para obtener los jobs nuevos
        console.log('Starting scraping...');
        let scrapedJobs = await scraper.scrap(urlToptal, urlFreelancer);
        let scrapedJobTitles = scrapedJobs.map(job => job.title);

        for (let job of scrapedJobs) {

            job.source = "scraping";
            job.status = true;

            // Crear una petición simulada
            let mockReq = {
                body: job,
            };
            let mockRes = {
                status: (statusCode) => ({
                    json: (response) => {
                        console.log("Mock response status:", statusCode);
                        console.log("Mock response data:", response);
                    }
                })
            };
            await apiController.createJobController(mockReq, mockRes);
        }

        // Desactivar trabajos que ya no estén presentes en el scraping
        console.log('comprobando jobstoDeactive')
        let jobsToDeactivate = currentJobs.filter(job => !scrapedJobTitles.includes(job.title));
        console.log(jobsToDeactivate)

        jobsToDeactivate.forEach(async (job) => {
            console.log('titulo viejo encontrado2')
            await jobService.updateJob({title: job.title}, {status: false})
            // await job.save();
            console.log('comprobando jobstoDeactive22')
        })

        // Obtener todos los trabajos actualizados desde la base de datos
        let updatedJobs = await jobService.readJobs();
        console.log('comprobando updatedJobs')

        res.status(200).render("home.pug", { jobs: updatedJobs });
    } catch (error) {
        res.status(404).json({})
    }

}


/**
 * Descripción de la función: Esta función muestra la página de registro.
 *
 * @function getSignup
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 */

const getSignup = async (req, res) => {
    console.log(req.decoded);
    const role = req.decoded?.role || "nologeado";
    res.render("signup.pug", {role});
}

/**
 * Descripción de la función: Esta función muestra la página de inicio de sesión.
 *
 * @function getLogin
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 */

const getLogin = async (req, res) => {
    const role = req.decoded?.role || "nologeado";
    res.render("login.pug", {role});
}


/**
 * Descripción de la función: Esta función obtiene y muestra los trabajos favoritos de un usuario.
 *
 * @async
 * @function getFavorites
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getFavorites = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        const email = req.decoded.email;
        let favoritesRead = await favoritesModels.readFavorites(email);
        const favoritesID = favoritesRead.map(favorite => favorite.job_id);
        const favoritesData = await jobService.readJobsByID(favoritesID);

        // invocar el servicio readJobsByID****************************
        const role = req.decoded?.role || "nologeado";
        res.status(200).render("favorites.pug", { favorites: favoritesData, role, email });
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función obtiene y muestra el perfil de un usuario.
 *
 * @async
 * @function getProfile
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getProfile = async (req, res) => {
    console.log(req.decoded.role);
    try {
        const email = req.decoded.email //este email habrá que capturarlo del que esté logueado en su caso
        let usersRead = await usersModels.readUsersByEmail(email);
        let [obj] = [...usersRead];
        const role = req.decoded?.role || "nologeado";
        const old_email = req.decoded.email;
        res.status(200).render("profile.pug", { user: obj, role, old_email, email});
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función obtiene y muestra todos los usuarios.
 *
 * @async
 * @function getUsers
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getUsers = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        let usersRead = await usersModels.readUsers();

        const role = req.decoded?.role || "nologeado"
        res.status(200).render("users.pug", { users: usersRead, role});
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función obtiene y muestra la página de edición de un usuario.
 *
 * @async
 * @function getEditUser
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getEditUser = async (req, res) => {
    try {
        const email = req.body.email
        console.log(`progando getedituser ${email}`)
        let usersRead = await usersModels.readUsersByEmail(email);
        let [obj] = [...usersRead];
        console.log('progando getedituser')
        console.log(obj)
        res.status(200).render("userEdit.pug", { user: obj });
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función obtiene y muestra la página de administración con los trabajos actualizados desde la base de datos.
 *
 * @async
 * @function getDashboard
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getDashboard = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        const keyword = req.body.keyword || null;
        let updatedJobs = await jobService.readJobsAdmin();
        console.log(updatedJobs)

        const role = req.decoded?.role || "nologeado"
        res.status(200).render("dashboard.pug", { jobs: updatedJobs, role });
    } catch (error) {
        res.status(404).json({})
    }
}


/**
 * Descripción de la función: Esta función obtiene y muestra la página de edición de un trabajo.
 *
 * @async
 * @function getEditJob
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const getEditJob = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        const id = [req.body.job_id] || null;
        console.log('probando id array...')
        console.log(id)
        console.log('dejando de probar id array...')

        let toEditJob = await jobService.readJobsByID(id);
        const [objJob] = [...toEditJob]
        console.log(toEditJob)
        console.log(objJob)

        res.status(200).render("jobEdit.pug", { job: objJob });
    } catch (error) {
        res.status(404).json({})
    }
}

module.exports = {
    getHome,
    getHomeBySkill,
    getScraping,
    getSignup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getEditUser,
    getDashboard,
    getEditJob
}