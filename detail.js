const SERVICE_ID = "morimusic";
const API_KEY = "jzfxJ06CQQK7utqouq65FcOa13C6HWwd9HgQ";


const DEFAULT_IMAGE = "/prof/prf.jpg";

const detail = document.getElementById("detail");

const id = new URLSearchParams(location.search).get("id");

// 📅 日付整形
const formatDate = (iso) => {
  const d = new Date(iso);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

fetch(`https://${SERVICE_ID}.microcms.io/api/v1/music/${id}`, {
  headers: {
    "X-MICROCMS-API-KEY": API_KEY
  }
})
.then(res => {
  if (!res.ok) throw new Error("API Error");
  return res.json();
})
.then(item => {

  const imgUrl = item?.cover?.url || DEFAULT_IMAGE;

  // コメント
  const commentHTML = item.comment ? `
    <li>
      <span class="meta-label">Comment：</span>
      ${item.comment}
    </li>
  ` : "";

  // イラスト
  const illustHTML = item.illust ? `
    <li>
      <span class="meta-label">illustration：</span>
      ${item.illust}
    </li>
  ` : "";

  detail.innerHTML = `

  <div class="detail-card">

    <!-- 曲名 -->
    <h1 class="detail-title-main">
      ${item.title ?? "No Title"}
    </h1>

    <!-- 上段 -->
    <div class="detail-top">
    <br>

      <!-- 画像 -->
      <div class="detail-image-wrap">

        <img class="detail-image"
             src="${imgUrl}"
             onerror="this.src='${DEFAULT_IMAGE}'">

      </div>

      <!-- 情報 -->
      <div class="detail-info">

        <ul class="detail-meta">

          <li>
            <span class="meta-label">Title：</span>
            ${item.title ?? "-"}
          </li>

          <li>
            <span class="meta-label">Composer：</span>
            ${item.artist ?? "-"}
          </li>


          ${illustHTML}

        <li>
        <span class="meta-label">Release Date：</span>
        ${item.Date ? formatDate(item.Date) : "-"}
        </li>

          ${commentHTML}

        </ul>

      </div>

    </div>
    <br>
    <h1 class="streaming">Streaming Links</h1>
    <br>
    <!-- 配信リンク -->
    <div class="detail-links">

      ${item.youtube ? `
        <a class="detail-link youtube"
           href="${item.youtube}"
           target="_blank">
           YouTube
        </a>
      ` : ""}

      ${item.soundcloud ? `
        <a class="detail-link soundcloud"
           href="${item.soundcloud}"
           target="_blank">
           SoundCloud
        </a>
      ` : ""}

      ${item.streamUrl ? `
        <a class="detail-link stream"
           href="${item.streamUrl}"
           target="_blank">
           Streaming
        </a>
      ` : ""}

    </div>

  </div>

  `;

})
.catch(err => {

  console.error(err);

  detail.innerHTML = `
    <p style="text-align:center;color:white;">
      Failed to load detail.
    </p>
  `;
});