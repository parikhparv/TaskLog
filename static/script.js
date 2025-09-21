// Declare constant variables input, task list container, and counters
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("complete-counter");
const uncompletedCounter = document.getElementById("incomplete-counter");

// Function to add a new task
function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Create a new <li> element for the task
  const li = document.createElement("li");

  // Add inner HTML for the task: checkbox, task text, edit, and delete buttons
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  // Get reference to the checkbox, edit button, task text, and delete buttons
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // Handle task completion
  checkbox.addEventListener("click", function () {
    // Add/remove "complete" class depending on checkbox state
    taskSpan.classList.toggle("complete", checkbox.checked);
    updateCounters();
  });

  // Handle editing a task
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      // Update the text with new value
      taskSpan.textContent = update;
      // Reset completion styling and uncheck box after editing
      taskSpan.classList.remove("complete");
      checkbox.checked = false;
    updateCounters();
    }
  });

  // Handle deleting a task
  deleteBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete this task?")) {
    li.remove(); // Remove the task element
    updateCounters();
  }
  });

  // Add the new task to the list, clear input box, and update counters
  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters();
}

// Function to update counters for completed/uncompleted tasks
function updateCounters() {
  const completedTasks = listContainer.querySelectorAll("span.complete").length;
  const totalTasks = listContainer.querySelectorAll("li").length;
  const uncompletedTasks = totalTasks - completedTasks;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}
