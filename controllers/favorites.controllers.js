/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports favorites
 * @namespace controllers
 */

const favorite = require('../models/favorites.models');
const { validationResult } = require("express-validator");


/**
 * Descripción de la función: Esta función crea un nuevo favorito en la base de datos.
 * @method deleteUser
 * @memberof controllers
 * @async
 * @function createFavoriteController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.email - El email del usuario.
 * @param {string} req.body.job_id - El ID del trabajo.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const createFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newFavorite = req.body;
    if (
        "email" in newFavorite &&
        "job_id" in newFavorite
    ) {
        try {
            const response = await favorite.createFavorite(newFavorite);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}
// Prueba Postman
// POST https://jobapp-w73i.onrender.com/api/favorites
// {
//     "email": "diego@gmail.com",
//     "job_id": "2"
// }


/**
 * Lee los favoritos de un usuario desde la base de datos.
 * @memberof controllers
 * @async
 * @function readFavoritesController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} req.query.email - El email del usuario.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const readFavoritesController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.readFavorites(req.query.email);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET https://jobapp-w73i.onrender.com



/**
 * Elimina un favorito de un usuario en la base de datos.
 * @memberof controllers
 * @async
 * @function deleteFavoriteController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} req.query.email - El email del usuario.
 * @param {string} req.query.job_id - El ID del trabajo.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const deleteFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.deleteFavorite(req.query.email, req.query.job_id);
        res.status(200).json(favorites); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE https://jobapp-w73i.onrender.com&job_id=2

module.exports = {
    createFavoriteController,
    readFavoritesController,
    deleteFavoriteController
}