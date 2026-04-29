import { useEffect } from "react";
import { toast } from "react-toastify"; 
import { ThemeToggle } from "../../../shared/components/ThemeToggle";

const Dashboard = () => {
  useEffect(() => {
    toast.info("This is a test toast");
  }, []);

  return (
    <>
      <ThemeToggle />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
