import React from "react";

type InputProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
  inputMode,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-medium mb-2 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className={`w-full border border-gray-300 rounded px-3 py-2 bg-white ${className}`}
      />
    </div>
  );
};