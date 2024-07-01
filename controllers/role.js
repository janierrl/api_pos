// import functions from role model

import {
    deleteRoleById,
    getAllRole,
    getRoleById,
    getRoleByName,
    insertRole,
    updateRoleById,
} from "../models/RoleModel.js";

// get all roles
export const allRoles=(req,res)=>{
    getAllRole((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single role
export const showARole = (req,res)=>{
    getRoleById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const showARoleName = (req,res)=>{
    getRoleByName(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create role
export const createRole=(req,res)=>{
    const data = req.body;
    insertRole(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update role
export const updateRole=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateRoleById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// delete role
export const deleteRole=(req,res)=>{
    const id = req.params.id;
    deleteRoleById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




