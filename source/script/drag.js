export { dragStarted, dragEnded }
let taskContainer = document.getElementById("tasks")


/*  */
function dragStarted(e) {
  taskContainer.addEventListener("dragover", dropZone);
  taskContainer.addEventListener("dragleave", dropZone);
  taskContainer.addEventListener("drop", dropZone);
  e.dataTransfer.setData("text/plain", e.target.outerHTML);
  this.classList.add("drag");
} //


/*  */
function dragEnded() {
  console.log("Drag End")
  this.classList.remove("drag");
} //

/*  */
function dropZone(e) {
  e.preventDefault();
  console.log(e.dataTransfer.getData("text"))
} //