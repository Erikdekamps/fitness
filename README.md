# 💪 Fitness Tracker

> **Built with AI** – A modern, minimal, mobile-first fitness tracking progressive web app with dark mode. Track your gym workouts, create custom training plans, monitor progress with detailed analytics, and manage your data with full backup/restore capabilities.

---

## ✨ Key Features

### 🏋️ Quick Set Logging
- **Smart number inputs** with mobile-optimized pattern attributes
- **Spinner controls** for quick weight/rep adjustments
- Automatically remembers your last used values per machine
- Instant save to browser storage – no server needed
- **Today's Workout** section shows real-time workout progress
- Quick delete from today's section with confirmation

### 📋 Multi-Set Workout Plans
- Create exercises with multiple sets at different weights/reps
- **Exercise Bundling**: Consecutive sets of the same exercise are grouped together
- Example: Bench Press – 3 sets shown as "Set 1/2/3" in one bundle
- Build complete workout routines (Push/Pull/Legs, Full Body, etc.)
- Start a plan and track each set individually
- **Visual progress bar** shows completion status
- Each set automatically logged to history
- Edit or delete plans anytime

### 🎯 Guided Workout Sessions
- Step-by-step progression through planned exercises
- Visual progress tracking with status indicators
- Complete sets one at a time with clear UI feedback
- Auto-logging to history after each set
- Real-time updates to today's workout section
- Cancel option with confirmation to prevent accidental data loss

### 📊 Advanced Workout Analytics & History
- **Total Statistics Dashboard**: View overall progress
  - Total workouts completed
  - Total sets performed
  - Unique exercises tracked
  - Total time spent training
- **Workout Summary Cards**: Each workout day displays:
  - Date with calendar icon
  - Workout duration in HH:MM:SS format
  - Exercise badges showing all exercises performed
  - **Interactive view details icon** (👁️) in top-right corner
- **Detailed Workout View**: Click any workout to see:
  - Complete statistics and metadata
  - All exercises grouped together
  - Every set with timestamp, weight, and reps
  - Organized by exercise with set numbering
  - Same width as other screens for consistency

### 🎛️ Machine Management
- **Inline Editing**: Rename machines directly from the list
- Click to edit, auto-saves on blur/enter
- Auto-cancel when editing another machine
- **Global Updates**: Renaming updates all history and workout plans
- Add/delete custom machines with confirmation
- Alphabetically sorted for easy browsing
- Comes pre-loaded with 11 common exercises
- Accessible from dedicated Exercises tab

### ⚙️ Comprehensive Settings

#### Workout Preferences
- **Weight Increment**: Adjust how much weight changes with +/- buttons (default: 2.5kg)
- **Default Weight**: Set starting weight for new exercises (default: 20kg)
- **Default Reps**: Set starting reps for new exercises (default: 10)
- **Default Timer Duration**: Set rest timer default (default: 3 minutes)
  - Auto-applies on app load, timer reset, and navigation

#### Display & Format Settings (Badge-Style Selectors)
- **Font Size**: 5 scaling options with badge selection
  - Tiny (80%), Small (90%), Normal (100%), Large (110%), XL (120%)
  - Scales all text throughout the app
  - Perfect for visibility in bright gym environments
- **Layout Density**: 3 spacing options
  - Compact, Normal, Spacious
  - Adjusts padding and gaps globally
- **Date Format**: 3 format options
  - US (MM/DD/YYYY), EU (DD/MM/YYYY), ISO (YYYY-MM-DD)
- **Time Format**: 2 display options
  - 12-hour (AM/PM), 24-hour
- All settings use modern badge-style selectors for easy selection
- Everything auto-saved to localStorage instantly

#### Data Management
- **Export Data**: One-click backup to JSON file
  - Includes all workout history, machines, plans, and settings
  - Filename includes export date for easy organization
  - Human-readable JSON format
- **Import Data**: Restore from previous export
  - File picker with validation
  - Preview confirmation showing what will be imported
  - Safe operation with user confirmation
  - Automatic page reload to apply changes

