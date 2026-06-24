"use client";
import React, { useState, useEffect } from "react";
import { getTeamDetails } from "../../../lib/api";
import Loader from "../../../components/Loader";

const TeamDetails = ({ params }) => {
  const { teamName } = React.use(params);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const decodedName = decodeURIComponent(teamName);
        const data = await getTeamDetails(decodedName);
        setTeam(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [teamName]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 text-white">
        <Loader message="Loading team info..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 text-center text-red-400">
        Error loading team: {error.message}
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen pt-28 text-center text-white text-xl">
        No team found with the name "{decodeURIComponent(teamName)}".
      </div>
    );
  }

  return (
    <div className="text-white p-6 pt-28 min-h-screen flex flex-col items-center">
      <div className="bg-[#1E2A47]/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-lg hover:scale-102 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-yellow-200">{team.team.name}</h1>
        <img
          src={team.team.logo}
          alt={team.team.name}
          className="w-32 h-32 mx-auto my-6 object-contain"
        />

        <div className="text-left border-t border-white/10 pt-4 mt-4">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Venue</h2>
          <p><span className="text-gray-400">Stadium Name:</span> {team.venue.name}</p>
          <p><span className="text-gray-400">City:</span> {team.venue.city}</p>
          <p><span className="text-gray-400">Capacity:</span> {team.venue.capacity?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
