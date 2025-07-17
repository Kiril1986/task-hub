import { type LastTask, type TaskType } from '../model/types';
import type { Database, TablesInsert, TablesUpdate } from '@/types/supabase';

type DbTask = Database['public']['Tables']['last_tasks']['Row'];

export function mapDbTaskToLastTask(dbTask: DbTask): LastTask {
  return {
    id: dbTask.id.toString(),
    title: dbTask.title ?? '',
    dueDate: dbTask.due_date,
    progress: dbTask.progress ?? 0,
    messages: Array.isArray(dbTask.messages) ? dbTask.messages.length : 0,
    images: dbTask.images ?? 0,
    attachments: dbTask.attachements ?? 0,
    type: (dbTask.type as TaskType) ?? 'dev',
    status: (dbTask.status as LastTask['status']) ?? 'Upcoming',
    assignees: Array.isArray(dbTask.assignees)
      ? dbTask.assignees.filter((a): a is string => typeof a === 'string')
      : [],
    subtasks: Array.isArray(dbTask.sub_tasks) ? (dbTask.sub_tasks as LastTask[]) : [],
  };
}

export function mapLastTaskToDbInsert(task: Omit<LastTask, 'id'>): TablesInsert<'last_tasks'> {
  return {
    title: task.title,
    due_date: convertDateStringToDbDate(task.dueDate),
    progress: task.progress,
    attachements: task.attachments,
    images: task.images,
    status: task.status,
    type: task.type,
    assignees: task.assignees,
    messages: [],
    sub_tasks: task.subtasks ?? [],
  };
}

export function mapLastTaskToDbUpdate(updates: Partial<LastTask>): TablesUpdate<'last_tasks'> {
  const dbUpdate: TablesUpdate<'last_tasks'> = {};

  if (updates.title !== undefined) dbUpdate.title = updates.title;
  if (updates.dueDate !== undefined) dbUpdate.due_date = convertDateStringToDbDate(updates.dueDate);
  if (updates.progress !== undefined) dbUpdate.progress = updates.progress;
  if (updates.attachments !== undefined) dbUpdate.attachements = updates.attachments;
  if (updates.images !== undefined) dbUpdate.images = updates.images;
  if (updates.status !== undefined) dbUpdate.status = updates.status;
  if (updates.type !== undefined) dbUpdate.type = updates.type;
  if (updates.assignees !== undefined) dbUpdate.assignees = updates.assignees;
  if (updates.subtasks !== undefined) dbUpdate.sub_tasks = updates.subtasks;

  return dbUpdate;
}

function convertDateStringToDbDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new RangeError('Invalid date value');
  }
  return date.toISOString().split('T')[0];
}

export function getNextSubtaskId(subtasks: LastTask[] = []): number {
  if (subtasks.length === 0) return 1;
  const maxId = subtasks.reduce((max, t) => {
    const idNum = Number(t.id);
    return idNum > max ? idNum : max;
  }, 0);
  return maxId + 1;
}