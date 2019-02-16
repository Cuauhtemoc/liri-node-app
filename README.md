# liri-node-app
Liri is a command line app that provides information on songs, concert dates/venues, and movies using the Spotify, Bands in town, OMDB Apis.

## Installing the app
1. Clone this respostitory onto your local machine.
2. install the node modules provided in the package.json file.
3. In order to app obtain spotify information you will have to obtain you personal API key.
4. Create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:
  SPOTIFY_ID=your-spotify-id
  SPOTIFY_SECRET=your-spotify-secret

## Using the app
On the command line Liri has the following commands available:
1. concert-this <artist\band name> lists concert dates using the bands in town API
[](concert-this.png)
2. spotify-this <song-name> lists song information using the Spotify API
[](spotify-this.png)
3. movie-this <movie-name> list information on the movie using thr OMDB API
[](movie-this.png)
4. do-what-it-says reads the random.txt file 
[](do-what-it-says.png)
