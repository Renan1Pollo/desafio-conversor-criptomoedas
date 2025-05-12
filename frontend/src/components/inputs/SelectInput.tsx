import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export type Option = {
  label: string;
  value: string;
  image?: string;
  isFavorite?: boolean;
  cryptoId: string;
};

type SelectInputProps = {
  title: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onToggleFavorite?: (value: string) => void;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  title,
  options,
  value = "",
  onChange,
  onToggleFavorite,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdownVisibility = () => {
    setDropdownOpen((previousState) => !previousState);
  };

  const selectOption = (selectedValue: string) => {
    onChange?.(selectedValue);
    setDropdownOpen(false);
  };

  const toggleFavoriteStatus = (
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue: string
  ) => {
    event.stopPropagation();
    onToggleFavorite?.(selectedValue);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayedLabel = selectedOption?.label || "Selecione uma opção";

  return (
    <div className="w-full relative">
      <label className="block font-medium mb-2">{title}</label>

      <button
        type="button"
        onClick={toggleDropdownVisibility}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-left"
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
      >
        {displayedLabel}
      </button>

      {dropdownOpen && (
        <ul
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <li
              key={option.cryptoId}
              role="option"
              aria-selected={option.value === value}
              onClick={() => selectOption(option.value)}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <span>{option.label}</span>
              </div>

              <button
                type="button"
                onClick={(event) => toggleFavoriteStatus(event, option.value)}
                className="text-yellow-500 hover:text-yellow-600"
                aria-label={
                  option.isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                {option.isFavorite ? (
                  <FaStar size={16} />
                ) : (
                  <FaRegStar size={16} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
