const CHANNEL_ID = "UCgsg1oP9JVrHXkBMWGk_PZg";


fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)
.then(res => res.json())
.then(data => {

  console.log(data);

  if (data.status !== "ok") {
    throw new Error(data.message || "RSS Error");
  }

  const latest = data.items[0];

  if (!latest) {
    throw new Error("動画なし");
  }

  const link = latest.link;

  let videoId = "";

  // 通常URL
  if (link.includes("watch?v=")) {

    const url = new URL(link);
    videoId = url.searchParams.get("v");

  }

  // youtu.be
  else if (link.includes("youtu.be/")) {

    videoId = link.split("youtu.be/")[1];

  }

  // shorts
  else if (link.includes("/shorts/")) {

    videoId = link.split("/shorts/")[1];

  }

  // 最後の保険
  if (!videoId && latest.guid) {

    videoId = latest.guid.split(":").pop();

  }

  // ?以降削除
  if (videoId.includes("?")) {
    videoId = videoId.split("?")[0];
  }

  if (!videoId) {
    throw new Error("Video ID取得失敗");
  }

  console.log("VIDEO ID:", videoId);

  document.getElementById("latest-video").innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}"
      width="100%"
      frameborder="0"
      allowfullscreen>
    </iframe>
  `;

})
.catch(err => {

  console.error(err);

  document.getElementById("latest-video").innerHTML = `
    <p style="text-align:center;color:white;">
      Failed to load video
    </p>
  `;
});