const API_KEY = "f0ce801abbd1232c6157e1174c8cc5e4";
const BASE_URL = "https://v3.football.api-sports.io";

const getHeaders = () => {
  const headers = new Headers();
  headers.append("x-apisports-key", API_KEY);
  return headers;
};

/**
 * Fetch matches/fixtures for a specific date (format: YYYY-MM-DD)
 */
export async function getFixtures(date) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
      method: "GET",
      headers: getHeaders(),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching fixtures for ${date}:`, error);
    throw error;
  }
}

/**
 * Fetch all leagues
 */
export async function getLeagues() {
  try {
    const res = await fetch(`${BASE_URL}/leagues`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error("Error fetching leagues:", error);
    throw error;
  }
}

/**
 * Fetch team venue and detailed info by team name
 */
export async function getTeamDetails(teamName) {
  try {
    const res = await fetch(`${BASE_URL}/teams?name=${teamName}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error(`Error fetching team details for ${teamName}:`, error);
    throw error;
  }
}

/**
 * Fetch detailed info for a single match
 */
export async function getFixtureDetails(fixtureId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures?id=${fixtureId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error(`Error fetching fixture details for ${fixtureId}:`, error);
    throw error;
  }
}

/**
 * Fetch events (goals, cards, substitutions) for a fixture
 */
export async function getFixtureEvents(fixtureId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/events?fixture=${fixtureId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error(`Error fetching fixture events for ${fixtureId}:`, error);
    throw error;
  }
}

/**
 * Fetch match statistics for a fixture
 */
export async function getFixtureStatistics(fixtureId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error(`Error fetching fixture statistics for ${fixtureId}:`, error);
    throw error;
  }
}

/**
 * Fetch lineups for a fixture
 */
export async function getFixtureLineups(fixtureId) {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/lineups?fixture=${fixtureId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.error(`Error fetching fixture lineups for ${fixtureId}:`, error);
    throw error;
  }
}
