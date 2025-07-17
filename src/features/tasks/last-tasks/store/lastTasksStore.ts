import type { LastTask } from '@/features/model/types';
import { atom } from 'jotai';


// UI-состояния
export const editingTaskAtom = atom<LastTask | null>(null);

export const setEditingTaskAtom = atom(
  null,
  (_get, set, task: LastTask | null) => {
    set(editingTaskAtom, task);
  },
);

export const creatingTaskAtom = atom(false);

export const setCreatingTaskAtom = atom(
  null,
  (_get, set, value: boolean) => {
    set(creatingTaskAtom, value);
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

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export const showToastAtom = atom(
  null,
  (_get, set, message: string) => {
    set(toastAtom, message);
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      set(toastAtom, null);
      toastTimeout = null;
    }, 3000);
  },
);
