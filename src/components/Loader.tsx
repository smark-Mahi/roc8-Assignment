const Loader = () => {
  return (
    <div className="h-72 flex justify-center items-center">
      <div>
        <div className="w-4 h-4 rounded-full bg-black animate-loading m-auto "></div>
        <div className="w-4 h-4 rounded-full bg-black animate-loading animation-delay-1500 m-auto "></div>
      </div>
      <div className="rotate-90 ">
        <div className="w-4 h-4 rounded-full bg-black animate-loading m-auto "></div>
        <div className="w-4 h-4 rounded-full bg-black animate-loading animation-delay-1500 m-auto "></div>
      </div>
    </div>
  );
};

export default Loader;
