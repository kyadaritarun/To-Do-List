
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function addTask() {
    if (inputBox.value === '') {   // when box is empty it show
        alert("You must write something!");
    } else {                        // adding input in box
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Create delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Delete icon
        li.appendChild(span);

        // Create edit button
        let editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = "Edit";
        li.appendChild(editBtn);

        listContainer.appendChild(li);
    }
    inputBox.value = " ";
    saveData();
}

// Event listener for delete, edit, and checking/unchecking tasks
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {                     // when we click on li it will checked
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {             // delete the li using span
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.className === "edit-btn") {
        const task = e.target.parentElement;
        const taskText = task.firstChild.textContent.trim();

        // Prompt user to edit the task
        const newText = prompt("Edit task:", taskText);
        if (newText !== null && newText.trim() !== "") {
            task.firstChild.textContent = newText.trim(); // Update the task text
            saveData();
        }
    }
}, false);

// Save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Reload tasks on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
