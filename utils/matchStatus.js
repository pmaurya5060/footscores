/**
 * All valid match status codes from API-Football and their display values.
 * 
 * Live statuses: the match is in progress.
 * Status short codes come from fixture.status.short
 */

const LIVE_STATUSES = ["1H", "2H", "ET", "P", "LIVE"];

/**
 * Returns a display label and whether the match is currently live.
 *
 * Examples:
 *   status.short = "1H", status.elapsed = 34  →  { label: "34'", isLive: true }
 *   status.short = "HT"                        →  { label: "HT", isLive: false }
 *   status.short = "FT"                        →  { label: "FT", isLive: false }
 *   status.short = "NS"                        →  { label: "NS", isLive: false }
 *
 * @param {Object} status - fixture.status from API
 * @returns {{ label: string, isLive: boolean }}
 */
export function getMatchStatus(status) {
  const short = status?.short || "NS";
  const elapsed = status?.elapsed;

  // Match is currently being played → show elapsed minute
  if (LIVE_STATUSES.includes(short)) {
    return {
      label: elapsed ? `${elapsed}'` : "LIVE",
      isLive: true,
    };
  }

  // Static status codes mapped to human-readable labels
  const STATUS_MAP = {
    NS:   "NS",
    TBD:  "TBD",
    HT:   "HT",
    BT:   "Break",
    FT:   "FT",
    AET:  "AET",
    PEN:  "PEN",
    PST:  "Postponed",
    CANC: "Cancelled",
    ABD:  "Abandoned",
    AWD:  "Awarded",
    WO:   "Walkover",
    SUSP: "Suspended",
    INT:  "Interrupted",
  };

  return {
    label: STATUS_MAP[short] || short,
    isLive: false,
  };
}

/**
 * Quick boolean check — is a match currently in progress?
 * @param {string} short - fixture.status.short
 */
export function isLiveStatus(short) {
  return LIVE_STATUSES.includes(short);
}
