import React from 'react'

interface Input {
  name: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | number | any
  className: string
  type?: string
  placeholder?: string
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const CustomInput = ({
  name,
  disabled,
  onChange,
  value,
  className,
  type,
  placeholder,
  onKeyUp,
}: Input) => {
  return (
    <div className="flex flex-col gap-1 mt-1">
      <label htmlFor={name}>{name}</label>
      <input
        onKeyUp={onKeyUp}
        name={name}
        type={type}
        className={`outline-[#cb7529] p-[5px] ${className}`}
        onChange={onChange}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default CustomInput
