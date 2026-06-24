const API_KEY = "f0ce801abbd1232c6157e1174c8cc5e4";
const BASE_URL = "https://v3.football.api-sports.io";

const getHeaders = () => {
  const headers = new Headers();
  headers.append("x-apisports-key", API_KEY);
  headers.append("x-rapidapi-host", "v3.football.api-sports.io");
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
