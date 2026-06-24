"use client";
import React from "react";

export default function MatchEvents({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Match Events</h3>

      <div className="flex flex-col gap-3">
        {events.map((event, index) => {
          const minute = event.time.elapsed + (event.time.extra ? `+${event.time.extra}` : "");
          let EventIcon = "⚽";
          
          if (event.type === "Card") {
            EventIcon = event.detail === "Yellow Card" ? "🟨" : "🟥";
          } else if (event.type === "subst") {
            EventIcon = "🔄";
          } else if (event.type === "Var") {
            EventIcon = "📺";
          }

          return (
            <div
              key={index}
              className="flex items-center gap-4 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors"
            >
              <div className="w-12 text-center font-bold text-yellow-300">
                {minute}'
              </div>
              
              <div className="text-xl">{EventIcon}</div>

              <div className="flex flex-col flex-1">
                <span className="font-semibold text-white">
                  {event.player?.name}
                </span>
                {event.type === "subst" && event.assist?.name && (
                  <span className="text-xs text-gray-400">
                    in for {event.assist.name}
                  </span>
                )}
                {event.type === "Goal" && event.assist?.name && (
                  <span className="text-xs text-gray-400">
                    assist by {event.assist.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 hidden md:block">
                  {event.team?.name}
                </span>
                {event.team?.logo && (
                  <img
                    src={event.team.logo}
                    alt={event.team.name}
                    className="w-6 h-6 object-contain"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
