// import functions from amount type model

import {
    deleteAmountTypeById,
    getAllAmountType,
    getAmountTypeById,
    getAmountTypeByName,
    insertAmountType,
    updateAmountTypeById
} from "../models/AmountTypeModel.js";

// get all amount types
export const allAmountTypes=(req,res)=>{
    getAllAmountType((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single amount type
export const showAAmountType = (req,res)=>{
    getAmountTypeById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const showAAmountTypeName = (req,res)=>{
    getAmountTypeByName(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create amount type
export const createAmountType=(req,res)=>{
    const data = req.body;
    insertAmountType(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update amount type
export const updateAmountType=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateAmountTypeById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete amount type
export const deleteAmountType=(req,res)=>{
    const id = req.params.id;
    deleteAmountTypeById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




