const fetch = require('node-fetch');

const API_KEY = "c72cd25eb835aa78f74631d038086f03";
const BASE_URL = "https://v3.football.api-sports.io";

const getHeaders = () => {
  const headers = {};
  headers["x-apisports-key"] = API_KEY;
  return headers;
};

async function test() {
  const fixtureId = "1035041"; // Use any fixtureId, or let's test a couple
  try {
    const res = await fetch(`${BASE_URL}/fixtures?id=${fixtureId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
