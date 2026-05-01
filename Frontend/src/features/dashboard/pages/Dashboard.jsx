import { toast } from "react-toastify";

// components
import BackgroundPattern from "../../shared/components/BackgroundPattern";
import { ThemeToggle } from "../../shared/components/ThemeToggle";
import StylishHeader from "../../shared/components/StylishHeader";

const Dashboard = () => {
  const showToast = () => toast.info("This is a test toast");

  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-base) flex justify-center">
      <BackgroundPattern />
      <StylishHeader />
      <ThemeToggle style={"absolute top-6 left-6"} />
      <div className="mt-50 flex flex-col relative z-10">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="group relative h-10 mt-5 flex justify-center items-center">
          <div className="absolute inset-0 bg-neutral-800 rounded-md transition-all duration-300 group-hover:bg-neutral-700 group-hover:scale-105"></div>
          <button
            onClick={showToast}
            className="relative z-10 w-full h-full text-sm font-medium text-white cursor-pointer"
          >
            Show Toast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
