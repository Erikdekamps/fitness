# 💪 Fitness Tracker

> **Built with AI** – A modern, minimal, mobile-first fitness tracking progressive web app with dark mode. Track your gym workouts with a beautiful calendar view, create custom training plans, manage exercises, use built-in timers, and maintain complete control over your data with full backup/restore capabilities.

---

## ✨ Key Features

### 🏠 Home Dashboard
- **Quick Start Widget**: 
  - 🏋️ Start Empty Workout button for quick logging
  - 📋 Workout Plans widget with expandable list
  - One-tap access to your saved training routines
- **Clean, focused interface** optimized for mobile
- iOS-style card design with smooth animations

### 👤 Profile Screen
Central hub for accessing all app features:
- **📋 Plans** - Manage workout routines
- **🏋️ Exercises** - Manage exercise library
- **⏱️ Timer** - Rest timer & stopwatch
- **📊 History** - Calendar view of workouts
- **⚙️ Settings** - App preferences

### 💪 Quick Set Logging
- **Smart number inputs** with `type="text" pattern="\d*"` for mobile keyboards
- **Spinner controls** for quick weight/rep adjustments
- Automatically remembers your last used values per exercise
- Instant save to browser storage – no server needed
- **Today's Workout** section shows real-time progress
- Quick delete from today's section with confirmation

### 📋 Workout Plans
- Create multi-exercise training routines
- Build complete programs (Push/Pull/Legs, Full Body, etc.)
- Add multiple sets per exercise with different weights/reps
- Start a plan and track progress in real-time
- **Visual progress bar** shows completion status
- Each set automatically logged to history
- Edit or delete plans anytime
- Plans widget on home screen for quick access

### 🎯 Active Workout Sessions
- Step-by-step progression through planned exercises
- Visual progress tracking with status indicators
- Complete sets one at a time with clear UI feedback
- **Real-time workout timer** shows elapsed time and start time
- Auto-logging to history after each set
- Cancel option with confirmation
- Workout persists even if you navigate away or close app

### � Calendar-Based History
- **True monthly calendar grid** (7 columns: Sun-Sat)
- **Month navigation** with arrow buttons (← →)
- **Today highlighting** - Current date has accent border
- **Workout day highlighting** - Darker green background on days with workouts
- **Click to expand** - Click any workout day to see full details below calendar
- **Selected state** - Clicked day gets cyan border and stays highlighted
- **Detailed workout view**:
  - Date header with close button
  - Summary stats (exercises, sets, duration)
  - All exercises grouped together
  - Every set with weight and reps
  - Smooth slide-in animation
- **Total Statistics Dashboard**:
  - Total workouts completed
  - Total sets performed
  - Unique exercises tracked
  - Total time spent training

### �️ Exercise Management
- **Inline editing** - Click exercise name to edit directly
- **Alphabetical sorting** with dedicated sort button
- **Global updates** - Renaming updates all history and workout plans
- Add/delete custom exercises with confirmation
- Visual feedback on sort (green checkmark)
- Pre-loaded with 11 common exercises
- Accessible from Profile → Exercises

### ⏱️ Built-in Timer & Stopwatch
- **Dual-tab interface** with Timer and Stopwatch
- **Timer Tab**:
  - Large, responsive display (clamps from 2.5rem to 4rem)
  - Minute and second input fields with numeric keyboard
  - Pre-configured with default duration from settings
  - Start/Pause/Reset controls
  - Auto-resets to default duration
  - Vibration feedback on completion
- **Stopwatch Tab**:
  - Lap tracking with history
  - HH:MM:SS display format
  - Start/Pause/Reset controls
  - Laps displayed in reverse order
- **Fits within window** - Properly sized and scrollable
- Quick access from Profile screen

### ⚙️ Comprehensive Settings

#### Multi-Page Settings Navigation
- **iOS-style menu interface** with dedicated pages:
  - 🎯 **Default Values** - Workout preferences
  - 🎨 **Appearance** - Display and format settings
  - 💾 **Data Management** - Backup and restore
- Clean separation with back navigation
- Smooth drill-down navigation

#### Workout Preferences
- **Weight Increment**: How much weight changes with +/- (default: 2.5kg)
- **Default Weight**: Starting weight for new exercises (default: 20kg)
- **Default Reps**: Starting reps for new exercises (default: 10)
- **Default Timer Duration**: Rest timer default in minutes (default: 3)
- All values use spinner controls for easy adjustment

#### Appearance Settings
- **Font Size**: 5 scaling options (Tiny 80% → XL 120%)
  - Scales all text throughout the app using CSS variables
- **Layout Density**: 3 spacing options (Compact 75% → Spacious 125%)
  - Adjusts padding and gaps globally
