/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports users.controllers
 * @namespace controllers
 */

const user = require('../models/users.models');
const { validationResult } = require("express-validator");


/**
 * Descripción de la función: Esta función crea un nuevo usuario en la base de datos.
 * @memberof controllers
 * @async
 * @function createUserController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.name - El nombre del usuario.
 * @param {string} req.body.email - El email del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.role - El rol del usuario.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
    if (
        "name" in newUser &&
        "email" in newUser &&
        "password" in newUser &&
        "role" in newUser
    ) {
        try {
            const response = await user.createUser(newUser);
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
// POST http://localhost:3000/api/user
// {
//     "name": "Prueba",
//     "email": "prueba@gmail.com",
//     "password": "123456",
//     "role": "user",
//     "logged": false,
//     "last_logged_date": "2024-07-01 20:57:30.212678+00"
// }


/**
 * Descripción de la función: Esta función lee los usuarios desde la base de datos.
 * @memberof controllers
 * @async
 * @function readUsersController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} [req.query.email] - El email del usuario a buscar.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const readUsersController = async (req, res) => {
    let users;
    try {
        if (req.query.email || req.query.email == "") {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            users = await user.readUsersByEmail(req.query.email);
            res.status(200).json(users);
        } else {
            users = await user.readUsers();
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET ALL http://localhost:3000/api/user
// GET ONE http://localhost:3000/api/user?email=prueba@gmail.com


/**
 * Descripción de la función: Esta función actualiza un usuario en la base de datos.
 * @memberof controllers
 * @async
 * @function updateUserController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.old_email - El email actual del usuario.
 * @param {string} [req.body.name] - El nuevo nombre del usuario.
 * @param {string} [req.body.email] - El nuevo email del usuario.
 * @param {string} [req.body.password] - La nueva contraseña del usuario.
 * @param {string} [req.body.role] - El nuevo rol del usuario.
 * @param {boolean} [req.body.logged] - El nuevo estado de inicio de sesión del usuario.
 * @param {string} [req.body.last_logged_date] - La nueva fecha de último inicio de sesión del usuario.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const updateUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = req.body;
    if (
        ("name" in modifiedUser ||
        "email" in modifiedUser ||
        "password" in modifiedUser ||
        "role" in modifiedUser ||
        "logged" in modifiedUser ||
        "last_logged_date" in modifiedUser) &&
        "old_email" in modifiedUser
    ) {
        try {
            const response = await user.updateUser(modifiedUser);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "old_email obligatorio y un campo de update mínimo" });
    }
}
// Prueba Postman
// PUT http://localhost:3000/api/user
// {
//     "name": "Prueba2",
//     "email": "prueba2@gmail.com",
//     "password": "123456123456",
//     "role": "user",
//     "old_email": "prueba@gmail.com",
//     "logged": false,
//     "last_logged_date": "2024-07-01 20:57:30.212678+00"
// }


/**
 * Descripción de la función: Esta función elimina un usuario de la base de datos.
 * @memberof controllers
 * @async
 * @function deleteUserController
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} req.query - Los parámetros de consulta de la solicitud.
 * @param {string} req.query.email - El email del usuario a eliminar.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */

const deleteUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let users;
    try {
        users = await user.deleteUser(req.query.email);
        res.status(200).json(users); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE http://localhost:3000/api/user?email=prueba2@gmail.com

const postLogin = async (req, res) => {

}

const postLogout = async (req, res) => {

}

const recoverPassword = async (req, res) => {

}

const restorePassword = async (req, res) => {

}

module.exports = {
    createUserController,
    readUsersController,
    updateUserController,
    deleteUserController,
    // postLogin,
    // postLogout,
    // recoverPassword,
    // restorePassword
}