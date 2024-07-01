// import connection
import db from "../config/database.js";

// get all amount types
export const getAllAmountType = (result) => {
    db.query("SELECT * FROM amount_type", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get single amount type
export const getAmountTypeById = (data,result) => {
    db.query("SELECT * FROM amount_type WHERE amount_type_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const getAmountTypeByName = (data,result) => {
    db.query("SELECT * FROM amount_type WHERE amount_type_name = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert amount_type
export const insertAmountType = (data,result) => {
    db.query("INSERT INTO amount_type SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update amount type
export const updateAmountTypeById = (data,id,result) => {
    db.query("UPDATE amount_type SET amount_type_name = ?, amount_type_symbol = ? WHERE amount_type_id = ?",[data.amount_type_name, data.amount_type_symbol, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete amount type
export const deleteAmountTypeById = (id, result) => {
    db.query("SELECT ingredient_id FROM ingredient WHERE amount_type_id = ?", [id], async (err, ingredientResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const ingredientIds = ingredientResults.map(row => row.ingredient_id);

            try {
                for (const ingredientId of ingredientIds) {
                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM food_ingredient WHERE ingredient_id = ?", [ingredientId], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                }

                await new Promise((resolve, reject) => {
                    db.query("DELETE FROM ingredient WHERE amount_type_id = ?", [id], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                db.query("DELETE FROM amount_type WHERE amount_type_id = ?", [id], (err, results) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                    }
                });

            } catch (err) {
                result(err, null);
            }
        }
    });
};