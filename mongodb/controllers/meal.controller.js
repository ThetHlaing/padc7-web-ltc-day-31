const Meal = require('../models/meal.model');

const test = (req, res) => {
    res.send("Just for testing");
}

const renderViewForm = (req, res) => {
    res.render('addnew');
}

const saveMeal = (req, res) => {
    console.log(req.body);

    const meal = new Meal({
        name: "Test meal",
        price: 4000
    })

    meal.save(function (err) {
        if (err) {
            console.log(err);
            res.send("Error");

        }
        res.send("Meal created");
    })
}

module.exports = { test, renderViewForm, saveMeal }
