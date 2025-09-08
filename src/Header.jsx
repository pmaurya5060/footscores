import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [teamQuery, setTeamQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && teamQuery.trim()) {
      navigate(`/teams/${teamQuery}`);
      setTeamQuery(""); 
    }
    else{
      alert("Enter the team name correctly niggga");
    }
  };

  return (
    <header className="navbar flex justify-between items-center px-5 py-[12px] rounded-[10px] text-white font-sans my-1.5 backdrop-blur-md top-0 fixed z-50 w-[90%] left-[5%] border border-white/10">
      <div className="logo text-[20px] font-bold cursor-pointer bg-inherit">
        ⚽ FootScores
      </div>

      <nav className="nav-links flex gap-[25px] bg-inherit">
        <div className="dropdown">
          <Link to="/" className="dropbtn">Matches</Link>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Teams</button>
          <div className="dropdown-content p-2">
            <Link to="/teams/Portugal">Portugal</Link>
            <Link to="/teams/Germany">Germany</Link>
            <Link to="/teams/Brazil">Brazil</Link>

            <input
              type="text"
              value={teamQuery}
              onChange={(e) => setTeamQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Team..."
              className="mt-2 p-1 w-[140px] bg-white backdrop-blur-md text-black rounded"
            />
          </div>
        </div>

        <div className="dropdown">
          <Link to="/leagues" className="dropbtn">Competitions</Link>
          <div className="dropdown">
            <div className="dropdown-content">
              <a href="#">Premier League</a>
              <a href="#">La Liga</a>
              <a href="#">Champions League</a>
          </div>
        </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
