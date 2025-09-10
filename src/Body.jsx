import Dates from "./Dates";
import Matches from "./Matches";
import { useState } from "react";
import FootballData from "./FootballData";
// import Pages from "./Pages";

const Body = () => {
  const [data,setData]=useState(null);
  // console.log("body "+data)
  const today = new Date();

  const formatForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const [selectedDate, setSelectedDate] = useState(formatForApi(today));


  


  return (
    <>
      <Dates today={today} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Matches selectedDate={selectedDate} data={data} />
      <FootballData selectedDate={selectedDate}  setData={setData} />
    </>
  );
};

export default Body;
