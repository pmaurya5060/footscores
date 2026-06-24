"use client";
import React from "react";
import useLeagues from "../../../hooks/useLeagues";
import Loader from "../../../components/Loader";

const LeagueSeasons = ({ params }) => {
  const { leagueId } = React.use(params);
  const LeagueData = useLeagues();

  // find the clicked league
  const league = LeagueData.find((l) => String(l?.league?.id) === leagueId);

  if (!league) {
    return (
      <div className="min-h-screen pt-28 text-white">
        <Loader message="Loading league seasons..." />
      </div>
    );
  }

  return (
    <div className="p-6 pt-28 flex flex-col items-center min-h-screen text-white">
      <h2 className="text-2xl font-bold text-white mb-6">
        Seasons of {league?.league?.name}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {league.seasons.map((s, index) => (
          <div
            key={index}
            className="season-card bg-[#1E2A47]/40 backdrop-blur-sm p-4 rounded-xl text-white shadow-md w-60 border border-white/10 hover:scale-105 transition-transform duration-500"
          >
            <p className="font-semibold text-lg text-yellow-200">Year: {s?.year}</p>
            <p className="mt-2">Start: <span className="text-sm text-gray-300">{s?.start}</span></p>
            <p>End: <span className="text-sm text-gray-300">{s?.end}</span></p>
            <p className="mt-2 flex items-center gap-1.5">
              Current: {s?.current ? <span className="text-green-400">✅ Yes</span> : <span className="text-red-400">❌ No</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueSeasons;
