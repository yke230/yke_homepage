

const API_KEY = "AIzaSyAGKZsvb7756evc7pXFeL_aGgt1uulobpA";
const CHANNEL_ID = "UCvkH6UVj2ANlTT97UDK6m2A";
const VIDEO_ID =  "GpkobFqLrcM";

/* 最新動画 */
async function loadLatestVideo() {
    try {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=1&type=video&channelId=${CHANNEL_ID}&key=${API_KEY}`
        );

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const data = await res.json();

        if (!data.items.length) return;

        const video = data.items[0];

        document.getElementById("latest").innerHTML = `
            <a href="https://youtu.be/${video.id.videoId}" target="_blank">
                <img class="douga1" src="${video.snippet.thumbnails.high.url}">
                <h3>${video.snippet.title}</h3>
            </a>
        `;
    } catch (err) {
        console.error("最新動画取得失敗", err);
    }
}

async function loadIntroVideo() {

    try {

        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VIDEO_ID}&key=${API_KEY}`
        );

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const data = await res.json();

        if (!data.items.length) return;

        const video = data.items[0];

        document.getElementById("latest2").innerHTML = `
            <a href="https://youtu.be/${VIDEO_ID}" target="_blank" rel="noopener noreferrer">
                <img class="douga1" src="${video.snippet.thumbnails.high.url}">
                <h3>${video.snippet.title}</h3>
            </a>
        `;

    } catch (err) {

        console.error("動画取得失敗", err);

    }

}

/* 登録者数・総再生回数・ライブ */
async function loadChannelData() {

    try {

        /* チャンネル情報 */
        const channelRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );

        if (!channelRes.ok) {
            throw new Error(await channelRes.text());
        }

        const channelData = await channelRes.json();

        document.getElementById("subs").textContent =
            Number(channelData.items[0].statistics.subscriberCount).toLocaleString();

        document.getElementById("views").textContent =
            Number(channelData.items[0].statistics.viewCount).toLocaleString();


    } catch (err) {

        console.error("チャンネル情報取得失敗", err);

    }

}

/* 実行 */
loadLatestVideo();
loadChannelData();
loadIntroVideo();