### ⏱️ Built-in Timer & Stopwatch
- **Timer Tab (Primary)**: Rest timer between sets
  - Pre-configured with default duration setting
  - Large display with MM:SS format
  - Auto-resets to default duration
  - Input controls for custom durations
- **Stopwatch Tab**: Track workout or exercise time
  - Lap tracking with history
  - Clear display with HH:MM:SS format
  - Start/stop/reset controls
- Quick access from bottom navigation
- Timer defaults intelligently set on load and reset

### 🎨 Beautiful Interface
- **Dark mode optimized** for gym lighting conditions
- **Mobile-first responsive design** fits all screen sizes
- **Smooth animations** and intuitive controls throughout
- **iOS-style bottom navigation** with 5 tabs:
  - Exercises, Timer, Workout (default), History, Settings
  - **Active tab highlighting** with background accent
- **Consistent layout** with full-width design
- **Touch-optimized** with appropriate tap targets
- Clean card-based design with hover effects
- **No horizontal overflow** – everything fits on screen
- Pinch-zoom disabled for app-like experience

### 🔐 Enhanced UI/UX
- **Clickable workout cards**: Entire card is clickable, not just buttons
- **Keyboard navigation support**: Tab and Enter/Space for accessibility
- **Visual feedback**: Hover states, active states, and transitions
- **Confirmation dialogs**: Prevent accidental deletions and data loss
- **Error handling**: User-friendly error messages
- **Accessibility features**: ARIA labels, semantic HTML, proper focus management

---

## 📖 Usage Guide

### Log a Single Set
1. Open the **Workout** tab (default screen)
2. Select a machine from the dropdown
3. Use **spinner buttons (+/−)** or type weight and reps
4. Click **"Add Set"**
5. View immediately in "Today's Workout" section below
6. Delete individual sets if needed

### Create a Training Plan
1. Click **"📋 Manage Workout Plans"** on the Workout tab
2. Click **"Create New Plan"**
3. Name your plan (e.g., "Upper Body A", "Leg Day")
4. Add exercises:
   - Select a machine from dropdown
   - Click **"+ Add Set"** to add multiple sets
   - Enter different weight/reps for each set
   - Consecutive same-exercise sets will be bundled together
5. Click **"Save Plan"**
6. Plan appears in your plans list

### Execute a Training Plan
1. Select your plan from the **Quick Start Plan** dropdown
2. Click **"Start"**
3. Active Workout screen appears with all exercises
4. Complete each set one by one:
   - Review the target weight/reps
   - Click **"Mark Complete"** after finishing
5. Track progress with the visual progress bar
6. View real-time updates in "Today's Workout" section
7. Click **"Finish Workout"** when done
8. All sets are automatically saved to history

### View Workout History & Analytics
1. Go to **History** tab
2. **Total Stats** at top show overall progress
3. **Last Workout** section shows your most recent session
4. **All Workouts** section lists all workout days
5. Each card shows:
   - Date with calendar icon
   - Duration with clock icon
   - Exercise badges
   - View details icon (👁️) in top-right
6. Click anywhere on a card to view full details
7. Detail view shows complete workout breakdown

### Manage Machines/Exercises
1. Go to **Exercises** tab (🏋️ icon in bottom nav)
2. **Add new machine**:
   - Type name in input field
   - Click **"+"** button
3. **Rename machine**:
   - Click on machine name
   - Edit inline
   - Press Enter or click away to save
4. **Delete machine**:
   - Click trash icon (⚠️)
   - Confirm deletion
   - Machine removed from all history and plans

### Use the Timer
1. Go to **Timer** tab (⏱️ icon in bottom nav)
2. **Timer (default tab)**:
   - Shows default duration from settings
   - Adjust minutes/seconds if needed
   - Click **"Start"** to begin countdown
   - Click **"Reset"** to restore default
3. **Stopwatch tab**:
   - Click **"Start"** to begin
   - Click **"Lap"** to record lap times
   - Click **"Stop"** to pause
   - Click **"Reset"** to clear

