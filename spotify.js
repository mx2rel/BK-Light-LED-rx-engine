let img = null;

async function fetchPlayback() {
    try {
        const res = await fetch("http://127.0.0.1:5000/playback");
        if (!res.ok) {
            console.warn("Not logged in or no track playing");
            return null;
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error("Playback fetch failed", err);
        return null;
    }
}

async function fetchTrackImage() {
    try {
        const res = await fetch("http://127.0.0.1:5000/track-image");
        if (!res.ok) return null;

        const blob = await res.blob();
        return await createImageBitmap(blob); // ← return ImageBitmap directly

    } catch (err) {
        console.error("Image fetch failed", err);
        return null;
    }
}

async function spotifyUpdate() {
    const bitmap = await fetchTrackImage();
    if (!bitmap) return;

    img = downscaleImage(bitmap, 16, 16);

    const playback = await fetchPlayback();

    image("trackCover", img, 0, 0);
    text("track", playback.name, 18, 2, "FFFFFF", WIDTH - 1, "auto");
    text("artist", playback.artist, 18, 9, "666666", WIDTH - 1, "auto");
    line("progressBg", 16, HEIGHT - 1, WIDTH - 1, HEIGHT - 1, "444444")
    const progress = playback.progress / playback.duration;
    line("progress", 16, HEIGHT - 1, 16 + Math.floor((WIDTH - 17) * progress), HEIGHT - 1, "00E5FF")

    await render();

    setTimeout(spotifyUpdate, (playback.duration * 1000 / (WIDTH - 17)));
}

toolButton("Spotify setup", spotifyUpdate, "misc")
