import { supabase } from '@/lib/supabaseClient';
import { type LastTask } from '../model/types';
import { getNextSubtaskId, mapDbTaskToLastTask, mapLastTaskToDbInsert, mapLastTaskToDbUpdate } from '../utils/taskMappers';


const TABLE_NAME = 'last_tasks';

// Получение всех задач
export async function fetchAllTasks(): Promise<LastTask[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');
  if (error) throw new Error(error.message);
  return data.map(mapDbTaskToLastTask);
}

// Добавление задачи
export async function createTask(task: Omit<LastTask, 'id'>): Promise<LastTask> {
  const dbInsert = mapLastTaskToDbInsert(task);

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([dbInsert])
    .select();

  if (error) throw new Error(error.message);
  if (!data || !data[0]) throw new Error('No task returned from Supabase');

  return mapDbTaskToLastTask(data[0]);
}

// Обновление задачи
export async function updateTask(id: string, updates: Partial<LastTask>): Promise<LastTask> {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error('Invalid ID');
  const dbUpdates = mapLastTaskToDbUpdate(updates);

  const { error } = await supabase
    .from(TABLE_NAME)
    .update(dbUpdates)
    .eq('id', numericId);

  if (error) throw new Error(error.message);
  return fetchTaskById(id);
}

// Удаление задачи
export async function deleteTask(id: string): Promise<LastTask> {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error('Invalid ID');

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', numericId);

  if (error) throw new Error(error.message);
  return fetchTaskById(id);
}

export async function fetchTaskById(id: string): Promise<LastTask> {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error('Invalid ID');

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', numericId)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Task not found');

  return mapDbTaskToLastTask(data);
}

// Добавление подзадачи

export async function addSubtaskToParent(parentId: string, newTask: Omit<LastTask, 'id'>): Promise<LastTask> {
  const parentTask = await fetchTaskById(parentId);
  const nextId = getNextSubtaskId(parentTask.subtasks);

  const newSubtask: LastTask = {
    ...newTask,
    id: nextId.toString(),
    subtasks: [],
  };

  const updatedSubtasks = [...(parentTask.subtasks ?? []), newSubtask];

  await updateTask(parentId, { subtasks: updatedSubtasks });
  return parentTask;
}

// Получение сегодняшних задач

export async function fetchTodayTasks(): Promise<LastTask[]> {
  const today = new Date();

  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .gte('due_date', startOfDay.toISOString())
    .lte('due_date', endOfDay.toISOString());

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map(mapDbTaskToLastTask);
}