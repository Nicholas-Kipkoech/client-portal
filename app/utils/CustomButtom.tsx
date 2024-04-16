import React from "react";
interface Button {
  name: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton = ({ name, className, onClick, disabled }: Button) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
};

export default CustomButton;
