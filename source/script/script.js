export { setCookies };
import { dragStarted, dragEnded } from "./drag.js";
let wrapper;            //Referense to wrapper to change color theme
let checkmarkActive;    //Referens to the input field
let formValue;          //Referense Input value to add
let removeTaskBtn;      //Referense to each cross
let buttonsToSort;      //Referense to the buttons to sort task
let createTask;         //Referense to each task

/* Init Function */
function init() {
  let themeChangeBtn = document.getElementById("themeChange");
  themeChangeBtn.addEventListener("click", changeTheme);

  let addTaskInput = document.getElementById("addTaskInput");
  addTaskInput.addEventListener("focus", activeInput);
  addTaskInput.addEventListener("blur", notActiveInput);

  checkmarkActive = document.querySelector(".input-checkmark");

  formValue = document.getElementById("form");
  formValue.addEventListener("submit", addNewTask)

  buttonsToSort = document.querySelectorAll(".tasks-counter-buttons input")
  buttonsToSort.forEach(button => {
    button.addEventListener("click", sortTasks)
  });
  getThemeCookie();
  getCookies();
} //End init
window.addEventListener("load", init);

/* Theme cookies */
function getThemeCookie() {
  let savedTheme = localStorage.savedTheme;
  wrapper = document.querySelector(".wrapper");

  if (savedTheme !== "" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    wrapper.classList.add("dark")
  }

} //End getThemCookie

/* Function to change theme */
function changeTheme() {
  wrapper.classList.toggle("dark");
  if (wrapper.classList.contains("dark")) {
    localStorage.savedTheme = "dark";
  } else {
    localStorage.savedTheme = "";
  }
} //End changeTheme

/* Function while input field is active */
function activeInput() {
  checkmarkActive.classList.add("inputActive");
} //End activeInput

/* Function while input field is active */
function notActiveInput() {
  checkmarkActive.classList.remove("inputActive");
} //End activeInput

/* New task submitted */
function addNewTask(e) {
  e.preventDefault();
  let emptyClass = "";    //Adding empty class to use same function in the future
  let newTaskToAdd = document.getElementById("addTaskInput");
  if (newTaskToAdd.value == "") {
    return;
  } else {
    createNewTask(newTaskToAdd.value, emptyClass);
    newTaskToAdd.value = "";
  }
  setCookies();
}// End addNewTask

/* Check if task is done */
function taskToCheck() {
  this.classList.toggle("taskDone",);
  this.classList.toggle("notDone",);
  setCookies();
} //End taskToCheck

/* Function to count all task */
function allTasksCounter() {
  let singelTask = document.querySelectorAll(".task-container-task");
  let totalTask = document.getElementById("totalTask"); //Referense to all tasks counter
  totalTask.innerHTML = singelTask.length

  let clearTasks = document.getElementById("clearCompleated");
  clearTasks.addEventListener("click", removeTask);

  removeTaskBtn = document.querySelectorAll(".task-container-task-remove");
  removeTaskBtn.forEach((remove) => {
    remove.addEventListener("click", removeThisTask)
  })

  singelTask.forEach(task => {
    task.addEventListener("dragstart", dragStarted);
    task.addEventListener("dragend", dragEnded);
    /* Touch Screen */
  });
} //End allTasksCounter

/* Function to remove compleated Task */
function removeTask() {
  let compleatedTask = document.querySelectorAll(".taskDone");
  compleatedTask.forEach(checkedTask => {
    checkedTask.remove();
  })
  allTasksCounter();
  setCookies();
} //End clearCompleated

/* Remove choosen task from the list */
function removeThisTask(e) {
  this.parentNode.remove();
  allTasksCounter();
} //End removeThisTask

/* Create new task div */
function createNewTask(value, arg) {
  let taskContainer = document.getElementById("task-container");
  createTask = document.createElement("div");
  createTask.classList.add("task-container-task", arg ? arg : "notDone");
  createTask.draggable = "true";
  createTask.innerHTML = `
      <div class="task-container-task-checkbox">
        <input type="radio" name="adding">
        <span class="task-container-task-checkbox_check"></span>
      </div>
      <p class="task-container-task_added">${value}</p>
      <button class="task-container-task-remove">
        <img src="./source/img/icon-cross.svg" alt="Cross icon">
      </button>
  `
  createTask.addEventListener("click", taskToCheck);
  taskContainer.prepend(createTask)
  allTasksCounter();
} //End createNewTask

/* Create tasks to the localstorege */
function setCookies() {
  let tasksToSave = [];
  let createdTasks = document.querySelectorAll(".task-container-task");
  createdTasks.forEach((singelTask) => {
    tasksToSave += (singelTask.classList[1] + ":" + singelTask.childNodes[3].innerHTML + ";")
  })

  localStorage.savedTasks = tasksToSave;
  tasksToSave = "";
} //End setCookies

/* Get task from localstorage */
function getCookies() {
  let taskDataStored = localStorage.savedTasks;
  if (taskDataStored.length == 0) {
    return;
  }

  let eachTask = taskDataStored.split(";").slice(0, -1).reverse(); //Split the string to array and remove last array which becames empty array
  eachTask.forEach((taskToPublish) => {
    taskToPublish = taskToPublish.split(":")
    let taskToDo = taskToPublish[1];
    let taskClass = taskToPublish[0];
    createNewTask(taskToDo, taskClass);
  });
} //End getCookies

/* Sort tasks on the list */
function sortTasks() {
  buttonsToSort.forEach(button => {
    button.classList.remove("active");
  })

  createTask = document.querySelectorAll(".task-container-task")
  this.classList.add("active");
  let statusAtr = this.getAttribute("data-status");

  sortedTasks(statusAtr);
} //End of sortTasks

/* Function to sort and show tasks */
function sortedTasks(statusAtr) {
  let hideTask = document.querySelectorAll(".taskDone");
  let showTask = document.querySelectorAll(".notDone")

  if (statusAtr == "notDone") {
    hideTask.forEach(hidden => {
      hidden.style.display = "none"
    });
    showTask.forEach(shown => {
      shown.style.display = "flex"
    })
  } else if (statusAtr == "taskDone") {
    hideTask.forEach(hidden => {
      hidden.style.display = "flex"
    });
    showTask.forEach(shown => {
      shown.style.display = "none"
    })
  } else {
    hideTask.forEach(hidden => {
      hidden.style.display = "flex"
    });
    showTask.forEach(shown => {
      shown.style.display = "flex"
    })
  }
} //End sortedTasks