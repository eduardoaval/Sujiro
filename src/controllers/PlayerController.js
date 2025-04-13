const Player = require("../database/models/Player");

module.exports = {
  async createData(req, res) {
    let page = 1;
    const size = 100;
    let players = [];
    while (page !== 0) {
      const response = await fetch(
        `http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/statistics?limit=${size}&order=-rating&offset=${
          size * (page - 1)
        }&accumulation=total&group=summary`
      );
      console.log(response.url);
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

    players.forEach(async (player) => {
      await Player.upsert({
        id: player.id,
        name: player.name,
        slug: player.slug,
        image: player.image,
        teamId: player.teamId,
        rating: player.rating,
        userCount: player.userCount,
      });
    });

    return res.json();
  },
};
