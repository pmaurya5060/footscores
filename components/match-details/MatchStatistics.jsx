"use client";
import React from "react";

export default function MatchStatistics({ statistics }) {
  if (!statistics || statistics.length < 2) return null;

  const homeStats = statistics[0].statistics;
  const awayStats = statistics[1].statistics;
  
  const homeTeam = statistics[0].team;
  const awayTeam = statistics[1].team;

  // Helper to extract value safely and parse it to number (handle strings like "50%")
  const getVal = (statObj) => {
    if (!statObj || statObj.value === null) return 0;
    if (typeof statObj.value === "string" && statObj.value.includes("%")) {
      return parseInt(statObj.value.replace("%", ""));
    }
    return statObj.value;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Match Statistics</h3>

      <div className="flex justify-between items-center mb-6 px-4">
        <img src={homeTeam.logo} alt={homeTeam.name} className="w-10 h-10 object-contain" />
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">VS</span>
        <img src={awayTeam.logo} alt={awayTeam.name} className="w-10 h-10 object-contain" />
      </div>

      <div className="flex flex-col gap-5">
        {homeStats.map((stat, index) => {
          const homeValue = getVal(stat);
          const awayValue = getVal(awayStats[index]);
          const total = homeValue + awayValue;
          
          const homePercent = total === 0 ? 50 : (homeValue / total) * 100;
          const awayPercent = total === 0 ? 50 : (awayValue / total) * 100;

          // Special case: render raw value if it was a string with '%'
          const displayHome = typeof stat.value === "string" ? stat.value : (stat.value ?? 0);
          const displayAway = typeof awayStats[index].value === "string" ? awayStats[index].value : (awayStats[index].value ?? 0);

          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>{displayHome}</span>
                <span className="text-gray-400">{stat.type}</span>
                <span>{displayAway}</span>
              </div>
              
              <div className="flex w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${homePercent}%` }} 
                />
                <div 
                  className="h-full bg-red-500 transition-all duration-500" 
                  style={{ width: `${awayPercent}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
