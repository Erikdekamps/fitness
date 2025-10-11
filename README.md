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

### 👤 Profile & Statistics Dashboard
Comprehensive personal statistics and quick access hub:
- **📊 Your Statistics** - Complete fitness analytics:
  - ⚖️ **Body Weight Tracker** with trend chart and progress indicators
  - 🏋️ **Total Workouts** - All-time workout count
  - ⏱️ **Total Time** - Cumulative training hours
  - 📈 **Average Duration** - Mean workout length
  - 🔥 **Day Streak** - Consecutive training days
  - 📅 **Period Analysis** - Week/Month/Year breakdowns with charts
  - 📊 **Workout Frequency Chart** - Visual training patterns
- **Quick Actions**:
  - 📊 **History** - Calendar view of all workouts
  - ⏱️ **Timer** - Rest timer & stopwatch
  - ⚙️ **Settings** - App preferences and data management

### 💪 Quick Set Logging
- **Smart number inputs** with `type="text" pattern="\d*"` for mobile keyboards
- **Spinner controls** for quick weight/rep adjustments
- Automatically remembers your last used values per exercise
- Instant save to browser storage – no server needed
- **Today's Workout** section shows real-time progress
- Quick delete from today's section with confirmation

### 📋 Workout Plans
- Create multi-exercise training routines
- **Support for both strength and cardio exercises**:
  - 🏋️ **Strength exercises**: Multiple sets with weight and reps
  - 🏃 **Cardio exercises**: Duration-based activities
- Build complete programs (Push/Pull/Legs, Full Body, etc.)
- Add multiple sets per exercise with different weights/reps
- **10 pre-built example plans** you can import and customize:
  - Upper/Lower 4 Day Split
  - Push/Pull/Legs (PPL)
  - Full Body 3 Day
  - Strength 5x5
  - Dumbbell Only
  - Fat Loss Circuit
  - Beginner Full Body
  - Powerlifting
  - Bodybuilding Split
  - Athlete Performance
- **Drag-and-drop reordering** of exercises in plans
- Start a plan and track progress in real-time
- **Visual progress bar** shows completion status
- Each set automatically logged to history
- Edit or delete plans anytime
- **Duplicate plans** for easy template creation
- Plans widget on home screen for quick access
- One-tap plan menu (edit, duplicate, delete)

### 🎯 Active Workout Sessions
- Step-by-step progression through planned exercises
- **Support for both strength and cardio**:
  - 🏋️ Strength exercises with editable weight/reps per set
  - 🏃 Cardio exercises with built-in countdown timer
- Visual progress tracking with status indicators
- Complete sets one at a time with clear UI feedback
- **Real-time workout timer** shows elapsed time and start time
- **Cardio timers** with start/pause/skip controls
- **Collapsible completed exercises** to reduce clutter
- Auto-logging to history after each set
- Cancel option with confirmation
- **Workout state persistence** - survives page navigation and browser close

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

### 🏋️ Exercise Management
- **Muscle group organization** - Exercises grouped by target muscle
  - Chest, Back, Shoulders, Biceps, Triceps
  - Quads, Hamstrings, Glutes, Calves, Core
  - Full Body, Cardio
- **Collapsible groups** with exercise counts
- **100+ pre-loaded exercises** across all muscle groups
- **Dual exercise types**:
  - 🏋️ **Weight/Strength exercises** - Sets, reps, and weight
  - 🏃 **Cardio exercises** - Duration-based activities
- **Inline editing** - Click exercise name to edit directly
- **Category badges** - Visual indicators for exercise type
- **Muscle group tags** - Easy identification
- **Global updates** - Renaming updates all history and workout plans
- Add/delete custom exercises with confirmation
- Accessible from Settings → Exercises

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
  - 📋 **Plans** - Manage workout routines and import example plans
  - 🏋️ **Exercises** - Manage exercise library by muscle group
  - 🏃 **Cardio** - Manage cardio exercise library
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

### 📖 Usage Guide

### Getting Started
1. Open app in browser → Lands on **Home** screen
2. Bottom navigation:
   - 🏠 **Home** - Dashboard with quick start and workout plans
   - 💪 **Workout** - Active training session or quick set logging
   - 👤 **Profile** - Statistics, history, timer, and settings

### Track Your Body Weight
1. Go to **Profile** screen
2. In the "Body Weight" card, click **"+"** button
3. Enter your weight in kg
4. Select date (defaults to today)
5. Click **"Save"**
6. Weight chart updates automatically showing:
   - Current weight
   - Weight change (green = gain, red = loss)
   - 30-day trend line chart
   - Progress over time

### View Your Statistics
1. Go to **Profile** screen
2. See your complete fitness analytics:
   - **Body Weight Tracker** with trend visualization
   - **4 Stat Cards**: Total workouts, total time, average duration, day streak
   - **Period Analysis**: Switch between Week/Month/Year views
   - **Workout Frequency Chart**: Visual bar chart of training patterns
