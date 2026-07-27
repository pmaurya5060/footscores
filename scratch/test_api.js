const API_KEY = "c72cd25eb835aa78f74631d038086f03";
const BASE_URL = "https://v3.football.api-sports.io";

const getHeaders = () => {
  return {
    "x-apisports-key": API_KEY
  };
};

async function test() {
  try {
    const h2hRes = await fetch(`${BASE_URL}/fixtures/headtohead?h2h=33-50&last=10`, {
      method: "GET",
      headers: getHeaders(),
    });
    const h2hData = await h2hRes.json();
    console.log("H2H Response keys:", Object.keys(h2hData));
    console.log("results:", h2hData.results);
    if (h2hData.response?.length > 0) {
      console.log("H2H sample entry:", h2hData.response[0]);
    } else {
      console.log("No H2H matches found for 33-50");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
