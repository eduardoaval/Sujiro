const Player = require("../database/models/Player");
const Team = require("../database/models/Team");
const Rating = require("../database/models/SeasonRating");
const Match = require("../database/models/Match");

module.exports = {
  async getPlayers(req, res) {
    const query = req.query;
    const players = await Player.findAll();
    const teams = await Team.findAll();
    const ratings = await Rating.findAll();
    const matches = await Match.findAll();

    const response = players.map((player) => {
      const team = teams.find((team) => team.id === player.teamId);
      const orderRating = ratings
        .filter((r) => r.playerId === player.id)
        .map((r) => {
          const match = matches.find((m) => m.id === r.matchId);
          return {
            ...r.dataValues,
            match,
          };
        })
        .sort((a, b) => {
          return b.match.startTimestamp - a.match.startTimestamp;
        });
      const lastRating = orderRating[0];
      let deltaRating = 0;

      if (lastRating && orderRating[1]) {
        deltaRating = lastRating.rating - orderRating[1].rating;
        deltaRating = Number((Math.round(deltaRating * 100) / 100).toFixed(2));
      }
      return {
        ...player.dataValues,
        team: {
          ...team.dataValues,
        },
        lastRating,
        deltaRating,
      };
    });

    return res.json(response);
  },

  async createData(req, res) {
    let page = 1;
    const size = 100;
    const players = [];
    while (page !== 0) {
      const response = await fetch(
        `http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/statistics?limit=${size}&order=-rating&offset=${
          size * (page - 1)
        }&accumulation=total&group=summary`
      );
      if (response.status !== 200) {
        return res.status(500).json({ error: "Error fetching data from API" });
      }
      const data = await response.json();

      const currentPlayers = data.results.map((player) => {
        return {
          id: player.player.id,
          name: player.player.name,
          slug: player.player.slug,
          image: `https://img.sofascore.com/api/v1/player/${player.player.id}/image`,
          teamId: player.team.id,
          rating: player.rating,
          userCount: player.player.userCount,
        };
      });

      players.push(...currentPlayers);
      console.log(players.length);
      if (data.results.length < size || data.pages == page) {
        break;
      }
      page++;
    }

    for (let index = 0; index < players.length; index++) {
      const player = players[index];

      console.log(player.id);

      let response = await fetch(
        `http://www.sofascore.com/api/v1/player/${player.id}/statistics`
      );
      let data = await response.json();
      const currentSeason = data.seasons.find(
        (s) => s.year === "2025" && s.uniqueTournament.id === 325
      );

      const playerStatistics = currentSeason.statistics;

      players[index] = {
        ...playerStatistics,
        ...player,
      };

      response = await fetch(
        `http://www.sofascore.com/api/v1/player/${player.id}/characteristics`
      );
      data = await response.json();

      const playerPosition = data.positions[0];

      players[index] = {
        ...players[index],
        position: playerPosition,
      };

      response = await fetch(
        `http://www.sofascore.com/api/v1/player/${player.id}/attribute-overviews`
      );
      data = await response.json();

      if (data.playerAttributeOverviews == null) {
        continue;
      }

      const playerAttributes = data.playerAttributeOverviews[0];

      players[index] = {
        ...playerStatistics,
        ...playerAttributes,
        ...players[index],
        positionSimple: playerAttributes.position,
      };
    }

    players.forEach(async (player) => {
      await Player.upsert(player);
    });

    return res.json();
  },
};
