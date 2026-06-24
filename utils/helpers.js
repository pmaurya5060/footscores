export const LEAGUE_PRIORITY = [
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Ligue 1",
  "Ligue 2",
  "Jupiler Pro League"
];

/**
 * Groups raw football fixtures by league name, sorts leagues according to a priority
 * list (and alphabetically for others), and sorts matches in each league by kickoff time.
 * 
 * @param {Array} fixtures - Raw fixture array from the API
 * @returns {Array} Array of grouped leagues containing their sorted matches
 */
export function groupAndSortFixtures(fixtures = []) {
  if (!Array.isArray(fixtures) || fixtures.length === 0) return [];

  // Step 1: Group fixtures by league name using Array.prototype.reduce()
  const grouped = fixtures.reduce((acc, fixture) => {
    const leagueName = fixture?.league?.name;
    const leagueLogo = fixture?.league?.logo;

    if (!leagueName) return acc;

    // If this league hasn't been added to the accumulator, initialize it
    if (!acc[leagueName]) {
      acc[leagueName] = {
        leagueName,
        leagueLogo: leagueLogo || "",
        matches: []
      };
    }

    // Add the current match to the matches array
    acc[leagueName].matches.push(fixture);
    return acc;
  }, {});

  // Convert the grouped hash map into a flat array of values
  const groupedArray = Object.values(grouped);

  // Step 2: Sort fixtures inside each league by kickoff time (earliest first)
  groupedArray.forEach((group) => {
    group.matches.sort((a, b) => {
      const dateA = new Date(a?.fixture?.date || 0);
      const dateB = new Date(b?.fixture?.date || 0);
      return dateA - dateB; // Ascending order (earliest matches first)
    });
  });

  // Step 3: Sort the league groups by priority index, fallback to alphabetical sorting
  groupedArray.sort((a, b) => {
    const indexA = LEAGUE_PRIORITY.indexOf(a.leagueName);
    const indexB = LEAGUE_PRIORITY.indexOf(b.leagueName);

    // Case 1: Both leagues are in the priority list, sort by their priority indices
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // Case 2: Only league A is in the priority list, place it first
    if (indexA !== -1) return -1;

    // Case 3: Only league B is in the priority list, place it first
    if (indexB !== -1) return 1;

    // Case 4: Neither league is prioritized, sort them alphabetically
    return a.leagueName.localeCompare(b.leagueName);
  });

  return groupedArray;
}
