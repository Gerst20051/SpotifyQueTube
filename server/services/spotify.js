const SpotifyWebApi = require('spotify-web-api-node');

module.exports = (function () {
  const spotifyApi = new SpotifyWebApi({
    clientId: globalConfig.creds.spotify.client_id,
    clientSecret: globalConfig.creds.spotify.client_secret,
  });

  let token = '';

  this.generateAccessToken = () => {
    return new Promise((resolve, reject) => {
      spotifyApi.clientCredentialsGrant().then(data => {
          console.log(`The access token expires in ${data.body['expires_in']}`);
          console.log(`The access token is ${data.body['access_token']}`);
          token = data.body['access_token'];
          spotifyApi.setAccessToken(token);
          resolve(token);
        },
        error => {
          console.error(error);
          reject(error);
        }
      );
    });
  };

  this.searchTracks = searchTerm => {
    return new Promise((resolve, reject) => {
      if (!token) {
        this.generateAccessToken().then(accessToken => {
          return searchTracks(searchTerm);
        }).then(resolve).catch(reject);
      } else {
        searchTracks(searchTerm).then(resolve).catch(reject);
      }
    });
  };

  function searchTracks(searchTerm) {
    return new Promise((resolve, reject) => {
      spotifyApi.searchTracks(searchTerm)
        .then(data => {
          console.log(`Search "${searchTerm}"`, data.body);
          resolve(data.body);
        }, error => {
          console.error(error);
          reject(error);
        });
    });
  }

  return this;
}.bind({}))();
