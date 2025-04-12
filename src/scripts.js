const { Op } = require("sequelize");
const connection = require("./database");
const Like = require("./models/Like");
const Media = require("./models/Media");
const User = require("./models/User");

module.exports = {
    async getUsersAndMedias(reviews){
        const userIds = reviews.map(x=> x = { id: x.userId});
        const users = await User.findAll({ where: { [Op.or]: userIds }});
    
        const mediaIds = reviews.map(x=> x = { id: x.mediaId});
        const medias = await Media.findAll({ where: { [Op.or]: mediaIds }});

        const reviewsIds = reviews.map(x=> x = { reviewId: x.id});
        const likes = await Like.findAll({ where: { [Op.or]: reviewsIds } });
    
        let response = []
    
        reviews.forEach(r => {
            let user = users.find(x=> x.id == r.userId);
            let media = medias.find(x=> x.id == r.mediaId);
            let like = likes.filter(x=> x.reviewId == r.id);
            response.push({ ...r.dataValues, username: user.nickName, imagePoster: media.imagePoster, likeCount: like.length })
        });

        return response;
    },

    async getSimilarMedia(media){
        const tags = media.tags.split(', ');
        const tagsFilter = tags.map(x=> x = { tags: { [Op.iLike]: `%${x}%` }});
        const medias = await Media.findAll({ where: { id: { [Op.not]: media.id}, type: media.type , [Op.or]: tagsFilter }, order: connection.random(), limit: 3 });

        return medias.map(m=> x= { id: m.id, title: m.title, imagePoster: m.imagePoster, score: m.score })
    }
}
