import { useAtom } from 'jotai';
import { editingTaskAtom, tasksAtom } from '../../lastTasksstore';
import ReactDOM from 'react-dom';
import type { LastTask } from '../../mockLastTaskCards';
import styles from './EditTaskModal.module.css';
import { useState } from 'react';
import { taskSchema } from './taskSchema';

export default function EditTaskModal() {
  const [editingTask, setEditingTask] = useAtom(editingTaskAtom);
  const [, setTasks] = useAtom(tasksAtom);

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!editingTask) return null;

  const handleFieldChange = (field: keyof LastTask, value: string | number) => {
    setEditingTask({ ...editingTask, [field]: value });
  };

  const handleSave = () => {
    const parsed = taskSchema.safeParse({
      title: editingTask.title,
      daysLeft: editingTask.daysLeft,
      progress: editingTask.progress,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? editingTask : task)),
    );
    setEditingTask(null);
  };

  const inputClasses =
  'w-full p-[8px] h-[24px] max-w-[250px] border rounded-[20px] cursor-pointer font-poppins';

  const buttonClasses =
  'px-[12px] py-[6px] rounded-[20px] cursor-pointer border-solid font-poppins';

  const errorClasses =
  'text-[var(--chart-1)] text-[16px] mb-[12px]';

  return ReactDOM.createPortal(
    <div className={`modal fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-[16px] text-foreground shadow-lg rounded-[20px] max-w-[400px] w-full z-[9998] ${styles.modal}`}>
      <h2>Edit Task</h2>

      <label className="block mb-[8px] text-[14px]">Title</label>
      <input
        className={`mb-[12px] ${inputClasses}`}
        value={editingTask.title}
        onChange={(e) =>
          handleFieldChange('title', e.target.value)
        }
        type="text"
      />
      {errors.title && <p className={errorClasses}>{errors.title}</p>}

      <label className="block mb-[8px] text-[14px]">Due in (days)</label>
      <input
        type="date"
        className={`mb-[12px] ${inputClasses}`}
        value={editingTask.daysLeft}
        onChange={(e) =>
          handleFieldChange('daysLeft', e.target.value)
        }
      />
      {errors.daysLeft && <p className={errorClasses}>{errors.daysLeft}</p>}

      <label className="block mb-[8px] text-[14px]">Progress (%)</label>
      <input
        type="number"
        min={0}
        max={100}
        className={`mb-[12px] ${inputClasses}`}
        value={editingTask.progress}
        onChange={(e) =>
          handleFieldChange('progress', Number(e.target.value))
        }
      />
      {errors.progress && <p className={errorClasses}>{errors.progress}</p>}

      <div className="flex justify-end gap-[8px]">
        <button
          onClick={() => setEditingTask(null)}
          className={buttonClasses}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className={buttonClasses}
        >
          Save
        </button>
      </div>
    </div>,
    document.body,
  );
}
