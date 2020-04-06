import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: string[] = [];
  completedTodos: string[] = [];

  constructor(private todo: ToDoService) { }

  ngOnInit() {
    this.todo.currentTodo.subscribe(todo => this.todos = todo);
    this.todo.currentCompleted.subscribe(todo => this.completedTodos = todo);
  }

  onDelete(index: number) {
    this.todo.onDeleteTodo(index);
  }

  deleteCompleted(index: number) {
    this.todo.onDeleteCompleted(index);
  }

  onAddTodo(itemTitle) {
    if(itemTitle.value !== ""){
      this.todo.addTodo(itemTitle.value);
      itemTitle.value = "";
    }
  }

  completed(index: number) {
    this.todo.addCompletedTodo(index);
  }

  notCompleted(index: number) {
    this.todo.todos.push(this.todo.completed[index]);
    this.todo.completed.splice(index, 1);
  }
}
