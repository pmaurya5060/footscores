import useLeagues from "./Hooks/useLeagues";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePages from "./Hooks/usePages"
import Pages from "./Pages";

const LeagueDetails = () => {
  const LeagueData = useLeagues();
  // console.log("League details log ",LeagueData);
  // console.log(LeagueData[0]?.league?.name);
  // console.log(LeagueData[0].seasons);

  const [pageno,setpageno]=useState(1);

  const { currentData, totalPages }=usePages(LeagueData,pageno,30); //desatrucaturaing

  const alldata = currentData.map((l) => (
    
    <Link
      key={l?.league?.id}
      to={`/leagues/${l?.league?.id}`}
      className="indvid_league backdrop-blur-sm p-4 rounded-2xl w-64 h-50 text-white flex items-center justify-center gap-2.5 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer border-white"
    >
      <div className="name text-yellow-200">{l?.league?.name}</div>
      <div className="logo w-24 h-32"><img src={l?.league?.logo} alt="logo" /></div>
    </Link>
  ));

  return (
    <>
    <div className="lcontainer flex flex-wrap gap-6 justify-center p-6 my-25 bg-[url('src/assets/ChatGPT Image Sep 9, 2025, 09_18_33 PM.png')] transition-colors duration-500">
      {alldata}
    </div>
    <Pages datalength={LeagueData.length} pageno={pageno} setpageno={setpageno} />
    </>
  );
};

export default LeagueDetails;