3. Statistics auto-update as you log workouts
4. Period tabs show filtered data for recent timeframes

### Log a Quick Set
1. From Home, tap **Start Empty Workout**
2. Select exercise from dropdown
3. Use **spinner buttons (+/−)** or type weight and reps
4. Click **"Add Set"**
5. Appears in "Today's Workout" below
6. Delete sets with trash icon if needed

### Create a Workout Plan
1. Go to Settings → **Plans**
2. **Option A - Import Example Plan**:
   - Browse 10 pre-built plans
   - Click **📥** button on any plan to import
   - Customize as needed
3. **Option B - Create Custom Plan**:
   - Click **"Create New Plan"**
   - Name your plan (e.g., "Push Day", "Leg Day")
   - Add exercises:
     - **For strength**: Click "➕ Add Exercise"
       - Select exercise from dropdown
       - Add sets with weight and reps
       - Click "➕ Add Set" for additional sets
     - **For cardio**: Click "🏃 Add Cardio"
       - Select cardio exercise
       - Set duration in minutes
   - **Drag exercises** to reorder using the ⋮⋮ handle
   - Click **"Save Plan"**
4. Plan appears in home widget for quick access

### Execute a Workout Plan
1. From Home widget, select your plan
2. Click **"▶️ Start Workout"** button
3. Active Workout screen opens:
   - Shows all exercises in sequence
   - Progress bar at top tracks completion
   - Elapsed time display with start time
4. Complete each exercise:
   - **For strength exercises**:
     - Review or adjust weight/reps
     - Do the exercise
     - Click **"Complete Set X/Y"**
   - **For cardio exercises**:
     - Click **"▶️ Start"** to begin timer
     - Timer counts down from duration
     - Click **"⏸️ Pause"** to stop timer
     - Click **"Skip"** to skip without completing
5. Completed exercises collapse to save space
6. Watch progress bar fill up as you complete sets
7. Click **"Finish Workout"** when done
8. All sets automatically saved to history
9. Navigates to History screen to review

### View Workout History
1. Go to Profile → **History**
2. **Total Stats** shown at top in compact bar:
   - Total workouts, sets, exercises, minutes
3. **Calendar View** displays:
   - Current month with day headers (Sun-Sat)
   - Days with workouts have darker green background
   - Today highlighted with cyan border
4. **Navigate months** with ← → buttons
5. **Click any workout day** to see details:
   - Details card slides in below calendar
   - Summary stats (exercises, sets, duration)
   - All exercises grouped by name
   - Every set with weight, reps, and time
   - Close with X button or click another day

### Manage Exercises
1. Go to Settings → **Exercises**
2. **Browse by muscle group**:
   - Exercises organized into collapsible groups
   - Click group header to expand/collapse
   - Shows exercise count per group
3. **Add new exercise**:
   - Type name in input field
   - Select category (🏋️ Weight or 🏃 Cardio)
   - Select muscle group
   - Click **"+"** button
4. **Edit existing**:
   - Click ✏️ edit icon
   - Modify name, category, or muscle group
   - Click ✓ to save or ✕ to cancel
5. **Delete**:
   - Click 🗑️ trash icon
   - Confirm deletion
6. Changes update across all plans and history

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

**Plans**:
   - View and manage all workout plans
   - Import pre-built example plans
   - Edit, duplicate, or delete plans

**Exercises**:
   - Manage exercise library
   - Add custom exercises
   - Organize by muscle group

**Cardio**:
   - Manage cardio exercise list
   - Add custom cardio activities
   - Used in workout plans and tracking

**Default Values**:
   - Adjust all workout defaults
   - Use spinners to change values
   - Set default timer duration

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
4. Contains workouts, exercises, plans, weight data, and settings
5. Save in cloud storage or safe location

**Restore Backup**:
1. Profile → Settings → Data Management
2. Click **"📥 Import Data"**
3. Select backup JSON file
4. Preview shows what will be imported
5. Confirm import
6. Page reloads with restored data

---

## 💾 Data & Privacy

