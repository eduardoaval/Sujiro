const Player = require("../database/models/Player");
const Team = require("../database/models/Team");

module.exports = {
  async getPlayers(req, res) {
    const players = await Player.findAll();
    const teams = await Team.findAll();

    const response = players.map((player) => {
      const team = teams.find((team) => team.id === player.teamId);
      return {
        ...player.dataValues,
        team: {
          ...team.dataValues,
        },
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
