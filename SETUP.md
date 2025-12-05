# RAOU Website - Setup Guide for Non-Technical Users

Welcome! This guide will help you run and edit the RAOU travel website on your computer.

## 🚀 Quick Start

### Running the Website

1. **Double-click** the `START.command` file
2. Wait for the website to open in your browser (this may take a minute the first time)
3. The website will be available at `http://localhost:8080`

That's it! The website is now running on your computer.

### Editing Website Content

1. **Double-click** the `START-EDITOR.command` file
2. The Content Editor will open in your browser
3. **Login** with the password: `raou2024`
4. Edit any content you want to change
5. Click **"Export"** to download your changes
6. Replace the `public/content.json` file with your downloaded file
7. Refresh the website to see your changes

## 📝 How to Edit Content

### Step-by-Step Content Editing

1. **Open the Editor**
   - Double-click `START-EDITOR.command`
   - Enter password: `raou2024`

2. **Navigate the Tabs**
   - **Site Info**: Company name, contact information, social media links
   - **Home Page**: Hero section, section titles, call-to-action buttons
   - **About Page**: Company story, philosophy values, commitment text
   - **Destinations**: Region names, descriptions, countries
   - **Experiences**: Travel experience descriptions
   - **Footer**: Footer text, newsletter section

3. **Make Your Changes**
   - Click on any tab to edit that section
   - Type in the text boxes to change content
   - All changes are saved in memory as you type

4. **Save Your Changes**
   - Click the **"Export"** button at the top right
   - A file called `content.json` will download to your Downloads folder
   - Find the `public` folder in the RAOU website folder
   - Replace the old `content.json` file with your new downloaded file
   - Refresh your browser to see the changes

## 🖼️ Changing Images

Images are stored in the `src/assets` folder. To change an image:

1. Find the image file you want to replace (e.g., `hero-background.jpg`)
2. Replace it with your new image
3. **Important**: Keep the same filename
4. Refresh the website to see the new image

## 🛑 Stopping the Website

To stop the website:

1. Go to the Terminal window that opened when you started the website
2. Press `Ctrl + C` on your keyboard
3. Close the Terminal window

## ❓ Troubleshooting

### The website won't start

- Make sure you have an internet connection (needed for first-time setup)
- Try restarting your computer and running `START.command` again

### I can't see my changes

- Make sure you replaced the `content.json` file in the `public` folder
- Refresh your browser (press `Cmd + R` on Mac)
- Try clearing your browser cache

### The editor password doesn't work

- Make sure you're typing: `raou2024` (all lowercase, no spaces)
- If you changed the password in the code, use your new password

### Port already in use

- If you see an error about port 8080 being in use:
  - Stop any other instances of the website that might be running
  - Or change the port in `vite.config.ts`

## 📦 Sharing Your Website

To share the website with someone else:

1. Stop the website if it's running
2. Compress the entire RAOU folder into a ZIP file
3. Send the ZIP file to the other person
4. They can extract it and run `START.command` to launch it

## 🔐 Security Note

The editor password (`raou2024`) is stored in the code. If you want to change it:

1. Open `src/pages/ContentEditor.tsx` in a text editor
2. Find the line: `const EDITOR_PASSWORD = "raou2024";`
3. Change `"raou2024"` to your new password
4. Save the file

## 📞 Need Help?

If you encounter any issues:

1. Check the Terminal window for error messages
2. Make sure all files are in the correct locations
3. Try restarting the website
4. Contact your technical support person

---

**Enjoy managing your RAOU travel website!** ✈️
