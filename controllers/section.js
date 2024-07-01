// import functions from section model

import {
    deleteSectionById,
    getAllSection,
    getSectionById,
    getSectionByName,
    insertSection,
    updateSectionById
} from "../models/SectionModel.js"

// get all sections
export const allSections=(req,res)=>{
    getAllSection((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single section
export const showASection = (req,res)=>{
    getSectionById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
export const showASectionName = (req,res)=>{
    getSectionByName(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create section
export const createSection=(req,res)=>{
    const data = req.body;
    insertSection(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update section
export const updateSection=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateSectionById(data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete section
export const deleteSection=(req,res)=>{
    const id = req.params.id;
    deleteSectionById(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




