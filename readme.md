# BK Light 64×16 – Spotify Widget

<p align="center">
  <img src="https://i.imgur.com/qVomDqn.jpeg" style="width:100%">
</p>

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Spotify API](https://img.shields.io/badge/Spotify-API-brightgreen.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js-yellow.svg)

This branch contains a **Spotify Now-Playing widget** for the **B.K. Light LED Fun Screen 64×16**.  
It displays the currently playing track, album cover, and track title on the LED matrix in real time.

The project uses a **tiny single-file Node.js server** that communicates with the Spotify Web API and feeds generated frames into the LED renderer.

This is a lightweight, hobby-level project made for fun — nothing fancy, just a practical way to show Spotify playback on the display.

---

## ⚠️ Disclaimer

This project has **no affiliation** with Spotify, B.K. Light, or any manufacturer.  
The code is for **educational and personal tinkering** only.  
Use responsibly and within Spotify’s API rules.

---

## 🎵 What This Branch Does

- Shows **album art** on the 64×16 LED screen (scaled down).
- Displays **track name** and **artist name**.
- Updates the screen at a small interval.
- Fetches data using the **Spotify Web API**.
- Powered by a very small **Node.js backend** (one file).

No extra tech beyond Node, the renderer, and the Spotify API.

---

## 🧰 Requirements

Before running the widget, you need:

- **Node.js**
- A **Spotify Developer App**
- Spotify **Client ID** and **Client Secret**

---

## 🔧 Setup

1. Install dependencies:

```bash
npm install
