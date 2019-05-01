require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

// // Grab the movieName which will always be the third node argument.
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

console.log(spotify);

// var omdb = new omdb(keys.omdb);
//     return console.log('Error occurred: ' + err);
//   }
 


var commandInput = process.argv[2];
var commandQuery = process.argv.slice(3).join(" ");

console.log(commandInput);
console.log(commandQuery);
// console.log(commandInput);

switch (commandInput) {
  case "concert-this":
    concertThis()
    break;
  
  case "sportify-this-song":
    sportifyThisSong();
    break;
  
  case "movie-this":
    movieThis();
    break;
  
  case "do-what-it-says":
    doWhatItSays(commandQuery);
    break;
  }

function sportifyThisSong(){
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 

  var spotifyArr = data.tracks.items;
    for(i=1; i<spotifyArr.length-1; i++){
      console.log(data.tracks);
      
    }
  });
}
// Then run a request with axios to the OMDB API with the movie specified

function movieThis(){

  if (!commandQuery){
    commandQuery = "Mr. Nobody."
  }
var queryUrl = "http://www.omdbapi.com/?t=" + commandQuery + "&y=&plot=short&tomatoes=true&apikey=b95c5631"; //&y=&plot=short&apikey=b95c5631

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response);
    
    console.log("Name: " + response.data.Title + "\nReleased Year: " + response.data.Released + "\nRating: " + response.data.Rated + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.tomatoReviews + "\nCountry of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
    
  }
);
}