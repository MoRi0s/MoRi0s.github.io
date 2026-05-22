const SERVICE_ID = "morimusic";
const API_KEY = "jzfxJ06CQQK7utqouq65FcOa13C6HWwd9HgQ";

const DEFAULT_IMAGE = "/prof/prf.jpg";

const musicContainer = document.getElementById("music");
const loading = document.getElementById("loading");

console.log("JS起動OK");

if (!musicContainer) {
  console.error("music要素が見つからない");
}

const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}`;
};

fetch(`https://${SERVICE_ID}.microcms.io/api/v1/music`, {
  headers: {
    "X-MICROCMS-API-KEY": API_KEY
  }
})
.then(res => {
  if (!res.ok) throw new Error(res.status);
  return res.json();
})
.then(data => {

  loading.style.display = "none";

  data.contents.forEach(item => {

    const card = document.createElement("div");
    card.className = "music-card";

    const imgUrl = item?.cover?.url || DEFAULT_IMAGE;

   const date = item.Date
  ? `
    <div class="music-date">
      <span>Release Date :</span><br>
      ${formatDate(item.Date)}
    </div>
  `
  : "";

    let links = "";

    if (item.youtube) {
      links += `<a class="music-link" href="${item.youtube}" target="_blank">▶ YouTube</a>`;
    }

    if (item.soundcloud) {
      links += `<a class="music-link" href="${item.soundcloud}" target="_blank">▶ SoundCloud</a>`;
    }

    if (item.streamUrl) {
      links += `<a class="music-link" href="${item.streamUrl}" target="_blank">▶ 配信</a>`;
    }

card.innerHTML = `

  <div class="card-top"
       onclick="location.href='music-detail.html?id=${item.id}'">

    <img src="${imgUrl}"
         onerror="this.src='${DEFAULT_IMAGE}'">

  </div>

  <div class="card-bottom">

    <div class="music-title">
      ${item.title ?? "No Title"}
    </div>

    <div class="music-artist">
      ${item.artist ?? "Unknown Artist"}
    </div>

    <div class="music-links">
      ${links}
    </div>

    ${date}

  </div>
`;

    musicContainer.appendChild(card);
  });

})
.catch(err => {
  console.error(err);
  loading.innerText = "Failed to load music";
});