// import connection
import db from "../config/database.js";

// get all infos
export const getAllInfo = (result) => {
    db.query("SELECT * FROM info", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get single info
export const getInfoById = (data,result) => {
    db.query("SELECT * FROM info WHERE info_name = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert info
export const insertInfo = (data,result) => {
    db.query("INSERT INTO info SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update info
export const updateInfoById = (data,id,result) => {
    db.query("UPDATE info SET info_name = ?, info_spanish_text = ?, info_english_text = ?, section_id = ? WHERE info_id = ?",[data.info_name, data.info_spanish_text, data.info_english_text, data.section_id, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete info
export const deleteInfoById = (id,result) => {
    db.query("DELETE FROM info WHERE info_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};




