"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getMatchStatus } from "../utils/matchStatus";

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

  const { label: statusLabel, isLive } = getMatchStatus(match?.fixture?.status);

  // Extract goal scorers
  const homeGoals = [];
  const awayGoals = [];

  if (match?.events) {
    match.events.forEach((event) => {
      // API-Football uses type="Goal". We ignore missed penalties.
      if (event.type === "Goal" && event.detail !== "Missed Penalty") {
        const time = event.time.elapsed + (event.time.extra ? `+${event.time.extra}` : "");
        const scorer = `${event.player.name} ${time}'`;
        if (event.team.id === match?.teams?.home?.id) {
          homeGoals.push(scorer);
        } else if (event.team.id === match?.teams?.away?.id) {
          awayGoals.push(scorer);
        }
      }
    });
  }

  return (
    <Link href={`/match/${match?.fixture?.id}`} className="block w-full">
      <div className="bg-[#535C91]/20 backdrop-blur-sm p-4 rounded-lg w-full min-h-[120px] text-center flex items-center text-white hover:scale-105 transition-transform duration-500 border border-white/10 cursor-pointer">
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

            <div className="scores flex gap-2.5 justify-center items-center mt-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                {match?.goals?.home ?? 0}
              </div>
              <span className="text-base sm:text-lg md:text-xl font-bold px-2">-</span>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                {match?.goals?.away ?? 0}
              </div>
            </div>

            {/* Goal Scorers */}
            {(homeGoals.length > 0 || awayGoals.length > 0) && (
              <div className="flex w-full justify-between mt-2 text-[10px] sm:text-xs text-gray-400">
                <div className="flex flex-col items-center sm:items-start w-1/2 pr-1 text-center sm:text-left">
                  {homeGoals.map((g, i) => (
                    <span key={i} className="truncate w-full">⚽ {g}</span>
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-end w-1/2 pl-1 text-center sm:text-right">
                  {awayGoals.map((g, i) => (
                    <span key={i} className="truncate w-full">{g} ⚽</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 text-xs flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[#ffcc00] font-semibold">{statusLabel}</span>
              {isLive && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            <span className="text-gray-400">{formattedTime || "Loading..."}</span>
          </div>
        </div>

        <img
          src={match?.teams?.away?.logo}
          alt={match?.teams?.away?.name}
          className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 object-contain flex-shrink-0"
        />
      </div>
    </Link>
  );
}

export default MatchCard;
