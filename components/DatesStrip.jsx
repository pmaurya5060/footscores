"use client";
import React, { useState, useEffect } from "react";

function DatesStrip({ selectedDate, setSelectedDate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const formatForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDates = () => {
    const dates = [];
    const today = new Date();
    // i ranges from -2 (Day Before Yesterday) to 0 (Today)
    for (let i = -2; i <= 0; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  if (!mounted) {
    return (
      <div className="dates-strip mt-28 flex gap-3 justify-center p-3 h-[44px]">
        {/* Placeholder spacer to prevent layout shift */}
        <div className="w-[100px] h-[38px] bg-white/5 rounded-lg"></div>
        <div className="w-[100px] h-[38px] bg-white/5 rounded-lg"></div>
        <div className="w-[100px] h-[38px] bg-white/5 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="dates-strip mt-28 flex gap-3 justify-center bg-transparent p-3 overflow-x-auto scrollbar-hide">
      {getDates().map((date) => {
        const dateStr = formatForApi(date);
        return (
          <div
            key={dateStr}
            className={`date-item ${
              selectedDate === dateStr
                ? "active px-[14px] py-2 rounded-lg bg-[#ffcc00] text-[#1a1a1a] font-bold cursor-pointer transition-colors duration-1000 whitespace-nowrap"
                : "px-[14px] py-2 border border-white/10 rounded-lg text-white backdrop-blur-3xl cursor-pointer transition-colors duration-500 whitespace-nowrap hover:bg-[#ffcc00] hover:text-black"
            }`}
            onClick={() => setSelectedDate(dateStr)}
          >
            {formatDate(date)}
          </div>
        );
      })}
    </div>
  );
}

export default DatesStrip;
