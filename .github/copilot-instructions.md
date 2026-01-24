# TapTiles 2 - AI Coding Agent Instructions

## Project Overview
TapTiles 2 is a memory reflex game built for KaiOS devices (Nokia 8110, etc.). It's a vanilla JavaScript web app with no build system - the entire game runs from `taptiles2/index.html` with inline JavaScript in `app.js`.

## Architecture
- **Single-page app with screen state management**: All screens (`titleScreen`, `gameScreen`, `gameOverScreen`, `topScoresScreen`, `infoScreen`) toggle via `display` property
- **Event-driven gameplay**: Uses global `setInterval` for tile flashing sequence, event listeners for keypad input
- **localStorage persistence**: Top 5 scores stored in browser localStorage (`topScores` key)
- **No framework**: Pure JavaScript, DOM manipulation, inline styles

## KaiOS Platform Specifics

### Keypad Input System
- KaiOS uses **digit keys (1-9)** mapped via `KAIOS_KEYPAD_MAP` in `app.js`
- PC numpad testing available via `PC_KEYPAD_MAP` (inverted layout: Numpad7→1, Numpad1→7)
- Soft keys: `SoftLeft`, `SoftRight`, `Enter` (center button)
- **Switch between layouts** by commenting/uncommenting `const KEYPAD_MAP = ...` (line ~17)

### Soft Key Pattern
```javascript
updateSoftKeyTexts("Left", "Center", "Right");
```
Footer displays dynamic labels. Update on every screen transition.

### KaiAds Integration
- Loads from `https://static.kaiads.com/sdk/v1/kaiads.min.js`
- Shows **once per session** on first game over (`adShownThisSession` flag)
- Test publisher credentials in `loadKaiAd()` function

## Development Workflow

### Testing Locally
1. Open `taptiles2/index.html` directly in browser (no build step)
2. Use PC numpad OR switch to `KAIOS_KEYPAD_MAP` for digit keys
3. Chrome DevTools → Application → Local Storage to inspect scores

### Deploying to KaiOS Device
- Package as KaiOS app using `manifest.webapp` (already configured)
- Icons must exist in `icons/` directory (16x16, 48x48, 60x60, 128x128)
- Test on actual device for proper keypad handling

## Code Conventions

### State Management Pattern
Global boolean flags control app state:
```javascript
let gameOn = false;
let gameOver = false;
let topScoresScreen = false;
let titleScreen = true;
let infoScreen = false;
```
Always set **exactly one** to `true`, clear intervals/timeouts on transitions.

### Game Loop Structure
```javascript
interval = setInterval(flashRandomTile, intervalLength);
```
- `flashRandomTile()` adds to `pressSequence`, visually flashes tile RED→BLUE
- Difficulty increases by reducing `intervalLength` every step (controlled by `intervalSteps`)
- Always `clearInterval(interval)` before setting new interval

### Tile Identification
Tiles numbered 1-9 (left-to-right, top-to-bottom):
```
1 2 3
4 5 6
7 8 9
```
DOM elements: `button1` through `button9` (`<img>` tags)

### Audio Feedback
Custom Web Audio API beep (no audio files):
```javascript
playBeep(); // 600Hz square wave, 0.1s duration
```

## Critical Files
- **app.js**: All game logic, state management, scoring
- **index.html**: Screen layouts, soft key footer
- **styles.css**: Responsive layout for 240x320 KaiOS screens
- **manifest.webapp**: App metadata for KaiOS store submission

## Common Modifications

### Adding New Screen
1. Create `<div id="newScreen">` in `index.html`
2. Add boolean flag `let newScreen = false;`
3. Create `toNewScreen()` function following pattern in `toInfoScreen()`
4. Update `updateSoftKeyTexts()` appropriately

### Adjusting Difficulty Curve
Modify `flashRandomTile()` interval reduction logic (lines 127-137):
```javascript
if (intervalSteps > 25) intervalLength -= 100; // Change values here
```

### Changing Tile Assets
Replace `images/button_BLUE.png` and `images/button_RED.png` (maintain aspect ratio)

## External Dependencies
- **KaiAds SDK** (v1): Loaded from CDN, optional (graceful failure)
- **Web Audio API**: Required for sound effects (no polyfill)

## Known Quirks
- Score ranking logic (lines 280-297): Prevents duplicate entries in top 5 if score ties lowest existing score
- `visibilitychange` handler: Auto-returns to title screen when app backgrounded during gameplay
