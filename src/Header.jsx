import TeamsDropdown from "./TeamsDropdown";
import { Link

 } from "react-router-dom";
const Header=() =>{
  return (
    <header className="navbar flex justify-between items-center px-5 py-[12px] rounded-[10px] text-white font-sans my-1.5 backdrop-blur-md top-0 fixed z-50 w-[90%] left-[5%] border border-white/10">
      <div className="logo text-[20px] font-bold cursor-pointer bg-inherit">⚽ FootScores</div>

      <nav className="nav-links flex gap-[25px] bg-inherit">
        <div className="dropdown">
          <Link to="/" className="deopbtn">Matches</Link>
          <div className="dropdown-content">
            <a href="#">Live</a>
            <a href="#">Upcoming</a>
            <a href="#">Results</a>
          </div>
        </div>

        <TeamsDropdown />

        <div className="dropdown">
          <button className="dropbtn">Competitions</button>
          <div className="dropdown-content">
            <a href="#">Premier League</a>
            <a href="#">La Liga</a>
            <a href="#">Champions League</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
