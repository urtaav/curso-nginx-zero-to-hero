export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO string (backend)
}

export interface TaskPage {
  tasks: Task[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}