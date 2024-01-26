export { dragStarted, dragEnded };
import { setCookies } from "./script.js";
let taskContainer = document.getElementById("task-container")

/* Runs when drag starts */
function dragStarted(e) {
  let eachTaskText = document.querySelectorAll(".task-container-task_added");
  eachTaskText.forEach(eachTask => {
    eachTask.addEventListener("dragover", dropZone);
    eachTask.addEventListener("dragleave", dropZone);
    eachTask.addEventListener("drop", dropZone);
  });
  this.classList.add("drag");
} // End dragStarted

/* Runs dragend starts */
function dragEnded() {
  this.classList.remove("drag");
} // End dragEnded

/* Three functions runs depending on conditions */
function dropZone(e) {
  e.preventDefault();
  if (e.type == "dragover") {
    this.style.opacity = "0.5";
  } else if (e.type == "dragleave") {
    this.style.opacity = "1";
  } else if (e.type == "drop") {
    this.style.opacity = "1";
    let afterElem = getDragedElementAfter(taskContainer, e.clientY);
    const dragingElem = document.querySelector('.drag')
    if (afterElem == null) {
      taskContainer.appendChild(draggable)
    } else {
      taskContainer.insertBefore(dragingElem, afterElem)
    }
    setCookies();
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