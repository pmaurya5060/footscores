import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import TeamDetails from "./TeamDetails"; // new page
import TeamStats from "./TeamStats";     // new page
import "./index.css";
import LeagueDetails from "./LeagueDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/teams/:teamName" element={<TeamDetails />} />
        <Route path="/teams/:teamName/stats" element={<TeamStats />} />
        <Route path="/Leagues" element={<LeagueDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
