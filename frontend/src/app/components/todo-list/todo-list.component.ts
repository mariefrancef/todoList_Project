import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../../../../src/models/todoModels';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (todos) => {
        console.log(todos);
        this.todoList = todos;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: text.trim(),
        description: text.trim(),
        completed: false,
      };

      this.todoService.addTodo(newTodoItem).subscribe((todo) => {
        this.todoList.push(todo);
      });
    }
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    });
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find((item) => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.todoService.updateTodo(id, todoItem).subscribe();
    }
  }
}
