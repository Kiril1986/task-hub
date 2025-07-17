import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { LastTask } from '../model/types';
import { fetchAllTasks, fetchTaskById, createTask, deleteTask, updateTask, addSubtaskToParent, fetchTodayTasks } from '../api/fetch-last-tasks';

/**
 * Получить все задачи
 */
export const useTasks = () => useQuery({
  queryKey: ['tasks'],
  queryFn: fetchAllTasks,
});

/**
 * Получить задачу по id
 */
export const useTask = (taskId: string) =>
  useQuery({
    queryKey: ['tasks', taskId],
    queryFn: () => fetchTaskById(taskId),
    enabled: !!taskId,
  });

/**
 * Создать задачу
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Omit<LastTask, 'id'>) => createTask(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

/**
 * Обновить задачу
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LastTask> }) =>
      updateTask(id, updates),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

/**
 * Удалить задачу
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

/**
 * Добавить подзадачу
 */

export const useAddSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ parentId, subtask }: { parentId: string; subtask: Omit<LastTask, 'id'> }) =>
      addSubtaskToParent(parentId, subtask),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

/**
 * Получить сегодняшние задачи
 */

export const useTodayTasks = () =>
  useQuery({
    queryKey: ['tasks', 'today'],
    queryFn: fetchTodayTasks,
  });