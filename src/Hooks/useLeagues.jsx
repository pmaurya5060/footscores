import { useState,useEffect } from 'react';
const useLeagues = () => {
    const API_KEY="f0ce801abbd1232c6157e1174c8cc5e4";
    const [leagues, setLeagues] = useState([]);

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

  
  return leagues;
}

export default useLeagues