const express = require('express');

const router = express.Router();

const mealController = require('../controllers/meal.controller')

router.get("/", mealController.test);

router.get("/addnew", mealController.renderViewForm)

router.post("/save", mealController.saveMeal)

module.exports = router;