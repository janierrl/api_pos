// import connection
import db from "../config/database.js";

// get all ingredients
export const getIngredients = (result) => {
    db.query("SELECT * FROM ingredient", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get single ingredient
export const getIngredientById = (id,result) => {
    db.query("SELECT * FROM ingredient WHERE ingredient_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
export const getIngredientByName = (name,result) => {
    db.query("SELECT * FROM ingredient WHERE ingredient_name = ?",[name], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert ingredient
export const insertIngredient = (data,result) => {
    db.query("INSERT INTO ingredient SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update ingredient
export const updateIngredientById = (data,id,result) => {
    db.query("UPDATE ingredient SET ingredient_name = ?, ingredient_amount = ?, amount_type_id = ? WHERE ingredient_id = ?",[data.ingredient_name, data.ingredient_amount, data.amount_type_id, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// delete ingredient
export const deleteIngredientById = (id, result) => {
    db.query("DELETE FROM food_ingredient WHERE ingredient_id = ?", [id], (err, foodIngredientResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            db.query("DELETE FROM ingredient WHERE ingredient_id = ?", [id], (err, results) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });
        }
    });
};