import React from "react";
interface Button {
  name: string;
  className: string;
  onClick?: () => void;
}

const CustomButton = ({ name, className, onClick }: Button) => {
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
};

export default CustomButton;
