import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "f0ce801abbd1232c6157e1174c8cc5e4"; 

const TeamDetails = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState(null);
  const [leagues, setLeagues] = useState([]);

  // Fetch team info
  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(
        `https://v3.football.api-sports.io/teams?name=${teamName}`,
        {
          headers: { "x-apisports-key": API_KEY },
        }
      );
      const data = await res.json();
      setTeam(data.response[0]);
    };
    fetchTeam();
  }, [teamName]);

  // Fetch league info
  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await fetch("https://v3.football.api-sports.io/leagues", {
        headers: { "x-apisports-key": API_KEY },
      });
      const data = await res.json();
      setLeagues(data.response);
    };
    fetchLeagues();
  }, []);

  if (!team) return <p className="text-white m-4">Loading team info...</p>;

  return (
    <div className="text-white p-4 mt-16">
      <h1 className="text-3xl font-bold">{team.team.name}</h1>
      <img src={team.team.logo} alt={team.team.name} className="w-20 my-2" />

      <h2 className="text-xl mt-4">Venue</h2>
      <p>{team.venue.name} - {team.venue.city}</p>
      <p>Capacity: {team.venue.capacity}</p>

      <h2 className="text-xl mt-6">Leagues & Seasons</h2>
      <ul className="list-disc pl-6">
        {leagues.slice(0, 5).map((l) => (
          <li key={l.league.id}>
            {l.league.name} ({l.league.type})  
            <Link
              to={`/teams/${teamName}/stats`}
              className="ml-2 text-yellow-400 underline"
            >
              View Stats
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
