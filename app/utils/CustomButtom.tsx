import React from "react";
interface Button {
  name: string;
  className: string;
}

const CustomButtom = ({ name, className }: Button) => {
  return <button className={className}>{name}</button>;
};

export default CustomButtom;
