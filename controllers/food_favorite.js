// import functions from food favorite model

import {
    getFoodFavoriteById,
    insertFoodFavorite,
    deleteFoodFavoriteById,
} from "../models/FoodFavoriteModel.js";

// get all favorite food
export const showFoodFavoriteById=(req,res)=>{
    getFoodFavoriteById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create favorite food
export const createFoodFavorite=(req,res)=>{
    const data = req.body;
    insertFoodFavorite(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete favorite food
export const deleteFoodFavorite=(req,res)=>{
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    deleteFoodFavoriteById(user_id,food_id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};