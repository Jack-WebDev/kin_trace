"use client";
import React, { useEffect, useState, useCallback } from "react";

type CircularProgressProps = {
  className?: string;
  percentage: number;
  total?: number;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({ className, percentage, total }) => {
  const [value, setValue] = useState<number>(0);

  const handleProgressBar = useCallback((endValue: number) => {
    let startValue = 0;
    const speed = 10;
    const increment = () => {
      setValue(startValue);
      if (startValue < endValue) {
        startValue++;
        setTimeout(increment, speed);
      }
    };
    increment();
  }, []);

  useEffect(() => {
    handleProgressBar(percentage);
  }, [percentage, handleProgressBar]);

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <div
        className="relative h-16 w-16 rounded-full flex items-center justify-center before:content[''] before:absolute before:h-12 before:w-12 before:rounded-full before:bg-primaryBg"
        style={{
          background: `conic-gradient(#6759d1 ${value * 3.6}deg, #ededed 0deg)`,
        }}
      >
        <span
          className="relative font-semibold text-sm text-primary dark:text-white"
        >
          {value}%
        </span>
      </div>

      {total && total > 0 && (
        <p className="font-normal text-sm text-white rounded-lg p-1 px-2 bg-primary">
          / {total}
        </p>
      )}
    </div>
  );
};
