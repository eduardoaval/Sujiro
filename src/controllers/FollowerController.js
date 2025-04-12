const User = require('../models/User');
const Follower = require('../models/Follower');
const { Op } = require('sequelize');

module.exports = {
    async follow(req, res){
        const { followerId, followedId } = req.params;

        const user = await User.findByPk(followerId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const followed = await User.findByPk(followedId);

        if(!followed){
            return res.status(400).json({ error: "Followed not found"});
        }

        if(followedId == followerId)
        {
            return res.status(400).json({ error: "Cannot follow yourself"});
        }

        const hasFollowed = await Follower.findOne({ where: { followerId, followedId } })

        if(hasFollowed)
        {
            return res.status(400).json({ error: "Cannot follow twice"});
        }

        await Follower.create({ followerId, followedId })

        return res.json({});
    },

    async unfollow(req, res) {
        const { followerId, followedId } = req.params;

        const user = await User.findByPk(followerId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const followed = await User.findByPk(followedId);

        if(!followed){
            return res.status(400).json({ error: "Followed not found"});
        }

        if(followedId == followerId)
        {
            return res.status(400).json({ error: "Cannot unfollow yourself"});
        }

        const hasFollowed = await Follower.findOne({ where: { followerId, followedId } })

        if(!hasFollowed)
        {
            return res.status(400).json({ error: "Has to be followed"});
        }

        await Follower.destroy({ where: { id: hasFollowed.id } });

        return res.json({});
    },

    async getfolloweds(req, res) {
        const { followerId } = req.params;

        const user = await User.findByPk(followerId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const followers = await Follower.findAll({ where: { followerId } })
        const ids = followers.map(x=> x = { id: x.followedId});
            
        const users = await User.findAll({ where: { [Op.or]: ids }});

        return res.json(users);
    },

    async getfollowers(req, res) {
        const { followedId } = req.params;

        const user = await User.findByPk(followedId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const followers = await Follower.findAll({ where: { followedId } })
        const ids = followers.map(x=> x = { id: x.followedId});
            
        const users = await User.findAll({ where: { [Op.or]: ids }});

        return res.json(users);
    },

    async getById(req, res) {
        const { followerId, followedId } = req.params;

        const user = await User.findByPk(followedId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const hasFollowed = await Follower.findOne({ where: { followerId, followedId } })
        if(!hasFollowed){
            return res.status(400).json({ error: "User not followed"});
        }

        return res.json(hasFollowed);
    }
}