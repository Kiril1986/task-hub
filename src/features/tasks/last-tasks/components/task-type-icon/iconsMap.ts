import { Plane, UsersRound, BookOpen, Bug, Computer, Palette } from 'lucide-react';
import type { TaskType } from '../../model/types';

export const iconsMap: Record<TaskType, React.ElementType> = {
  design: Palette,
  dev: Computer,
  bug: Bug,
  docs: BookOpen,
  meeting: UsersRound,
  travel: Plane,
};