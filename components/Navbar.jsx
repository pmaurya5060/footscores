"use client";

import Link from "next/link";
import TeamsDropdown from "./TeamsDropdown";
import { useState } from "react";

const Navbar = () => {
  const [isopen, setisopen] = useState(false);

  return (
    <header className="navbar flex justify-between items-center px-5 py-[12px] rounded-[10px] text-white font-sans my-1.5 backdrop-blur-md top-0 fixed z-50 w-[90%] left-[5%] border border-white/10 bg-black/20">
      <Link href="/" className="logo text-[20px] font-bold cursor-pointer bg-inherit hover:opacity-80">
        ⚽ FootScores
      </Link>

      <button className="md:hidden text-2xl outline-none" onClick={() => setisopen(!isopen)}>
        {isopen ? "✖" : "☰"}
      </button>

      <nav
        className={`${
          isopen
            ? "nav-links flex flex-col md:flex-row gap-[15px] md:gap-[25px] bg-black/90 md:bg-transparent absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto p-4 md:p-0 rounded-lg md:rounded-none border border-white/10 md:border-none z-50"
            : "hidden md:flex md:flex-row md:gap-[25px] bg-inherit"
        }`}
      >
        <div className="dropdown">
          <Link href="/" className="dropbtn hover:text-[#ffcc00] transition-colors">
            Matches
          </Link>
        </div>

        <TeamsDropdown />

        <div className="dropdown">
          <Link href="/leagues" className="dropbtn hover:text-[#ffcc00] transition-colors">
            Competitions
          </Link>
          <div className="dropdown-content bg-[#1E2A47]/95 border border-white/10 rounded-lg p-2 mt-1">
            <Link href="/leagues/39" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
              Premier League
            </Link>
            <Link href="/leagues/140" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
              La Liga
            </Link>
            <Link href="/leagues/2" className="hover:bg-white/10 block px-3 py-2 rounded text-white text-sm">
              Champions League
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
