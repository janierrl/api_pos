// import connection
import db from "../config/database.js";

// get all statuses
export const getStatuses = (result) => {
    db.query("SELECT * FROM status", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get single status
export const getStatusById = (name,result) => {
    db.query("SELECT * FROM status WHERE status_name = ?",[name], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert status
export const insertStatus = (data,result) => {
    db.query("INSERT INTO status SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update status
export const updateStatusById = (data,id,result) => {
    db.query("UPDATE status SET status_name = ?",[data.status_name, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// delete status
export const deleteStatusById = (id, result) => {
    db.query("DELETE FROM food_status WHERE status_id = ?", [id], (err, foodStatusResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            db.query("DELETE FROM status WHERE status_id = ?", [id], (err, results) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });
        }
    });
};