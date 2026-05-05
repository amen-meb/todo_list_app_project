export const elements = {
    themeBtn: document.getElementById("theme-btn"),
    projectList: document.getElementById("project-list"),
    taskList: document.getElementById("task-list"),
    addProjectBtn: document.getElementById("add-project-btn"),
    addTaskBtn: document.getElementById("add-task-btn"),
    currentProjectTitle: document.getElementById("current-project-title"),
    todoModal: document.getElementById("todo-modal"),
    todoForm: document.getElementById("todo-form"),
    btnCloseModal: document.getElementById("btn-close-modal")
};

export function renderProjects(projects, currentProjectId) {
    elements.projectList.innerHTML = "";
    projects.forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectItem.dataset.id = project.id;
        if (project.id === currentProjectId) {
            projectItem.classList.add("active");
            elements.currentProjectTitle.textContent = project.name;
        }
        elements.projectList.appendChild(projectItem);
    });
}

export function renderTasks(project) {
    elements.taskList.innerHTML = "";
    if (!project) return;

    project.todos.forEach(todo => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("task-item", todo.priority);
        if (todo.completed) todoItem.style.opacity = "0.6";

        todoItem.innerHTML = `
            <div class="task-info">
                    <h3 style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.title}</h3>
                    <p class="date">Due: ${todo.dueDate}</p>
                    ${todo.description ? `<p class="desc" style="display:block; margin-top:5px; font-size: 0.9em; opacity: 0.8">${todo.description}</p>` : ''}
                </div>
                <div class="task-actions">
                    <button class="btn btn-toggle" data-id="${todo.id}">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="btn btn-danger btn-delete" data-id="${todo.id}">Delete</button>
                </div>
            `;
        elements.taskList.appendChild(todoItem);
    });
}
   