import React from "react";
import { LuDownload } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { Button } from "./Button";
export const Card = ({ data, reference }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      className="relative bg-zinc-900/90 w-[42vw] h-[62vw] md:w-60 md:h-72 rounded-[40px] text-white px-8 py-10 overflow-hidden"
    >
      <span className="text-white text-[1rem] md:text-[1.2rem]">
        <FaFileAlt />
      </span>
      <p className="text-sm leading-tight mt-5 font-semibold">{data.Desc}</p>
      <div
        className={`footer absolute bottom-0 w-full h-14 left-0 px-8 ${
          data.tag.tagColor === "pink"
            ? "bg-pink-400 hover:bg-cyan-400"
            : "bg-green-400 hover:bg-yellow-400"
        }`}
      >
        <div className="flex justify-between item-center  text-zinc-900 font-semibold py-3 ">
          <h5>{data.FileSize}</h5>
          <span className="justify-center item-center mt-1">
            {data.Close ? <IoClose /> : <LuDownload />}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
