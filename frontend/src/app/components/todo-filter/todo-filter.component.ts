import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent {
  selectedFilter: string = 'all'; // By default all tasks are displayed
  @Output() filterChange = new EventEmitter<string>();

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }
}
