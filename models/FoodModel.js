// import connection
import db from "../config/database.js";
import fs from "fs"
import { getFootImgUrl, getStatusById, getIngredientById, uploadFootImg, deleteFootImg, getCategoryById } from "./utils/FoodUtils.js";

// get all Foods
export const getFoods = (result) => {
    db.query("SELECT * FROM food", async (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            try {
                const promises = results.map(async (food) => {
                    const prefix = food.food_src;
                    const imageUrl = await getFootImgUrl(prefix);
                    food.food_src = imageUrl;

                    const categories = await getCategoryById(food.food_id);
                    food.food_category = categories;

                    const statuses = await getStatusById(food.food_id);
                    food.food_status = statuses;

                    const ingredients = await getIngredientById(food.food_id);
                    food.food_ingredient = ingredients;
                });

                await Promise.all(promises);
                result(null, results);
            } catch (error) {
                console.error('Error al obtener las URLs de las imágenes:', error);
                result(error, null);
            }
        }
    });
};

// get single Foods
export const getFoodById = (id,result) => {
    db.query("SELECT * FROM food WHERE food_id = ?",[id], async (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            try {
                const promises = results.map(async (food) => {
                    const prefix = food.food_src;
                    const imageUrl = await getFootImgUrl(prefix);
                    food.food_src = imageUrl;

                    const statuses = await getStatusById(food.food_id);
                    food.food_status = statuses;

                    const ingredients = await getIngredientById(food.food_id);
                    food.food_ingredient = ingredients;
                });

                await Promise.all(promises);
                result(null, results[0]);
            } catch (error) {
                console.error('Error al obtener las URLs de las imágenes:', error);
                result(error, null);
            }
        }
    });
};

// insert Food
export const insertFood = (data, file, result) => {
    db.query("SELECT category_name FROM category WHERE category_id = ?",[data.category], async (err, categoryResults) => {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            categoryResults.map(async (category) => {
                const food_src = `${category.category_name}/${file.name}`;
                const foodData = {
                    food_name: data.name,
                    food_price: data.price,
                    food_discount: data.discount,
                    food_desc: data.desc,
                    food_type: data.type,
                    category_id: data.category,
                    food_src: food_src
                };
    
                db.query("INSERT INTO food SET ?", foodData, (err, foodResult) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        const food_id = foodResult.insertId;
                        const foodIngredientData = [];
    
                        data.ingredients.forEach(ingredient => {
                            foodIngredientData.push({
                                food_id: food_id,
                                ingredient_id: ingredient.ingredient_id,
                                amount: ingredient.amount
                            });
                        });
    
                        db.query("INSERT INTO food_ingredient (food_id, ingredient_id, amount) VALUES ?", [foodIngredientData.map(item => [item.food_id, item.ingredient_id, item.amount])], (err, foodIngredientResult) => {
                            if (err) {
                                console.log(err);
                                result(err, null);
                            } else {
                                const foodStatusData = [];
                    
                                data.statuses.forEach(status => {
                                    foodStatusData.push({
                                        food_id: food_id,
                                        status_id: status.status_id
                                    });
                                });
                    
                                db.query("INSERT INTO food_status (food_id, status_id) VALUES ?", [foodStatusData.map(item => [item.food_id, item.status_id])], async (err, foodStatusResult) => {
                                    if (err) {
                                        console.log(err);
                                        result(err, null);
                                    } else {
                                        await uploadFootImg(food_src, file);
                                
                                        fs.rmSync('uploads', { recursive: true });
                                        result(null, foodStatusResult);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
};

// Update Food by ID
export const updateFoodById = (foodId, data, file, result) => {
    db.query("SELECT category_name FROM category WHERE category_id = ?", [data.category], async (err, categoryResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            db.query("SELECT food_src FROM food WHERE food_id = ?", [foodId], async (err, foodResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const oldFoodSrc = foodResults[0].food_src;

                    categoryResults.map(async (category) => {
                        const food_src = data.isImageUpdated ? `${category.category_name}/${file.name}` : oldFoodSrc;
                        const foodUpdateData = {
                            food_name: data.name,
                            food_price: data.price,
                            food_discount: data.discount,
                            food_desc: data.desc,
                            food_type: data.type,
                            category_id: data.category,
                            food_src: food_src
                        };

                        db.query("UPDATE food SET ? WHERE food_id = ?", [foodUpdateData, foodId], async (err, foodResult) => {
                            if (err) {
                                console.log(err);
                                result(err, null);
                            } else {
                                if (data.isImageUpdated && oldFoodSrc) {
                                    await deleteFootImg(oldFoodSrc);
                                    await uploadFootImg(food_src, file);
                                    fs.rmSync('uploads', { recursive: true });
                                }
                                
                                const foodIngredientData = data.ingredients.map(ingredient => [foodId, ingredient.ingredient_id, ingredient.amount]);
                                const foodStatusData = data.statuses.map(status => [foodId, status.status_id]);

                                db.query("DELETE FROM food_ingredient WHERE food_id = ?", [foodId], (err) => {
                                    if (err) {
                                        console.log(err);
                                        result(err, null);
                                    } else {
                                        db.query("INSERT INTO food_ingredient (food_id, ingredient_id, amount) VALUES ?", [foodIngredientData], (err) => {
                                            if (err) {
                                                console.log(err);
                                                result(err, null);
                                            } else {
                                                db.query("DELETE FROM food_status WHERE food_id = ?", [foodId], (err) => {
                                                    if (err) {
                                                        console.log(err);
                                                        result(err, null);
                                                    } else {
                                                        db.query("INSERT INTO food_status (food_id, status_id) VALUES ?", [foodStatusData], (err, foodStatusResult) => {
                                                            if (err) {
                                                                console.log(err);
                                                                result(err, null);
                                                            } else {
                                                                result(null, foodStatusResult);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
};
export const updateRatingFoodById = (data,id,result) => {
    db.query("UPDATE food SET food_star = ?, food_vote = ? WHERE food_id = ?",[data.food_star, data.food_vote, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete Food
export const deleteFoodById = (id, result) => {
    db.query("SELECT food_src FROM food WHERE food_id = ?", [id], async (err, foodResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const foodSrc = foodResults[0].food_src;

            db.query("DELETE FROM food_ingredient WHERE food_id = ?", [id], (err) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    db.query("DELETE FROM food_status WHERE food_id = ?", [id], (err) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            db.query("DELETE FROM billdetails WHERE food_id = ?", [id], (err) => {
                                if (err) {
                                    console.log(err);
                                    result(err, null);
                                } else {
                                    db.query("DELETE FROM food_favorite WHERE food_id = ?", [id], (err) => {
                                        if (err) {
                                            console.log(err);
                                            result(err, null);
                                        } else {
                                            db.query("DELETE FROM food_rating WHERE food_id = ?", [id], (err) => {
                                                if (err) {
                                                    console.log(err);
                                                    result(err, null);
                                                } else {
                                                    db.query("DELETE FROM food WHERE food_id = ?", [id], async (err, results) => {
                                                        if (err) {
                                                            console.log(err);
                                                            result(err, null);
                                                        } else {
                                                            await deleteFootImg(foodSrc);
                                                            result(null, results);
                                                        }
                                                    }); 
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};