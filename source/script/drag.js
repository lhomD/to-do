export { dragStarted, dragEnded };
import { wrapper } from "./script.js";
let taskContainer = document.getElementById("task-container")

/* Runs when drag starts */
function dragStarted(e) {
  taskContainer.addEventListener("dragover", dropZone);
  taskContainer.addEventListener("dragleave", dropZone);
  taskContainer.addEventListener("drop", dropZone);
  this.classList.add("drag");
  /* Touch Screen */
  /* if (e.type == "touchstart") {
    wrapper.classList.add("no-scroll");

  } */
} // End dragStarted


/* Runs dragend starts */
function dragEnded(e) {
  this.classList.remove("drag");
  /* if (e.type == "touchend") {
    wrapper.classList.remove("no-scroll");
  } */
} // End dragEnded

/* Three functions runs depending on conditions */
function dropZone(e) {
  e.preventDefault();
  if (e.type == "dragover") {
    this.style.opacity = "0.7";
  } else if (e.type == "dragleave") {
    this.style.opacity = "1";
  } else if (e.type == "drop") {
    console.log(drop)
    this.style.opacity = "1";
    let afterElem = getDragedElementAfter(taskContainer, e.clientY);
    const dragingElem = document.querySelector('.drag')
    if (afterElem == null) {
      taskContainer.appendChild(draggable)
    } else {
      taskContainer.insertBefore(dragingElem, afterElem)
    }
  }
} // End dropZone
/* Helper function to get data about where to place dragged element */
function getDragedElementAfter(container, position) {
  let dragedElem = [...container.querySelectorAll(".task-container-task:not(.drag)")];

  return dragedElem.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = position - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
} // End getDragedElementAfter