- **Date Format**: 3 options (US, EU, ISO)
- **Time Format**: 2 options (12-hour, 24-hour)
- Badge-style selectors for easy selection
- Auto-saved to localStorage instantly

#### Data Management
- **Export Data**: One-click JSON backup
  - Includes workouts, exercises, plans, and settings
  - Filename includes export date
  - Human-readable format
- **Import Data**: Restore from JSON file
  - File picker with validation
  - Preview confirmation
  - Automatic page reload
- **Reset Everything**: Nuclear option with confirmation

### 🎨 Beautiful Interface
- **Dark mode optimized** with carefully chosen colors:
  - Primary: `#0a0a0a` (near black)
  - Secondary: `#1a1a1a` (dark gray)
  - Accent: `#00d4ff` (cyan)
  - Success: `#00ff88` (green)
- **Flat Material Design** with zero border radius
- **Mobile-first responsive design**
- **iOS-style bottom navigation** (3 tabs):
  - 🏠 Home - Dashboard
  - 💪 Workout - Active session or quick add
  - 👤 Profile - History, timer, settings
- **No horizontal overflow** - Everything fits on screen
- **Touch-optimized** with proper tap targets
- Smooth animations and transitions
- Pinch-zoom disabled for app-like experience

### 🔐 Enhanced UI/UX
- **Keyboard navigation** - Tab, Enter, Space support
- **Visual feedback** - Hover states, active states, transitions
- **Confirmation dialogs** - Prevent accidental deletions
- **Error handling** - User-friendly messages
- **Accessibility** - ARIA labels, semantic HTML, focus management
- **Smart navigation** - Context-aware screen transitions
- **Persistent state** - Active workout survives page navigation

---

## 📖 Usage Guide

### Getting Started
1. Open app in browser → Lands on **Home** screen
2. Bottom navigation:
   - 🏠 **Home** - Dashboard with quick start
   - 💪 **Workout** - Training or quick add
   - 👤 **Profile** - All features hub

### Log a Quick Set
1. From Home, tap **Start Empty Workout**
2. Select exercise from dropdown
3. Use **spinner buttons (+/−)** or type weight and reps
4. Click **"Add Set"**
5. Appears in "Today's Workout" below
6. Delete sets with trash icon if needed

### Create a Workout Plan
1. Go to Profile → **Plans**
2. Click **"Create New Plan"**
3. Name your plan (e.g., "Push Day", "Leg Day")
4. Add exercises:
   - Select exercise from dropdown
   - Enter sets, weight, and reps
   - Click **"+ Add Set"** for more sets
5. Click **"Save Plan"**
6. Plan appears in home widget

### Execute a Workout Plan
1. From Home widget, select your plan
2. Click **"Start"** button
3. Active Workout screen opens:
   - Shows all exercises in sequence
   - Progress bar at top
   - Elapsed time display
4. Complete each set:
   - Review target weight/reps
   - Do the exercise
   - Click **"Mark Complete"**
5. Watch progress bar fill up
6. Click **"Finish Workout"** when done
7. All sets saved to history automatically

### View Workout History
1. Go to Profile → **History**
2. **Total Stats** shown at top
3. **Calendar View** displays:
   - Current month with day headers
   - Days with workouts have darker green background
   - Today highlighted with cyan border
4. **Navigate months** with ← → buttons
5. **Click any workout day** to see details:
   - Details panel slides in below calendar
   - Shows all exercises and sets
   - Close with X button
   - Click another day to compare

### Manage Exercises
1. Go to Profile → **Exercises**
2. **Add new**:
   - Type name in input field
   - Click **"+"** button
3. **Rename**:
   - Click exercise name
   - Edit inline
   - Press Enter to save
4. **Delete**:
   - Click trash icon
   - Confirm deletion
5. **Sort alphabetically**:
   - Click **"Sort Alphabetically A-Z"** button
   - Green checkmark confirms

### Use Timer/Stopwatch
1. Go to Profile → **Timer**
2. **Timer tab** (rest timer):
   - Shows default from settings
   - Adjust minutes/seconds if needed
   - Click **"Start"** → countdown begins
   - Click **"Pause"** to stop
   - Click **"Reset"** → back to default
3. **Stopwatch tab**:
   - Click **"Start"** to begin
   - Click **"Pause"** to add lap
   - Laps list shows all splits
   - Click **"Reset"** to clear

### Customize Settings
1. Go to Profile → **Settings**
2. Choose category:

**Default Values**:
   - Adjust all workout defaults
   - Use spinners to change values

**Appearance**:
   - Select font size (click badge)
   - Choose layout density
   - Pick date/time formats
   - Changes apply instantly

