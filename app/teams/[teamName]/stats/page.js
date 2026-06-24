"use client";
import React from "react";

const TeamStats = ({ params }) => {
  const { teamName } = React.use(params);
  const decodedName = decodeURIComponent(teamName);

  return (
    <div className="text-white p-6 pt-28 min-h-screen flex flex-col items-center">
      <div className="bg-[#1E2A47]/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-200">Statistics for {decodedName}</h1>
        <p className="text-gray-300 mt-4">Stats placeholder content</p>
      </div>
    </div>
  );
};

export default TeamStats;
