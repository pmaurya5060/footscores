"use client";
import React, { useState, useEffect } from "react";

function MatchCard({ match }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (match?.fixture?.date) {
      const date = new Date(match.fixture.date);
      const timeStr = date.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setFormattedTime(timeStr);
    }
  }, [match]);

  return (
    <div className="bg-[#535C91]/20 backdrop-blur-sm p-4 mt-2 rounded-lg w-full md:w-1/2 lg:w-[580px] h-36 mx-auto text-center flex items-center text-white hover:scale-105 transition-transform duration-500 border border-white/10">
      <img
        src={match?.teams?.home?.logo}
        alt={match?.teams?.home?.name}
        className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 object-contain flex-shrink-0"
      />

      {/* Main info */}
      <div className="flex flex-col items-center flex-1 min-w-0 px-2">
        <h1 className="text-sm text-gray-300 mb-1 my-1.5 truncate max-w-full">
          {match?.league?.name}
        </h1>

        {/* Scores area */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="teamname flex w-full gap-2.5 text-blue-400 font-bold">
            <div className="flex-1 text-sm text-center truncate">
              {match?.teams?.home?.name}
            </div>
            <div className="flex-1 text-sm text-center truncate">
              {match?.teams?.away?.name}
            </div>
          </div>

          <div className="scores flex gap-2.5 justify-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              {match?.goals?.home ?? 0}
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold">-</span>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              {match?.goals?.away ?? 0}
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-300">
          <h2 className="text-[#ffcc00] font-semibold">
            {match?.fixture?.status?.long}
          </h2>
          <h3>{formattedTime || "Loading..."}</h3>
        </div>
      </div>

      <img
        src={match?.teams?.away?.logo}
        alt={match?.teams?.away?.name}
        className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 object-contain flex-shrink-0"
      />
    </div>
  );
}

export default MatchCard;