**Data Management**:
   - **Export**: Download JSON backup
   - **Import**: Restore from file
   - **Reset**: Clear all data (with confirmation)

### Backup and Restore
**Create Backup**:
1. Profile → Settings → Data Management
2. Click **"📤 Export Data"**
3. JSON file downloads with date in filename
4. Save in cloud storage or safe location

**Restore Backup**:
1. Profile → Settings → Data Management
2. Click **"📥 Import Data"**
3. Select backup JSON file
4. Confirm import
5. Page reloads with restored data

---

## 💾 Data & Privacy

### Local Storage
All data stored in browser localStorage:
- **Workout history** - Date-indexed with timestamps, weights, reps, exercises
- **Workout plans** - Multi-set routines with all configurations
- **Exercises** - Custom and default exercise library
- **Active workout** - Current session state (persists across navigation)
- **Settings** - All preferences and defaults

### Privacy & Security
✅ **100% offline** – No server, no account, no login  
✅ **Zero tracking** – No analytics, no cookies, no external requests  
✅ **No dependencies** – Pure vanilla JavaScript  
✅ **Complete privacy** – Everything stays on your device  
✅ **Full control** – Export/import/delete anytime  
✅ **Portable** – Transfer between devices via JSON export

### Data Format
```json
{
  "fitnessHistory": {
    "2025-10-11": [
      {
        "machine": "Bench Press",
        "weight": 80,
        "reps": 10,
        "timestamp": "2025-10-11T14:30:00.000Z"
      }
    ]
  },
  "fitnessMachines": ["Bench Press", "Squat Rack", ...],
  "fitnessPlans": [...],
  "fitnessSettings": {...}
}
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** – Semantic, accessible markup
- **CSS3** – Modern styling:
  - CSS custom properties for theming
  - Dynamic font/density scaling with `calc()`
  - Flexbox and Grid layouts
  - Smooth transitions and animations
  - Mobile-first responsive design
  - `clamp()` for responsive typography
- **Vanilla JavaScript (ES6+)**:
  - No frameworks, no build step
  - Event-driven architecture
  - Modular functions
  - Template literals for dynamic HTML
  - Arrow functions, destructuring, spread operator
  - Async file handling

### Browser APIs
- **localStorage** – Client-side persistence
- **FileReader** – JSON import
- **Blob** – File download generation
- **Date** – Timestamp management and calendar rendering
- **Vibration** – Haptic feedback (timer completion)

### Key Features
- Progressive Web App ready
- Touch-optimized events
- Keyboard navigation
- Mobile input patterns (`type="text" pattern="\d*" inputmode="numeric"`)
- No external dependencies
- No CDN requirements

---

## 📱 Browser Compatibility

### Fully Supported
- ✅ Chrome/Edge 90+
- ✅ Safari 14+ (iOS & macOS)
- ✅ Firefox 88+

### Requirements
- ES6+ support
- localStorage API
- FileReader API
- Blob API
- CSS custom properties
- CSS Grid and Flexbox

### Mobile Optimization
- Touch-friendly tap targets
- Numeric keyboard for number inputs
- Responsive grid calendar
- No horizontal scroll
- Viewport meta tag prevents zoom
- Fits all screen sizes

---

## 🚀 Getting Started

### Installation
1. Download or clone repository
2. Open `index.html` in browser
3. No build process needed!

### First Use
1. **Add exercises** (or use defaults)
2. **Log a set** to test the tracker
3. **Create a plan** for your routine
4. **Start tracking** your fitness journey
5. **Export backup** regularly

### Pro Tips
- Create separate plans for different training days
- Use the sort button to keep exercises organized
- Export your data monthly for backup
- Adjust font size for gym lighting conditions
- Use timer between sets for consistent rest periods

---

## 🎯 Recent Updates

### Latest Version (October 2025)
- � **Calendar-based history view** with monthly grid
- ✅ **Workout day highlighting** with darker green backgrounds
- �️ **Click-to-expand details** for any workout day
- 🎨 **Selected day state** with cyan highlighting
- ⏱️ **Improved timer screen** with proper layout and sizing
- � **Fixed number inputs** with `type="text" pattern="\d*"` for mobile
- 📱 **Responsive timer display** using `clamp()` for sizing
- 🏋️ **Exercise sorting** with alphabetical sort button
- 📋 **Profile screen reorganization** - Plans moved to first position
- 🎨 **Enhanced visual feedback** on calendar interactions
- ♿ **Better accessibility** with keyboard navigation
- � **Bug fixes** for input patterns and calendar rendering

---

## 📄 License

Open source – Use, modify, and distribute freely!

---

**Built with ❤️ and AI assistance**
