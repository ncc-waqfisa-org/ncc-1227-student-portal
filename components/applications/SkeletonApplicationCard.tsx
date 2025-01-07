import React from "react";

export const SkeletonApplicationCard = () => {
  return (
    <div className="relative duration-200 hover:cursor-pointer hover:scale-105">
      <div className={`pt-6 shadow card skeleton`}>
        <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
          {/* Status */}
          <div className="flex items-baseline justify-between">
            <div className="w-24 h-4 bg-gray-200 rounded "></div>
          </div>
          {/* Programs */}
          <div>
            <div className="mb-2 -mt-2 text-sm stat-title">
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          {/* Attachments */}
          <div className="flex flex-col gap-4 p-3 border border-gray-200 rounded-xl">
            <div className="w-40 h-6 bg-gray-200 rounded"></div>
            <div className="flex flex-wrap gap-2 mb-2 -mt-2 text-sm stat-title ">
              <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute flex items-center justify-center w-12 h-12 border-2 border-white rounded-full top-2 left-2 bg-gray-300`}
      ></div>
    </div>
  );
};
