import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import TeamDetails from "./TeamDetails"; 
import TeamStats from "./TeamStats";
import "./index.css";
import LeagueDetails from "./LeagueDetails";
import LeagueSeasons from "./LeagueSeasons";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/teams/:teamName" element={<TeamDetails />} />
        <Route path="/teams/:teamName/stats" element={<TeamStats />} />
        <Route path="/Leagues" element={<LeagueDetails/>}/>
        <Route path="/leagues/:leagueId" element={<LeagueSeasons />} />
      </Routes>
    </Router>
  );
}

export default App;
