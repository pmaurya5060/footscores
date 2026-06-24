"use client";

import { useState, useEffect } from "react";
import DatesStrip from "../components/DatesStrip";
import MatchCard from "../components/MatchCard";
import Pages from "../components/Pages";
import Loader from "../components/Loader";
import { getFixtures } from "../lib/api";
import usePages from "../hooks/usePages";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageno, setpageno] = useState(1);

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
        setData(result);
        setpageno(1); // Reset page number on date change
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  // Paginate matches list
  const matchesList = data?.response || [];
  const { currentData: paginatedMatches } = usePages(matchesList, pageno, 30);

  return (
    <div className="min-h-screen pb-24 text-white">
      {/* Dates Strip */}
      <DatesStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Heading */}
      <p className="matchesHeading text-white text-xl sm:text-2xl md:text-3xl m-2.5 px-4 sm:px-8 md:px-16 text-center font-bold">
        FIXTURES, SCOREBOARD AND RESULTS
      </p>

      {/* Matches Content */}
      {loading ? (
        <Loader message="Loading matches..." />
      ) : error ? (
        <p className="text-center text-red-400 mt-8">Error loading data: {error.message}</p>
      ) : paginatedMatches.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No matches scheduled for this date.</p>
      ) : (
        <div className="flex flex-wrap px-4 md:px-8 lg:px-16 py-4 gap-4 justify-center">
          {paginatedMatches.map((match) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && matchesList.length > 0 && (
        <Pages datalength={matchesList.length} pageno={pageno} setpageno={setpageno} />
      )}
    </div>
  );
}
