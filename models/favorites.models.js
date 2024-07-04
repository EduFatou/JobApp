/**
 * @author Diego Bláquez Rosado, Emilio Latorre Guerra, Eduardo Fatou Cerrato
 * @exports favorites.models
 * @namespace models
 */

const queries = require('../queries/favorites.queries')
const pool = require('../config/db_pgsql');

// CREATE
/**
 * Crea un nuevo favorito en la base de datos.
 * @memberof models
 * @method createFavorite
 * @async
 * @param {Object} favorite - El objeto favorito a crear.
 * @param {string} favorite.email - El email del usuario.
 * @param {string} favorite.job_id - El ID del trabajo.
 * @returns {Promise<number>} - El número de filas afectadas.
 * @throws {Error} - Lanza un error si hay problemas con la base de datos.
 */

const createFavorite = async (favorite) => {
    const { email, job_id } = favorite;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite, [email, job_id]);
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
// let newFavorite = {
//     email: 'diego@gmail.com',
//     job_id: "2"
// }
// createFavorite(newFavorite)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))


// READ
/**
 * Lee los favoritos de un usuario desde la base de datos.
 * @memberof models
 * @method readFavorites
 * @async
 * @param {string} email - El email del usuario.
 * @returns {Promise<Object[]>} - Una lista de favoritos del usuario.
 * @throws {Error} - Lanza un error si hay problemas con la base de datos.
 */

const readFavorites = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readFavorites, [email]);
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
// readFavorites('diego@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))


// DELETE
/**
 * Elimina un favorito de la base de datos.
 * @memberof models
 * @method deleteFavorite
 * @async
 * @param {string} email - El email del usuario.
 * @param {string} job_id - El ID del anuncio.
 * @returns {Promise<number>} - El número de filas afectadas.
 * @throws {Error} - Lanza un error si hay problemas con la base de datos.
 */

const deleteFavorite = async (email, job_id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFavorite, [email, job_id])
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
// deleteFavorite('diego@gmail.com', '2')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const favorites = {
    createFavorite,
    readFavorites,
    deleteFavorite
}

module.exports = favorites;