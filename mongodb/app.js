const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));
app.use('/meals', require('./routes/meals'));


const uri = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => { console.log(error, "Mongoose error") });

app.listen(3000);