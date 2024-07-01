// import connection
import db from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = "tanokura2909";

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM user", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get single user
export const getUserByEmail = (data,result) => {
    db.query("SELECT * FROM user WHERE user_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
export const getUserById = (data,result) => {
    db.query("SELECT * FROM user WHERE user_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert User
export const insertUser = (data,result) => {
    db.query("INSERT INTO user SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update Food
export const updateUserById = (data,id,result) => {
    db.query("UPDATE user SET user_name = ?, user_email = ?, user_phone = ?, user_address = ?, user_password = ?, role_id = ? WHERE user_id = ?",[data.user_name, data.user_email, data.user_phone, data.user_address , data.user_password, data.role_id, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete user
export const deleteUserById = (id, result) => {
    db.query("SELECT bill_id FROM billstatus WHERE user_id = ?", [id], async (err, billResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const billIds = billResults.map(row => row.bill_id);

            try {
                for (const billId of billIds) {
                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM billdetails WHERE bill_id = ?", [billId], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                }

                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM billstatus WHERE user_id = ?", [id], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM food_favorite WHERE user_id = ?", [id], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM food_rating WHERE user_id = ?", [id], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    db.query("DELETE FROM user WHERE user_id = ?",[id], (err,results)=> {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                    }
                });

            } catch (err) {
                result(err, null);
            }
        }
    });
};

// login user
export const loginUserByEmail = (data, result) => {
    db.query("SELECT * FROM user WHERE user_email = ?", [data.email], async (err, results) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
        } else if (results.length > 0) {
            const user = results[0];
            const isMatch = await bcrypt.compare(data.password, user.user_password);

            if (isMatch) {
                db.query("SELECT role_name FROM role WHERE role_id = ?",[user.role_id], (err,roleResults)=> {
                    if (err){
                        console.log(err);
                        result(err,null);
                    }else{
                        const token = jwt.sign({ 
                            user_id: user.user_id, 
                            user_name: user.user_name, 
                            user_email: user.user_email,
                            user_phone: user.user_phone,
                            user_address: user.user_address,
                            user_password: user.user_password,
                            role_id: user.role_id,
                            role_name: roleResults[0].role_name
                        }, SECRET_KEY, { expiresIn: '24h' });
                        result(null, { user, token });
                    }
                });
            } else {
                result({ message: 'Incorrect email or password!' }, null);
            }
        } else {
            result({ message: 'Incorrect email or password!' }, null);
        }
    });
};