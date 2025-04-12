const express = require('express');  
const FollowerController = require('./src/controllers/FollowerController');
const LikeController = require('./src/controllers/LikeController');
const MediaController = require('./src/controllers/MediaController');
const ReviewController = require('./src/controllers/ReviewController');
const WatchedController = require('./src/controllers/WatchedController');
const app = express(); 
require('./src/database/index');

app.use(express.json())
let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
  }
app.use(allowCrossDomain);

// FollowerController
app.post('/follower/:followerId/follow/:followedId', FollowerController.follow);
app.delete('/follower/:followerId/follow/:followedId', FollowerController.unfollow);
app.get('/followeds/:followerId', FollowerController.getfolloweds);
app.get('/followers/:followedId', FollowerController.getfollowers);
app.get('/follower/:followerId/follow/:followedId', FollowerController.getById);

// MediaController
app.post('/medias', MediaController.createMedia);
app.post('/medias/:mediaId', MediaController.update);
app.get('/medias', MediaController.index);
app.get('/medias/:mediaId', MediaController.getById);
app.get('/media/releases', MediaController.releases);
app.get('/media/user/:userId', MediaController.getByUserId);
app.get('/media/topcontent', MediaController.topContent);
app.get('/media/search/:searchQuery', MediaController.search);
//app.get('/medias/data', MediaController.createData);

// ReviewController
app.post('/reviews', ReviewController.createReview);
app.get('/reviews/:reviewId', ReviewController.getById);
app.get('/review/user/:userId', ReviewController.getByUserId);
app.get('/review/user/:userId/media/:mediaId', ReviewController.getByUserIdMediaId);
app.get('/review/media/:mediaId', ReviewController.getByMediaId);
app.get('/reviews', ReviewController.index);
app.get('/review/latest', ReviewController.latest);

// WatchedController
app.post('/watch/user/:userId/media/:mediaId', WatchedController.watchMedia);
app.get('/watch/user/:userId/media/:mediaId', WatchedController.getById);
app.get('/watch/user/:userId', WatchedController.getByUserId);
app.get('/watch/media/:mediaId', WatchedController.getByMediaId);
app.delete('/watch/user/:userId/media/:mediaId', WatchedController.unWatch);

// LikeController
app.post('/like/user/:userId/review/:reviewId', LikeController.likeReview);
app.get('/like/user/:userId', LikeController.getByUserId);
app.get('/like/review/:reviewId', LikeController.getByReviewId);
app.delete('/like/user/:userId/review/:reviewId', LikeController.dislike);
app.get('/like/user/:userId/review/:reviewId', LikeController.getById);

// Listen 9090
app.listen(9090, () => {
    console.log(`Node.js HTTP server is running on port 9090`);
});