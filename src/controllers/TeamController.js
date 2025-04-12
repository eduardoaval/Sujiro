const Team = require("../database/models/Team");

module.exports = {
  async createData(req, res) {
    const response = await fetch(
      `http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/standings/total`
    );
    if (response.status !== 200) {
      return res.status(500).json({ error: "Error fetching data from API" });
    }
    const teams = await response.json();
    teams.standings[0].rows.forEach(async (team) => {
      await Team.create({
        id: team.team.id,
        name: team.team.name,
        slug: team.team.slug,
        shortName: team.team.shortName,
        gender: team.team.gender,
        nameCode: team.team.nameCode,
        country: team.team.country.name,
        image: `https://img.sofascore.com/api/v1/team/${team.team.id}/image`,
        teamColorPrimary: team.team.teamColors.primary,
        teamColorSecondary: team.team.teamColors.secondary,
        teamColorText: team.team.teamColors.text,
        userCount: team.team.userCount,
      });
    });

    return res.json();
  },
};
