"use client";
import React from "react";

export default function MatchLineups({ lineups }) {
  if (!lineups || lineups.length < 2) return null;

  const home = lineups[0];
  const away = lineups[1];

  const renderTeamLineup = (teamData, isHome) => {
    return (
      <div className={`flex flex-col ${isHome ? "items-start" : "items-end text-right"}`}>
        <div className={`flex items-center gap-3 mb-4 ${isHome ? "flex-row" : "flex-row-reverse"}`}>
          <img src={teamData.team.logo} alt={teamData.team.name} className="w-10 h-10 object-contain" />
          <div>
            <h4 className="font-bold text-lg">{teamData.team.name}</h4>
            <span className="text-sm text-yellow-300 font-semibold">{teamData.formation}</span>
          </div>
        </div>

        <div className="w-full">
          <h5 className="bg-black/30 px-3 py-1 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 rounded">
            Starting XI
          </h5>
          <div className="flex flex-col gap-1 mb-4">
            {teamData.startXI.map((playerObj, idx) => (
              <div key={idx} className={`flex items-center gap-2 ${isHome ? "flex-row" : "flex-row-reverse"}`}>
                <span className="w-6 text-center text-xs font-bold text-gray-400">
                  {playerObj.player.number}
                </span>
                <span className="text-sm font-medium">{playerObj.player.name}</span>
              </div>
            ))}
          </div>

          <h5 className="bg-black/30 px-3 py-1 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 rounded">
            Substitutes
          </h5>
          <div className="flex flex-col gap-1 mb-4">
            {teamData.substitutes.map((playerObj, idx) => (
              <div key={idx} className={`flex items-center gap-2 ${isHome ? "flex-row" : "flex-row-reverse"}`}>
                <span className="w-6 text-center text-xs font-bold text-gray-400">
                  {playerObj.player.number}
                </span>
                <span className="text-sm text-gray-300">{playerObj.player.name}</span>
              </div>
            ))}
          </div>

          <h5 className="bg-black/30 px-3 py-1 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 rounded">
            Coach
          </h5>
          <div className="flex items-center gap-2">
            {teamData.coach?.photo && (
              <img src={teamData.coach.photo} alt={teamData.coach.name} className="w-8 h-8 rounded-full object-cover" />
            )}
            <span className="text-sm font-medium">{teamData.coach?.name || "Unknown"}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Lineups</h3>

      <div className="grid grid-cols-2 gap-8 divide-x divide-white/10">
        {renderTeamLineup(home, true)}
        <div className="pl-8">
          {renderTeamLineup(away, false)}
        </div>
      </div>
    </div>
  );
}
