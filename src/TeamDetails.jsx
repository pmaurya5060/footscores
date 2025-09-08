import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

const API_KEY = "f0ce801abbd1232c6157e1174c8cc5e4"; 

const TeamDetails = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState(null);
  

  // Fetch team 
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

  if (!team) return <p className="text-white m-4">Loading team info...</p>;

  return (
    <div className="text-white p-4 mt-16">
      <h1 className="text-3xl font-bold">{team.team.name}</h1>
      <img src={team.team.logo} alt={team.team.name} className="w-20 my-2" />

      <h2 className="text-xl mt-4">Venue</h2>
      <p>{team.venue.name} - {team.venue.city}</p>
      <p>Capacity: {team.venue.capacity}</p>
    </div>
  );
};

export default TeamDetails;
