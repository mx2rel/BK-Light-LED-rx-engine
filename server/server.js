require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:5000/callback";

let access_token = null;
let refresh_token = null;

app.get("/login", (req, res) => {
    const scope = [
        "user-read-playback-state",
        "user-read-currently-playing"
    ].join(" ");

    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
    });

    res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const tokenRes = await axios.post(
            "https://accounts.spotify.com/api/token",
            qs.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
                },
            }
        );

        access_token = tokenRes.data.access_token;
        refresh_token = tokenRes.data.refresh_token;

        res.send("Logged in via HTTPS! You can now use /playback or /track-image.");
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).send("Callback error");
    }
});

app.get("/playback", async (req, res) => {
    if (!access_token) return res.status(401).send("Not logged in");

    try {
        const playback = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            { headers: { Authorization: "Bearer " + access_token } }
        );

        const item = playback.data?.item;

        if (!item) return res.status(204).send("No track playing");

        const result = {
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            progress: Math.round((playback.data.progress_ms / 1000) ?? 0),
            duration: Math.round((item.duration_ms / 1000) ?? 0)
        };

        res.json(result);
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).send("Playback fetch failed");
    }
});


app.get("/track-image", async (req, res) => {
    if (!access_token) return res.status(401).send("Not logged in");

    try {
        const playback = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            { headers: { Authorization: "Bearer " + access_token } }
        );

        const imageUrl = playback.data?.item?.album?.images?.[0]?.url;
        if (!imageUrl) return res.status(404).send("No image");

        const imageResponse = await axios.get(imageUrl, { responseType: "stream" });

        res.setHeader("Content-Type", imageResponse.headers["content-type"]);

        imageResponse.data.pipe(res);

    } catch (err) {
        console.error(err);
        res.status(500).send("Image fetch failed");
    }
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
