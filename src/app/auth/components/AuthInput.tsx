import { type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';

type AuthInputProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
};

export function AuthInput<T extends FieldValues>({
  type,
  placeholder,
  name,
  error,
  register,
}: AuthInputProps<T>) {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2 relative">
      <input
        type={isPassword && showPassword ? 'text' : type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-3 py-2 bg-amber-50 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-600 ${error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-5 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}
      <p className="text-red-500 text-sm mt-1 min-h-5 transition-opacity duration-200 opacity-100">{error || ''}</p>
    </div>
  );
}
