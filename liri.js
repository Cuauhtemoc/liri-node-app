require("dotenv").config();
var moment = require('moment');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
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
        spotifyThis(query);
    }
}
else if (userInput[2] === "movie-this")
{
    if (userInput.length <= 3 )
    {
  
        query.push("Mr. Nobody");

    }
    else if (userInput.length > 3)
    {
        for (i = 3; i < userInput.length; i++)
        {
            query.push(userInput[i]);
        }
        movieThis(query);
    }    
}
else if (userInput[2] === "concert-this")
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
        concertThis(query);
    }    
}
else if (userInput[2] === "do-what-it-says")
{
    doWhatItSays("random.txt");
}
function spotifyThis(songname){

    var dataArray = [];  
    spotify.search({ type: 'track', query: songname.join(" ") }, function(error, response) {
        if (error) {
            return console.log('Error occurred: ' + error);
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
    var url = "http://www.omdbapi.com/?apikey=trilogy&type=movie&plot=short&t="+movieName.join("+");
    console.log(url);
    axios.get(url).then(function(response, error){
        if (error)
        {
            console.log(error);
        }
        results = response.data;
        console.log("Title: " + results.Title);
        console.log("Year: " + results.Year);
        console.log("Rating: " + results.Rated);
        console.log("Rating: " + results.Ratings[1].Source + ": " + results.Ratings[1].Value);
        console.log("Country: " + results.Country);
        console.log("Language: " + results.Language);
        console.log("Plot:" + results.Plot);
        console.log("Actors: " + results.Actors);
    });
}
function concertThis(artist)
{
    var url = "https://rest.bandsintown.com/artists/"+ artist.join("%20") +"/events?app_id=codingbootcamp";
    console.log(url);
    axios.get(url).then(function(response, error){
        results = response.data;
        if (error)
        {
            console.log(error)
        }
        if (results.length > 0)
        {
        for(i=0; i < results.length; i++)
        {
            console.log("\n" + results[i].venue.name)
            console.log(results[i].venue.city + ", " + results[i].venue.country)
            console.log(moment(results[i].datetime).format("LLL")+ "\n")
        }
    }
    })
}
function doWhatItSays(textFile){
    fs.readFile(textFile, "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.replace(/"/g, "");
        dataArr = dataArr.split(", ");
        if(dataArr[0] === "spotify-this-song")
        {
            query = dataArr[1].split(" ");
            spotifyThis(query);
        }      
    })         
}