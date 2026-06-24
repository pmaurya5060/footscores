"use client";
import React from "react";
import Link from "next/link";
import { getMatchStatus } from "../../utils/matchStatus";

export default function MatchHeader({ details }) {
  if (!details) return null;

  const { fixture, league, teams, goals } = details;
  const { label: statusLabel, isLive } = getMatchStatus(fixture?.status);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 flex flex-col items-center">
      
      {/* League Header */}
      <Link href={`/leagues/${league?.id}`} className="flex items-center gap-3 hover:opacity-80 transition mb-6">
        {league?.logo && (
          <img src={league.logo} alt={league.name} className="w-8 h-8 object-contain" />
        )}
        <h2 className="text-lg md:text-xl font-bold text-yellow-300">{league?.name}</h2>
      </Link>

      {/* Scoreboard */}
      <div className="flex w-full justify-between items-center max-w-3xl mx-auto">
        
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <Link href={`/teams/${teams?.home?.name}`} className="flex flex-col items-center hover:scale-105 transition-transform">
            <img src={teams?.home?.logo} alt={teams?.home?.name} className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg mb-3" />
            <span className="text-base md:text-xl font-bold text-center">{teams?.home?.name}</span>
          </Link>
        </div>

        {/* Center Scores */}
        <div className="flex flex-col items-center justify-center px-4 md:px-8">
          <div className="flex items-center gap-4 text-4xl md:text-6xl font-black tracking-widest drop-shadow-xl">
            <span>{goals?.home ?? "-"}</span>
            <span className="text-gray-400 text-3xl md:text-5xl">-</span>
            <span>{goals?.away ?? "-"}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full">
            <span className="text-[#ffcc00] font-bold text-sm md:text-base">{statusLabel}</span>
            {isLive && (
              <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded animate-pulse">
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <Link href={`/teams/${teams?.away?.name}`} className="flex flex-col items-center hover:scale-105 transition-transform">
            <img src={teams?.away?.logo} alt={teams?.away?.name} className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg mb-3" />
            <span className="text-base md:text-xl font-bold text-center">{teams?.away?.name}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
