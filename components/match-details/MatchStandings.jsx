"use client";
import React, { useEffect, useState } from "react";
import { getFixtureStandings } from "../../lib/api";
import Loader from "../Loader";

export default function MatchStandings({ leagueId, season, currentTeamId }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!leagueId || !season) return;

    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFixtureStandings(leagueId, season);
        setStandings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load standings.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId, season]);

  if (loading) {
    return <Loader message="Loading League Standings..." />;
  }

  if (error) {
    return <div className="text-red-400 text-center py-6">{error}</div>;
  }

  if (!standings || standings.length === 0) {
    return <div className="text-gray-400 text-center py-6">No standings available for this match's league.</div>;
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 md:p-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">League Standings</h3>
      
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <th className="pb-3 pl-2 w-12 text-center">Pos</th>
            <th className="pb-3">Team</th>
            <th className="pb-3 text-center w-12">P</th>
            <th className="pb-3 text-center w-10">W</th>
            <th className="pb-3 text-center w-10">D</th>
            <th className="pb-3 text-center w-10">L</th>
            <th className="pb-3 text-center w-16">GD</th>
            <th className="pb-3 text-center w-16">Pts</th>
            <th className="pb-3 text-center w-36">Form</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {standings.map((row) => {
            const isCurrentTeam = row.team.id === currentTeamId;
            return (
              <tr 
                key={row.team.id} 
                className={`hover:bg-white/5 transition-colors ${
                  isCurrentTeam ? "bg-blue-500/10 font-semibold text-blue-200" : "text-gray-300"
                }`}
              >
                <td className="py-3 pl-2 text-center font-bold">{row.rank}</td>
                <td className="py-3 flex items-center gap-3">
                  <img 
                    src={row.team.logo} 
                    alt={row.team.name} 
                    className="w-6 h-6 object-contain" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span>{row.team.name}</span>
                </td>
                <td className="py-3 text-center">{row.all.played}</td>
                <td className="py-3 text-center">{row.all.win}</td>
                <td className="py-3 text-center">{row.all.draw}</td>
                <td className="py-3 text-center">{row.all.lose}</td>
                <td className={`py-3 text-center font-semibold ${row.goalsDiff > 0 ? 'text-green-400' : row.goalsDiff < 0 ? 'text-red-400' : ''}`}>
                  {row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}
                </td>
                <td className="py-3 text-center text-white font-bold">{row.points}</td>
                <td className="py-3 text-center">
                  <div className="flex justify-center gap-1">
                    {row.form ? (
                      row.form.split("").map((letter, idx) => {
                        let color = "bg-gray-500";
                        if (letter === "W") color = "bg-green-500";
                        else if (letter === "L") color = "bg-red-500";
                        else if (letter === "D") color = "bg-yellow-500";
                        return (
                          <span 
                            key={idx} 
                            title={letter === "W" ? "Won" : letter === "L" ? "Lost" : "Drawn"} 
                            className={`w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center font-bold ${color}`}
                          >
                            {letter}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500 text-xs">-</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
