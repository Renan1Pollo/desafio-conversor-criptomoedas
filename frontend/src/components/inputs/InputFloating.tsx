import React from "react";

type FloatingInputProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = " ",
  type = "text",
  required = false,
}) => {
  return (
    <div className="relative mb-6">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          block px-2.5 pb-2.5 pt-4 w-full text-base focus:text-lg
          text-gray-900 bg-transparent rounded-lg border border-gray-300
          appearance-none focus:outline-none
          focus:ring-0 peer transition-all duration-200
          placeholder-transparent focus:placeholder-gray-400
        "
      />
      <label
        htmlFor={id}
        className="
          absolute text-base peer-focus:text-lg text-gray-500
          duration-200 transform -translate-y-[18px] scale-75 top-1.5 z-10 origin-[0]
          bg-transparent px-2 peer-placeholder-shown:scale-100
          peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
          peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-[30px]
          rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:start-0 start-1 transition-all
        "
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};

export default FloatingInput;
