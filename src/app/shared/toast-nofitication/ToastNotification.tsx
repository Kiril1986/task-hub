import { toastAtom } from '@/app/views/home-page/last-tasks/lastTasksStore';
import { useAtomValue } from 'jotai';

export default function ToastNotification() {
  const message = useAtomValue(toastAtom);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
}