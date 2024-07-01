// import functions from info model

import {
    deleteInfoById,
    getAllInfo,
    getInfoById,
    insertInfo,
    updateInfoById
} from "../models/InfoModel.js";

// get all infos
export const allInfos=(req,res)=>{
    getAllInfo((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single info
export const showAInfo = (req,res)=>{
    getInfoById(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create info
export const createInfo=(req,res)=>{
    const data = req.body;
    insertInfo(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update info
export const updateInfo=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateInfoById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete info
export const deleteInfo=(req,res)=>{
    const id = req.params.id;
    deleteInfoById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




