const toDoForm = document.querySelector(".todo-form");
const title = document.querySelector(".input-title");
const startDate = document.querySelector(".start-datepicker");
const endDate = document.querySelector(".end-datepicker");
const description = document.querySelector(".description");

const TODOS_KEY = "todos";
const DONE_KEY = "done";

let toDos = [];
let done = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function saveDone() {
  localStorage.setItem(DONE_KEY, JSON.stringify(done));
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
		<input class="check" type="checkbox"/>
		<img src="static/img/trash.png" class="trash" />
	</div>
	`;
  element.appendChild(div);
  const checkedButton = div.querySelector(".check");
  checkedButton.addEventListener("change", handleTodoChange);
  const trashButton = div.querySelector(".trash");
  trashButton.addEventListener("click", (event) => {
    const removeConfirm = confirm("정말 삭제하시겠습니까?");
    if (removeConfirm) {
      handleTodoTrash(event);
    }
  });
}

function paintDone(doneTodo) {
  const element = document.querySelector(".done-list");
  const div = document.createElement("div");
  div.classList.add("item");
  div.id = doneTodo.id;
  div.innerHTML = `<div class="left-item">
    <h3 class="item-title">${doneTodo.title}</h3>
    <div class="item-date-container">
      <h5 class="item-date">시작  ${doneTodo.startDate}</h5>
      <h5 class="item-date">종료  ${doneTodo.endDate}</h5>
    </div>
  </div>
  <div class="right-item">
    <input class="check" type="checkbox" checked />
    <img src="static/img/trash.png" class="trash" />
  </div>`;
  element.appendChild(div);
  const checkedButton = div.querySelector(".check");
  checkedButton.addEventListener("change", handleDoneChange);
  const trashButton = div.querySelector(".trash");
  trashButton.addEventListener("click", (event) => {
    const removeConfirm = confirm("정말 삭제하시겠습니까?");
    if (removeConfirm) {
      handleDoneTrash(event);
    }
  });
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

function handleTodoChange(event) {
  event.preventDefault();
  const checkbox = event.target;
  const todoDiv = checkbox.closest(".item"); // 체크박스의 가장 가까운 조상 요소 중 클래스가 "item"인 요소
  const todoId = parseInt(todoDiv.id);
  const todoIndex = toDos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const doneTodo = toDos[todoIndex];
    doneTodo.isChecked = checkbox.checked;
    done.push(doneTodo);
    paintDone(doneTodo);
    saveDone();

    toDos.splice(todoIndex, 1);
    saveTodos();
    todoDiv.remove();
  }
}

function handleDoneChange(event) {
  event.preventDefault();
  const checkbox = event.target;
  const doneDiv = checkbox.closest(".item");
  const doneId = parseInt(doneDiv.id);
  const doneIndex = done.findIndex((doneTodo) => doneTodo.id === doneId);

  if (doneIndex !== -1) {
    const todo = done[doneIndex];
    todo.isChecked = checkbox.checked;
    toDos.push(todo);
    paintTodo(todo);
    saveTodos();

    done.splice(doneIndex, 1);
    saveDone();
    doneDiv.remove();
  }
}

function handleTodoTrash(event) {
  event.preventDefault();
  const button = event.target;
  const trashDiv = button.closest(".item");
  console.log(trashDiv);
  const trashId = parseInt(trashDiv.id);
  const todoIndex = toDos.findIndex((todo) => todo.id === trashId);

  if (todoIndex !== -1) {
    toDos.splice(todoIndex, 1);
    saveTodos();
    trashDiv.remove();
  }
}

function handleDoneTrash(event) {
  event.preventDefault();
  const button = event.target;
  const trashDiv = button.closest(".item");
  console.log(trashDiv);
  const trashId = parseInt(trashDiv.id);
  const doneIndex = done.findIndex((doneTodo) => doneTodo.id === trashId);

  if (doneIndex !== -1) {
    done.splice(doneIndex, 1);
    saveDone();
    trashDiv.remove();
  }
}

toDoForm.addEventListener("submit", handleTodoSubmit);

// 페이지 로드 시 기존 할 일과 완료된 할 일을 로드합니다.
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  if (savedTodos) {
    toDos = JSON.parse(savedTodos);
    toDos.forEach(paintTodo);
  }

  const savedDone = localStorage.getItem(DONE_KEY);
  if (savedDone) {
    done = JSON.parse(savedDone);
    done.forEach(paintDone);
  }
});
