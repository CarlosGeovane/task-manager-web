const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

// Carrega as tarefas do localStorage ou inicia vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  // Controle do "Empty State" (Hero Section)
  if (tasks.length > 0) {
    emptyState.classList.add("hidden");
  } else {
    emptyState.classList.remove("hidden");
  }

  // Renderiza cada tarefa
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;"; // Ícone de fechar (x)
    deleteBtn.onclick = () => removeTask(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskValue = input.value.trim();

  if (taskValue === "") return;

  tasks.push(taskValue);
  saveAndRender();
  input.value = "";
  input.focus();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Eventos
addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Execução inicial
renderTasks();

document.getElementById("year").textContent = new Date().getFullYear();

