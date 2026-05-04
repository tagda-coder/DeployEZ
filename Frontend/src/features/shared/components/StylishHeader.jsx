import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const StylishHeader = () => {
  const [isDown, setIsDown] = useState(false);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
      <div
        className={`w-full flex justify-center gap-6 p-6 transition-transform ${!isDown && "-translate-y-20"}`}
      >
        <NavLink
          to={"/landing"}
          className="transition-transform hover:-translate-y-1"
        >
          Landing
        </NavLink>
        <NavLink
          to={"/"}
          className="transition-transform hover:-translate-y-1"
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/auth"}
          className="transition-transform hover:-translate-y-1"
        >
          Auth
        </NavLink>
      </div>
      <div className={`transition-transform  ${!isDown && "-translate-y-16"}`}>
        {isDown ? (
          <ChevronUp
            onClick={() => setIsDown(false)}
            className="cursor-pointer hover:-translate-y-1 transition-all duration-500 ease"
          />
        ) : (
          <ChevronDown
            onClick={() => setIsDown(true)}
            className="cursor-pointer hover:translate-y-1 transition-all duration-500 ease"
          />
        )}
      </div>
    </div>
  );
};

export default StylishHeader;
