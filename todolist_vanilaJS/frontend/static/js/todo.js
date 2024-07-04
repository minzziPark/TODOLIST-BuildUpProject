const toDoForm = document.querySelector(".todo-form");
console.log(modal);
const title = document.querySelector(".input-title");
const startDate = document.querySelector(".start-datepicker");
console.log(startDate);
const endDate = document.querySelector(".end-datepicker");
console.log(endDate);
const description = document.querySelector(".description");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintTodo(newTodo) {
  const element = document.querySelector(".todo-list");
  const div = document.createElement("div");
  div.classList.add("item");
  div.id = newTodo.id;
  div.innerHTML = `<div class="left-item">
		<h3 class="item-title">${newTodo.title}</h3>
		<div class="item-date-container">
		<h5 class="item-date">시작  ${newTodo.startDate}</h5>
		<h5 class="item-date">종료  ${newTodo.endDate}</h5>
		</div>
	</div>
	<div class="right-item">
	<input type="checkbox"/>
	<img src="static/img/trash.png" class="trash" />
	</div>
	`;
  element.appendChild(div);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  modal.classList.toggle("hidden");
  console.log(title);
  const newTodoObj = {
    id: Date.now(),
    title: title.value,
    startDate: startDate.value,
    endDate: endDate.value,
    description: description.value,
    isChecked: false,
  };
  title.value = "";
  startDate.value = "";
  endDate.value = "";
  description.value = "";

  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
  console.log(toDos);
}

toDoForm.addEventListener("submit", handleTodoSubmit);
