import cloud from "../../config/cloud.js";
import db from "../../config/database.js";

// get url img
export const getFootImgUrl = async (prefix) => {
    try {
        const url = await cloud.presignedGetObject('tanokura', prefix);
        return url;
    } catch (error) {
        console.error('Error al obtener la URL de la imagen:', error);
        throw error;
    }
};

// get category
export const getCategoryById = async (data) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT f.category_id, c.category_name FROM food f JOIN category c ON f.category_id = c.category_id WHERE f.food_id = ?;", [data], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const categories = results.map((row) => ({
                    category_id: row.category_id,
                    category_name: row.category_name
                }));
                resolve(categories);
            }
        });
    });
};

// get status
export const getStatusById = async (data) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT s.status_id, s.status_name FROM food f JOIN food_status fs ON f.food_id = fs.food_id JOIN status s ON fs.status_id = s.status_id WHERE f.food_id = ?", [data], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const statuses = results.map((row) => ({
                    status_id: row.status_id,
                    status_name: row.status_name
                }));
                resolve(statuses);
            }
        });
    });
};

// get ingredient
export const getIngredientById = async (data) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT i.ingredient_id, i.ingredient_name, fi.amount, at.amount_type_symbol FROM food f JOIN food_ingredient fi ON f.food_id = fi.food_id JOIN ingredient i ON fi.ingredient_id = i.ingredient_id JOIN amount_type at ON i.amount_type_id = at.amount_type_id WHERE f.food_id = ?", [data], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const ingredients = results.map((row) => ({
                    ingredient_id: row.ingredient_id,
                    ingredient_name: row.ingredient_name,
                    amount: row.amount,
                    amount_type_symbol: row.amount_type_symbol
                }));
                resolve(ingredients);
            }
        });
    });
};

// upload img
export const uploadFootImg = async (prefix, file) => {
    try {
        await cloud.fPutObject('tanokura', prefix, file.tempFilePath, {
            'Content-Type': file.mimetype,
        });
    } catch (error) {
        console.error('Error al subir el archivo a MinIO:', error);
        throw error;
    }
};

// remove img
export const deleteFootImg = async (prefix) => {
    try {
        await cloud.removeObject('tanokura', prefix);
    } catch (error) {
        console.error('Error al eliminar imagen antigua de Minio Cloud:', error);
        throw error;
    }
};
