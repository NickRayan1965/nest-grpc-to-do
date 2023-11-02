import { Task } from '../entities/task.schema';

export interface FindTasksResultAgregation {
  data: Task[];
  totalCount: {
    total_count: number;
  };
}
