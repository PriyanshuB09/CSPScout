
const TBA_API_KEY = 'SEBnxxnnJLdphYR5st0YsYBFa3C6qvyfrQgQHf1BKMukhkpbNDOmEw9HVvDnQQ61';

const requestTBASchedule = async (eventKey) => {
    try {
        const response = await fetch(
          `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
          {
            method: "GET",
            headers: {
              "X-TBA-Auth-Key": TBA_API_KEY
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        const formattedMatches = data.map((match) => ({
          id: match.key,
          matchNumber: match.match_number,
          compLevel: match.comp_level.toUpperCase(),
          time: new Date(match.time * 1000).toLocaleString(),
          redTeams: match.alliances.red.team_keys.map(t => t.replace("frc", "")),
          blueTeams: match.alliances.blue.team_keys.map(t => t.replace("frc", "")),
          score: `${match.alliances.red.score} - ${match.alliances.blue.score}`
        }));

        const qualificationFormattedMatches = formattedMatches.filter(match => match.compLevel == 'QM');

        return qualificationFormattedMatches;
      } catch (error) {
        console.error("Error:", error);
      }
}

export default requestTBASchedule;