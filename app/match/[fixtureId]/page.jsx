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
import MatchStandings from "../../../components/match-details/MatchStandings";
import MatchH2H from "../../../components/match-details/MatchH2H";

export default function MatchDetailsPage() {
  const params = useParams();
  const fixtureId = params?.fixtureId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [details, setDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [activeTab, setActiveTab] = useState("Summary");

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
          setError("Match details not found.");
          return;
        }

        setDetails(detailsData);
        setEvents(eventsData || []);
        setStatistics(statsData || []);
        setLineups(lineupsData || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load match details. Please try again later.");
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

  const tabs = ["Info", "Summary", "Stats", "Line-ups", "Table", "H2H"];

  return (
    <div className="min-h-screen pb-24 text-white max-w-5xl mx-auto px-4 md:px-8 pt-28 space-y-6">

      {/* 1. Header (Scores, Live Status, Teams) */}
      <MatchHeader details={details} events={events} />

      {/* 2. Flex Tab Bar */}
      <div className="border-b border-white/10 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-8 min-w-max px-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 text-sm md:text-base font-semibold border-b-2 transition-all duration-300 relative ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Conditionally Render Component based on activeTab */}
      <div className="pt-2">
        {activeTab === "Info" && <MatchInfo details={details} />}
        
        {activeTab === "Summary" && (
          events.length > 0 ? (
            <MatchEvents events={events} />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
              No match events (goals, cards, substitutions) recorded.
            </div>
          )
        )}
        
        {activeTab === "Stats" && (
          statistics.length > 0 ? (
            <MatchStatistics statistics={statistics} />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
              No statistics available for this match.
            </div>
          )
        )}
        
        {activeTab === "Line-ups" && (
          lineups.length > 0 ? (
            <MatchLineups lineups={lineups} />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
              No lineups available for this match.
            </div>
          )
        )}
        
        {activeTab === "Table" && (
          details?.league?.id && details?.league?.season ? (
            <MatchStandings 
              leagueId={details.league.id} 
              season={details.league.season} 
              currentTeamId={details.teams?.home?.id}
            />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
              League table standings are not available.
            </div>
          )
        )}
        
        {activeTab === "H2H" && (
          details?.teams?.home?.id && details?.teams?.away?.id ? (
            <MatchH2H 
              homeTeamId={details.teams.home.id} 
              awayTeamId={details.teams.away.id} 
            />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center text-gray-400">
              Head-to-head records are not available.
            </div>
          )
        )}
      </div>

    </div>
  );
}
