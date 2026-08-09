import React from "react";

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse font-mono flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-20 bg-gray-300 border-2 border-black"></div>
              <div className="h-6 w-16 bg-gray-300 border-2 border-black"></div>
            </div>
            <div className="h-8 bg-gray-300 border-2 border-black mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 border-2 border-black mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 border-2 border-black mb-4 w-2/3"></div>
            <div className="h-3 bg-gray-200 w-1/2 mb-6"></div>
          </div>
          <div className="border-t-2 border-black pt-4 grid grid-cols-2 gap-2">
            <div className="h-10 bg-gray-300 border-2 border-black"></div>
            <div className="h-10 bg-gray-300 border-2 border-black"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
