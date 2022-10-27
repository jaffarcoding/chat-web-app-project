// importing server in clients 
const socket = io()

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    textarea.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
const from = document.getElementById('send-container');
from.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const messageInput = document.getElementById('messageInp');
let textarea =  document.querySelector(".container")
const names =  prompt("ente rthe name");
socket.emit('new-user-joined', names);
var audio = new Audio('ting.mp3.mp3');
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left');
});  

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left' , data =>{
    append(`${data.name} left the chat`, 'left')
})