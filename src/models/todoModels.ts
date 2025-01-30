export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  isEditing?: boolean; // This property is optional
}
