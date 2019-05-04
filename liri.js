require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

// // Grab the movieName which will always be the third node argument.
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//console.log(spotify);

var commandInput = process.argv[2];
var commandQuery = process.argv.slice(3).join(" ");

// console.log(commandInput);
// console.log(commandQuery);


switch (commandInput) {
  case "concert-this":
    concertThis()
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays(commandQuery);
    break;
}

//userChoice(commandInput,commandQuery);
function concertThis() {
  var queryUrl = "https://rest.bandsintown.com/artists/" + commandQuery + "/events?app_id=codingbootcamp"

  axios.get(queryUrl).then(
    function (response) {
      // console.log(response);

      var concertDate = moment(response.data[0].venue.datetime).format("MM/DD/YYYY");
      // console.log(concertDate);

      console.log("Name of Venue: " + response.data[0].venue.name + "\nRegion: " + response.data[0].venue.city + "," + response.data[0].venue.region + "\nDate: " + concertDate);


    }
  );
}

function spotifyThisSong() {
  console.log("\nLook for: " + commandQuery);

  if (!commandQuery) {
    commandQuery = "The Sign Ace of Base"
  }

  spotify
    .search({ type: 'track', query: commandQuery }) //limit: 1. can use index 0 for items to retreieve the first song in the items array in the response
    .then(function (response) {
      //console.log(response);

      console.log("Artist: " + response.tracks.items[0].album.artists[0].name + "\nName of Song: " + response.tracks.items[0].name + "\nA preview link: " + response.tracks.items[0].external_urls.spotify + "\nAlbum : " + response.tracks.items[0].album.name);

    })
    .catch(function (err) {
      console.log(err);
    });
  //doWhatItSays()
};

// Then run a request with axios to the OMDB API with the movie specified
function movieThis() {
  console.log("\nLook for: " + commandQuery);
  if (!commandQuery) {
    commandQuery = "Mr. Nobody."
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + commandQuery + "&y=&plot=short&tomatoes=true&apikey=b95c5631"; //&y=&plot=short&apikey=b95c5631

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      //console.log(response);

      console.log("Name: " + response.data.Title + "\nReleased Year: " + response.data.Released + "\nRating: " + response.data.Rated + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.tomatoReviews + "\nCountry of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);

    }
  );
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    //console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    //console.log(dataArr);

    // We will then re-display the content as an array for later use.
    //console.log(dataArr);
    commandInput = dataArr[0];
    commandQuery = dataArr[1];

    // If the user wants to add a song then use spotify response [test song: spotify-this-song,"I Want it That Way
    spotify
      .search({ type: 'track', query: commandQuery }) //limit: 1. can use index 0 for items to retreieve the first song in the items array in the response
      .then(function (response) {

        console.log("Artist: " + response.tracks.items[0].album.artists[0].name + "\nName of Song: " + response.tracks.items[0].name + "\nA preview link: " + response.tracks.items[0].external_urls.spotify + "\nAlbum : " + response.tracks.items[0].album.name);

      })
      .catch(function (err) {
        console.log(err);
      });

  });
}