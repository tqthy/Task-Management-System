import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}



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
    const found = await this.tasksRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
      const found = await this.getTaskById(id);

      if (!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      await this.tasksRepository.delete(id);
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  // }
}
