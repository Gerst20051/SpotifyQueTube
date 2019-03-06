module.exports = (function () {
  const spotify = require('./../services/spotify');

  this.searchTracks = (req, res, next) => {
    spotify.searchTracks('Love').then(data => {
        res.send(200, data);
    });
  };

  return this;
}.bind({}))();
