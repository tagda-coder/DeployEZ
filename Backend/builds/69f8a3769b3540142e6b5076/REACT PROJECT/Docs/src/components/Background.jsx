import React from "react";
import { Button } from "./Button";  

export const Background = () => {
  return (
    <>
      <div className="fixed w-full h-screen z-[2] bg-zinc-800 no-scrollbar">
        <div className="absolute top-[5%] w-full py-10 text-zinc-600 text-xl font-semibold flex justify-center">
          Documents.
        </div>
        <h1 className=" absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[30vw] md:text-[12vw] leading-none tracking-tighter font-semibold text-zinc-900">
          Docs
        </h1>
      </div>
    </> 
  );
};
