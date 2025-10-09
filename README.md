# 💪 Fitness Tracker

A modern, minimal, mobile-first fitness tracking web application with dark mode theme. Track your gym workouts, create custom workout plans, and monitor your progress over time.

## ✨ Features

### 🏋️ Workout Tracking
- **Quick Exercise Logging**: Select machine, weight, and reps with intuitive spinner controls
- **Smart Defaults**: Automatically fills in your last used weight and reps for each machine
- **Instant Save**: All workouts saved to browser's localStorage (no server needed)
- **History View**: See all your workouts organized by day with "Today" and "Yesterday" labels

### ⚙️ Customizable Settings
- **Weight Increment**: Configure how much weight changes with each +/- button press (default: 2.5kg)
- **Default Values**: Set starting weight and reps when no history is available
- **Auto-Save**: Settings are saved immediately as you change them
- **Persistent**: All settings stored in localStorage

### 🏋️ Machine Management
- **Custom Machines**: Add your own gym machines to the list
- **Pre-loaded Machines**: Comes with 11 common gym machines:
  - Bench Press
  - Squat Rack
  - Leg Press
  - Lat Pulldown
  - Shoulder Press
  - Cable Rows
  - Leg Curl
  - Leg Extension
  - Chest Fly
  - Bicep Curl
  - Tricep Extension
- **Edit & Delete**: Manage your machine list anytime
- **Alphabetically Sorted**: Machines automatically sorted for easy finding

### 📋 Workout Plans
- **Create Plans**: Design custom workout routines with multiple exercises
- **Predefined Sets**: Set specific machines, weights, and reps for each exercise
- **Plan Library**: Save multiple plans for different workout days
- **Edit Anytime**: Modify existing plans as you progress
- **Quick Start**: Select and start a plan with one click

### 🎯 Active Workout Sessions
- **Guided Workouts**: Step-by-step progression through your planned exercises
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Exercise Status**: Clear indicators for completed, in-progress, and pending exercises
- **One-at-a-Time**: Complete exercises in order, focusing on current set
- **Auto-Logging**: Each completed exercise automatically saved to history
- **Finish Summary**: Complete the workout and return to main screen with updated history

### 📝 History Management
- **Editable Entries**: Edit any past workout entry (machine, weight, or reps)
- **Delete Entries**: Remove incorrect or duplicate entries
- **Organized by Day**: Workouts grouped by date for easy tracking
- **Progress Comparison**: Compare weights and reps across different days

### 🎨 User Interface
- **Dark Mode**: Easy-on-the-eyes dark theme throughout
- **Mobile-First**: Optimized for phone screens but works on all devices
- **Minimal Design**: Clean, distraction-free interface
- **Intuitive Controls**: Spinner buttons for easy number adjustments
- **Smooth Animations**: Subtle transitions and hover effects
- **Responsive**: Adapts to different screen sizes

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in a web browser

No build process, no dependencies, no server needed!

### Running Locally
For development, you can use a simple HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# Or just open index.html directly in your browser
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### Basic Workout Logging
1. **Select a machine** from the dropdown
2. **Adjust weight and reps** using +/- buttons or type directly
3. Click **"Add Set"** to save
4. View your entry in the history below

### Creating a Workout Plan
1. Click the **📋 button** in the header
2. Click **"Create New Plan"**
3. Enter a plan name (e.g., "Push Day", "Leg Day")
4. Click **"+ Add Exercise"** for each exercise
5. Select machine, set weight and reps
6. Click **"Save Plan"**

### Using a Workout Plan
1. On the main screen, select a plan from the **Quick Start Plan** dropdown
2. Click **"Start"**
3. Complete each exercise one by one
4. Click **"Mark as Complete"** after finishing each set
5. Click **"Finish Workout"** when done

### Managing Machines
1. Click the **🏋️ button** in the header
2. Type a new machine name and click **+**
3. Delete machines you don't use with the 🗑️ button

### Adjusting Settings
1. Click the **⚙️ button** (left side of header)
2. Adjust weight increment, default weight, and default reps
3. Changes save automatically

### Editing History
1. Find the entry you want to edit
2. Click the **✏️ button**
3. Modify values and click **"Save"**
4. Or click **🗑️** to delete the entry

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- **Workout History**: `fitnessHistory`
- **Workout Plans**: `fitnessPlans`
- **Custom Machines**: `fitnessMachines`
- **Settings**: `fitnessSettings`

### Backup Your Data
To backup your data, open browser console and run:
```javascript
// Export all data
const backup = {
  history: localStorage.getItem('fitnessHistory'),
  plans: localStorage.getItem('fitnessPlans'),
  machines: localStorage.getItem('fitnessMachines'),
  settings: localStorage.getItem('fitnessSettings')
};
console.log(JSON.stringify(backup));
```

### Restore Data
```javascript
// Import data
const backup = {/* paste your backup here */};
localStorage.setItem('fitnessHistory', backup.history);
localStorage.setItem('fitnessPlans', backup.plans);
localStorage.setItem('fitnessMachines', backup.machines);
localStorage.setItem('fitnessSettings', backup.settings);
location.reload();
```

## 🎨 Customization

### Color Scheme
Edit `style.css` `:root` variables to customize colors:
```css
:root {
  --bg-primary: #0a0a0a;      /* Main background */
  --bg-secondary: #1a1a1a;    /* Card backgrounds */
  --bg-tertiary: #2a2a2a;     /* Input backgrounds */
  --text-primary: #ffffff;    /* Main text */
  --text-secondary: #a0a0a0;  /* Secondary text */
  --accent: #00d4ff;          /* Accent color (blue) */
  --accent-hover: #00b8e6;    /* Accent hover */
  --border: #333;             /* Borders */
  --danger: #ff4444;          /* Delete buttons */
  --success: #00ff88;         /* Complete buttons */
}
```

## 📱 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with localStorage support

## 🔒 Privacy

- **100% Offline**: All data stays on your device
- **No Tracking**: No analytics, no cookies, no data collection
- **No Account**: No login required, no server communication

## 🛠️ Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: No frameworks or libraries
- **localStorage API**: Client-side data persistence

## 📄 License

This is an AI-generated fitness tracker web application. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

Since this is a personal project, feel free to fork and customize for your own needs!

## 💡 Tips

- **Progressive Overload**: The app remembers your last weight for each machine, making it easy to track progressive increases
- **Consistent Naming**: Use consistent machine names for better history tracking
- **Plan Templates**: Create plans for different days (Push/Pull/Legs, Upper/Lower, etc.)
- **Regular Backups**: Export your data periodically if you have a long workout history

## 🐛 Known Limitations

- Data is browser-specific (not synced across devices)
- No cloud backup (localStorage only)
- Limited to one browser/device unless manually exported/imported

## 🚀 Future Ideas

- Timer for rest periods between sets
- Notes field for each exercise
- Charts and progress graphs
- Export to CSV functionality
- PWA support for offline use
- Multi-set tracking per exercise

---

**Built with 💪 for tracking gains!**
