const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const completeList = document.querySelector("#complete-list ul");

const TODOS_KEY = "todos";
const COMPLETE_KEY = "complete";

let toDos = [];
let complete = [];

function saveToDos(todo, key) {
  localStorage.setItem(key, JSON.stringify(todo));
}

function deleteToDo(event) {
  const li = event.target.parentElement.parentElement;
  li.parentElement.id === "todo-list"
    ? ((toDos = toDos.filter((todo) => todo.id !== parseInt(li.id))),
      saveToDos(toDos, TODOS_KEY))
    : ((complete = complete.filter(
        (complete) => complete.id !== parseInt(li.id)
      )),
      saveToDos(complete, COMPLETE_KEY));
  li.remove();
}

function completeToDo(event) {
  const thisItem = event.target.parentElement.parentElement.id;
  const compltedTodo = toDos.filter((toDo) => toDo.id === parseInt(thisItem));
  complete.push(compltedTodo[0]);
  localStorage.setItem(COMPLETE_KEY, JSON.stringify(complete));
  deleteToDo(event);
  paintToDo2(compltedTodo[0]);
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const buttons = document.createElement("span");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  button.innerText = "❌";
  button2.innerHTML = "⭕";
  button.addEventListener("click", deleteToDo);
  button2.addEventListener("click", completeToDo);
  li.appendChild(span);
  li.appendChild(buttons);
  buttons.appendChild(button);
  buttons.appendChild(button2);
  toDoList.appendChild(li);
}

function paintToDo2(getTodo) {
  const li = document.createElement("li");
  li.id = getTodo.id;
  const span = document.createElement("span");
  span.innerText = getTodo.text;
  const buttons = document.createElement("span");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  button.innerText = "❌";
  button2.innerHTML = "⭕";
  // button.addEventListener("click", completeToDo2);
  button2.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(buttons);
  buttons.appendChild(button);
  buttons.appendChild(button2);
  completeList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos(toDos, TODOS_KEY);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//가져오기
const savedToDos = localStorage.getItem(TODOS_KEY);
const savedComplted = localStorage.getItem(COMPLETE_KEY);

const checkTodo = (todo, arr, i) => {
  if (todo !== null) {
    const parsedToDos = JSON.parse(todo);
    arr = parsedToDos;
    parsedToDos.forEach(i);
  }
};

checkTodo(savedToDos, toDos, paintToDo);
checkTodo(savedComplted, complete, paintToDo2);
