import { useSetAtom, useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { creatingTaskAtom, showToastAtom } from '../../store/lastTasksStore';
import { taskSchema } from '../edit-task-modal/taskSchema';
import TaskTypeSelector from '../edit-task-modal/components/TaskTypeSelector';
import type { TaskType } from '@/features/model/types';
import { useAddSubtask } from '@/features/hooks/use-last-tasks';

type FormValues = {
  title: string;
  dueDate: string;
  type: TaskType;
};

const inputClasses = 'w-full p-2 h-10 max-w-86 border rounded-2xl bg-gray-50 font-poppins';
const buttonClasses = 'px-3 py-2 rounded-3xl cursor-pointer bg-gray-50 border-solid font-poppins';
const errorClasses = 'text-[var(--chart-1)] text-base mb-3';

type AddTaskModalProps = {
  parentTaskId: string;
  parentTitle: string;
};

export default function AddTaskModal({ parentTaskId, parentTitle }: AddTaskModalProps) {
  const isOpen = useAtomValue(creatingTaskAtom);
  const setCreatingTask = useSetAtom(creatingTaskAtom);
  const { mutate } = useAddSubtask();
  const showToast = useSetAtom(showToastAtom);

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
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        parentId: parentTaskId,
        subtask: {
          title: data.title,
          dueDate: data.dueDate,
          type: data.type,
          status: 'Upcoming',
          progress: 0,
          messages: 0,
          images: 0,
          attachments: 0,
          assignees: [],
          subtasks: [],
        },
      },
      {
        onSuccess: () => {
          setCreatingTask(false);
          showToast('Sub task added successfully!');
        },
        onError: (err) => {
          console.error('Failed to create task', err);
          showToast('Failed to update task');
        },
      },
    );
  };

  return createPortal(
    <div className="modal fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-foreground shadow-lg rounded-3xl max-w-100 w-full z-[2] bg-purple-400/90">
      <h2 className="mb-4">Add Sub Task {parentTitle ? `to "${parentTitle}"` : ''}</h2>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-3">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm">Title</label>
          <input type="text" className={inputClasses} {...register('title')} />
          {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
        </div>

        {/* Days Left */}
        <div>
          <label className="block mb-2 text-sm">Due date</label>
          <input type="date" className={inputClasses} {...register('dueDate')} />
          {errors.dueDate && <p className={errorClasses}>{errors.dueDate.message}</p>}
        </div>

        {/* Type */}
        <TaskTypeSelector register={register} errors={errors} name="type" />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2 mr-5">
          <button type="button" onClick={() => setCreatingTask(false)} className={buttonClasses}>
            Cancel
          </button>
          <button type="submit" className={buttonClasses}>
            Create
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
