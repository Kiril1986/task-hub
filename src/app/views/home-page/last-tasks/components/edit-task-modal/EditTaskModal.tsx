import { useAtomValue, useSetAtom } from 'jotai';
import { editingTaskAtom, updateTaskAtom, setEditingTaskAtom } from '../../lastTasksStore';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './taskSchema';
import { useEffect } from 'react';
import type { TaskType } from '../../mockLastTaskCards';
import TaskTypeSelector from './components/TaskTypeSelector';

type FormValues = {
  title: string;
  daysLeft: string;
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
  const updateTask = useSetAtom(updateTaskAtom);
  const setEditingTask = useSetAtom(setEditingTaskAtom);

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
        daysLeft: editingTask.daysLeft,
        type: editingTask.type,
      });
    }
  }, [editingTask, reset]);

  if (!editingTask) return null;

  const onSubmit = (data: FormValues) => {
    updateTask({ ...editingTask, ...data });
  };

  return createPortal(
    <div
      className="modal fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-foreground shadow-lg rounded-3xl max-w-100 w-full z-[2] bg-purple-400/90"
    >
      <h2 className="mb-4">Edit Task</h2>
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

        {/* Days Left */}
        <div>
          <label className="block mb-2 text-sm">Due in (days)</label>
          <input
            type="date"
            className={inputClasses}
            {...register('daysLeft')}
          />
          {errors.daysLeft && (
            <p className={errorClasses}>{errors.daysLeft.message}</p>
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
