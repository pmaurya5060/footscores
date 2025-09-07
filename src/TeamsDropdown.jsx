import { Link } from "react-router-dom";

const TeamsDropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Teams</button>
      <div className="dropdown-content">
        <Link to="/teams/portugal">Portugal</Link>
        <Link to="/teams/spain">Spain</Link>
        <Link to="/teams/germany">Germany</Link>
      </div>
    </div>
  );
};

export default TeamsDropdown;
