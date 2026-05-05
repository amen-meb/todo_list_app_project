export default class Todo {
    constructor(title, description, dueDate, priority, id = null, completed = false) {
        this.id = id || Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}