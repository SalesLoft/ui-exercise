import { BehaviorSubject } from "rxjs";

export class ToDoService {

    todos: string[] = [
        'šetaj deu',
        'kopiraj mailove',
        'odmor'
    ]

    completed: string[] = [];

    private todoList = new BehaviorSubject<string[]>(this.todos);
    currentTodo = this.todoList.asObservable();

    private completedList = new BehaviorSubject<string[]>(this.completed);
    currentCompleted = this.completedList.asObservable();

    onDeleteTodo(index: number) {
        this.todos.splice(index, 1);
    }

    addTodo(item: string) {
        this.todos.push(item);
    }

    addCompletedTodo(index: number) {
        this.completed.push(this.todos[index])
        this.todos.splice(index, 1);
    }

    onDeleteCompleted(index: number) {
        this.completed.splice(index, 1);
    }
}