import React from "react";

interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
  key?: number | string;
}

const Skeleton = ({ height, width, className = "", key }: SkeletonProps) => {
  return (
    <div
      className={`${height} ${width} bg-gray-200 rounded-md relative overflow-hidden ${className}`}
      key={key}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

export default Skeleton;
