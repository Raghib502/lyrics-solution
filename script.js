const inputSong = document.querySelector(".form-control");
const searchButton = document.querySelector(".search-btn");
const songName = document.getElementById("song");
const album = document.getElementById("album");
const lyrics = document.getElementById("lyrics");
const searchBar = document.querySelector(".search-bar");
let lyric = document.querySelectorAll(".lyrics-name");
let author = document.querySelectorAll(".author span");

const searchResult = document.querySelector(".search-result");
searchResult.style.display = "none";

const singleLyrics = document.querySelector(".single-lyrics");
singleLyrics.style.display = "none";

searchButton.addEventListener("click", function () {
    console.log(inputSong.value);
    searchResult.style.display = "block";
    
    fetch(`https://api.lyrics.ovh/suggest/${inputSong.value}`) 
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i <= 10; i++) {
          console.log(data.data[i].title, data.data[i].artist.name);
          lyric[i].innerHTML = data.data[i].title;
          author[i].innerHTML = data.data[i].artist.name;

        const lyricsButton = document.querySelectorAll(".lyrics-button");
        lyricsButton[i].addEventListener("click", function () {
         fetch(`https://api.lyrics.ovh/v1/${data.data[i].artist.name}/${data.data[i].title}`)
            .then((response) => response.json())
            .then((dataLyrics) => {
              singleLyrics.style.display = "block";
              searchBar.style.display = "none";
              searchResult.style.display = "none";
              console.log(dataLyrics);
              songName.innerHTML = data.data[i].title;
              album.innerHTML = data.data[i].artist.name;
              lyrics.innerHTML = dataLyrics.lyrics;
            });
        });
        const backButton = document.querySelector(".btn.go-back");
        backButton.onclick = function () {
            searchBar.style.display = "block";
            searchResult.style.display = "block";
       };
      }
    });
});