// Get references to DOM elements
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

// Initialize tasks array
let tasks = [];

// Check if tasks are stored in localStorage and load them
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

//Add a new task to the tasks array.
function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("Input field empty!");
    return;
  }

  // Create a new task object
  const task = {
    text: taskText,
    done: false,
  };

  // Add the task to the tasks array
  tasks.push(task);

  // Render the updated task list
  renderTasks();

  // Clear the input box
  inputBox.value = "";

  // Store the updated tasks in localStorage
  saveTasksToLocalStorage();
}

/**
 * Enable task text editing.
 * @param {number} index - Index of the task to be edited.
 */
function editTask(index) {
  const listItem = taskList.children[index];
  const taskText = listItem.querySelector(".task-text");

  // Make the task text element editable
  taskText.contentEditable = true;
  taskText.focus();

  // Hide the Edit button
  const editButton = listItem.querySelector(".edit-button");
  editButton.style.display = "none";

  // Show the Save button
  const saveButton = listItem.querySelector(".save-button");
  saveButton.style.display = "inline-block"; // Show the Save button
}

/**
 * Save the edited task text and update the task list.
 * @param {number} index - Index of the edited task.
 */
function saveTask(index) {
  const listItem = taskList.children[index];
  const taskText = listItem.querySelector(".task-text");

  // Disable task text editing
  taskText.contentEditable = false;

  // Update the task text in the tasks array
  tasks[index].text = taskText.innerText;

  // Render the updated task list
  renderTasks();

  // Store the updated tasks in localStorage
  saveTasksToLocalStorage();
}

/**
 * Delete a task from the tasks array.
 * @param {number} index - Index of the task to be deleted.
 */
function deleteTask(index) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);

  // Render the updated task list
  renderTasks();

  // Store the updated tasks in localStorage
  saveTasksToLocalStorage();
}

/**
 * Toggle the "done" status of a task in the tasks array.
 * @param {number} index - Index of the task to be toggled.
 */

function toggleTaskDone(index) {
  // Toggle the "done" status of the task
  tasks[index].done = !tasks[index].done;

  // Render the updated task list
  renderTasks();

  // Store the updated tasks in localStorage
  saveTasksToLocalStorage();
}

/**
 * Render the task list based on the current tasks array.
 */
function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const listItem = document.createElement("li");

    if (task.done) {
      listItem.classList.add("done");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.style.transform = "scale(1.5)";
    checkbox.addEventListener("change", function () {
      toggleTaskDone(i);
    });

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.classList.add("task-text");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    // Check if the task is done, and hide the "Edit" button accordingly
      if (task.done) {
        editButton.style.display = "none";
      }
    editButton.addEventListener("click", function () {
      editTask(i); 
      // Hide the Edit button on click
      editButton.style.display = "none";
    });

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    // Add save-button-hidden class to hide it
    saveButton.classList.add("save-button", "save-button-hidden"); 
    saveButton.addEventListener("click", function () {
      saveTask(i);
    });

    const deleteButton = document.createElement("button-delete");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(i);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(saveButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  }
}

/**
 * Save the current tasks array to localStorage.
 */
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render the initial task list
renderTasks();
