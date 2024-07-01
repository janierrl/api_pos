// import functions from User model

import {
    deleteUserById,
    getAllUser,
    getUserByEmail,
    getUserById,
    insertUser,
    loginUserByEmail,
    updateUserById
} from "../models/UserModel.js";
import bcrypt from "bcrypt";

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.email,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
export const showAUserById = (req,res)=>{
    getUserById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create user
export const createAccount = async (req,res) => {
    const { user_name, user_email, user_phone, user_address, user_password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    
    const userData = {
        user_name,
        user_email,
        user_phone,
        user_address,
        user_password: hashedPassword,
        role_id
    };

    insertUser(userData,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update user
export const updateUser = async (req,res) => {
    const id = req.params.id;
    const { user_name, user_email, user_phone, user_address, user_password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    
    const userData = {
        user_name,
        user_email,
        user_phone,
        user_address,
        user_password: hashedPassword,
        role_id
    };

    updateUserById(userData,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete user
export const deleteUser=(req,res)=>{
    const id = req.params.id;
    deleteUserById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// login user
export const loginUser=(req,res)=>{
    const data = req.body;
    loginUserByEmail(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};