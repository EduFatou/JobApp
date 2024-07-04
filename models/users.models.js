/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports users.models
 * @namespace models
 */

const queries = require('../queries/users.queries')
const pool = require('../config/db_pgsql');

// CREATE
<<<<<<< HEAD
const createUser = async (name, email, password) => {
    // const { name, email, password, role} = user;
=======
/**
 * Esta función crea un nuevo usuario en la base de datos.
 * @method createUser
 * @memberof models
 * @async
 * @param {Object} user - Objeto usuario con las propiedades name, email, password, y role.
 * @return {Promise<number>} Número de filas afectadas.
 * @throws {Error} Error al crear el usuario.
 */

const createUser = async (user) => {
    const { name, email, password, role} = user;
>>>>>>> jsdoc
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser, [name, email, password]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// let newUser = {
//     name: "Prueba",
//     email: "prueba@gmail.com",
//     password: "123456",
//     role: "user",
//     logged: false,
//     last_logged_date: "2024-07-01 20:57:30.212678+00"
// }
// createUser(newUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))


// READ ALL
/**
 * Esta función lee todos los usuarios de la base de datos.
 * @method readUsers
 * @memberof models
 * @async
 * @return {Promise<Array>} Array de objetos usuario.
 * @throws {Error} Error al leer los usuarios.
 */

const readUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readUsers);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// readUsers()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))


// READ ONE
/**
 * Esta función lee un usuario de la base de datos por email.
 * @method readUsersByEmail
 * @memberof models
 * @async
 * @param {string} email - Email del usuario a leer.
 * @return {Promise<Array>} Array de objetos usuario.
 * @throws {Error} Error al leer el usuario.
 */

const readUsersByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readUsersByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// readUsersByEmail('prueba@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// UPDATE
/**
 * Esta función actualiza un usuario en la base de datos.
 * @method updateUser
 * @memberof models
 * @async
 * @param {Object} user - Objeto usuario con las propiedades a actualizar.
 * @return {Promise<number>} Número de filas afectadas.
 * @throws {Error} Error al actualizar el usuario.
 */

const updateUser = async (user) => {
    const { name, email, password, role, logged, last_logged_date, old_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        result = 0; // Initialize the result counter

        // Array to store promises for each update query
        const updatePromises = [];

        if (name) {
            updatePromises.push(client.query(queries.updateUserName, [name, old_email]));
        }
        if (password) {
            updatePromises.push(client.query(queries.updateUserPassword, [password, old_email]));
        }
        if (role) {
            updatePromises.push(client.query(queries.updateUserRole, [role, old_email]));
        }
        if (typeof logged !== 'undefined') { // Checking for undefined to allow false values
            updatePromises.push(client.query(queries.updateUserLogged, [logged, old_email]));
        }
        if (last_logged_date) {
            updatePromises.push(client.query(queries.updateUserLastLoggedDate, [last_logged_date, old_email]));
        }
        if (email) {
            updatePromises.push(client.query(queries.updateUserEmail, [email, old_email]));
        }

        // Wait for all promises to complete
        const updateResults = await Promise.all(updatePromises);

        // Count the number of rows affected by each update
        updateResults.forEach(updateResult => {
            result += updateResult.rowCount;
        });

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// Pruebas PostgreSQL
// const updatedUser = {
//     name: "Prueba2",
//     email: "prueba2@gmail.com",
//     password: "123456123456",
//     role: "user",
//     old_email: "prueba@gmail.com",
//     logged: false,
//     last_logged_date: "2024-07-01 20:57:30.212678+00"
// }
// updateUser(updatedUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))


// DELETE
/**
 * Esta función elimina un usuario de la base de datos por email.
 * @method deleteUser
 * @memberof models
 * @async
 * @param {string} email - Email del usuario a eliminar.
 * @return {Promise<number>} Número de filas afectadas.
 * @throws {Error} Error al eliminar el usuario.
 */

const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUser, [email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// deleteUser('prueba2@gmail.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const users = {
    createUser,
    readUsers,
    readUsersByEmail,
    updateUser,
    deleteUser
}

module.exports = users;