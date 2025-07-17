import { useAtomValue, useSetAtom } from 'jotai';
import { editingTaskAtom, setEditingTaskAtom, showToastAtom } from '../../store/lastTasksStore';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './taskSchema';
import { useEffect } from 'react';
import TaskTypeSelector from './components/TaskTypeSelector';

import { Trash } from 'lucide-react';
import type { TaskType } from '@/features/model/types';
import { useDeleteTask, useUpdateTask } from '@/features/hooks/use-last-tasks';

type FormValues = {
  title: string;
  dueDate: string;
  type: TaskType;
};

const inputClasses =
  'w-full p-2 h-10 max-w-86 border rounded-2xl bg-gray-50 font-poppins';

const buttonClasses =
  'px-3 py-2 rounded-3xl cursor-pointer bg-gray-50 border-solid font-poppins';

const errorClasses =
  'text-[var(--chart-1)] text-base mb-3';

export default function EditTaskModal() {
  const editingTask = useAtomValue(editingTaskAtom);
  const setEditingTask = useSetAtom(setEditingTaskAtom);
  const { mutate } = useUpdateTask();
  const showToast = useSetAtom(showToastAtom);
  const { mutate: deleteTask } = useDeleteTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        dueDate: editingTask.dueDate,
        type: editingTask.type,
      });
    }
  }, [editingTask?.id, reset]);

  if (!editingTask) return null;

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        id: editingTask.id,
        updates: {
          title: data.title,
          dueDate: data.dueDate,
          type: data.type,
        },
      },
      {
        onSuccess: () => {
          setEditingTask(null);
          showToast('Task updated successfully!');
        },
        onError: (err) => {
          console.error('Failed to update task:', err);
          showToast('Failed to update task');
        },
      },
    );
  };

  const handleDelete = () => {
    if (!editingTask) return;

    deleteTask(editingTask.id, {
      onSuccess: () => {
        setEditingTask(null);
        showToast('Task deleted successfully');
      },
      onError: () => {
        showToast('Failed to delete task');
      },
    });
  };

  return createPortal(
    <div
      className="modal fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-foreground shadow-lg rounded-3xl max-w-100 w-full z-[2] bg-purple-400/90"
    >
      <div className="flex justify-between">
        <h2 className="mb-4">Edit Task</h2>
        <button type="button" className="bg-white rounded-full p-2 cursor-pointer" onClick={handleDelete}><Trash size={24} className="text-red-600"/></button>
      </div>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-3">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm">Title</label>
          <input
            type="text"
            className={inputClasses}
            {...register('title')}
          />
          {errors.title && (
            <p className={errorClasses}>{errors.title.message}</p>
          )}
        </div>

        {/* Due date */}
        <div>
          <label className="block mb-2 text-sm">Due in (days)</label>
          <input
            type="date"
            className={inputClasses}
            {...register('dueDate')}
          />
          {errors.dueDate && (
            <p className={errorClasses}>{errors.dueDate.message}</p>
          )}
        </div>

        {/* Task Type Selector */}
        <TaskTypeSelector register={register} errors={errors} name="type" />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2 mr-5">
          <button
            type="button"
            onClick={() => setEditingTask(null)}
            className={buttonClasses}
          >
            Cancel
          </button>
          <button type="submit" className={buttonClasses}>
            Save
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
