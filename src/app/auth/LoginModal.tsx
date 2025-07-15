import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';

import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { AuthInput } from './components/AuthInput';

const loginSchema = z.object({
  email: z.string().email('Please enter valid email'),
  password: z.string().min(1, 'Please enter valid password'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginModal() {
  const { isAuthenticated, login } = useAuth();
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isAuthenticated) return null;

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await login(data);
    if (!result.success) {
      setError('password', { type: 'server', message: result.error });
    }
  };

  return (
    <div className={`fixed inset-0 bg-amber-100/90 flex items-center justify-center z-50 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <form
        onSubmit={(e) => { void handleSubmit(onSubmit)(e); }}
        className={`bg-fuchsia-300 p-6 rounded-xl shadow-xl w-[340px] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        method="post"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Welcome back username</h2>

        {/* Email */}
        <AuthInput
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        {/* Password */}
        <AuthInput
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        {/* {authError && <p className="text-red-500 text-sm">{authError}</p>} */}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 px-4 py-2 hover:bg-fuchsia-600/80 text-white rounded cursor-pointer"
        >
          <LogIn size={16} />
          <span>Enter</span>
        </button>
      </form>
    </div>
  );
}
