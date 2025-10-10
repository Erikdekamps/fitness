# 💪 Fitness Tracker

> **Built with AI** – A modern, minimal, mobile-first fitness tracking web app with dark mode. Track your gym workouts, create custom training plans with multiple sets, and monitor your progress with detailed analytics.

---

## ✨ Key Features

### 🏋️ Quick Set Logging
- Simple number input controls for weight and reps
- Automatically remembers your last used values per machine
- Instant save to browser storage – no server needed
- **Today's Workout** section shows real-time workout progress
- Quick delete from today's section

### 📋 Multi-Set Workout Plans
- Create exercises with multiple sets at different weights/reps
- **Exercise Bundling**: Consecutive sets of the same exercise are grouped together
- Example: Bench Press – 3 sets shown as "Set 1/2/3" in one bundle
- Build complete workout routines (Push/Pull/Legs, etc.)
- Start a plan and track each set individually
- Progress bar shows completion status
- Each set automatically logged to history

### 🎯 Guided Workout Sessions
- Step-by-step progression through planned exercises
- Visual progress tracking with status indicators
- Complete sets one at a time
- Auto-logging to history after each set
- Real-time updates to today's workout section

### 📊 Workout Analytics & History
- **Workout Summary Cards**: Each workout day shows as a summary with:
  - Number of unique exercises performed
  - Total sets completed
  - Workout duration (time between first and last set)
  - Preview of exercises
- **Detailed Workout View**: Click any workout to see:
  - Complete statistics
  - All exercises grouped together
  - Every set with timestamp, weight, and reps
  - Organized by exercise with set numbering

### 🎛️ Machine Management
- **Inline Editing**: Rename machines directly from the list
- Click to edit, auto-saves on blur/enter
- Auto-cancel when editing another machine
- **Updates Everywhere**: Renaming updates all history and workout plans
- Add/delete custom machines
- Alphabetically sorted
- Comes pre-loaded with 11 common exercises

### ⚙️ Customizable Settings
- **Weight Increment**: Adjust how much weight changes with +/- buttons (default: 2.5kg)
- **Default Values**: Set starting weight and reps
- **Font Size**: 5 scaling options (Tiny 80% → Very Large 120%)
  - Scales all text throughout the app
  - Perfect for visibility in bright gym environments
- **Date Format**: Choose between US, EU, or ISO formats
- **Time Format**: 12-hour (AM/PM) or 24-hour display
- Everything auto-saved to localStorage

### ⏱️ Built-in Timer & Stopwatch
- Rest timer between sets
- Stopwatch with lap tracking
- Quick access from bottom navigation

### 🎨 Beautiful Interface
- Dark mode optimized for gym lighting
- Mobile-first responsive design
- Smooth animations and intuitive controls
- iOS-style bottom navigation (5 tabs)
- **Full-width layout** with consistent padding
- Clean set display with hover effects
- Touch-optimized with pinch-zoom disabled

---

## 📖 Usage Guide

### Log a Single Set
1. Open the **Workout** tab (default screen)
2. Select a machine from the dropdown
3. Enter weight and reps in number fields
4. Click **"Add Set"**
5. View immediately in "Today's Workout" section below

### Create a Training Plan
1. Click **"📋 Manage Workout Plans"** on the Workout tab
2. Click **"Create New Plan"**
3. Name your plan (e.g., "Upper Body A")
4. Add exercises:
   - Select a machine
   - Click **"+ Add Set"** to add multiple sets
   - Enter different weight/reps for each set
   - Consecutive same-exercise sets will be bundled together
5. Save the plan

### Execute a Training Plan
1. Select your plan from the **Quick Start Plan** dropdown
2. Click **"Start"**
3. Complete each set one by one
4. Mark each as complete – automatically logged to history
5. View progress in "Today's Workout" section
6. Finish the workout to see your updated analytics

### View Workout History & Analytics
1. Go to **History** tab
2. Browse workout summary cards showing:
   - Date of workout
   - Number of exercises, sets, and duration
   - Exercise preview
3. Click **"View Details →"** on any workout to see:
   - Complete workout breakdown
   - All sets with timestamps
   - Exercises grouped together

### Manage Machines
1. Go to **Exercises** tab
2. **Add**: Enter name and click "Add Machine"
3. **Rename**: Click machine name, edit inline, press Enter or click away
4. **Delete**: Click trash icon (⚠️ removes from all history and plans)

### Customize Appearance & Formats
1. Go to **Settings** tab
2. Adjust:
   - **Font Size**: Choose from 5 sizes for better readability
   - **Date Format**: US (MM/DD), EU (DD/MM), or ISO (YYYY-MM-DD)
   - **Time Format**: 12-hour or 24-hour
3. Changes apply immediately to all screens

---

## 💾 Data & Privacy

### Storage
All data stored locally in your browser using localStorage:
- Workout history with timestamps
- Training plans with multi-set exercises
- Custom machines
- User settings (increments, formats, font size)

### Privacy
✅ **100% offline** – no server, no account, no tracking  
✅ **Zero data collection** – everything stays on your device  
✅ **No dependencies** – pure HTML/CSS/JavaScript  
✅ **No cookies** – all data in localStorage only

---

## 🛠️ Tech Stack

- **HTML5** – Semantic markup
- **CSS3** – Modern styling with CSS variables
  - Dynamic font scaling with `calc()` and CSS custom properties
  - Flexbox layouts
  - Smooth transitions and hover effects
- **Vanilla JavaScript** – No frameworks, no build step
  - Event-driven architecture
  - Modular functions
  - Real-time UI updates
- **localStorage API** – Client-side persistence

---

## 📱 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ✅ Any modern browser with localStorage support

---

## 📄 License

Open source – feel free to use, modify, and distribute!
