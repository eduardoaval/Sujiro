const Match = require("../database/models/Match");

module.exports = {
  async createData(req, res) {
    let matches = [];

    for (let index = 1; index <= 38; index++) {
      const response = await fetch(
        `http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/events/round/${index}`
      );
      const data = await response.json();
      const currentMatches = data.events.map((match) => {
        return {
          slug: match.slug,
          status: match.status.description,
          customId: match.customId,
          startTimestamp: match.startTimestamp,
          round: match.roundInfo.round,
          winner: match.winnerCode,
          homeScore: match.homeScore.current,
          awayScore: match.awayScore.current,
          homeTeamId: match.homeTeam.id,
          awayTeamId: match.awayTeam.id,
        };
      });
      matches.push(...currentMatches);
      console.log(index);
      console.log(matches.length);
    }

    matches.forEach(async (player) => {
      await Match.create({ ...player });
    });

    return res.json();
  },
};
