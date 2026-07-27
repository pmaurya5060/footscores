"use client";
import React, { useEffect, useState } from "react";
import { getFixtureH2H } from "../../lib/api";
import Loader from "../Loader";

export default function MatchH2H({ homeTeamId, awayTeamId }) {
  const [h2hMatches, setH2hMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!homeTeamId || !awayTeamId) return;

    const fetchH2H = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFixtureH2H(homeTeamId, awayTeamId);
        setH2hMatches(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load H2H records.");
      } finally {
        setLoading(false);
      }
    };

    fetchH2H();
  }, [homeTeamId, awayTeamId]);

  if (loading) {
    return <Loader message="Loading Head-to-Head History..." />;
  }

  if (error) {
    return <div className="text-red-400 text-center py-6">{error}</div>;
  }

  if (!h2hMatches || h2hMatches.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
        No head-to-head records found for these teams.
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 space-y-6">
      <h3 className="text-xl font-bold border-b border-white/10 pb-2">Head to Head History</h3>

      <div className="space-y-4">
        {h2hMatches.map((m) => {
          const matchDate = m.fixture?.date 
            ? new Date(m.fixture.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            : "Unknown Date";

          return (
            <div 
              key={m.fixture.id} 
              className="flex flex-col md:flex-row md:items-center justify-between bg-black/20 hover:bg-black/35 transition-colors p-4 rounded-xl border border-white/5 gap-4"
            >
              {/* Date & League */}
              <div className="flex flex-col">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{m.league?.name || "League"}</span>
                <span className="text-sm text-gray-400">{matchDate}</span>
              </div>

              {/* Matchup & Score */}
              <div className="flex items-center justify-center flex-1 gap-6">
                {/* Home Team */}
                <div className="flex items-center gap-3 w-1/3 justify-end">
                  <span className={`text-sm font-medium text-right ${m.teams.home.winner ? 'text-white font-bold' : 'text-gray-300'}`}>
                    {m.teams.home.name}
                  </span>
                  <img src={m.teams.home.logo} alt={m.teams.home.name} className="w-8 h-8 object-contain" />
                </div>

                {/* Score badge */}
                <div className="flex items-center justify-center bg-black/45 border border-white/10 rounded-lg px-4 py-1.5 font-bold text-white text-base min-w-[70px]">
                  <span>{m.goals.home ?? "-"}</span>
                  <span className="mx-1.5 text-gray-500">:</span>
                  <span>{m.goals.away ?? "-"}</span>
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-3 w-1/3 justify-start">
                  <img src={m.teams.away.logo} alt={m.teams.away.name} className="w-8 h-8 object-contain" />
                  <span className={`text-sm font-medium text-left ${m.teams.away.winner ? 'text-white font-bold' : 'text-gray-300'}`}>
                    {m.teams.away.name}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-end text-xs text-gray-400 font-semibold md:min-w-[80px]">
                <span>{m.fixture.status?.long || "FT"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
