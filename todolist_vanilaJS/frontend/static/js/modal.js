const openButton = document.querySelector(".todo-post");
console.log(openButton);
const modal = document.querySelector(".modal");
// const closeButton = modal.querySelector("button");
const modalBackground = modal.querySelector(".modal-background");

function displayModal() {
  modal.classList.toggle("hidden");
}

openButton.addEventListener("click", displayModal);
// closeButton.addEventListener("click", displayModal);
modalBackground.addEventListener("click", displayModal);
