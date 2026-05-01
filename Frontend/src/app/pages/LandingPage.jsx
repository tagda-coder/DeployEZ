// components
import BackgroundPattern from "../../features/shared/components/BackgroundPattern";
import StylishHeader from "../../features/shared/components/StylishHeader";
import { ThemeToggle } from "../../features/shared/components/ThemeToggle";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-base) flex justify-center">
      <BackgroundPattern />
      <StylishHeader />
      <ThemeToggle style={"absolute top-6 left-6"} />
      <div className="mt-50 text-2xl">Landing Page</div>
    </div>
  );
};

export default LandingPage;
