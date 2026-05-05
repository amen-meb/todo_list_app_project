import Todo from './todo.js';
import Project from './project.js';
import Storage from './storage.js';
import { elements, renderProjects, renderTasks } from './dom.js';
import '../css/style.css'; 

let projects = Storage.getTodoList();
let currentProjectId = projects.length > 0 ? projects[0].id : null;
let editingTodoId = null;

// Initialization
function init() {
    // Setup default project if storage is empty
    if (projects.length === 0) {
        const defaultProject = new Project('Inbox');
        projects.push(defaultProject);
        currentProjectId = defaultProject.id;
    }
    
    initTheme();
    saveAndRender();
    setupEventListeners();
}

// Apply saved state and render
function saveAndRender() {
    Storage.saveTodoList(projects);
    renderProjects(projects, currentProjectId);
    const currentProject = projects.find(p => p.id === currentProjectId);
    renderTasks(currentProject);
}

// open and close modal functions 
function openModal(modal) {
    if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
    } else if (modal) {
        modal.classList.add('open');
    }
}

function closeModal(modal) {
    if (modal && typeof modal.close === "function") {
        modal.close();
    } else if (modal) {
        modal.classList.remove('open');
    }
}

// set up Event Listeners
function setupEventListeners() {
    // Theme Toggle
    elements.themeBtn.addEventListener('click', toggleTheme);

    // selecting project
    elements.projectList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            currentProjectId = e.target.dataset.id;
            saveAndRender();
        }
    });

    // Adding new project
    elements.addProjectBtn.addEventListener('click', () => {
        const projectName = prompt("Enter project name:");
        if (projectName) {
            const newProject = new Project(projectName);
            projects.push(newProject);
            currentProjectId = newProject.id;
            saveAndRender();
        }
    });

    // Deleting current project
    elements.deleteProjectBtn.addEventListener('click', () => {
        if (projects.length <= 1) {
            alert('Cannot delete the last project.');
            return;
        }
        const currentProjectIndex = projects.findIndex(p => p.id === currentProjectId);
        if (currentProjectIndex !== -1) {
            projects.splice(currentProjectIndex, 1);
            currentProjectId = projects.length > 0 ? projects[0].id : null;
            saveAndRender();
        }
    });
    
    // open and close modal for adding new task
    elements.addTaskBtn.addEventListener('click', () => {
        editingTodoId = null;
        elements.todoForm.reset();
        if (elements.todoModalTitle) {
            elements.todoModalTitle.textContent = 'New Task';
        }
        openModal(elements.todoModal);
    });

    elements.btnCloseModal.addEventListener('click', () => {
        editingTodoId = null;
        if (elements.todoModalTitle) {
            elements.todoModalTitle.textContent = 'Task Details';
        }
        closeModal(elements.todoModal);
    });

    // Handle task form submission
    elements.todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('desc').value;
        const dueDate = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        if (!title) {
            alert('Task title is required.');
            return;
        }

        const currentProject = projects.find(p => p.id === currentProjectId);
        if (!currentProject) {
            alert('Unable to find the current project.');
            return;
        }

        if (editingTodoId) {
            const todo = currentProject.getTodo(editingTodoId);
            if (todo) {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority;
            }
            editingTodoId = null;
        } else {
            const newTodo = new Todo(title, description, dueDate, priority);
            currentProject.addTodo(newTodo);
        }

        if (elements.todoModalTitle) {
            elements.todoModalTitle.textContent = 'Task Details';
        }
        saveAndRender();
        closeModal(elements.todoModal);
    });

    // 6. Complete/Delete/edit Task Actions
    elements.taskList.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button || !elements.taskList.contains(button)) return;

        const id = button.dataset.id;
        if (!id) return;

        const currentProject = projects.find(p => p.id === currentProjectId);
        if (!currentProject) return;

        const todo = currentProject.getTodo(id);
        if (!todo) return;

        if (button.classList.contains('btn-toggle')) {
            todo.toggleComplete();
            saveAndRender();
            return;
        }

        if (button.classList.contains('btn-edit')) {
            editingTodoId = id;
            document.getElementById('title').value = todo.title;
            document.getElementById('desc').value = todo.description;
            document.getElementById('date').value = todo.dueDate;
            document.getElementById('priority').value = todo.priority;
            if (elements.todoModalTitle) {
                elements.todoModalTitle.textContent = 'Edit Task';
            }
            openModal(elements.todoModal);
            return;
        }

        if (button.classList.contains('btn-delete')) {
            currentProject.removeTodo(id);
            saveAndRender();
        }
    });
}

// Theme functions 
function initTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        elements.themeBtn.textContent = "☀️ Light Mode";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem('darkMode', isDarkMode);
    elements.themeBtn.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
}


// Start App
init(); 