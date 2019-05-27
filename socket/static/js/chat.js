const socket = io("http://localhost:3000");

document.querySelector("form").addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.querySelector("#m").value;
    const user = Math.random();
    socket.emit('chat-message', { message, user});
    document.querySelector("#m").value = "";
})

socket.on('chat-message-server', (obj) => {        
    console.log(obj.user + "is sending a message");
    document.querySelector("#messages").innerHTML += `<li>${obj.user} : ${obj.message}</li>`;
})