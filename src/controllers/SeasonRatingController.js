const SeasonRating = require("../database/models/SeasonRating");
const Player = require("../database/models/Player");

module.exports = {
  async createData(req, res) {
    let ratings = [];
    const players = await Player.findAll();

    for (let index = 0; index < players.length; index++) {
      const player = players[index];

      const response = await fetch(
        `http://www.sofascore.com/api/v1/player/${player.id}/unique-tournament/325/season/72034/ratings`
      );
      if (response.status !== 200) {
        continue;
      }
      const data = await response.json();
      let currentRatings = data.seasonRatings;
      currentRatings = currentRatings.filter(
        (rating) => rating.event.tournament.id === 83
      );

      currentRatings = currentRatings.map((rating) => {
        return {
          playerId: player.id,
          matchId: rating.eventId,
          rating: rating.rating,
          isHome: rating.isHome,
        };
      });

      ratings.push(...currentRatings);
      console.log(player.id);
      console.log(ratings.length);
    }

    ratings.forEach(async (rating) => {
      await SeasonRating.upsert({ ...rating });
    });

    return res.json();
  },
};
