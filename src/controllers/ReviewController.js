const connection = require('../database');
const Media = require('../models/Media');
const Review = require('../models/Review');
const User = require('../models/User');
const { getUsersAndMedias } = require('../scripts');

module.exports = {
    async createReview(req, res){
        const { userId, mediaId, description, score } = req.body;

        const media = await Media.findByPk(mediaId);

        if(!media){
            return res.status(400).json({ error: "Media not found"});
        }

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        const reviewDb = await Review.findOne({ where: { userId, mediaId}})
        if(!!reviewDb){
            return res.status(400).json({ error: "Cannot create 2 reviews in same media"});
        }

        const review = await Review.create({ userId, mediaId, description, score });

        return res.json(review);
    },

    async index(req, res) {
        const reviews = await Review.findAll();

        return res.json(reviews);
    },

    async getById(req, res) {
        const { reviewId }  = req.params;
        const review = await Review.findByPk(reviewId);

        return res.json(review);
    },

    async getByUserId(req, res) {
        const { userId }  = req.params;
        const reviews = await Review.findAll({ where: { userId } });

        return res.json(reviews);
    },

    async getByMediaId(req, res) {
        const { mediaId }  = req.params;
        const reviews = await Review.findAll({ where: { mediaId } });
        const response = await getUsersAndMedias(reviews);

        return res.json(response);
    },

    async getByUserIdMediaId(req, res) {
        const { userId, mediaId }  = req.params;
        const review = await Review.findOne({ where: { userId, mediaId } });
        if(!review){
            return res.status(400).json({ error: "Review not found"});
        }
        return res.json(review);
    },

    async latest(req, res) {
        const reviews = await Review.findAll({ order: connection.literal('"createdAt" DESC'), limit: 3});

        const response = await getUsersAndMedias(reviews);
        
        return res.json(response);
    },

    async update(req,res) {
        const { userId, mediaId, description, score } = req.body;
        const { reviewId }  = req.params;

        const review = await Review.findByPk(reviewId);

        if(!review){
            return res.status(400).json({ error: "Review not found"});
        }

        const media = await Media.findByPk(mediaId);

        if(!media){
            return res.status(400).json({ error: "Media not found"});
        }

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(400).json({ error: "User not found"});
        }

        await Review.update({ userId, mediaId, description, score }, { where: { id: reviewId }})

        return res.json(review);
    },
}