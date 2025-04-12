const Like = require('../models/Like');
const Review = require('../models/Review');
const User = require('../models/User');

module.exports = {
    async likeReview(req, res){
        const { userId, reviewId }  = req.params;

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const review = await Review.findByPk(reviewId);

        if(!review){
            return res.status(400).json({ error: "Review not found"});
        }

        const hasLiked = await Like.findOne({ where: { userId, reviewId } })

        if(hasLiked)
        {
            return res.status(400).json({ error: "Cannot like twice"});
        }

        const like = await Like.create({ userId, reviewId });

        return res.json(like);
    },

    async getByUserId(req, res){
        const { userId }  = req.params;

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const likes = await Like.findAll({ where : { userId } });

        return res.json(likes);
    },

    async getByReviewId(req, res){
        const { reviewId }  = req.params;

        const review = await Review.findByPk(reviewId);

        if(!review){
            return res.status(400).json({ error: "Review not found"});
        }

        const likes = await Like.findAll({ where : { reviewId } });

        return res.json(likes);
    },

    async dislike(req, res){
        const { userId, reviewId }  = req.params;

        const liked = await Like.findOne({ where: { userId, reviewId }});

        if(!liked)
        {
            return res.status(400).json({ error: "Review should be liked"});
        }

        const like = await Like.findOne({ where: { userId, reviewId }});

        await Like.destroy({ where: { id: like.id } });

        return res.json({});
    },

    async getById(req, res){
        const { userId, reviewId }  = req.params;

        const like = await Like.findOne({ where: { userId, reviewId }});

        if(!like){
            return res.status(400).json({ error: "Like not found"});
        }

        return res.json(like);
    },
}