const socket = io();
const messageInp = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const allMessages = document.getElementById('messages');

socket.on('message', (message) => {
   const p = document.createElement("p");
   p.innerHTML += `${message}<br>`;
   p.classList.add('para', 'incoming')
   allMessages.appendChild(p);
});

sendBtn.addEventListener('click', () => {
  if(messageInp.value){
   const message = messageInp.value;
   const p = document.createElement("p");
   p.innerHTML += `${message}<br>`;
   p.classList.add('para', 'outgoing');
   allMessages.appendChild(p);
   socket.emit('user-message', message);
   messageInp.value = "";
  }
});

messageInp.addEventListener('keydown', (event) => {
   if (event.key === 'Enter' && messageInp.value) {
      const message = messageInp.value;
      const p = document.createElement("p");
      p.innerHTML += `${message}<br>`;
      p.classList.add('para', 'outgoing');
      allMessages.appendChild(p);
      socket.emit('user-message', message);
      messageInp.value = "";
   }
});
