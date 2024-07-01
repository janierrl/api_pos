// import connection
import db from "../config/database.js";

// get all favorite food
export const getFoodFavoriteById = (id,result) => {
    db.query("SELECT * FROM food_favorite WHERE user_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// insert favorite food
export const insertFoodFavorite = (data,result) => {
    db.query("INSERT INTO food_favorite SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// delete favorite food
export const deleteFoodFavoriteById = (user, food, result) => {
    db.query("DELETE FROM food_favorite WHERE user_id = ? AND food_id = ?",[user,food], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};