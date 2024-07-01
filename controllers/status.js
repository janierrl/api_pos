// import functions from status model

import {
    getStatuses,
    getStatusById,
    insertStatus,
    updateStatusById,
    deleteStatusById,
} from "../models/StatusModel.js";

// get all statuses
export const showStatuses=(req,res)=>{
    getStatuses((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single status
export const showStatusById=(req,res)=>{
    getStatusById(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create status
export const createStatus=(req,res)=>{
    const data = req.body;
    insertStatus(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update status
export const updateStatus=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateStatusById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete status
export const deleteStatus=(req,res)=>{
    const id = req.params.id;
    deleteStatusById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};