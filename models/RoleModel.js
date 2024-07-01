// import connection
import db from "../config/database.js";

// get all role
export const getAllRole = (result) => {
    db.query("SELECT * FROM role", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get single role
export const getRoleById = (data,result) => {
    db.query("SELECT role_name FROM role WHERE role_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const getRoleByName = (data,result) => {
    db.query("SELECT * FROM role WHERE role_name = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert role
export const insertRole = (data,result) => {
    db.query("INSERT INTO role SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update role
export const updateRoleById = (data,id,result) => {
    db.query("UPDATE role SET role_name = ? WHERE role_id = ?",[data.role_name, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete role
export const deleteRoleById = (id, result) => {
    db.query("SELECT user_id FROM user WHERE role_id = ?", [id], async (err, userResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const userIds = userResults.map(row => row.user_id);

            try {
                for (const userId of userIds) {
                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM food_favorite WHERE user_id = ?", [userId], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM food_rating WHERE user_id = ?", [userId], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
               
                    db.query("SELECT bill_id FROM billstatus WHERE user_id = ?", [userId], async (err, billResults) => {
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
                            } catch (err) {
                                result(err, null);
                            }
                        }
                    });

                    await new Promise((resolve, reject) => {
                        db.query("DELETE FROM billstatus WHERE user_id = ?", [userId], (err) => {
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
                    db.query("DELETE FROM user WHERE role_id = ?", [id], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                db.query("DELETE FROM role WHERE role_id = ?",[id], (err,results)=> {
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