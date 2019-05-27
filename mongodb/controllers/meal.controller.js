const Meal = require('../models/meal.model');

const test = (req, res) => {
    res.send("Just for testing");
}

const renderViewForm = (req, res) => {
    res.render('addnew');
}

const getAllMeals = (req, res) => {
    Meal.find({}, (err, meals) => {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {
            res.render('list', { data: meals });
        }
    })
}


const getMeal = (req, res) => {
    const id = req.params.id;
    Meal.findById(id,(err,meal)=>{
        if(err){
            console.log(err);
            res.send("ERROR");
        }
        else{
            res.render('mealdetail',{data : meal});
        }
    })
}

const updateMeal = (req,res)=>{
    // Meal.findByIdAndRemove(req.params.id,(err,item)=>{
    //     console.log(err);
    //     console.log(item);
    //     res.send("Deleted item");
    // })
    Meal.findByIdAndUpdate(req.params.id, { $set : {
        name : req.body.name,
        price : req.body.price
    }},(err,meal)=>{
        if(err){
            console.log(err);
            res.send("ERROR");
        }
        else{
            console.log(meal);
            res.redirect('/meals/getAll');
            //res.send("Successfully updated");
        }
    })

}

const saveMeal = (req, res) => {
    console.log(req.body);

    const meal = new Meal({
        name: req.body.name,
        price: req.body.price
    })

    meal.save(function (err) {
        if (err) {
            console.log(err);
            res.send("Error");

        }
        else {
            res.send("Meal created");
        }

    })
}

module.exports = { test, renderViewForm, saveMeal, getAllMeals, getMeal , updateMeal }
