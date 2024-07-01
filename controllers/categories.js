// import functions from category model

import {
    getCategories,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategoryByName,
} from "../models/CategoriesModel.js";

// get all categories
export const showCategories=(req,res)=>{
    getCategories((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single category
export const showCategoryById=(req,res)=>{
    getCategoryById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
export const showCategoryByName=(req,res)=>{
    getCategoryByName(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create category
export const createCategory=(req,res)=>{
    const data = req.body;
    insertCategory(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update category
export const updateCategory=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateCategoryById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete category
export const deleteCategory=(req,res)=>{
    const id = req.params.id;
    deleteCategoryById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};