import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyle = 'px-4 py-2 rounded text-white font-medium focus:outline-none';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed';

  const buttonClass = classNames(baseStyle, variants[variant], disabled && disabledStyle, className);

  return (
    <button type={type} className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