### Customize Settings
1. Go to **Settings** tab (⚙️ icon in bottom nav)
2. **Workout Defaults**:
   - Adjust weight increment (spinner controls)
   - Set default weight and reps
   - Set default timer duration
3. **Display Settings** (click badges to select):
   - Choose font size
   - Select layout density
   - Pick date format
   - Choose time format
4. **Data Management**:
   - Click **"📤 Export Data"** to download backup
   - Click **"📥 Import Data"** to restore from file
5. All changes save automatically

### Backup and Restore
1. **Create Backup**:
   - Go to Settings → Data Management
   - Click **"📤 Export Data"**
   - JSON file downloads automatically
   - Save file in safe location
2. **Restore Backup**:
   - Go to Settings → Data Management
   - Click **"📥 Import Data"**
   - Select your backup JSON file
   - Review confirmation dialog
   - Confirm to import
   - Page reloads with restored data

---

## 💾 Data & Privacy

### Storage
All data stored locally in your browser using localStorage:
- **Workout history** with timestamps, weights, reps, and machines
- **Training plans** with multi-set exercises and configurations
- **Custom machines** list with user additions
- **User settings** (increments, formats, font size, timer defaults)

### Privacy & Security
✅ **100% offline** – no server, no account, no tracking  
✅ **Zero data collection** – everything stays on your device  
✅ **No dependencies** – pure HTML/CSS/JavaScript  
✅ **No cookies** – all data in localStorage only  
✅ **Export/Import** – full control over your data  
✅ **No analytics** – complete privacy

### Data Portability
- Export data anytime as JSON
- Import on any device with a modern browser
- Transfer between devices easily
- Keep backups for long-term storage
- Human-readable format for data inspection

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** – Semantic markup with accessibility features
- **CSS3** – Modern styling with advanced features:
  - CSS custom properties (variables) for theming
  - Dynamic font scaling with calc() and var()
  - Flexbox layouts for responsive design
  - Smooth transitions and hover effects
  - Mobile-first media queries
  - No horizontal overflow handling
- **Vanilla JavaScript** – No frameworks, no build step:
  - Event-driven architecture
  - Modular function design
  - Real-time DOM updates
  - ES6+ features (arrow functions, template literals, destructuring)
  - Async file handling for import/export

### Storage & Data
- **localStorage API** – Client-side persistence
- **JSON** – Data serialization and export format
- **Blob API** – File download generation
- **FileReader API** – File import handling

### Features
- Progressive Web App ready (PWA-capable)
- Touch-optimized event handling
- Keyboard navigation support
- Mobile input pattern attributes
- No external dependencies or CDNs

---

## 📱 Browser Compatibility

### Fully Supported
- ✅ **Chrome/Edge** 90+ (recommended)
- ✅ **Safari** 14+ (iOS & macOS)
- ✅ **Firefox** 88+

### Requirements
- Modern browser with ES6+ support
- localStorage support
- FileReader API support (for import)
- Blob API support (for export)

### Mobile Optimization
- Touch-friendly controls
- Mobile keyboard optimization
- Responsive layout (fits all screen sizes)
- No pinch-zoom for app-like experience
- All content fits on screen without overflow

---

## 🚀 Getting Started

1. **Open the app** in your browser
2. **Start logging** – select a machine, enter weight/reps, click "Add Set"
3. **Create plans** – build workout routines for different days
4. **Track progress** – view history and statistics
5. **Customize** – adjust settings to your preference
6. **Backup regularly** – export your data for safekeeping

---

## 📄 License

Open source – feel free to use, modify, and distribute!

---

## 🎯 Version History

### Latest Version
- ✨ Badge-style setting selectors for better UX
- 📤 Data export/import functionality
- ⏱️ Default timer duration setting
- 🎨 Enhanced active tab styling
- 👁️ View details icon repositioned to top-right
- 🐛 Fixed settings save bug with spinner buttons
- 📱 Improved mobile experience and overflow handling
- 🧹 Code cleanup and CSS optimization

---

**Built with ❤️ and AI assistance**
