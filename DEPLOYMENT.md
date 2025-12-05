# Deployment Guide for Raou

This guide explains how to deploy your application to the web. We recommend **Fly.io** because it supports Docker, has a generous free tier, and supports persistent storage (saving your files).

## Prerequisites
1.  **Sign up for Fly.io**: Go to [fly.io](https://fly.io) and create an account.
2.  **Install flyctl**: The command line tool for Fly.io.
    -   **Mac**: `brew install flyctl` (if you have Homebrew) or `curl -L https://fly.io/install.sh | sh`

## Deployment Steps

### 1. Initialize the App
Open your terminal in the project folder and run:
```bash
fly launch
```
-   **App Name**: Choose a unique name (e.g., `raou-travel-app`).
-   **Region**: Choose one close to you (e.g., `ewr` for NJ/NY).
-   **Database**: **No** (you don't need a separate DB, you use files).
-   **Redis**: **No**.

### 2. Configure Persistent Storage
Since your app saves files to disk (`src/assets` and `public/content.json`), you need a "Volume" so data isn't lost when the server restarts.

Run this command to create a 1GB volume (free tier usually covers up to 3GB):
```bash
fly volumes create raou_data --size 1
```

Update the `fly.toml` file (created by `fly launch`) to mount this volume. Add this section:

```toml
[mounts]
  source = "raou_data"
  destination = "/app/src/assets"
```
*Note: This only persists images. To persist `content.json`, you might need to move it to the same volume or create another one. For simplicity, we recommend moving `content.json` to `src/assets/content.json` in the code if you want to persist it easily, or just accept that text changes might reset on redeploy without a volume for `public`.*

### 3. Deploy
```bash
fly deploy
```

## Other Hosting Options
Since we added a `Dockerfile`, you can deploy this app to **any** platform that supports Docker:
-   **Render**: Connect your GitHub repo, choose "Docker" as the environment.
-   **Railway**: Similar to Render.
-   **DigitalOcean App Platform**: Good for scaling.

## Important Note on "Free" Hosting
Most "free" hosting (like Vercel or Netlify) is for **static sites**. They do **not** allow you to save files (images/content) to the server.
-   If you use Vercel/Netlify, your "Save" button **will not work**.
-   You **must** use a VPS or a container platform with volumes (like Fly.io, Railway, or a standard DigitalOcean Droplet) for the file saving to work.
