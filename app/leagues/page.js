"use client";

import useLeagues from "../../hooks/useLeagues";
import Link from "next/link";
import { useState } from "react";
import usePages from "../../hooks/usePages";
import Pages from "../../components/Pages";
import Loader from "../../components/Loader";

const LeaguesPage = () => {
  const LeagueData = useLeagues();
  const [pageno, setpageno] = useState(1);

  const { currentData } = usePages(LeagueData, pageno, 30);

  if (LeagueData.length === 0) {
    return (
      <div className="min-h-screen pt-28 text-white">
        <Loader message="Loading competitions..." />
      </div>
    );
  }

  const alldata = currentData.map((l) => (
    <Link
      key={l?.league?.id}
      href={`/leagues/${l?.league?.id}`}
      className="indvid_league backdrop-blur-sm p-4 rounded-2xl w-64 h-50 text-white flex items-center justify-center gap-2.5 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer border border-white/10 hover:border-white/30 bg-[#1E2A47]/40"
    >
      <div className="name text-yellow-200 font-bold text-center flex-1">{l?.league?.name}</div>
      <div className="logo w-24 h-32 flex items-center justify-center flex-shrink-0">
        <img src={l?.league?.logo} alt={l?.league?.name} className="max-w-full max-h-full object-contain" />
      </div>
    </Link>
  ));

  return (
    <div className="min-h-screen pb-24 pt-28 flex flex-col items-center">
      <div
        className="lcontainer flex flex-wrap gap-6 justify-center p-6 w-[90%] rounded-2xl bg-cover bg-center transition-colors duration-500 border border-white/10"
        style={{ backgroundImage: "url('/assets/ChatGPT Image Sep 9, 2025, 09_18_33 PM.png')" }}
      >
        {alldata}
      </div>
      <Pages pageno={pageno} setpageno={setpageno} datalength={LeagueData.length} />
    </div>
  );
};

export default LeaguesPage;
