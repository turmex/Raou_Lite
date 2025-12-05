# RAOU Website - User Guide

Welcome! This guide will help you manage your RAOU travel website with ease. No technical knowledge required!

## Table of Contents

1. [Getting Started](#getting-started)
2. [Launching the Website](#launching-the-website)
3. [Editing Content](#editing-content)
4. [Managing Images](#managing-images)
5. [Saving Your Changes](#saving-your-changes)
6. [Tips & Best Practices](#tips--best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You Need

- A computer (macOS or Windows)
- The RAOU website folder (this folder!)
- Internet connection (for first-time setup only)

### First Time Setup

The first time you run the website, it will automatically install everything needed. This takes 2-5 minutes and only happens once.

---

## Launching the Website

### On macOS

1. Open the RAOU folder
2. **Double-click** `START-MAC.command`
3. Wait for the website to open in your browser
4. That's it!

### On Windows

1. Open the RAOU folder
2. **Double-click** `START-WINDOWS.bat`
3. Wait for the website to open in your browser
4. That's it!

### What Happens

- A terminal/command window will open (don't close it!)
- The website starts running
- Your browser opens automatically to `http://localhost:8080`
- You can now view your website

**To Stop the Website**: Close the terminal/command window or press `Ctrl+C`

---

## Editing Content

### Opening the Editor

#### On macOS
Double-click `START-EDITOR-MAC.command`

#### On Windows
Double-click `START-EDITOR-WINDOWS.bat`

### Logging In

1. The editor will open in your browser
2. Enter the password: **raou2024**
3. Click "Login"

### Editor Layout

The editor has 6 tabs, each for a different section of your website:

1. **Site Info** - Company name, contact information, social media links
2. **Home Page** - Hero section, titles, descriptions, and home page images
3. **About Page** - Company story, philosophy, values, and about page images
4. **Destinations** - Travel destinations, regions, countries
5. **Experiences** - Types of travel experiences offered
6. **Footer** - Footer text, newsletter, copyright

### Making Changes

1. **Click on a tab** to edit that section
2. **Type in the text boxes** to change content
3. **Changes are saved in memory** as you type
4. **Export when done** to save permanently (see below)

### Dynamic Labels

Section headers show you what you're editing:
- Example: "Hero Section - 'Uniquely Yours'"
- This updates as you type, so you always know what you're working on

---

## Managing Images

Images are now organized by page! You'll find them in the relevant tabs:

### Home Page Images

Found in the **Home Page** tab at the bottom:

- **hero-background.jpg** - Main background image (1920x1080px)
- **family-holidays.jpg** - Family holidays card (1200x800px)
- **honeymoons.jpg** - Honeymoons card (1200x800px)
- **safari-holidays.jpg** - Safari holidays card (1200x800px)
- **remote-destinations.jpg** - Remote destinations card (1200x800px)
- **unusual-holidays.jpg** - Unusual holidays card (1200x800px)

### About Page Images

Found in the **About Page** tab at the bottom:

- **bespoke-travel.jpg** - Bespoke travel image (1200x800px)
- **logo.png** - Company logo (200x200px)

### Uploading a New Image

1. **Go to the relevant tab** (Home Page or About Page)
2. **Scroll down** to the images section
3. **Click "Upload New Image"** on the image you want to replace
4. **Select your image** from your computer
5. **Wait for processing** (automatic resize and validation)
6. **Done!** The image is automatically replaced and the website refreshes

### Image Requirements

Each image shows its requirements:
- **Size**: Required dimensions (e.g., 1920x1080px)
- **Max file size**: Maximum file size (e.g., 500KB)
- **Formats**: Allowed formats (JPG, PNG, WebP, SVG)

**Don't worry!** Images are automatically resized to the correct dimensions. Just upload your image and the system handles the rest!

### What Happens Automatically

✅ Image is validated (format check)  
✅ Image is resized to exact dimensions  
✅ Image is optimized for web  
✅ File is automatically replaced  
✅ Website refreshes to show new image  

**No manual steps required!**

---

## Saving Your Changes

### Exporting Content

After editing text content:

1. Click the **"Export"** button (top right)
2. A file called `content.json` downloads to your Downloads folder
3. Find the `public` folder in the RAOU website folder
4. **Replace** the old `content.json` with your new downloaded file
5. **Refresh** your browser to see the changes

### Importing Content

To load previously saved content:

1. Click the **"Import"** button (top right)
2. Select your `content.json` file
3. Content loads into the editor
4. Make any additional changes
5. Export again when done

### Backup Your Content

**Important**: Always keep a backup of your `content.json` file!

1. After exporting, copy the file to a safe location
2. Name it with a date (e.g., `content-2024-11-24.json`)
3. Keep multiple versions for safety

---

## Tips & Best Practices

### Content Editing

✅ **Write clearly** - Keep text concise and easy to read  
✅ **Check spelling** - Review your text before exporting  
✅ **Use consistent tone** - Maintain your brand voice  
✅ **Test on mobile** - View the website on different devices  
✅ **Save often** - Export your content regularly  

### Image Management

✅ **Use high-quality images** - Clear, professional photos work best  
✅ **Optimize before uploading** - Smaller files upload faster  
✅ **Consistent style** - Use similar photo styles across the site  
✅ **Test the result** - Check how images look on the live site  

### Workflow

1. **Plan your changes** - Know what you want to update
2. **Open the editor** - Use the launcher script
3. **Make all changes** - Edit text and images
4. **Review** - Check everything looks good
5. **Export** - Save your content
6. **Replace file** - Update `content.json`
7. **Refresh** - View the live site
8. **Backup** - Save a copy of your content

---

## Troubleshooting

### Website Won't Start

**Problem**: Launcher script doesn't work

**Solutions**:
- Make sure you have an internet connection (first time only)
- Try restarting your computer
- Check that you're using the correct launcher:
  - macOS: `.command` files
  - Windows: `.bat` files

### Can't See Changes

**Problem**: Changes don't appear on the website

**Solutions**:
- Make sure you **exported** the content
- Check you **replaced** the `content.json` file in the `public` folder
- **Refresh** your browser (Cmd+R on Mac, Ctrl+R on Windows)
- Try a **hard refresh** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Editor Password Doesn't Work

**Problem**: Password `raou2024` is rejected

**Solutions**:
- Make sure you're typing it correctly (all lowercase, no spaces)
- Check for extra spaces before or after
- If someone changed the password, ask them for the new one

### Image Upload Fails

**Problem**: Image won't upload

**Solutions**:
- Check the image format (JPG, PNG, WebP, or SVG)
- Make sure the image isn't corrupted
- Try a different image
- Check that both servers are running (you should see two processes in the terminal)

### Port Already in Use

**Problem**: Error says port 8080 or 3001 is in use

**Solutions**:
- Close any other instances of the website that might be running
- Restart your computer
- Check if another program is using those ports

### Browser Doesn't Open

**Problem**: Browser doesn't open automatically

**Solutions**:
- Manually open your browser
- Go to: `http://localhost:8080` (for website)
- Or: `http://localhost:8080/admin/editor` (for editor)

---

## Keyboard Shortcuts

### In the Editor

- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Cmd/Ctrl+S**: (Not implemented, use Export button)
- **Cmd/Ctrl+R**: Refresh page

### In the Browser

- **Cmd/Ctrl+R**: Refresh page
- **Cmd/Ctrl+Shift+R**: Hard refresh (clears cache)
- **Cmd/Ctrl+T**: New tab
- **Cmd/Ctrl+W**: Close tab

---

## Getting Help

If you're stuck:

1. **Check this guide** - Most answers are here
2. **Check SETUP.md** - For technical troubleshooting
3. **Check README.md** - For overview and features
4. **Look at the terminal** - Error messages appear there
5. **Contact support** - Reach out to your technical contact

---

## Quick Reference

### Launcher Scripts

| Platform | Website | Editor |
|----------|---------|--------|
| macOS | `START-MAC.command` | `START-EDITOR-MAC.command` |
| Windows | `START-WINDOWS.bat` | `START-EDITOR-WINDOWS.bat` |

### Default Settings

- **Website URL**: http://localhost:8080
- **Editor URL**: http://localhost:8080/admin/editor
- **Editor Password**: raou2024
- **Upload Server Port**: 3001

### File Locations

- **Content**: `public/content.json`
- **Images**: `src/assets/`
- **Backups**: Your Downloads folder (after export)

---

**Happy editing! Your RAOU website is ready to shine!** ✨
