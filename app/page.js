"use client";

import { useState, useEffect } from "react";
import DatesStrip from "../components/DatesStrip";
import MatchCard from "../components/MatchCard";
import Loader from "../components/Loader";
import { getFixtures } from "../lib/api";
import { groupAndSortFixtures } from "../utils/helpers";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [matchesList, setMatchesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize selectedDate on mount to avoid hydration mismatch
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  // Fetch matches whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getFixtures(selectedDate);
        setMatchesList(result?.response || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  // Group and sort all fixtures by league, with priority ordering
  const groupedLeagues = groupAndSortFixtures(matchesList);

  return (
    <div className="min-h-screen pb-24 text-white">

      {/* Date Selector Strip */}
      <DatesStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Page Heading */}
      <p className="matchesHeading text-white text-xl sm:text-2xl md:text-3xl m-2.5 px-4 sm:px-8 md:px-16 text-center font-bold tracking-wide">
        FIXTURES, SCOREBOARD AND RESULTS
      </p>

      {/* Main Content */}
      {loading ? (
        <Loader message="Loading matches..." />
      ) : error ? (
        <p className="text-center text-red-400 mt-8 text-lg">
          Error loading data: {error.message}
        </p>
      ) : groupedLeagues.length === 0 ? (
        <p className="text-center text-gray-400 mt-8 text-lg">
          No matches scheduled for this date.
        </p>
      ) : (
        <div className="px-4 md:px-8 lg:px-16 py-4 space-y-6 max-w-5xl mx-auto">
          {groupedLeagues.map((group) => (
            <div
              key={group.leagueName}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >

              {/* ── League Header ── */}
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border-b border-white/10">
                {group.leagueLogo && (
                  <img
                    src={group.leagueLogo}
                    alt={group.leagueName}
                    className="w-7 h-7 object-contain flex-shrink-0"
                  />
                )}
                <h2 className="text-base font-bold text-yellow-300 tracking-wide">
                  {group.leagueName}
                </h2>
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  {group.matches.length} match{group.matches.length !== 1 ? "es" : ""}
                </span>
              </div>

              {/* ── Sorted Matches List ── */}
              <div className="flex flex-col gap-0 divide-y divide-white/5">
                {group.matches.map((match) => (
                  <MatchCard key={match.fixture.id} match={match} />
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
