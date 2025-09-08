import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TeamsDropdown = () => {
  const [teamQuery, setTeamQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && teamQuery.trim()) {
      navigate(`/teams/${teamQuery}`);
      setTeamQuery(""); 
    }
  };
  return (
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
  );
};

export default TeamsDropdown;
