module.exports = router => {
  const spotify = require('./controllers/Spotify');

  router.get('/', (req, res, next) => {
    return res.send('WELCOME TO THE SPOTIFY QUETUBE REST API');
  });

  router.get('/search-tracks', spotify.searchTracks);
};
