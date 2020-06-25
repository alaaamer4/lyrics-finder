const form = document.querySelector(".form");
const search = document.querySelector("#search");
const result = document.querySelector(".result");
const apiURL = "https://api.lyrics.ovh";

const preLoader = () => {
  if (result.innerHTML === "") {
    result.innerHTML = '<div class = "preloader"></div>';
  } else {
    result.innerHTML += "<br>";
  }
};
// search songs
const searchSong = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  preLoader();
  showSongs(data);
  console.log(data);
};

// get more songs

// show result songs
const showSongs = (data) => {
  result.innerHTML = `<ul class= "result" >
${data.data
  .map(
    (
      song
    ) => `<li><p><strong>${song.artist.name}  </strong> - <span> ${song.title}</span></p>
 <button class = "btn-small" data-artist= "${song.artist.name}" data-songtitle= "${song.title}"  > Get lyrics </button></li>`
  )
  .join("")}
</ul>`;
};

const getLyrics = async (artist, songName) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${songName}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h3><strong>${artist}</strong> - <span>${songName}</span></h3>
  <p>${lyrics}</p>`;
  console.log(data);
};
// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  console.log(searchSong(searchTerm));
});

result.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.tagName === "BUTTON") {
    const artist = clicked.getAttribute("data-artist");
    const songName = clicked.getAttribute("data-songtitle");

    getLyrics(artist, songName);
  }
});
