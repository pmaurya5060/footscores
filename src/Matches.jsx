import { useState } from "react";
import Pages from "./Pages";
import usePages from './Hooks/usePages';

const Matches = ({ data}) => {

  const datalength=data?.response?.length;
// console.log(data)
  // const matche =  Object.values(data?.response || {});
  // console.log("hello"+ matche);


  const [pageno,setpageno]=useState(1);
  const { currentData, totalPages } =usePages(data?.response || [],pageno,30);
  // console.log("pageNo in Matches:"+pageno);
  // console.log(currentMatches);

  //individual matches
  const alldata = currentData?.map(matches => {
    //DAte Sexon
    const isoDate = matches?.fixture?.date;
    const date = new Date(isoDate);

    const formattedTime = date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const matchStatus=matches?.fixture?.status?.short;
    let statustime="";
    if(matchStatus===""){
      let statustime="Live";
    };

    //individual matches function return
    return (
      <div 
      className="bg-[#535C91]/20 backdrop-blur-sm p-4 mt-2 rounded-lg w-full h-30 mx-auto text-center flex items-center justify-between text-white hover:scale-105 transition-transform duration-500 " 
      key={matches?.fixture?.id}
      >

        <img src={matches?.teams?.home?.logo} alt="home" className="w-12 h-12" />

        {/* Main item  */}
        <div className="flex flex-col items-center flex-1 px-2">
          <h1 className="text-sm text-gray-300 mb-1">{matches?.league?.name}</h1>

          <div className="flex items-center justify-center gap-4">
            <span className="text-right">
              <span className="block text-sm">{matches?.teams?.home?.name}</span>
              <span className="text-3xl font-bold">{matches?.goals?.home}</span>
            </span>

            <span className="text-xl font-bold ">-</span>

            <span className="text-left">
              <span className="block text-sm">{matches?.teams?.away?.name}</span>
              <span className="text-3xl font-bold">{matches?.goals?.away}</span>
            </span>
          </div>

          <div className="mt-2 text-xs text-gray-300">
            <h2 className="text-[#ffcc00] font-semibold">
             {matches?.fixture?.status?.long} {statustime}
            </h2>
           <h3>{formattedTime}</h3>
          </div>
        </div>

        <img src={matches?.teams?.away?.logo} alt="away" className="w-12 h-12" />

      </div>
      
    );
  });


  //Matches return
  return (
    <>
      <p className="matchesHeading bg-none text-white text-2xl m-2.5 px-32">
        FIXTURES, SCOREBOARD AND RESULTS
      </p>
      <div className="grid grid-cols-2 px-34 py-4 gap-x-4">{alldata}</div>
      <Pages pageno={pageno} setpageno={setpageno} datalength={datalength}/>
    </>
  );
};

export default Matches;
