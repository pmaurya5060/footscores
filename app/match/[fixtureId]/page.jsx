"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "../../../components/Loader";
import {
  getFixtureDetails,
  getFixtureEvents,
  getFixtureStatistics,
  getFixtureLineups,
} from "../../../lib/api";

import MatchHeader from "../../../components/match-details/MatchHeader";
import MatchInfo from "../../../components/match-details/MatchInfo";
import MatchEvents from "../../../components/match-details/MatchEvents";
import MatchStatistics from "../../../components/match-details/MatchStatistics";
import MatchLineups from "../../../components/match-details/MatchLineups";

export default function MatchDetailsPage() {
  const params = useParams();
  const fixtureId = params?.fixtureId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [details, setDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [lineups, setLineups] = useState([]);

  useEffect(() => {
    if (!fixtureId) return;

    const fetchMatchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all data in parallel
        const [detailsData, eventsData, statsData, lineupsData] = await Promise.all([
          getFixtureDetails(fixtureId),
          getFixtureEvents(fixtureId),
          getFixtureStatistics(fixtureId),
          getFixtureLineups(fixtureId),
        ]);

        if (!detailsData) {
          throw new Error("Match details not found.");
        }

        setDetails(detailsData);
        setEvents(eventsData || []);
        setStatistics(statsData || []);
        setLineups(lineupsData || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load match details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [fixtureId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Loader message="Loading Match Data..." />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-white">
        <p className="text-red-400 text-lg mb-4">{error || "Match not found"}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#535C91] rounded hover:bg-[#535C91]/80 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 text-white max-w-5xl mx-auto px-4 md:px-8 pt-8 space-y-6">

      {/* 1. Header (Scores, Live Status, Teams) */}
      <MatchHeader details={details} events={events} />

      {/* 2. Basic Info (Date, Venue, Referee) */}
      <MatchInfo details={details} />

      {/* 3. Match Events (Goals, Cards, Subs) */}
      {events.length > 0 && <MatchEvents events={events} />}

      {/* 4. Match Statistics */}
      {statistics.length > 0 && <MatchStatistics statistics={statistics} />}

      {/* 5. Lineups */}
      {lineups.length > 0 && <MatchLineups lineups={lineups} />}

      {/* 6. View League Standings Button */}
      {details?.league?.id && (
        <div className="flex justify-center pt-6">
          <Link
            href={`/leagues/${details.league.id}`}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-lg"
          >
            <span>🏆</span> View League Standings
          </Link>
        </div>
      )}

    </div>
  );
}
