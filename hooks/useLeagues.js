import { useState, useEffect } from "react";
import { getLeagues } from "../lib/api";

const useLeagues = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeagues();
  }, []);

  return leagues;
};

export default useLeagues;
