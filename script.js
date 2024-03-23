const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

// Api url
const apiURL = "https://api.lyrics.ovh";

// Listen event in form input
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = search.value.trim();

  if (!searchValue) {
    alert("There is nothing to search!");
  } else {
    searchSong(searchValue);
  }
});

// Search song
async function searchSong(searchValue) {
  const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await searchResult.json();
  showData(data);
}

// Display final result
function showData(data) {
  result.innerHTML = `
  <ul class="song-list">
  ${data.data
    .map(
      (song) => `
    <li>
      <div>
        <img src="${song.artist.picture}" alt="${song.artist.name}" />
        <strong>${song.artist.name}</strong>
      </div>

      <span data-artist= "${song.artist.name}" data-songtitle ="${song.title}">Get lyrics</span>
    </li>
  `
    )
    .join(``)}
  
  </ul>
  `;
}

// Event listener for get lyrics button
result.addEventListener("click", (e) => {
  const clickElement = e.target;

  // Checking clicking element is button or not
  if (clickElement.tagName === "SPAN") {
    const artist = clickElement.getAttribute("data-artist");
    const songTitle = clickElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `
    <div class="full-lyrics">
      <h2>${artist} - ${songTitle}</h2>
      <p>${lyrics}</p>
    </div>
  
  `;
}
