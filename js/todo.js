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
  paintToDo(compltedTodo[0], "확인", "취소", completeList, resetTodo);
}

function resetTodo(event) {
  const thisItem = event.target.parentElement.parentElement.id;
  const compltedTodo = complete.filter(
    (complete) => complete.id === parseInt(thisItem)
  );
  toDos.push(compltedTodo[0]);
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  deleteToDo(event);
  paintToDo(compltedTodo[0], "❌", "⭕", toDoList, completeToDo);
}

function paintToDo(todo, btn1, btn2, list, btn2Click) {
  const li = document.createElement("li");
  li.id = todo.id;
  const span = document.createElement("span");
  span.innerText = todo.text;
  const buttons = document.createElement("span");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  button.innerText = btn1;
  button2.innerHTML = btn2;
  button.addEventListener("click", deleteToDo);
  button2.addEventListener("click", btn2Click);
  li.appendChild(span);
  li.appendChild(buttons);
  buttons.appendChild(button);
  buttons.appendChild(button2);
  list.appendChild(li);
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
  paintToDo(newTodoObj, "❌", "⭕", toDoList, completeToDo);
  saveToDos(toDos, TODOS_KEY);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//가져오기
const savedToDos = localStorage.getItem(TODOS_KEY);
const savedComplted = localStorage.getItem(COMPLETE_KEY);

const checkTodo = (todo, array) => {
  if (todo !== null) {
    array = JSON.parse(todo);
    if (todo === savedToDos) {
      array.forEach((todo) =>
        paintToDo(todo, "❌", "⭕", toDoList, completeToDo)
      );
    } else {
      array.forEach((todo) =>
        paintToDo(todo, "확인", "취소", completeList, resetTodo)
      );
    }
  }
};

checkTodo(savedToDos, toDos);
checkTodo(savedComplted, complete);
