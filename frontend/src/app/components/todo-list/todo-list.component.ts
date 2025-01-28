import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../../../../src/models/todoModels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFilterComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  todoTitle: string = '';
  todoDescription: string = '';

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

  addTask(title: string, description: string): void {
    if (title.trim() !== '' && description.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        isEditing: false,
      };

      this.todoService.addTodo(newTodoItem).subscribe((todo) => {
        this.todoList.push(todo);
        this.todoTitle = '';
        this.todoDescription = '';
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
  editTask(todoItem: Todo): void {
    todoItem.isEditing = true;
  }

  // Méthode pour sauvegarder les modifications
  saveTask(todoItem: Todo): void {
    if (todoItem.title.trim() !== '' && todoItem.description.trim() !== '') {
      this.todoService.updateTodo(todoItem.id, todoItem).subscribe(() => {
        todoItem.isEditing = false; // Désactive le mode édition après la sauvegarde
      });
    }
  }

  applyFilter(filter: string): void {
    switch (filter) {
      case 'completed':
        this.todoList = this.todoList.filter((todo) => todo.completed);
        break;
      case 'in-progress':
        this.todoList = this.todoList.filter((todo) => !todo.completed);
        break;
      default:
        this.getTodos(); // Réinitialise pour afficher toutes les tâches
        break;
    }
  }
}
