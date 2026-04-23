import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles = 'inline-block px-6 py-3 rounded-2xl transition font-medium shadow-lg';
const variants = {
  primary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
  secondary: 'bg-fuchsia-800 hover:bg-fuchsia-600 text-white',
  disabled: 'bg-indigo-800 text-white'
};

export const Button = ({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${baseStyles} ${disabled ? variants['disabled'] : variants[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};