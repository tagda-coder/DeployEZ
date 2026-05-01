import { useEffect } from "react";
import { toast } from "react-toastify";
import { ThemeToggle } from "../../shared/components/ThemeToggle"; 

const Dashboard = () => {
  useEffect(() => {
    toast.info("This is a test toast");
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#111] dark:text-white"> 
      <ThemeToggle />
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
