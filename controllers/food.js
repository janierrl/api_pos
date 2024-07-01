// import functions from Food model

import {
    getFoods,
    getFoodById,
    insertFood,
    updateFoodById,
    deleteFoodById,
    updateRatingFoodById,
} from "../models/FoodModel.js";

// get all Foods
export const showFoods=(req,res)=>{
    getFoods((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get single Food
export const showFoodById=(req,res)=>{
    getFoodById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create Food
export const createFood = (req, res) => {
    const { name, price, type, discount, desc, category, ingredients, statuses } = req.body;
    const file = req.files["image"];
    const parsedIngredients = JSON.parse(ingredients);
    const parsedStatuses = JSON.parse(statuses);

    const foodData = {
        name,
        price: parseInt(price),
        type,
        discount: parseFloat(discount),
        desc,
        category: parseInt(category),
        ingredients: parsedIngredients,
        statuses: parsedStatuses
    };

    insertFood(foodData,file,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update Food
export const updateFood = (req, res) => {
    const foodId = req.params.id;
    const { name, price, type, discount, desc, category, ingredients, statuses, isImageUpdated } = req.body;
    const file = req.files ? req.files["image"] : null;
    const parsedIngredients = JSON.parse(ingredients);
    const parsedStatuses = JSON.parse(statuses);

    const foodData = {
        name,
        price: parseInt(price),
        type,
        discount: parseFloat(discount),
        desc,
        category: parseInt(category),
        ingredients: parsedIngredients,
        statuses: parsedStatuses,
        isImageUpdated: isImageUpdated === 'true'
    };

    updateFoodById(foodId, foodData, file, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};
export const updateRatingFood=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateRatingFoodById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete Food
export const deleteFood=(req,res)=>{
    const id = req.params.id;
    deleteFoodById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};