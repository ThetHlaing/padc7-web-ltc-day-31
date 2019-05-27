const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const NewSchema = new Schema({
   message : {type : String, required : true},
   from : {type : String, required : true}
});

module.exports =  mongoose.model('Message',NewSchema)
