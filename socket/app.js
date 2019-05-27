const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const MessageModel = require('./models/ChatMessage');

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "static")));

const http = require('http').createServer(app);

const io = require('socket.io')(http);

io.on("connection", (socket) => {
    console.log("A connection is opened");

    socket.on('chat-message', (obj) => {
        console.log(obj.from,obj.message," received");  
        
        const message =  MessageModel({
            message : obj.message,
            from : obj.user
        });
        
        message.save(err=>{
            if(err){
                console.log(err);                
            }
            else{
                io.emit('chat-message-server',obj);
            }
        });        
        
    })

    socket.on('disconnect', function () {
        console.log("A connection is removed");
    })
})

const uri = 'mongodb://127.0.0.1:27017/chatmessage';

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => { console.log(error, "Mongoose error") });

app.get("/", (req, res) => {
    res.render('chat-view');
})


http.listen(3000);

