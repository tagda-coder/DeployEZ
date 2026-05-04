import React, { useRef } from "react";
import { Card } from "./Card";
import { CopyrightText } from "./CopyrightText";
import { Button } from "./Button";
export const Foreground = () => {
    const ref = useRef();
  const data = [
    {
      Desc: "Education is only the thing that will grow your mind.",
      FileSize: ".9mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Hello There is nothing inside it.",
      FileSize: "10mb",
      Close: true,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "green"}
    },
    {
      Desc: "Hello There is nothing inside it.",
      FileSize: "10mb",
      Close: true,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "green"}
    },
    {
      Desc: "Hello There is nothing inside it.",
      FileSize: "10mb",
      Close: true,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "green"}
    },
    {
      Desc: "Hello There is nothing inside it.",
      FileSize: "10mb",
      Close: true,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "green"}
    },
    {
      Desc: "Study Material Download please.",
      FileSize: "102mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
    {
      Desc: "Sonu Study Material Download please.",
      FileSize: "512mb",
      Close: false,
      tag: {isOpen : true, tagTitle : "Download Now", tagColor : "pink"}
    },
  ];
  return (
    <div ref={ref} className="w-full min-h-screen absolute top-0 left-0 z-[3] flex gap-3 md:gap-10 flex-wrap p-5">
       <CopyrightText />
      
      {data.map( (item, index) => {
        return <Card data={item} reference={ref} />
      } )}
    </div>
  );
};
