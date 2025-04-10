import type { Priority } from "./enums";

/** Core Entities */
export interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  priority: Priority;
}

export interface SubTaskItem {
  id: number;
  title: string;
  completed: boolean;
  parentId: number;
}

/**
 * Requests
 */
export interface TaskCreateRequest {
  title: string
  description: string
  priority: Priority
}

export interface TaskUpdateRequest extends Partial<TaskItem> {
  id: number
}

export interface SubTaskCreateRequest {
  title: string
  parentId: number
}


/**
 * Composition
 */

export interface TaskPreview extends TaskItem {
  id: number;
  progress: number;
  subTaskCount: number;
}

export interface TaskWithDetails extends TaskItem {
  id: number;
  hasSubTasks: boolean;
  subTasks: SubTaskItem[];
  progress: number;
  subTaskCount: number;
}

