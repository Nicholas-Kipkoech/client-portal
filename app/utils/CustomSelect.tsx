import React from "react";
import Select, { ActionMeta } from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface ICustomSelect {
  options: [
    {
      label: string;
      value: string;
    }
  ];
  className?: string;
  name: string;
  onChange: any;
  placeholder?: string;
}

const CustomSelect = ({
  options,
  className,
  name,
  onChange,
  placeholder,
}: ICustomSelect) => {
  return (
    <div className="flex flex-col mt-1">
      <label className="flex gap-x-0.5 mt-2">{name}</label>
      <Select
        options={options}
        placeholder={placeholder}
        className={` outline-[#cb7529] ${className}`}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSelect;