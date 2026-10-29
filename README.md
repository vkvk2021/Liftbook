# Liftbook

A gym workout tracker that installs like an app. You can log every set, follow a strength + hypertrophy split, track PRs, get weight suggestions, see weekly sets per muscle and chart your progress.

## Privacy

Each person's data stays on their own device, in the browser's local storage. Nothing is uploaded. There is no account and no server-side database, and no analytics. The page loads only its own files: fonts and icons are bundled. Whoever hosts the site, including you, cannot see anyone's workouts.

Because of that:
- Data does **not** sync between devices. Use **Settings → Export backup** and **Import backup** to move it.
- Clearing website data or deleting the installed app erases the log. The app reminds people to export a backup every 30 days.
- On iPhone, the home screen app and Safari keep **separate** data. Install first, then log.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `manifest.webmanifest` | Name, colours and icons for installing |
| `sw.js` | Service worker that makes the app open offline |
| `icons/` | App icons (home screen, browser tab) |
| `fonts/` | Public Sans and Saira Condensed, with their SIL Open Font License files |

## Publish on GitHub Pages

1. On github.com, create a new **public** repository, for example `liftbook`.
2. Upload everything in this folder: on the repo page, click **Add file → Upload files**, then drag in `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` and the `icons` and `fonts` folders. Click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, the branch to **main** and the folder to **/ (root)**, then click **Save**.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/liftbook/`. Share that link.

Or from a terminal in this folder:

```bash
git init -b main
git add index.html manifest.webmanifest sw.js README.md icons fonts
git commit -m "Liftbook"
git remote add origin https://github.com/YOUR-USERNAME/liftbook.git
git push -u origin main
```

GitHub Pages serves over HTTPS, which installing and offline mode require.

## Install on a phone or computer

- **iPhone / iPad:** open the link in Safari → Share → **Add to Home Screen**.
- **Android:** open in Chrome → ⋮ menu → **Install app** (or *Add to Home screen*).
- **Windows / Mac:** in Chrome or Edge, click the install icon at the right of the address bar.

## Publishing updates

Edit the files and upload or push them again. Installed apps pick up a new `index.html` the next time they open with internet. If you change icons or fonts, also change `VERSION` in `sw.js` (for example `liftbook-v2`) so phones fetch the new files.

## Test on your computer

Service workers do not run from a double-clicked file, so serve the folder:

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
