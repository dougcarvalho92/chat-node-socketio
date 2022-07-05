const socket = io();
const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");
const header = document.getElementById("username");
header.innerHTML = `Olá, ${username} - Você está na sala ${room}`;

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => createMessageDiv(message));
  }
);

document.getElementById("message").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const message = event.target.value;
    const data = {
      room,
      message,
      username,
    };
    socket.emit("message", data);
    event.target.value = "";
  }
});
socket.on("message", (data) => {
  createMessageDiv(data);
});

function createMessageDiv(data) {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `
 <li>
 <div id="text">
   <h3 id="username">${data.username}:</h3><span>${data.text}</span>
 </div>
 <span>${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
</li>`;
}

document.getElementById("logout").addEventListener("click", () => {
  window.location.href = "/";
});
