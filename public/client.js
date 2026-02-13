let socket = null;
let joined = false;

const $ = (id) => document.getElementById(id);
const nameInput = $("name");
const btnJoin = $("btnJoin");
const status = $("status");
const messages = $("messages");
const form = $("form");
const textInput = $("text");

function addLine(html, cls = "") {
  const div = document.createElement("div");
  div.className = `msg ${cls}`.trim();
  div.innerHTML = html;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

btnJoin.addEventListener("click", () => {
  if (joined) return;

  const name = nameInput.value.trim();
  if (!name) {
    alert("Pon tu nombre antes de entrar.");
    return;
  }

  socket = io(); // conecta al servidor
  joined = true;

  status.textContent = "Conectado";
  status.classList.add("ok");
  addLine(`Entraste como <b>${name}</b>`, "system");

  socket.on("chat:message", (p) => {
    // p: {name,text,time}
    addLine(`<span class="time">[${p.time}]</span> <b>${p.name}:</b> ${escapeHtml(p.text)}`);
  });

  socket.on("system", (msg) => {
    addLine(`${escapeHtml(msg)}`, "system");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!joined || !socket) {
    alert("Primero entra al chat.");
    return;
  }

  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!text) return;

  socket.emit("chat:message", { name, text, time: nowTime() });
  textInput.value = "";
  textInput.focus();
});

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}
