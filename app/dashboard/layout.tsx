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
          <div className="flex">
            <div className="w-[18%] h-screen fixed sm:hidden md:block">
              <Sidebar />
            </div>
            <div className="md:w-[82%] sm:w-full flex flex-col md:ml-[18%] sm:ml-0">
              <Navbar />
              <div className="px-2">{children}</div>
            </div>
          </div>
        </ToastProvider>
      </ChakraProvider>
    </ContextProvider>
  );
};

export default Layout;
