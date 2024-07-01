// import connection
import db from "../config/database.js";

// get all rating food
export const getFoodRatingById = (id,result) => {
    db.query("SELECT * FROM food_rating WHERE user_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
export const getFoodRatingGlobalById = (id,result) => {
    db.query("SELECT * FROM food_rating WHERE food_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// insert rating food
export const insertFoodRating = (data,result) => {
    db.query("INSERT INTO food_rating SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update rating food
export const updateFoodRatingById = (data, user, food, result) => {
    db.query("UPDATE food_rating SET rating = ? WHERE user_id = ? AND food_id = ?",[data.rating, user,food], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};