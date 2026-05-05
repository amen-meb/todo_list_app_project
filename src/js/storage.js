import Project from "./project.js";
import Todo from "./todo.js";

export default class Storage {
    static saveTodoList(projects) {
        localStorage.setItem("todoAppData", JSON.stringify(projects));
    }

    static getTodoList() {
        const storedData = JSON.parse(localStorage.getItem("todoAppData"));
        if (storedData) {
            return storedData.map(projectData => {
                const project = new Project(projectData.name, projectData.id);
                project.todos = projectData.todos.map(todoData => {
                    const todo = new Todo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate,
                        todoData.priority,
                        todoData.id,
                        todoData.completed
                    );
                    return todo;
                });
                return project;
            });
        } else {
            return [];
        }
    }
}