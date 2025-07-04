import { atom } from 'jotai';
import { lastTasks as initialTasks, type LastTask } from './mockLastTaskCards';

export const tasksAtom = atom<LastTask[]>([...initialTasks]);

export const editingTaskAtom = atom<LastTask | null>(null);