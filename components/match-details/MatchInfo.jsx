"use client";
import React from "react";

export default function MatchInfo({ details }) {
  if (!details) return null;

  const { fixture, league } = details;

  const formattedDate = fixture?.date
    ? new Date(fixture.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  const formattedTime = fixture?.date
    ? new Date(fixture.date).toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "Unknown Time";

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Match Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base text-gray-300">
        
        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Date</span>
          <span className="font-semibold text-white">{formattedDate}</span>
        </div>

        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Time (IST)</span>
          <span className="font-semibold text-white">{formattedTime}</span>
        </div>

        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Venue</span>
          <span className="font-semibold text-white text-right">
            {fixture?.venue?.name ? `${fixture.venue.name}, ${fixture.venue.city}` : "TBD"}
          </span>
        </div>

        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Referee</span>
          <span className="font-semibold text-white">{fixture?.referee || "TBD"}</span>
        </div>

        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Season</span>
          <span className="font-semibold text-white">{league?.season || "N/A"}</span>
        </div>

        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider">Round</span>
          <span className="font-semibold text-white">{league?.round || "N/A"}</span>
        </div>

      </div>
    </div>
  );
}
