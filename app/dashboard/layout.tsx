import React from "react";
import Sidebar from "../components/Sidebar";
import ContextProvider from "../context/context";
import { ChakraProvider } from "@chakra-ui/react";
import ToastProvider from "../providers/ToastProvider";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <ChakraProvider>
        <ToastProvider>
          <Navbar />
          <div className="flex ">
            <div className="w-[18%] fixed h-screen overflow-y-auto">
              <Sidebar />
            </div>
            <div className="w-[82%] px-2 overflow-y-auto h-screen ml-[18%]">
              {children}
            </div>
          </div>
        </ToastProvider>
      </ChakraProvider>
    </ContextProvider>
  );
};

export default Layout;
