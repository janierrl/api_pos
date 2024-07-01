// import connection
import db from "../config/database.js";

// get all sections
export const getAllSection = (result) => {
    db.query("SELECT * FROM section", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get single section
export const getSectionById = (data,result) => {
    db.query("SELECT * FROM section WHERE section_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const getSectionByName = (data,result) => {
    db.query("SELECT * FROM section WHERE section_name = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert section
export const insertSection = (data,result) => {
    db.query("INSERT INTO section SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update section
export const updateSectionById = (data,id,result) => {
    db.query("UPDATE section SET section_name = ? WHERE section_id = ?",[data.section_name, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete section
export const deleteSectionById = (id,result) => {
    db.query("DELETE FROM section WHERE section_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};




