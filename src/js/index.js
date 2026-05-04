import "../css/style.css";
import { renderProjects, renderTodos, selectProject } from "./dom.js";
import { createProject, addProject } from "./project.js";
import { createTodo, addTodo, updateTodo, clearCompletedTodos } from "./todo.js";
import { saveData, loadData } from "./storage.js";