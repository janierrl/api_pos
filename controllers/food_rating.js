// import functions from food rating model

import {
    getFoodRatingById,
    getFoodRatingGlobalById,
    insertFoodRating,
    updateFoodRatingById,
} from "../models/FoodRatingModel.js";

// get all rating food
export const showFoodRatingById=(req,res)=>{
    getFoodRatingById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
export const showFoodRatingGlobalById=(req,res)=>{
    getFoodRatingGlobalById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create rating food
export const createFoodRating=(req,res)=>{
    const data = req.body;
    insertFoodRating(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update rating food
export const updateFoodRating=(req,res)=>{
    const data = req.body;
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    updateFoodRatingById(data,user_id,food_id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};