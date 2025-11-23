# BK Light 64×16 – Reverse-Engineered LED Fun Screen Toolkit

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform: BLE](https://img.shields.io/badge/Platform-BLE-blue.svg)
![Reverse Engineering](https://img.shields.io/badge/Reverse%20Engineered-Yes-red.svg)

This repository contains a small toolkit, rendering pipeline, and example apps (like a Snake game and a digital clock) for the **B.K. Light LED Fun Screen 64×16**, a cheap LED matrix I bought out of curiosity at **Action** for around **20€ / 85 zł**.  
It was a pure hobby project done over the course of **~6 hours across 2 days**, just for fun.

> **Device:** LED Fun Screen 64×16  
> **Store:** Action  
> **Connectivity:** Bluetooth Low Energy (BLE)  
> **Tech Stack:** JavaScript (WebBluetooth)

---

## ⚠️ Disclaimer

This project is **not affiliated with B.K. Light, Action, or any manufacturer**.  
The protocol information and code here are the result of **independent reverse engineering** of the official mobile app.  
Everything in this repo is provided **for educational and research purposes only**, without any guarantees.  
Use at your own risk.

---

## 📡 About the Device

Surprisingly, the screen’s **internal refresh rate is quite high**, so it supports real animations.

However, **BLE throughput is the bottleneck**.  
The engine used here is based on sending **full frames**, not deltas, so realistically:

- **Comfortable stable refresh rate:** ~**5 FPS** (one frame per 200 ms)
- **Possible lag:** up to **1 second** in rare cases
- **Typical lag:** noticeable, but small enough that it doesn’t affect gameplay (e.g., Snake) or normal use

---

## 🧩 Reverse-Engineered Protocol

I captured BLE data from the official mobile app (via Wireshark), analyzed the packets, and reconstructed the protocol.  
Fortunately, the format is **simple and very consistent**.

Below is the full documentation.

---

# 📍 1. Single-Pixel Draw Command

This command tells the screen to update **one pixel**.

### **Packet Structure (10 bytes)**

| Byte Index | Value (Hex) | Meaning             | Notes                         |
| ---------: | ----------- | ------------------- | ----------------------------- |
|          0 | `0A`        | Header              | Standard command start        |
|          1 | `00`        | Reserved            | Always `00`                   |
|          2 | `05`        | Command             | “Draw Pixel” mode             |
|          3 | `01`        | Mode                | `01 = Set Pixel`              |
|          4 | `00`        | Reserved            | Likely Alpha channel (unused) |
|          5 | `RR`        | Red (0–255)         | Pixel red value               |
|          6 | `GG`        | Green (0–255)       | Pixel green value             |
|          7 | `BB`        | Blue (0–255)        | Pixel blue value              |
|          8 | `XX`        | X coordinate (0–63) | Horizontal position           |
|          9 | `YY`        | Y coordinate (0–15) | Vertical position             |

---

# 🖼️ 2. Full-Frame Refresh Command (64×16)

This is how the device receives a **complete screen image** at once.

### 📦 **Total size:** `3081 bytes`

Because BLE packets are limited in size, the mobile app (and our code) sends this in **multiple chunks**, but the device treats it as **one continuous stream**.

### **High-Level Structure**

HEADER (9 bytes) + PIXEL DATA (3072 bytes)

### 📑 2.1 Header (9 bytes)

Every full-screen update begins with the following bytes
09 0C 00 00 00 00 0C 00 00

Breakdown:

| Byte | Value               | Meaning                                    |
| ---: | ------------------- | ------------------------------------------ |
|    0 | `09`                | Command ID — likely “Write Full Frame”     |
|    1 | `0C`                | Sub-command / format selector              |
|  2–8 | varies but constant | Parameters for 64×16 frame (offsets/size?) |

### 📑 2.2 Pixel Data (3072 bytes)

Immediately after the header, pixel data is stored in **RGB triplets**:

```
Byte 9: Pixel(0,0) Red
Byte 10: Pixel(0,0) Green
Byte 11: Pixel(0,0) Blue
Byte 12: Pixel(1,0) Red
...
Final bytes: Pixel(63,15) Blue
```

---

### ⚠️ Additional Note on Lag Behavior

During testing, the device occasionally showed **increasing lag over time** when sending frames continuously.  
It _appears_ as if the device might be **internally buffering or storing frames**, causing delay to accumulate over time.

Notably, this lag **persists even after reseting the device**, which further suggests that the device may queue or internally cache incoming frames instead of discarding them immediately.

This is **only an observation**, not a confirmed fact — I did not investigate this behavior in depth.  
Most of the time the device works with little to no delay, but under heavy continuous load it may start to fall behind.

## 🕹️ Examples Included

- 🐍 Snake game
- ⏰ Digital Clock
- 🎨 Basic pixel drawing utilities

---

## 🔧 Features of This Toolkit

- **Simple framebuffer for 64×16 RGB**
- **Basic renderer** (Text, shapes)
- Full-frame sender with chunking (BLE safe)

---

## 🧠 Why This Exists

Honestly?  
Because I saw the LED screen for 20€ at Action and thought:

> “Hey, I wonder how this thing works.”

Then I spent ~4/5 hours reverse engineering it, because… why not?  
It turned out to be surprisingly fun.

---

## 📜 License

MIT License
