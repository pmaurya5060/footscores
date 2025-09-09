// src/LeagueSeasons.jsx
import { useParams } from "react-router-dom";
import useLeagues from "./Hooks/useLeagues";

const LeagueSeasons = () => {
  const { leagueId } = useParams(); 
  const LeagueData = useLeagues();

  // find the clicked league
  const league = LeagueData.find((l) => String(l?.league?.id) === leagueId);

  if (!league) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-6">
        Seasons of {league?.league?.name}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {league.seasons.map((s, index) => (
          <div
            key={index}
            className="season-card bg-[#1E2A47]/40 p-4 rounded-xl text-white shadow-md w-60 hover:scale-105 transition-transform duration-500"
          >
            <p>Year: {s?.year}</p>
            <p>Start: <span className="text-sm">{s?.start}</span></p>
            <p>End: <span className="text-sm">{s?.end}</span></p>
            <p>Current: {s?.current ? "✅ Yes" : "❌ No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueSeasons;
