// import functions from Ingredient model

import {
    getIngredients,
    getIngredientById,
    insertIngredient,
    updateIngredientById,
    deleteIngredientById,
    getIngredientByName,
} from "../models/IngredientModel.js";

// get all ingredients
export const showIngredients=(req,res)=>{
    getIngredients((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single ingredient
export const showIngredientById=(req,res)=>{
    getIngredientById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
export const showIngredientByName=(req,res)=>{
    getIngredientByName(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create ingredient
export const createIngredient=(req,res)=>{
    const data = req.body;
    insertIngredient(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update ingredient
export const updateIngredient=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateIngredientById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete Ingredient
export const deleteIngredient=(req,res)=>{
    const id = req.params.id;
    deleteIngredientById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};