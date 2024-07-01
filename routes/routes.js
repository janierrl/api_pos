// import express 
import express from "express";
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
    updateRatingFood,
} from "../controllers/food.js";

import {
    showAUser,
    createAccount,
    allUsers,
    deleteUser,
    updateUser,
    showAUserById,
    loginUser
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails,getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus, 
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus
} from "../controllers/billstatus.js";
import { allRoles, createRole, deleteRole, showARole, showARoleName, updateRole } from "../controllers/role.js";
import { createIngredient, deleteIngredient, showIngredientById, showIngredientByName, showIngredients, updateIngredient } from "../controllers/ingredient.js";
import { allAmountTypes, createAmountType, deleteAmountType, showAAmountType, showAAmountTypeName, updateAmountType } from "../controllers/amount_type.js";
import { allInfos, createInfo, deleteInfo, showAInfo, updateInfo } from "../controllers/info.js";
import { allSections, createSection, deleteSection, showASection, showASectionName, updateSection } from "../controllers/section.js";
import { createStatus, deleteStatus, showStatusById, showStatuses, updateStatus } from "../controllers/status.js";
import { createCategory, deleteCategory, showCategories, showCategoryById, showCategoryByName, updateCategory } from "../controllers/categories.js";
import { createFoodFavorite, deleteFoodFavorite, showFoodFavoriteById } from "../controllers/food_favorite.js";
import { createFoodRating, showFoodRatingById, showFoodRatingGlobalById, updateFoodRating } from "../controllers/food_rating.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

// init express router
const router = express.Router();

////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", showFoods);

// get single Food 
router.get("/api/foods/:id", showFoodById);

// create Food
router.post("/api/foods", authenticateToken, createFood);

// update Food 
router.put("/api/foods/:id", updateFood);
router.put("/api/foods/rating/:id", updateRatingFood);

// delete Food
router.delete("/api/foods/:id", deleteFood);

////////////////////////// FAVORITE FOOD ////////////////////////////////
// get single favorite food
router.get("/api/food_favorite/:id", showFoodFavoriteById);

// create favorite food
router.post("/api/food_favorite", createFoodFavorite);

// delete favorite food
router.delete("/api/food_favorite/:user_id/:food_id", deleteFoodFavorite);

////////////////////////// RATING FOOD ////////////////////////////////
// get single rating food
router.get("/api/food_rating/:id", showFoodRatingById);
router.get("/api/food_rating/global/:id", showFoodRatingGlobalById);

// create rating food
router.post("/api/food_rating", createFoodRating);

// update rating food
router.put("/api/food_rating/:user_id/:food_id", updateFoodRating);

////////////////////////// INGREDIENTS ////////////////////////////////
// get all ingredients
router.get("/api/ingredients", showIngredients);

// get single ingredient
router.get("/api/ingredients/:id", showIngredientById);
router.get("/api/ingredients/name/:name", showIngredientByName);

// create ingredient
router.post("/api/ingredients", createIngredient);

// update ingredient 
router.put("/api/ingredients/:id", updateIngredient);

// delete ingredient
router.delete("/api/ingredients/:id", deleteIngredient);


////////////////////////// STATUS ////////////////////////////////
// get all statuses
router.get("/api/statuses", showStatuses);

// get single status 
router.get("/api/statuses/:name", showStatusById);

// create status
router.post("/api/statuses", createStatus);

// update status 
router.put("/api/statuses/:id", updateStatus);

// delete status
router.delete("/api/statuses/:id", deleteStatus);

////////////////////////// CATEGORIES ////////////////////////////////
// get all categories
router.get("/api/categories", showCategories);

// get single category 
router.get("/api/categories/:id", showCategoryById);
router.get("/api/categories/name/:name", showCategoryByName);

// create category
router.post("/api/categories", createCategory);

// update category 
router.put("/api/categories/:id", updateCategory);

// delete category
router.delete("/api/categories/:id", deleteCategory);

////////////////////////// USER ////////////////////////////////
// get an user
router.get("/api/users/:email", showAUser);
router.get("/api/users/id/:id", showAUserById);

// delete user
router.delete("/api/users/:id", deleteUser);

// get all users
router.get("/api/users", allUsers);

// create account
router.post("/api/users/", createAccount);

// update user 
router.put("/api/users/:id", updateUser);

router.post('/api/users/login', loginUser);

////////////////////////// CART ////////////////////////////////
// add to cart
router.post("/api/cartItem", addItems);

// get a item in cart
router.get("/api/cartItem/:user_id/:food_id", getItem);

// get all items by user id
router.get("/api/cartItem/:id", allItems);

// update item qty
router.put("/api/cartItem/", updateItem);

// delete a item in cart
router.delete("/api/cartItem/:user_id/:food_id", deleteItem);

// delete all items in cart
router.delete("/api/cartItem/:id", deleteItems);



////////////////////////// Booking ////////////////////////////////
router.post("/api/booking", createBooking);



////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails", createBillDetails);
router.get("/api/billdetails/:id", getBillDetailsById);



////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/new", showNewestStatusId);
router.post("/api/billstatus", createBillStatus);
router.get("/api/billstatus/user/:id", getAllBillsByUser);
router.get("/api/billstatus/bill/:id", getAllBillsByBill);
router.get("/api/billstatus", getAllBills);
router.put("/api/billstatus/:id", updateBillStatus);
router.put("/api/billstatus/paid/:id", updateBillPaid);
router.put("/api/billstatus/cancel/:id", cancelBillStatus);



////////////////////////// ROLE ////////////////////////////////
// get all roles
router.get("/api/roles", allRoles);

// get single role
router.get("/api/roles/:id", showARole);
router.get("/api/roles/name/:name", showARoleName);

// create role
router.post("/api/roles", createRole);

// update role
router.put("/api/roles/:id", updateRole);

// delete role
router.delete("/api/roles/:id", deleteRole);

////////////////////////// AMOUNT TYPE ////////////////////////////////
// get all amount types
router.get("/api/amount_types", allAmountTypes);

// get single amount type
router.get("/api/amount_types/:id", showAAmountType);
router.get("/api/amount_types/name/:name", showAAmountTypeName);

// create amount type
router.post("/api/amount_types", createAmountType);

// update amount type 
router.put("/api/amount_types/:id", updateAmountType);

// delete amount type
router.delete("/api/amount_types/:id", deleteAmountType);


////////////////////////// INFO ////////////////////////////////
// get all infos
router.get("/api/infos", allInfos);

// get single info
router.get("/api/infos/:name", showAInfo);

// create info
router.post("/api/infos", createInfo);

// update info
router.put("/api/infos/:id", updateInfo);

// delete info
router.delete("/api/infos/:id", deleteInfo);

////////////////////////// SECTION ////////////////////////////////
// get all section
router.get("/api/sections", allSections);

// get single section
router.get("/api/sections/:id", showASection);
router.get("/api/sections/name/:name", showASectionName);

// create section
router.post("/api/sections", createSection);

// update section
router.put("/api/sections/:id", updateSection);

// delete section
router.delete("/api/section/s:id", deleteSection);


// export default router
export default router;








