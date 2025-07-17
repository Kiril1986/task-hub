
import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { iconsMap } from '../../task-type-icon/iconsMap';
import type { TaskType } from '@/features/model/types';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
};

const inputClasses = 'hidden peer';
const errorClasses = 'text-[var(--chart-1)] text-base mb-3';

export default function TaskTypeSelector<T extends FieldValues>({ register, errors, name }: Props<T>) {
  return (
    <div>
      <label className="block mb-2 text-sm">Task Type</label>
      <div className="flex gap-2 flex-wrap">
        {(Object.entries(iconsMap) as [TaskType, React.ElementType][]).map(([typeKey, Icon]) => (
          <label key={typeKey} className="cursor-pointer">
            <input
              type="radio"
              value={typeKey}
              {...register(name)}
              className={inputClasses}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-gray-50 peer-checked:border-[var(--chart-6)] peer-checked:ring-2 peer-checked:ring-[var(--chart-6)] transition-all"
              title={typeKey}
            >
              <Icon className="text-[var(--chart-6)] w-4 h-4" />
            </div>
          </label>
        ))}
      </div>
      {typeof errors[name]?.message === 'string' && (
        <p className={errorClasses}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
