// Updated Button component with variants
import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  variant = 'primary',
  type = 'button',
}) => {
  const baseStyles = 'rounded px-4 py-2 text-gray-700';
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-200 hover:bg-blue-300'
      : 'bg-gray-200 hover:bg-gray-300';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
