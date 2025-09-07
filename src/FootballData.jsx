import React, { useEffect, useState } from "react";

function FootballData({selectedDate,setData}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "f0ce801abbd1232c6157e1174c8cc5e4"); 
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://v3.football.api-sports.io/fixtures?date=${selectedDate}`, requestOptions)
      .then((response) => response.json()) // parse JSON
      .then((result) => {
        setData(result); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [selectedDate]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  

  return (
    <div>
    </div>
  );
}

export default FootballData;