### Local Storage
All data stored in browser localStorage:
- **Workout history** - Date-indexed with timestamps, weights, reps, exercises, cardio sessions
- **Workout plans** - Multi-set routines with strength and cardio exercises
- **Exercises** - Custom and default exercise library with muscle groups and categories
- **Cardio exercises** - Dedicated cardio activity library
- **Body weight data** - Weight entries with dates for tracking progress
- **Active workout** - Current session state (persists across navigation and browser close)
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
  "version": "1.0",
  "exportDate": "2025-10-11T14:30:00.000Z",
  "history": {
    "2025-10-11": [
      {
        "machine": "Bench Press",
        "weight": 80,
        "reps": 10,
        "timestamp": "2025-10-11T14:30:00.000Z",
        "id": "1728656400000"
      },
      {
        "type": "cardio",
        "exercise": "Running",
        "duration": 30,
        "timestamp": "2025-10-11T15:00:00.000Z",
        "id": "1728658200000"
      }
    ]
  },
  "machines": [
    {
      "name": "Bench Press",
      "category": "weight",
      "muscleGroup": "Chest"
    },
    {
      "name": "Running",
      "category": "cardio",
      "muscleGroup": "Cardio"
    }
  ],
  "plans": [
    {
      "id": "1728656400000",
      "name": "Push Day",
      "exercises": [
        {
          "type": "strength",
          "machine": "Bench Press",
          "sets": [
            {"weight": 80, "reps": 10},
            {"weight": 85, "reps": 8}
          ]
        },
        {
          "type": "cardio",
          "exercise": "Running",
          "duration": 15
        }
      ],
      "createdAt": "2025-10-11T14:00:00.000Z"
    }
  ],
  "weightData": [
    {
      "weight": 75.5,
      "date": "2025-10-11",
      "timestamp": 1728656400000
    }
  ],
  "settings": {
    "weightIncrement": 2.5,
    "defaultWeight": 20,
    "defaultReps": 10,
    "fontSize": "normal",
    "layoutDensity": "normal",
    "dateFormat": "eu",
    "timeFormat": "24h",
    "defaultTimerMinutes": 3
  }
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
  - Complex chart styling for statistics
- **Vanilla JavaScript (ES6+)**:
  - No frameworks, no build step
  - Event-driven architecture
  - Modular functions
  - Template literals for dynamic HTML
  - Arrow functions, destructuring, spread operator
  - Async file handling
  - Canvas API for chart rendering
  - Drag and drop API for plan reordering

### Browser APIs
- **localStorage** – Client-side persistence
- **FileReader** – JSON import
- **Blob** – File download generation
- **Date** – Timestamp management and calendar rendering
- **Vibration** – Haptic feedback (timer completion)
- **Canvas 2D Context** – Chart rendering for statistics:
  - Line charts for weight progression
  - Bar charts for workout frequency
  - Responsive chart sizing with window resize handling

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
- **Import example plans** to quickly get started with proven routines
- **Track body weight weekly** to visualize long-term progress
- **Use period tabs** (Week/Month/Year) to analyze training patterns
- Create separate plans for different training days (Push/Pull/Legs)
- **Combine strength and cardio** in same workout plan
- **Drag exercises** to reorder them in your plans
- Use the **collapse feature** in active workouts to focus on current exercise
- Export your data monthly for backup
- Adjust font size for gym lighting conditions
- Use timer between sets for consistent rest periods
- **Check statistics dashboard** regularly to track overall progress
- Set **cardio duration** based on your fitness goals

---

## 🎯 Recent Updates

### Latest Version (October 2025)
- 📊 **Comprehensive Statistics Dashboard** on Profile screen:
  - ⚖️ Body weight tracker with trend chart
  - 🏋️ Total workouts, time, and averages
  - 🔥 Day streak calculation
  - 📅 Period-based analysis (Week/Month/Year)
  - 📈 Workout frequency bar charts
  - 📉 Weight progression line charts
- 🏃 **Cardio Exercise Support**:
  - Dedicated cardio exercise library
  - Duration-based tracking
  - Built-in countdown timers in active workouts
  - Cardio sections in workout plans
- 💪 **Enhanced Exercise Management**:
  - 100+ pre-loaded exercises
  - Muscle group organization (12 categories)
  - Collapsible groups with exercise counts
  - Category and muscle group badges
  - Inline editing with save/cancel
- 📋 **10 Pre-Built Example Plans**:
  - One-click import of proven workout routines
  - Upper/Lower, PPL, Full Body, Strength, and more
  - Fully customizable after import
- 🎨 **Improved Workout Plans**:
  - Drag-and-drop exercise reordering
  - Support for both strength and cardio in same plan
  - Plan duplication feature
  - Home screen widget with plan menus
- � **Enhanced Active Workouts**:
  - Cardio timer integration
  - Collapsible completed exercises
  - Editable sets during workout
  - State persistence across browser sessions
- 📅 **Calendar-Based History**:
  - Monthly grid view with day headers
  - Workout day highlighting
  - Click-to-expand details
  - Compact stats bar
- 🐛 **Critical Bug Fixes**:
  - Fixed duplicate profileScreen HTML elements
  - Corrected statistics display issues
  - Improved state management for active workouts
  - Fixed cardio timer persistence

### Previous Updates
- ⏱️ **Improved timer screen** with proper layout and sizing
- 🔢 **Fixed number inputs** with `type="text" pattern="\d*"` for mobile
- 📱 **Responsive timer display** using `clamp()` for sizing
- 🏋️ **Exercise sorting** with alphabetical sort button
- 📋 **Profile screen reorganization** - Better navigation structure
- 🎨 **Enhanced visual feedback** on calendar interactions
- ♿ **Better accessibility** with keyboard navigation

---

## 📄 License

Open source – Use, modify, and distribute freely!

---

**Built with ❤️ and AI assistance**
