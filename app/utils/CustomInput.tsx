import React from "react";

interface Input {
  name: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  value: string | number | any;
  className: string;
  type?: string;
  maxLength?: number;
}

const CustomInput = ({
  name,
  disabled,
  onChange,
  value,
  className,
  type,
  maxLength,
}: Input) => {
  return (
    <div className="flex flex-col gap-1 mt-1">
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        type={type}
        className={`outline-[#cb7529] p-[5px] ${className}`}
        onChange={onChange}
        disabled={disabled}
        value={value}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CustomInput;
