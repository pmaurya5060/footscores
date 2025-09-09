import useLeagues from './Hooks/useLeagues';
// import {useState} from 'react';

const LeagueDetails = () => {
    const LeagueData=useLeagues();
    // console.log("League details log ",LeagueData);
    // console.log(LeagueData[0]?.league?.name);
    // console.log(LeagueData[0].seasons);
  

  const alldata=LeagueData.map(l => {


    return(
      <div 
        key={l?.league?.id}
        className="indvid_league bg-[#535C91]/20 backdrop-blur-sm p-4 rounded-2xl w-64 h-40 text-white flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer"
        
        >

        <div className="name">{l?.league.name}</div>

      </div>
    )
});

  return(
    <div className="lcontainer flex flex-wrap gap-6 justify-center p-6 my-25">{alldata}</div>
  )
}

export default LeagueDetails