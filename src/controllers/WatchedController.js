const Media = require('../models/Media');
const User = require('../models/User');
const Watched = require('../models/Watched');

module.exports = {
    async watchMedia(req, res){
        const { userId, mediaId }  = req.params;

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const media = await Media.findByPk(mediaId);

        if(!media){
            return res.status(400).json({ error: "Media not found"});
        }

        const hasWatched = await Watched.findOne({ where: { userId, mediaId } })

        if(hasWatched)
        {
            return res.status(400).json({ error: "Cannot watch twice"});
        }

        const watched = await Watched.create({ userId, mediaId });

        return res.json(watched);
    },

    async getByUserId(req, res){
        const { userId }  = req.params;

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const watched = await Watched.findAll({ where : { userId } });

        return res.json(watched);
    },

    async getByMediaId(req, res){
        const { mediaId }  = req.params;

        const media = await Media.findByPk(mediaId);

        if(!media){
            return res.status(400).json({ error: "Media not found"});
        }

        const watched = await Watched.findAll({ where : { mediaId } });

        return res.json(watched);
    },

    async unWatch(req, res){
        const { userId, mediaId }  = req.params;

        const watched = await Watched.findOne({ where: { userId, mediaId }});

        if(!watched)
        {
            return res.status(400).json({ error: "Media should be watched"});
        }

        await Watched.destroy({ where: { id: watched.id } });

        return res.json({});
    },

    async getById(req, res){
        const { userId, mediaId }  = req.params;

        const watched = await Watched.findOne({ where: { userId, mediaId }});

        if(!watched){
            return res.status(400).json({ error: "Watch not found"});
        }

        return res.json(watched);
    },
}