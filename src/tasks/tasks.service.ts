import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     let tasks = this.getAllTasks();

  //     if (status) {
  //         tasks = tasks.filter((task) => task.status === status);
  //     }

  //     if (search) {
  //         tasks = tasks.filter((task) => {
  //             return (task.title.includes(search) || task.description.includes(search))
  //         });
  //     }

  //     return tasks;
  // }
    async getTaskById(id: string): Promise<Task> {
        console.log(`id: ${id}`);
        const found = await this.tasksRepository.findOneBy({ id: id });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }


  // createTask(createTaskDto: CreateTaskDto): Task {
  //     const {title, description } = createTaskDto;

  //     const task: Task = {
  //         id: uuid(),
  //         title,
  //         description,
  //         status: TaskStatus.OPEN,
  //     };

  //     this.tasks.push(task);

  //     return task;
  // }

  // deleteTaskById(id: string): void {
  //     const found = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  // }
}
