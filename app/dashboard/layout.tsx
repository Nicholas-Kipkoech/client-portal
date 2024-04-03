import React from "react";

interface IChildren {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return <div>{children}</div>;
};

export default Layout;
