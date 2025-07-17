import clsx from 'clsx';

type Props = {
  src: string;
  alt: string;
  size?: 'sm' | 'md';
  className?: string;
  withOverlap?: boolean;
  index?: number;
};

export default function Avatar({
  src,
  alt,
  size = 'md',
  className,
  withOverlap = false,
  index,
}: Props) {
  const sizeClasses = {
    sm: 'w-[24px] h-[24px]',
    md: 'w-[32px] h-[32px]',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        'rounded-full object-cover border-none',
        'bg-[var(--chart-7)] filter brightness-[0.9] saturate-[1.2]',
        sizeClasses[size],
        withOverlap && index !== 0 && '-ml-[8px]',
        className,
      )}
    />
  );
}
