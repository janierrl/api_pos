// import connection
import db from "../config/database.js";

// get all categories
export const getCategories = (result) => {
    db.query("SELECT * FROM category", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get single category
export const getCategoryById = (id,result) => {
    db.query("SELECT * FROM category WHERE category_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
export const getCategoryByName = (name,result) => {
    db.query("SELECT * FROM category WHERE category_name = ?",[name], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert category
export const insertCategory = (data,result) => {
    db.query("INSERT INTO category SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// update category
export const updateCategoryById = (data,id,result) => {
    db.query("UPDATE category SET category_name = ?",[data.category_name, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// delete category
export const deleteCategoryById = (id,result) => {
    db.query("DELETE FROM category WHERE category_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};