const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-(image:--pattern-base-bg) bg-size-[24px_24px]"></div>
  );
};

export default BackgroundPattern;

// <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
