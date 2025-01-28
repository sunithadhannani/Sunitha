const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks(tasks);
};
const displayTasks = (tasks) => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "<h2>Your Tasks</h2>";
    if (tasks.length === 0) {
        taskList.innerHTML += "<p>No tasks found. Add a task to get started!</p>";
        return;
    }
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <div>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
};
const addTask = (title) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};
const deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
};
const editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks[index];
    document.getElementById("title").value = task.title;
    deleteTask(index);
};
document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    const title = document.getElementById("title").value.trim();

    if (title) {
        addTask(title);
        document.getElementById("taskForm").reset();
    } else {
        alert("Task title is required!");
    }
});
localStorage.setItem("FirstName","Sunitha");
localStorage.setItem("LastName","Dhannani");
console.log(localStorage.getItem("FirstName"));
loadTasks();
