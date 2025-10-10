# 💪 Fitness Tracker

> **Built with AI** – A modern, minimal, mobile-first fitness tracking web app with dark mode. Track your gym workouts, create custom training plans with multiple sets, and monitor your progress over time.

---

## ✨ Key Features

### 🏋️ Quick Set Logging
- Select machine, adjust weight/reps with spinner controls
- Automatically remembers your last used values per machine
- Instant save to browser storage – no server needed
- View workout history organized by day

### 📋 Multi-Set Workout Plans
- **NEW**: Create exercises with multiple sets at different weights/reps
- Example: Bench Press – 10×50kg, 12×50kg, 8×55kg
- Build complete workout routines (Push/Pull/Legs, etc.)
- Start a plan and track each set individually
- Progress bar shows completion status
- Each set automatically logged to history

### 🎯 Guided Workout Sessions
- Step-by-step progression through planned exercises
- Visual progress tracking with status indicators
- Complete sets one at a time
- Auto-logging to history after each set

### ⚙️ Customizable Settings
- Adjust weight increment (default: 2.5kg)
- Set default weight and reps values
- Manage your custom machine list
- Everything auto-saved to localStorage

### � Workout History
- Edit or delete any past entry
- Grouped by date with "Today" and "Yesterday" labels
- Track your progressive overload over time

### ⏱️ Built-in Timer & Stopwatch
- Rest timer between sets
- Stopwatch with lap tracking
- Quick access from bottom navigation

### 🎨 Beautiful Interface
- Dark mode optimized for gym lighting
- Mobile-first responsive design
- Smooth animations and intuitive controls
- iOS-style bottom navigation

## 📖 Usage Guide

### Log a Single Set
1. Open the **Workout** tab (default screen)
2. Select a machine from the dropdown
3. Adjust weight and reps using +/- buttons
4. Click **"Add Set"**

### Create a Training Plan
1. Click **"📋 Manage Workout Plans"** on the Workout tab
2. Click **"Create New Plan"**
3. Name your plan (e.g., "Upper Body A")
4. Add exercises:
   - Select a machine
   - Click **"+ Add Set"** to add multiple sets
   - Enter different weight/reps for each set (e.g., warm-up → working sets)
5. Save the plan

### Execute a Training Plan
1. Select your plan from the **Quick Start Plan** dropdown
2. Click **"Start"**
3. Complete each set one by one
4. Mark each as complete – automatically logged to history
5. Finish the workout to see your updated history

### Manage Machines
- **Exercises** tab → Add/delete custom machines
- Comes pre-loaded with 11 common exercises
- Alphabetically sorted

### Adjust Settings
- **Settings** tab → Configure weight increments, defaults, etc.

---

## 💾 Data & Privacy

### Storage
All data stored locally in your browser using localStorage:
- Workout history
- Training plans  
- Custom machines
- User settings

### Privacy
✅ **100% offline** – no server, no account, no tracking  
✅ **Zero data collection** – everything stays on your device  
✅ **No dependencies** – pure HTML/CSS/JavaScript

---

## ️ Tech Stack

- **HTML5** – Semantic markup
- **CSS3** – Modern styling with CSS variables
- **Vanilla JavaScript** – No frameworks, no build step
- **localStorage API** – Client-side persistence