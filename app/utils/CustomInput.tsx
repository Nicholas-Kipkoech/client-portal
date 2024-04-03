import React from "react";

interface Input {
  name: string;
  disabled?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  className: string;
  type?: string;
}

const CustomInput = ({
  name,
  disabled,
  onChange,
  value,
  className,
  type,
}: Input) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        type={type}
        className={`outline-[#cb7529] ${className}`}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export default CustomInput;