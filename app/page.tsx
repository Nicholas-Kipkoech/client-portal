"use client";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const handleTogle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex  justify-center items-center">
      {isLogin ? (
        <Login toggleView={handleTogle} />
      ) : (
        <Register toggleView={handleTogle} />
      )}
    </div>
  );
}
