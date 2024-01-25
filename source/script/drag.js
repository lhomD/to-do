export { dragStarted, dragEnded };
import { setCookies } from "./script.js";
let dragElem;
let oldTask;
/* Runs when drag starts */
function dragStarted(e) {
  let eachTaskText = document.querySelectorAll(".task-container-task_added");
  eachTaskText.forEach(eachTask => {
    eachTask.addEventListener("dragover", dropZone);
    eachTask.addEventListener("dragleave", dropZone);
    eachTask.addEventListener("drop", dropZone);
  });

  dragElem = this;
} // End dragStarted

/* Runs dragend starts */
function dragEnded() {
  dragElem.innerHTML = oldTask;
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
    oldTask = this.innerHTML;
    this.innerHTML = "";
    this.innerHTML = dragElem.innerHTML;
    setCookies();
  }
} // End dropZone
// End getDragedElementAfter