import React from "react";
interface Button {
  name: string;
  className: string;
}

const CustomButton = ({ name, className }: Button) => {
  return <button className={className}>{name}</button>;
};

export default CustomButton;
