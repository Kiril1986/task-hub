import { atom } from 'jotai';
import { lastTasks as initialTasks, type LastTask } from './mockLastTaskCards';

type AddSubtaskPayload = {
  parentTaskId: string;
  newSubTask: LastTask;
};

export const tasksAtom = atom<LastTask[]>([...initialTasks]);

export const editingTaskAtom = atom<LastTask | null>(null);

export const setEditingTaskAtom = atom(
  null,
  (_get, set, task: LastTask | null) => {
    set(editingTaskAtom, task);
  },
);

export const updateTaskAtom = atom(null, (get, set, updatedTask: LastTask) => {
  const tasks = get(tasksAtom);
  const newTasks = tasks.map((t) =>
    t.id === updatedTask.id ? updatedTask : t,
  );
  set(tasksAtom, newTasks);
  set(editingTaskAtom, null);
  set(showToastAtom, `Task "${updatedTask.title}" updated`);
});

export const creatingTaskAtom = atom(false);

export const setCreatingTaskAtom = atom(
  null,
  (_get, set, value: boolean) => {
    set(creatingTaskAtom, value);
  },
);

export const addTaskAtom = atom(
  null,
  (get, set, payload: AddSubtaskPayload | LastTask) => {
    const tasks = get(tasksAtom);
    if ('parentTaskId' in payload && payload.parentTaskId) {
      const subtask = payload.newSubTask;
      const addSubtask = (tasksList: LastTask[]): LastTask[] =>
        tasksList.map(task => {
          if (task.id === payload.parentTaskId) {
            const updatedSubtasks = task.subtasks ? [...task.subtasks, payload.newSubTask] : [payload.newSubTask];
            return { ...task, subtasks: updatedSubtasks };
          }
          if (task.subtasks) {
            return { ...task, subtasks: addSubtask(task.subtasks) };
          }
          return task;
        });
      
      const updatedTasks = addSubtask(tasks);
      set(tasksAtom, [...updatedTasks, subtask]);
      set(creatingTaskAtom, false);
      set(showToastAtom, `Subtask "${subtask.title}" added`);
      return;
    }

    set(tasksAtom, [...tasks, payload as LastTask]);
    set(creatingTaskAtom, false);
  },
);

export const selectedParentTaskAtom = atom<LastTask | null>(null);
export const setSelectedParentTaskAtom = atom(
  null,
  (_get, set, task: LastTask | null) => {
    set(selectedParentTaskAtom, task);
  },
);

export const toastAtom = atom<string | null>(null);

export const showToastAtom = atom(
  null,
  (_get, set, message: string) => {
    set(toastAtom, message);
    setTimeout(() => set(toastAtom, null), 3000);
  },
);