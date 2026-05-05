import Todo from './todo.js';
import Project from './project.js';
import Storage from './storage.js';
import { elements, renderProjects, renderTasks } from './dom.js';
import '../css/style.css'; 

let projects = Storage.getTodoList();
let currentProjectId = projects.length > 0 ? projects[0].id : null;

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
    if (modal && typeof modal.close === 'function') {
        modal.close();
    } else if (modal) {
        modal.classList.remove('open');
    }
}

// set up Event Listeners
function setupEventListeners() {
    // Theme Toggle
    elements.themeBtn.addEventListener('click', toggleTheme);



    
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


// Start App
init(); 