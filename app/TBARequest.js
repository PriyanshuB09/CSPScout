
const TBA_API_KEY = 'I8SFWQgVdTFyAp6jd3PKayjLVFdBkodMFCgPQdX6kmV5atDFK6mdmnblftuGynPl';

const requestTBASchedule = async (eventKey) => {
    try {
        const response = await fetch(
          `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches/simple`,
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
        // const formattedMatches = data.map((match) => ({
        //   id: match.key,
        //   matchNumber: match.match_number,
        //   compLevel: match.comp_level.toUpperCase(),
        //   red: match.alliances.red.team_keys.map(t => t.replace("frc", "")),
        //   blue: match.alliances.blue.team_keys.map(t => t.replace("frc", "")),
        //   event: 
        // }));

        const returnObject = data.map((match) => ({
            qual: match.match_number,
            event: eventKey,
            red: match.alliances.red.team_keys.map(t => t.replace('frc', '')),
            blue: match.alliances.blue.team_keys.map(t => t.replace('frc', '')),
            compLevel: match.comp_level.toUpperCase()
        }));

        const formattedMatches = returnObject.filter(match => match.compLevel == 'QM');

        return formattedMatches;
      } catch (error) {
        console.error("Error:", error);
      }
}

export default requestTBASchedule;