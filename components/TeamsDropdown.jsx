"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TeamsDropdown = () => {
  const [teamQuery, setTeamQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && teamQuery.trim()) {
      router.push(`/teams/${encodeURIComponent(teamQuery.trim())}`);
      setTeamQuery("");
    }
  };

  return (
    <div className="dropdown">
      <button className="dropbtn text-white font-semibold">Teams</button>
      <div className="dropdown-content p-2 bg-[#1E2A47]/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl mt-1">
        <Link href="/teams/Portugal" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
          Portugal
        </Link>
        <Link href="/teams/Germany" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
          Germany
        </Link>
        <Link href="/teams/Brazil" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
          Brazil
        </Link>

        <input
          type="text"
          value={teamQuery}
          onChange={(e) => setTeamQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search Team..."
          className="mt-2 p-1.5 w-[140px] bg-white text-black text-sm rounded outline-none"
        />
      </div>
    </div>
  );
};

export default TeamsDropdown;
