require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv;
var query = [];
if (userInput[2] === "spotify-this-song")
{
    if (userInput.length <= 3 )
    {
  
        query.push("The", "Sign");

    }
    else if (userInput.length > 3)
    {
        for (i = 3; i < userInput.length; i++)
        {
            query.push(userInput[i]);
        }
    }
    spotifyThis(query);
}
function spotifyThis(songname){
    var dataArray = [];  
     
    spotify.search({ type: 'track', query: songname.join(" ") }, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    for (i = 0; i < response.tracks.items.length; i++)
    {   
        var artists = [];
        var dataOBj = {};
        for (j = 0; j < response.tracks.items[i].artists.length; j++)
        {
            artists.push(response.tracks.items[i].artists[j].name)
            
        }
        dataOBj.artists = artists.join(", ");
        dataOBj.trackName = response.tracks.items[i].name;
        dataOBj.album = response.tracks.items[i].album.name;
        if (dataOBj.preview = response.tracks.items[i].preview_url === null)
        {
            dataOBj.preview = "No preview link found";
        }
        else {
            dataOBj.preview = response.tracks.items[i].preview_url;
        }
        
        dataArray.push(dataOBj);
    }
    if (dataArray.length === 0)
    {

    }
    for (i = 0; i < dataArray.length; i++)
    {
        console.log("Artists: " + dataArray[i].artists)
        console.log("Song Name: " + dataArray[i].trackName)
        console.log("Preview Url: " + dataArray[i].preview)
        console.log("Album: " + dataArray[i].album + "\n")
    }
        });
}
function movieThis(movieName)
{
    
}