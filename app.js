// Fitness Tracker App with Dark Mode, Editable History, Custom Machines, and Settings
const form = document.getElementById('entryForm');
const machineSelect = document.getElementById('machine');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const historyList = document.getElementById('historyList');

// Today section
const todaySection = document.getElementById('todaySection');
const todayList = document.getElementById('todayList');

// Screens
const homeScreen = document.getElementById('homeScreen');
const profileScreen = document.getElementById('profileScreen');
const trackerScreen = document.getElementById('trackerScreen');
const machineScreen = document.getElementById('machineScreen');
const settingsScreen = document.getElementById('settingsScreen');
const settingsPlansScreen = document.getElementById('settingsPlansScreen');
const settingsExercisesScreen = document.getElementById('settingsExercisesScreen');
const settingsDefaultsScreen = document.getElementById('settingsDefaultsScreen');
const settingsAppearanceScreen = document.getElementById('settingsAppearanceScreen');
const settingsDataScreen = document.getElementById('settingsDataScreen');
const editPlanScreen = document.getElementById('editPlanScreen');
const activeWorkoutScreen = document.getElementById('activeWorkoutScreen');
const timerScreen = document.getElementById('timerScreen');
const historyScreen = document.getElementById('historyScreen');
const workoutDetailScreen = document.getElementById('workoutDetailScreen');

// Buttons
const backFromEditPlanBtn = document.getElementById('backFromEditPlanBtn');
const backFromMachinesBtn = document.getElementById('backFromMachinesBtn');
const cancelWorkoutBtn = document.getElementById('cancelWorkoutBtn');
const backFromDetailBtn = document.getElementById('backFromDetailBtn');

// Bottom Navigation
const bottomNav = document.getElementById('bottomNav');

// Track current workout detail for refreshing when settings change
let currentWorkoutDetail = null;
const navHome = document.getElementById('navHome');
const navWorkout = document.getElementById('navWorkout');
const navProfile = document.getElementById('navProfile');
const addMachineBtn = document.getElementById('addMachineBtn');
const newMachineNameInput = document.getElementById('newMachineName');
const machineListDiv = document.getElementById('machineList');

// Plan elements
const planSelector = document.getElementById('planSelector');
const activePlanSelect = document.getElementById('activePlan');
const startPlanBtn = document.getElementById('startPlanBtn');
const manageExercisesBtn = document.getElementById('manageExercisesBtn');
const createPlanBtn = document.getElementById('createPlanBtn');
const plansListDiv = document.getElementById('plansList');
const editPlanForm = document.getElementById('editPlanForm');
const editPlanTitle = document.getElementById('editPlanTitle');
const planNameInput = document.getElementById('planName');
const planExercisesDiv = document.getElementById('planExercises');
const addExerciseBtn = document.getElementById('addExerciseBtn');

// Active workout elements
const activeWorkoutTitle = document.getElementById('activeWorkoutTitle');
const workoutExercisesDiv = document.getElementById('workoutExercises');
const finishWorkoutBtn = document.getElementById('finishWorkoutBtn');
const progressBarFill = document.getElementById('progressBarFill');
const progressCurrent = document.getElementById('progressCurrent');
const progressTotal = document.getElementById('progressTotal');
const workoutTimeDisplay = document.getElementById('workoutTimeDisplay');
const workoutElapsedTime = document.getElementById('workoutElapsedTime');
const workoutStartTime = document.getElementById('workoutStartTime');

let currentEditingPlanId = null;
let currentPlanExercises = [];
let currentWorkoutPlan = null;
let completedExercises = new Set();
let expandedExerciseIndex = null; // Track which exercise is expanded
let workoutTimerInterval = null; // Track workout elapsed time

// Track navigation context for proper back navigation
let machinesScreenContext = 'settings'; // Can be 'settings' or 'settingsExercises'

// ===== ACTIVE WORKOUT PERSISTENCE =====

// Save active workout to localStorage
function saveActiveWorkout() {
  if (currentWorkoutPlan) {
    const workoutState = {
      plan: currentWorkoutPlan,
      completedExercises: Array.from(completedExercises),
      startTime: currentWorkoutPlan.startTime,
      endTime: currentWorkoutPlan.endTime
    };
    localStorage.setItem('activeWorkout', JSON.stringify(workoutState));
  } else {
    localStorage.removeItem('activeWorkout');
  }
}

// Load active workout from localStorage
function loadActiveWorkout() {
  const saved = localStorage.getItem('activeWorkout');
  if (saved) {
    try {
      const workoutState = JSON.parse(saved);
      currentWorkoutPlan = workoutState.plan;
      completedExercises = new Set(workoutState.completedExercises || []);
      // Restore start and end times
      if (workoutState.startTime) {
        currentWorkoutPlan.startTime = workoutState.startTime;
      }
      if (workoutState.endTime) {
        currentWorkoutPlan.endTime = workoutState.endTime;
      }
      return true;
    } catch (e) {
      console.error('Error loading active workout:', e);
      localStorage.removeItem('activeWorkout');
      return false;
    }
  }
  return false;
}

// Clear active workout from localStorage
function clearActiveWorkout() {
  currentWorkoutPlan = null;
  completedExercises.clear();
  localStorage.removeItem('activeWorkout');
  
  // Stop workout timer
  if (workoutTimerInterval) {
    clearInterval(workoutTimerInterval);
    workoutTimerInterval = null;
  }
}

// Start workout timer
function startWorkoutTimer() {
  // Clear any existing timer
  if (workoutTimerInterval) {
    clearInterval(workoutTimerInterval);
  }
  
  // Update immediately
  updateWorkoutTimer();
  
  // Update every second
  workoutTimerInterval = setInterval(updateWorkoutTimer, 1000);
}

// Update workout timer display
function updateWorkoutTimer() {
  if (!currentWorkoutPlan || !currentWorkoutPlan.startTime) {
    workoutTimeDisplay.style.display = 'none';
    return;
  }
  
  workoutTimeDisplay.style.display = 'block';
  
  const startTime = new Date(currentWorkoutPlan.startTime);
  const now = new Date();
  const elapsedMs = now - startTime;
  
  // Format as HH:MM:SS or MM:SS
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    workoutElapsedTime.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    workoutElapsedTime.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
  }
  
  // Display start time
  const settings = getSettings();
  const timeFormat = settings.timeFormat || '24h';
  let startTimeText = '';
  
  if (timeFormat === '12h') {
    const hours12 = startTime.getHours() % 12 || 12;
    const ampm = startTime.getHours() >= 12 ? 'PM' : 'AM';
    startTimeText = `Started at ${hours12}:${String(startTime.getMinutes()).padStart(2, '0')} ${ampm}`;
  } else {
    startTimeText = `Started at ${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;
  }
  
  workoutStartTime.textContent = startTimeText;
}

// Settings inputs
const weightIncrementInput = document.getElementById('weightIncrement');
const defaultWeightInput = document.getElementById('defaultWeight');
const defaultRepsInput = document.getElementById('defaultReps');
const defaultTimerMinutesInput = document.getElementById('defaultTimerMinutes');

// Setting badge containers (replacing selects)
const fontSizeBadges = document.getElementById('fontSizeBadges');
const layoutDensityBadges = document.getElementById('layoutDensityBadges');
const dateFormatBadges = document.getElementById('dateFormatBadges');
const timeFormatBadges = document.getElementById('timeFormatBadges');

// Data management buttons
const exportDataBtn = document.getElementById('exportDataBtn');
const importDataBtn = document.getElementById('importDataBtn');
const importFileInput = document.getElementById('importFileInput');
const resetEverythingBtn = document.getElementById('resetEverythingBtn');

// Default machines
const DEFAULT_MACHINES = [
  'Bench Press',
  'Squat Rack',
  'Leg Press',
  'Lat Pulldown',
  'Shoulder Press',
  'Cable Rows',
  'Leg Curl',
  'Leg Extension',
  'Chest Fly',
  'Bicep Curl',
  'Tricep Extension'
];

// ===== SETTINGS =====

// Get settings from localStorage
function getSettings() {
  const defaultSettings = {
    weightIncrement: 2.5,
    defaultWeight: 20,
    defaultReps: 10,
    fontSize: 'normal',
    layoutDensity: 'normal',
    dateFormat: 'eu',
    timeFormat: '24h',
    defaultTimerMinutes: 3
  };
  const saved = localStorage.getItem('fitnessSettings');
  return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings) {
  localStorage.setItem('fitnessSettings', JSON.stringify(settings));
  applySettings();
}

// Apply settings to UI
function applySettings() {
  const settings = getSettings();
  weightIncrementInput.value = settings.weightIncrement;
  defaultWeightInput.value = settings.defaultWeight;
  defaultRepsInput.value = settings.defaultReps;
  defaultTimerMinutesInput.value = settings.defaultTimerMinutes;
  
  // Update badge selections
  updateBadgeSelection(fontSizeBadges, settings.fontSize);
  updateBadgeSelection(layoutDensityBadges, settings.layoutDensity);
  updateBadgeSelection(dateFormatBadges, settings.dateFormat);
  updateBadgeSelection(timeFormatBadges, settings.timeFormat);
  
  // Update weight input step
  weightInput.step = settings.weightIncrement;
  
  // Apply font size to html element (for rem units)
  document.documentElement.classList.remove('font-tiny', 'font-small', 'font-normal', 'font-large', 'font-very-large');
  document.documentElement.classList.add(`font-${settings.fontSize}`);
  
  // Apply layout density to html element
  document.documentElement.classList.remove('density-narrow', 'density-normal', 'density-wide');
  document.documentElement.classList.add(`density-${settings.layoutDensity}`);
}

// Helper function to update badge selection
function updateBadgeSelection(container, value) {
  const badges = container.querySelectorAll('.setting-badge');
  badges.forEach(badge => {
    if (badge.dataset.value === value) {
      badge.classList.add('active');
    } else {
      badge.classList.remove('active');
    }
  });
}

// Helper function to get selected badge value
function getSelectedBadgeValue(container) {
  const activeBadge = container.querySelector('.setting-badge.active');
  return activeBadge ? activeBadge.dataset.value : null;
}

// ===== MACHINES =====

// Get machines from localStorage
function getMachines() {
  const saved = localStorage.getItem('fitnessMachines');
  return saved ? JSON.parse(saved) : DEFAULT_MACHINES;
}

// Save machines to localStorage
function saveMachines(machines) {
  localStorage.setItem('fitnessMachines', JSON.stringify(machines));
}

// Add a new machine
function addMachine(name) {
  const machines = getMachines();
  const trimmed = name.trim();
  
  if (!trimmed) return false;
  if (machines.includes(trimmed)) {
    alert('This machine already exists!');
    return false;
  }
  
  machines.push(trimmed);
  machines.sort();
  saveMachines(machines);
  renderMachineList();
  renderMachineSelect();
  return true;
}

// Delete a machine
function deleteMachine(name) {
  const machines = getMachines();
  const filtered = machines.filter(m => m !== name);
  saveMachines(filtered);
  renderMachineList();
  renderMachineSelect();
}

// Rename a machine
function renameMachine(oldName, newName) {
  newName = newName.trim();
  
  if (!newName) {
    alert('Machine name cannot be empty');
    return false;
  }
  
  const machines = getMachines();
  
  if (newName !== oldName && machines.includes(newName)) {
    alert('A machine with this name already exists');
    return false;
  }
  
  if (newName === oldName) {
    return true; // No change needed
  }
  
  // Update machine name in the list
  const index = machines.indexOf(oldName);
  if (index !== -1) {
    machines[index] = newName;
    saveMachines(machines);
  }
  
  // Update machine name in all history entries
  const history = getHistory();
  let historyUpdated = false;
  Object.keys(history).forEach(date => {
    history[date].forEach(entry => {
      if (entry.machine === oldName) {
        entry.machine = newName;
        historyUpdated = true;
      }
    });
  });
  if (historyUpdated) {
    saveHistory(history);
  }
  
  // Update machine name in all plans
  const plans = getPlans();
  let plansUpdated = false;
  plans.forEach(plan => {
    plan.exercises.forEach(exercise => {
      if (exercise.machine === oldName) {
        exercise.machine = newName;
        plansUpdated = true;
      }
    });
  });
  if (plansUpdated) {
    savePlans(plans);
  }
  
  renderMachineList();
  renderMachineSelect();
  renderHistory();
  renderPlansList();
  
  return true;
}

// Render machine select dropdown
function renderMachineSelect() {
  const machines = getMachines();
  const currentValue = machineSelect.value;
  
  // Sort machines alphabetically
  const sortedMachines = [...machines].sort((a, b) => a.localeCompare(b));
  
  machineSelect.innerHTML = '<option value="">Select machine</option>';
  sortedMachines.forEach(machine => {
    const option = document.createElement('option');
    option.value = machine;
    option.textContent = machine;
    machineSelect.appendChild(option);
  });
  
  // Restore selection if it still exists
  if (currentValue && machines.includes(currentValue)) {
    machineSelect.value = currentValue;
  }
}

// Render machine list for management
let currentEditingMachine = null;

function renderMachineList() {
  const machines = getMachines();
  machineListDiv.innerHTML = '';
  currentEditingMachine = null; // Reset editing state
  
  if (machines.length === 0) {
    machineListDiv.innerHTML = '<div class="empty-state">No machines added yet.</div>';
    return;
  }
  
  machines.forEach(machine => {
    const machineItem = document.createElement('div');
    machineItem.className = 'machine-item';
    
    const machineName = document.createElement('div');
    machineName.className = 'machine-item-name';
    machineName.textContent = machine;
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'machine-edit-input';
    editInput.value = machine;
    editInput.style.display = 'none';
    
    const actions = document.createElement('div');
    actions.className = 'history-entry-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon edit';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Rename';
    editBtn.addEventListener('click', () => {
      // Cancel any existing edit
      if (currentEditingMachine && currentEditingMachine.cancelBtn) {
        currentEditingMachine.cancelBtn.click();
      }
      
      // Switch to edit mode
      machineName.style.display = 'none';
      editInput.style.display = 'block';
      editInput.focus();
      editInput.select();
      editBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      saveBtn.style.display = 'flex';
      cancelBtn.style.display = 'flex';
      
      // Store current editing state
      currentEditingMachine = {
        machineName,
        editInput,
        editBtn,
        deleteBtn,
        saveBtn,
        cancelBtn,
        originalName: machine
      };
    });
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-icon edit';
    saveBtn.innerHTML = '✓';
    saveBtn.title = 'Save';
    saveBtn.style.display = 'none';
    saveBtn.addEventListener('click', () => {
      const newName = editInput.value.trim();
      if (newName && renameMachine(machine, newName)) {
        currentEditingMachine = null;
        // renderMachineList will be called by renameMachine
      } else {
        editInput.value = machine;
      }
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-icon';
    cancelBtn.innerHTML = '✕';
    cancelBtn.title = 'Cancel';
    cancelBtn.style.display = 'none';
    cancelBtn.addEventListener('click', () => {
      editInput.value = machine;
      machineName.style.display = 'block';
      editInput.style.display = 'none';
      editBtn.style.display = 'flex';
      deleteBtn.style.display = 'flex';
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      currentEditingMachine = null;
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Delete "${machine}"?`)) {
        deleteMachine(machine);
      }
    });
    
    // Handle Enter key to save
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveBtn.click();
      } else if (e.key === 'Escape') {
        cancelBtn.click();
      }
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    actions.appendChild(deleteBtn);
    
    machineItem.appendChild(machineName);
    machineItem.appendChild(editInput);
    machineItem.appendChild(actions);
    machineListDiv.appendChild(machineItem);
  });
}

// ===== SCREEN NAVIGATION =====

function showScreen(screen) {
  homeScreen.classList.toggle('screen-hidden', screen !== 'home');
  profileScreen.classList.toggle('screen-hidden', screen !== 'profile');
  trackerScreen.classList.toggle('screen-hidden', screen !== 'tracker');
  machineScreen.classList.toggle('screen-hidden', screen !== 'machines');
  settingsScreen.classList.toggle('screen-hidden', screen !== 'settings');
  settingsPlansScreen.classList.toggle('screen-hidden', screen !== 'settingsPlans');
  settingsExercisesScreen.classList.toggle('screen-hidden', screen !== 'settingsExercises');
  settingsDefaultsScreen.classList.toggle('screen-hidden', screen !== 'settingsDefaults');
  settingsAppearanceScreen.classList.toggle('screen-hidden', screen !== 'settingsAppearance');
  settingsDataScreen.classList.toggle('screen-hidden', screen !== 'settingsData');
  editPlanScreen.classList.toggle('screen-hidden', screen !== 'editPlan');
  activeWorkoutScreen.classList.toggle('screen-hidden', screen !== 'activeWorkout');
  timerScreen.classList.toggle('screen-hidden', screen !== 'timer');
  historyScreen.classList.toggle('screen-hidden', screen !== 'history');
  workoutDetailScreen.classList.toggle('screen-hidden', screen !== 'workoutDetail');
  
  // Set default timer value when navigating to timer screen
  if (screen === 'timer') {
    const settings = getSettings();
    if (timerMinutesInput.value === '0' && timerSecondsInput.value === '0') {
      timerMinutesInput.value = settings.defaultTimerMinutes;
    }
  }
  
  // Update bottom navigation active state
  updateNavActiveState(screen);
}

// Update bottom navigation active state
function updateNavActiveState(screen) {
  // Clear current active state
  [navHome, navWorkout, navProfile].forEach(btn => btn.classList.remove('active'));

  // Screens that conceptually belong to the workout flow
  const workoutScreens = new Set(['tracker', 'activeWorkout', 'editPlan']);
  
  // Screens that belong to profile (settings, history, timer, etc.)
  const profileScreens = new Set(['profile', 'settings', 'settingsPlans', 'settingsExercises', 'settingsDefaults', 'settingsAppearance', 'settingsData', 'machines', 'history', 'workoutDetail', 'timer']);

  // Home screen
  if (screen === 'home') {
    navHome.classList.add('active');
    return;
  }

  if (workoutScreens.has(screen)) {
    navWorkout.classList.add('active');
    return;
  }
  
  if (profileScreens.has(screen)) {
    navProfile.classList.add('active');
    return;
  }
}

backFromEditPlanBtn.addEventListener('click', () => {
  showScreen('settingsPlans');
  renderPlansList();
});

backFromMachinesBtn.addEventListener('click', () => {
  showScreen(machinesScreenContext); // Navigate back to the context we came from
  machinesScreenContext = 'settings'; // Reset to default
});

cancelWorkoutBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel this workout? Progress will not be saved.')) {
    clearActiveWorkout();
    showScreen('tracker');
  }
});

backFromDetailBtn.addEventListener('click', () => {
  currentWorkoutDetail = null; // Clear tracking when leaving detail view
  showScreen('history');
});

// Add machine button
addMachineBtn.addEventListener('click', () => {
  const name = newMachineNameInput.value.trim();
  if (name) {
    if (addMachine(name)) {
      newMachineNameInput.value = '';
    }
  }
});

// Allow Enter key to add machine
newMachineNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = newMachineNameInput.value.trim();
    if (name) {
      if (addMachine(name)) {
        newMachineNameInput.value = '';
      }
    }
  }
});

// Auto-save settings when inputs change
function getCurrentSettingsFromInputs() {
  return {
    weightIncrement: parseFloat(weightIncrementInput.value),
    defaultWeight: parseFloat(defaultWeightInput.value),
    defaultReps: parseInt(defaultRepsInput.value),
    fontSize: getSelectedBadgeValue(fontSizeBadges),
    layoutDensity: getSelectedBadgeValue(layoutDensityBadges),
    dateFormat: getSelectedBadgeValue(dateFormatBadges),
    timeFormat: getSelectedBadgeValue(timeFormatBadges),
    defaultTimerMinutes: parseInt(defaultTimerMinutesInput.value)
  };
}

weightIncrementInput.addEventListener('change', () => {
  saveSettings(getCurrentSettingsFromInputs());
});

defaultWeightInput.addEventListener('change', () => {
  saveSettings(getCurrentSettingsFromInputs());
});

defaultRepsInput.addEventListener('change', () => {
  saveSettings(getCurrentSettingsFromInputs());
});

// Setting badge click handlers
function handleSettingBadgeClick(container, callback) {
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('setting-badge')) {
      // Remove active from all badges in this container
      container.querySelectorAll('.setting-badge').forEach(badge => {
        badge.classList.remove('active');
      });
      // Add active to clicked badge
      e.target.classList.add('active');
      // Save settings and run callback
      saveSettings(getCurrentSettingsFromInputs());
      if (callback) callback();
    }
  });
}

// Font size badge handler
handleSettingBadgeClick(fontSizeBadges);

// Layout density badge handler
handleSettingBadgeClick(layoutDensityBadges);

// Date format badge handler
handleSettingBadgeClick(dateFormatBadges, () => {
  renderHistory(); // Refresh history to apply new date format
  renderTodaySection(); // Refresh today section
  // Refresh workout detail if currently viewing one
  if (currentWorkoutDetail) {
    showWorkoutDetail(currentWorkoutDetail.date, currentWorkoutDetail.entries);
  }
});

// Time format badge handler
handleSettingBadgeClick(timeFormatBadges, () => {
  renderHistory(); // Refresh history (affects workout detail stats)
  renderTodaySection(); // Refresh today section to apply new time format
  // Refresh workout detail if currently viewing one
  if (currentWorkoutDetail) {
    showWorkoutDetail(currentWorkoutDetail.date, currentWorkoutDetail.entries);
  }
});

defaultTimerMinutesInput.addEventListener('change', () => {
  saveSettings(getCurrentSettingsFromInputs());
  // Apply default timer value to the timer inputs and display
  const settings = getSettings();
  timerMinutesInput.value = settings.defaultTimerMinutes;
  timerSecondsInput.value = 0;
  const defaultDurationMs = settings.defaultTimerMinutes * 60 * 1000;
  timerDisplay.textContent = formatTimerTime(defaultDurationMs);
});

// ===== DATA EXPORT/IMPORT =====

// Export all data to JSON file
function exportData() {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    history: JSON.parse(localStorage.getItem('fitnessHistory') || '[]'),
    machines: JSON.parse(localStorage.getItem('fitnessMachines') || '[]'),
    plans: JSON.parse(localStorage.getItem('fitnessPlans') || '[]'),
    settings: JSON.parse(localStorage.getItem('fitnessSettings') || '{}')
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fitness-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert('Data exported successfully!');
}

// Import data from JSON file
function importData(file) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validate data structure
      if (!data.version || !data.exportDate) {
        throw new Error('Invalid backup file format');
      }
      
      // Confirm with user before overwriting
      const confirmed = confirm(
        `Import data from ${new Date(data.exportDate).toLocaleString()}?\n\n` +
        `This will replace your current data:\n` +
        `- ${(data.history || []).length} workout entries\n` +
        `- ${(data.machines || []).length} machines\n` +
        `- ${(data.plans || []).length} workout plans\n` +
        `- Settings\n\n` +
        `Current data will be overwritten. Continue?`
      );
      
      if (!confirmed) {
        return;
      }
      
      // Import data
      if (data.history) localStorage.setItem('fitnessHistory', JSON.stringify(data.history));
      if (data.machines) localStorage.setItem('fitnessMachines', JSON.stringify(data.machines));
      if (data.plans) localStorage.setItem('fitnessPlans', JSON.stringify(data.plans));
      if (data.settings) localStorage.setItem('fitnessSettings', JSON.stringify(data.settings));
      
      alert('Data imported successfully! The page will now reload.');
      
      // Reload page to apply all changes
      window.location.reload();
      
    } catch (error) {
      alert(`Error importing data: ${error.message}`);
      console.error('Import error:', error);
    }
  };
  
  reader.onerror = () => {
    alert('Error reading file');
  };
  
  reader.readAsText(file);
}

// Export button click handler
exportDataBtn.addEventListener('click', exportData);

// Import button click handler
importDataBtn.addEventListener('click', () => {
  importFileInput.click();
});

// File input change handler
importFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    importData(file);
    // Reset the input so the same file can be selected again
    e.target.value = '';
  }
});

// Reset everything button
resetEverythingBtn.addEventListener('click', () => {
  const confirmation = confirm(
    '⚠️ WARNING: This will permanently delete ALL your data including:\n\n' +
    '• All workout history\n' +
    '• All workout plans\n' +
    '• All custom exercises\n' +
    '• All settings\n\n' +
    'This action CANNOT be undone!\n\n' +
    'Are you absolutely sure you want to reset everything?'
  );
  
  if (confirmation) {
    // Double confirmation for safety
    const doubleConfirm = confirm(
      'Last chance! Are you 100% sure you want to delete everything?\n\n' +
      'Click OK to permanently delete all data.\n' +
      'Click Cancel to keep your data.'
    );
    
    if (doubleConfirm) {
      // Clear all localStorage
      localStorage.clear();
      
      // Show success message
      alert('✅ All data has been reset. The app will now reload with default settings.');
      
      // Reload the page to reinitialize with defaults
      window.location.reload();
    }
  }
});

// ===== WORKOUT PLANS =====

// Get plans from localStorage
function getPlans() {
  const saved = localStorage.getItem('fitnessPlans');
  return saved ? JSON.parse(saved) : [];
}

// Save plans to localStorage
function savePlans(plans) {
  localStorage.setItem('fitnessPlans', JSON.stringify(plans));
}

// Create or update a plan
function savePlan(plan) {
  const plans = getPlans();
  
  if (plan.id) {
    // Update existing plan
    const index = plans.findIndex(p => p.id === plan.id);
    if (index !== -1) {
      plans[index] = plan;
      plans[index].updatedAt = new Date().toISOString();
    }
  } else {
    // Create new plan
    plan.id = Date.now().toString();
    plan.createdAt = new Date().toISOString();
    plans.push(plan);
  }
  
  savePlans(plans);
  renderPlansList();
  renderActivePlanSelect();
}

// Delete a plan
function deletePlan(planId) {
  const plans = getPlans();
  const filtered = plans.filter(p => p.id !== planId);
  savePlans(filtered);
  renderPlansList();
  renderActivePlanSelect();
  renderHomeWorkoutPlans();
}

// Render plans list
function renderPlansList() {
  const plans = getPlans();
  plansListDiv.innerHTML = '';
  
  if (plans.length === 0) {
    plansListDiv.innerHTML = '<div class="empty-state">No workout plans yet. Create your first plan!</div>';
    return;
  }
  
  plans.forEach(plan => {
    const planItem = document.createElement('div');
    planItem.className = 'plan-item';
    
    const header = document.createElement('div');
    header.className = 'plan-item-header';
    
    const name = document.createElement('div');
    name.className = 'plan-item-name';
    name.textContent = plan.name;
    
    const actions = document.createElement('div');
    actions.className = 'plan-item-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon edit';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit';
    editBtn.addEventListener('click', () => editPlan(plan.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Delete plan "${plan.name}"?`)) {
        deletePlan(plan.id);
      }
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    header.appendChild(name);
    header.appendChild(actions);
    
    const exercises = document.createElement('div');
    exercises.className = 'plan-item-exercises';
    plan.exercises.forEach(ex => {
      const exDiv = document.createElement('div');
      exDiv.className = 'plan-item-exercise';
      
      // Handle both old and new format
      if (ex.sets && ex.sets.length > 0) {
        const setsSummary = ex.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');
        exDiv.textContent = `${ex.machine} - ${ex.sets.length} set${ex.sets.length > 1 ? 's' : ''}: ${setsSummary}`;
      } else {
        // Old format fallback
        exDiv.textContent = `${ex.machine} - ${ex.weight}kg × ${ex.reps} reps`;
      }
      
      exercises.appendChild(exDiv);
    });
    
    planItem.appendChild(header);
    planItem.appendChild(exercises);
    plansListDiv.appendChild(planItem);
  });
}

// Render home screen workout plans
function renderHomeWorkoutPlans() {
  const plans = getPlans();
  const container = document.getElementById('homeWorkoutPlans');
  const emptyState = document.getElementById('workoutWidgetEmpty');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (plans.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  container.style.display = 'flex';
  emptyState.style.display = 'none';
  
  // Sort plans by creation date descending (newest first)
  const sortedPlans = [...plans].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });
  
  sortedPlans.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'home-plan-card';
    
    // Header with name and dropdown menu
    const header = document.createElement('div');
    header.className = 'home-plan-header';
    
    const name = document.createElement('div');
    name.className = 'home-plan-name';
    name.textContent = plan.name;
    
    // Dropdown menu
    const menuContainer = document.createElement('div');
    menuContainer.className = 'home-plan-menu';
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'plan-menu-btn';
    menuBtn.innerHTML = '⋮';
    menuBtn.setAttribute('aria-label', 'Plan options');
    
    const dropdown = document.createElement('div');
    dropdown.className = 'plan-menu-dropdown';
    
    // Edit option
    const editItem = document.createElement('button');
    editItem.className = 'plan-menu-item';
    editItem.innerHTML = '<span>✏️</span><span>Edit</span>';
    editItem.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('active');
      menuBtn.classList.remove('active');
      editPlan(plan.id);
    });
    
    // Duplicate option
    const duplicateItem = document.createElement('button');
    duplicateItem.className = 'plan-menu-item';
    duplicateItem.innerHTML = '<span>📋</span><span>Duplicate</span>';
    duplicateItem.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('active');
      menuBtn.classList.remove('active');
      duplicatePlan(plan.id);
    });
    
    // Delete option
    const deleteItem = document.createElement('button');
    deleteItem.className = 'plan-menu-item delete';
    deleteItem.innerHTML = '<span>🗑️</span><span>Delete</span>';
    deleteItem.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('active');
      menuBtn.classList.remove('active');
      if (confirm(`Delete plan "${plan.name}"?`)) {
        deletePlan(plan.id);
        renderHomeWorkoutPlans();
      }
    });
    
    dropdown.appendChild(editItem);
    dropdown.appendChild(duplicateItem);
    dropdown.appendChild(deleteItem);
    
    // Toggle dropdown
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close all other dropdowns
      document.querySelectorAll('.plan-menu-dropdown.active').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('active');
        }
      });
      document.querySelectorAll('.plan-menu-btn.active').forEach(b => {
        if (b !== menuBtn) {
          b.classList.remove('active');
        }
      });
      
      dropdown.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
    
    menuContainer.appendChild(menuBtn);
    menuContainer.appendChild(dropdown);
    
    header.appendChild(name);
    header.appendChild(menuContainer);
    
    // Plan info
    const info = document.createElement('div');
    info.className = 'home-plan-info';
    
    const exerciseCount = plan.exercises.length;
    const totalSets = plan.exercises.reduce((sum, ex) => {
      return sum + (ex.sets ? ex.sets.length : 1);
    }, 0);
    
    const exerciseItem = document.createElement('div');
    exerciseItem.className = 'home-plan-info-item';
    exerciseItem.innerHTML = `<span>📋</span><span>${exerciseCount} exercise${exerciseCount !== 1 ? 's' : ''}</span>`;
    
    const setsItem = document.createElement('div');
    setsItem.className = 'home-plan-info-item';
    setsItem.innerHTML = `<span>🔢</span><span>${totalSets} set${totalSets !== 1 ? 's' : ''}</span>`;
    
    info.appendChild(exerciseItem);
    info.appendChild(setsItem);
    
    // Start button
    const startBtn = document.createElement('button');
    startBtn.className = 'home-plan-start';
    startBtn.innerHTML = '<span>▶️</span><span>Start Workout</span>';
    startBtn.addEventListener('click', () => {
      startWorkoutPlan(plan.id);
    });
    
    card.appendChild(header);
    card.appendChild(info);
    card.appendChild(startBtn);
    
    container.appendChild(card);
  });
}

// Duplicate a workout plan
function duplicatePlan(planId) {
  const plans = getPlans();
  const originalPlan = plans.find(p => p.id === planId);
  
  if (!originalPlan) return;
  
  const newPlan = {
    id: Date.now(),
    name: `${originalPlan.name} (Copy)`,
    exercises: JSON.parse(JSON.stringify(originalPlan.exercises)), // Deep copy
    createdAt: new Date().toISOString()
  };
  
  plans.push(newPlan);
  savePlans(plans);
  renderHomeWorkoutPlans();
  renderPlansList();
  renderActivePlanSelect();
}

// Start a workout plan from home screen
function startWorkoutPlan(planId) {
  const plans = getPlans();
  const plan = plans.find(p => p.id === planId);
  
  if (!plan) return;
  
  // Set as current workout plan
  currentWorkoutPlan = JSON.parse(JSON.stringify(plan));
  currentWorkoutPlan.startTime = Date.now();
  currentExerciseIndex = 0;
  
  // Save active workout to localStorage
  saveActiveWorkout();
  
  // Navigate to active workout screen
  activeWorkoutTitle.textContent = `🏋️ ${plan.name}`;
  renderActiveWorkout();
  startWorkoutTimer();
  showScreen('activeWorkout');
}

// Render active plan selector (deprecated - plans now start from home screen)
function renderActivePlanSelect() {
  // No longer needed - quick start removed from tracker screen
  return;
}

// Start a workout plan (deprecated - now using startWorkoutPlan from home screen)
/*
function startPlan() {
  const planId = activePlanSelect.value;
  if (!planId) return;
  
  const plans = getPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) return;
  
  // Start active workout session
  currentWorkoutPlan = plan;
  completedExercises.clear();
  
  // Set start time
  currentWorkoutPlan.startTime = new Date().toISOString();
  currentWorkoutPlan.endTime = null;
  
  // Save to localStorage
  saveActiveWorkout();
  
  // Start workout timer
  startWorkoutTimer();
  
  activeWorkoutTitle.textContent = `🏋️ ${plan.name}`;
  renderActiveWorkout();
  showScreen('activeWorkout');
}
*/

// Render active workout screen
function renderActiveWorkout() {
  if (!currentWorkoutPlan) return;
  
  // Flatten exercises into individual sets
  const allSets = [];
  currentWorkoutPlan.exercises.forEach((exercise, exIndex) => {
    // Handle both old and new format
    const sets = exercise.sets || [{ weight: exercise.weight, reps: exercise.reps }];
    sets.forEach((set, setIndex) => {
      allSets.push({
        exerciseIndex: exIndex,
        setIndex: setIndex,
        machine: exercise.machine,
        weight: set.weight,
        reps: set.reps,
        totalSets: sets.length
      });
    });
  });
  
  // Bundle consecutive sets of the same exercise
  const bundledExercises = [];
  let currentBundle = null;
  
  allSets.forEach((set, globalIndex) => {
    if (!currentBundle || currentBundle.machine !== set.machine) {
      // Start a new bundle
      if (currentBundle) {
        bundledExercises.push(currentBundle);
      }
      currentBundle = {
        machine: set.machine,
        exerciseIndex: set.exerciseIndex,
        sets: [{
          ...set,
          globalIndex
        }]
      };
    } else {
      // Add to current bundle
      currentBundle.sets.push({
        ...set,
        globalIndex
      });
    }
  });
  
  // Push the last bundle
  if (currentBundle) {
    bundledExercises.push(currentBundle);
  }
  
  const completed = completedExercises.size;
  const total = allSets.length;
  
  // Update progress
  progressCurrent.textContent = completed;
  progressTotal.textContent = total;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;
  progressBarFill.style.width = `${progressPercent}%`;
  
  // Find the first incomplete bundle (for "In Progress" status)
  let firstIncompleteBundleIndex = -1;
  for (let i = 0; i < bundledExercises.length; i++) {
    const bundle = bundledExercises[i];
    const allSetsCompleted = bundle.sets.every(s => completedExercises.has(s.globalIndex));
    if (!allSetsCompleted) {
      firstIncompleteBundleIndex = i;
      break;
    }
  }
  
  // Render bundled exercises
  workoutExercisesDiv.innerHTML = '';
  
  bundledExercises.forEach((bundle, bundleIndex) => {
    const allSetsCompleted = bundle.sets.every(s => completedExercises.has(s.globalIndex));
    const anySetsCompleted = bundle.sets.some(s => completedExercises.has(s.globalIndex));
    const currentSetIndex = bundle.sets.findIndex(s => !completedExercises.has(s.globalIndex));
    // Only mark as current if this is the first incomplete bundle
    const isCurrent = bundleIndex === firstIncompleteBundleIndex && currentSetIndex >= 0;
    
    const exerciseCard = document.createElement('div');
    exerciseCard.className = `workout-exercise-card ${allSetsCompleted ? 'completed' : ''} ${isCurrent && !allSetsCompleted ? 'current' : ''}`;
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'workout-exercise-header';
    
    const exerciseNumber = document.createElement('div');
    exerciseNumber.className = 'workout-exercise-number';
    exerciseNumber.textContent = `Exercise ${bundle.exerciseIndex + 1}`;
    
    const status = document.createElement('div');
    status.className = 'workout-exercise-status';
    const completedCount = bundle.sets.filter(s => completedExercises.has(s.globalIndex)).length;
    if (allSetsCompleted) {
      status.innerHTML = '✓ Completed';
      status.style.color = 'var(--success)';
    } else if (anySetsCompleted) {
      status.innerHTML = `${completedCount}/${bundle.sets.length} Complete`;
      status.style.color = 'var(--accent)';
    } else if (isCurrent) {
      status.innerHTML = '● In Progress';
      status.style.color = 'var(--accent)';
    } else {
      status.innerHTML = '○ Pending';
      status.color = 'var(--text-secondary)';
    }
    
    cardHeader.appendChild(exerciseNumber);
    cardHeader.appendChild(status);
    
    const cardBody = document.createElement('div');
    cardBody.className = 'workout-exercise-body';
    
    const machineName = document.createElement('div');
    machineName.className = 'workout-exercise-machine';
    machineName.textContent = bundle.machine;
    
    cardBody.appendChild(machineName);
    
    // Render individual sets with edit capability
    const setsContainer = document.createElement('div');
    setsContainer.className = 'workout-sets-container';
    
    bundle.sets.forEach((s, i) => {
      const isCompleted = completedExercises.has(s.globalIndex);
      const setNum = i + 1;
      
      const setItem = document.createElement('div');
      setItem.className = `workout-set-item ${isCompleted ? 'completed' : ''}`;
      
      const setLabel = document.createElement('div');
      setLabel.className = 'workout-set-label';
      setLabel.textContent = `${isCompleted ? '✓' : '○'} Set ${setNum}:`;
      
      const setDetails = document.createElement('div');
      setDetails.className = 'workout-set-details';
      
      // Weight input (editable if not completed)
      const weightInput = document.createElement('input');
      weightInput.type = 'number';
      weightInput.value = s.weight;
      weightInput.step = '2.5';
      weightInput.min = '0';
      weightInput.className = 'workout-set-input';
      weightInput.disabled = isCompleted;
      weightInput.addEventListener('change', (e) => {
        const newWeight = parseFloat(e.target.value) || 0;
        // Update the weight in the plan
        currentWorkoutPlan.exercises[bundle.exerciseIndex].sets[i].weight = newWeight;
        saveActiveWorkout();
      });
      
      const weightLabel = document.createElement('span');
      weightLabel.textContent = 'kg × ';
      
      // Reps input (editable if not completed)
      const repsInput = document.createElement('input');
      repsInput.type = 'number';
      repsInput.value = s.reps;
      repsInput.step = '1';
      repsInput.min = '1';
      repsInput.className = 'workout-set-input';
      repsInput.disabled = isCompleted;
      repsInput.addEventListener('change', (e) => {
        const newReps = parseInt(e.target.value) || 0;
        // Update the reps in the plan
        currentWorkoutPlan.exercises[bundle.exerciseIndex].sets[i].reps = newReps;
        saveActiveWorkout();
      });
      
      const repsLabel = document.createElement('span');
      repsLabel.textContent = ' reps';
      
      setDetails.appendChild(weightInput);
      setDetails.appendChild(weightLabel);
      setDetails.appendChild(repsInput);
      setDetails.appendChild(repsLabel);
      
      setItem.appendChild(setLabel);
      setItem.appendChild(setDetails);
      setsContainer.appendChild(setItem);
    });
    
    cardBody.appendChild(setsContainer);
    
    exerciseCard.appendChild(cardHeader);
    exerciseCard.appendChild(cardBody);
    
    // Add complete button for current set
    if (isCurrent && currentSetIndex >= 0) {
      const currentSet = bundle.sets[currentSetIndex];
      const completeBtn = document.createElement('button');
      completeBtn.className = 'btn-complete-exercise';
      completeBtn.textContent = `Complete Set ${currentSetIndex + 1}/${bundle.sets.length}`;
      completeBtn.addEventListener('click', () => {
        completedExercises.add(currentSet.globalIndex);
        
        // Save to localStorage
        saveActiveWorkout();
        
        // Get the actual weight and reps from the plan (in case they were edited)
        const actualSet = currentWorkoutPlan.exercises[bundle.exerciseIndex].sets[currentSetIndex];
        
        // Add to history with the actual values
        addEntry({
          machine: currentSet.machine,
          weight: actualSet.weight,
          reps: actualSet.reps
        });
        
        renderActiveWorkout();
        
        // Check if all sets are complete
        if (completedExercises.size === allSets.length) {
          finishWorkoutBtn.style.display = 'block';
        }
      });
      exerciseCard.appendChild(completeBtn);
    }
    
    workoutExercisesDiv.appendChild(exerciseCard);
  });
  
  // Show finish button if all complete
  if (completed === total && total > 0) {
    finishWorkoutBtn.style.display = 'block';
  } else {
    finishWorkoutBtn.style.display = 'none';
  }
}

// Finish workout button
finishWorkoutBtn.addEventListener('click', () => {
  // Set end time before clearing
  if (currentWorkoutPlan) {
    currentWorkoutPlan.endTime = new Date().toISOString();
  }
  clearActiveWorkout();
  // activePlanSelect.value = ''; // No longer needed
  renderHistory();
  showScreen('history'); // Show history screen instead of home screen
});

// Edit a plan
function editPlan(planId) {
  const plans = getPlans();
  const plan = plans.find(p => p.id === planId);
  
  if (plan) {
    currentEditingPlanId = plan.id;
    planNameInput.value = plan.name;
    currentPlanExercises = [...plan.exercises];
    editPlanTitle.textContent = '✏️ Edit Plan';
  } else {
    currentEditingPlanId = null;
    planNameInput.value = '';
    currentPlanExercises = [];
    editPlanTitle.textContent = '✏️ Create Plan';
  }
  
  expandedExerciseIndex = null; // Reset expanded state
  renderPlanExercises();
  showScreen('editPlan');
}

// ===== DRAG AND DROP HANDLERS =====

let draggedExerciseIndex = null;

function handleDragStart(e) {
  draggedExerciseIndex = parseInt(e.currentTarget.dataset.exerciseIndex);
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  const targetIndex = parseInt(e.currentTarget.dataset.exerciseIndex);
  if (targetIndex !== draggedExerciseIndex) {
    e.currentTarget.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  e.currentTarget.classList.remove('drag-over');
  
  const dropIndex = parseInt(e.currentTarget.dataset.exerciseIndex);
  
  if (draggedExerciseIndex !== null && draggedExerciseIndex !== dropIndex) {
    // Reorder the exercises array
    const draggedExercise = currentPlanExercises[draggedExerciseIndex];
    currentPlanExercises.splice(draggedExerciseIndex, 1);
    currentPlanExercises.splice(dropIndex, 0, draggedExercise);
    
    // Update expanded index if needed
    if (expandedExerciseIndex === draggedExerciseIndex) {
      expandedExerciseIndex = dropIndex;
    } else if (expandedExerciseIndex !== null) {
      if (draggedExerciseIndex < expandedExerciseIndex && dropIndex >= expandedExerciseIndex) {
        expandedExerciseIndex--;
      } else if (draggedExerciseIndex > expandedExerciseIndex && dropIndex <= expandedExerciseIndex) {
        expandedExerciseIndex++;
      }
    }
    
    renderPlanExercises();
  }
  
  return false;
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  
  // Remove all drag-over classes
  document.querySelectorAll('.exercise-item').forEach(item => {
    item.classList.remove('drag-over');
  });
  
  draggedExerciseIndex = null;
}

// ===== END DRAG AND DROP HANDLERS =====

// Render exercise editor
function renderPlanExercises() {
  planExercisesDiv.innerHTML = '';
  const machines = getMachines();
  
  currentPlanExercises.forEach((exercise, exerciseIndex) => {
    const exerciseItem = document.createElement('div');
    const isExpanded = expandedExerciseIndex === exerciseIndex;
    
    // Ensure exercise has sets array (migration for old plans)
    if (!exercise.sets) {
      exercise.sets = exercise.weight && exercise.reps ? 
        [{ weight: exercise.weight, reps: exercise.reps }] : 
        [{ weight: 0, reps: 0 }];
      delete exercise.weight;
      delete exercise.reps;
    }
    
    const isComplete = exercise.machine && exercise.sets && exercise.sets.length > 0 && 
                      exercise.sets.every(s => s.weight && s.reps);
    
    exerciseItem.className = 'exercise-item';
    
    // Make item draggable
    exerciseItem.draggable = true;
    exerciseItem.dataset.exerciseIndex = exerciseIndex;
    
    // Add drag event listeners
    exerciseItem.addEventListener('dragstart', handleDragStart);
    exerciseItem.addEventListener('dragover', handleDragOver);
    exerciseItem.addEventListener('drop', handleDrop);
    exerciseItem.addEventListener('dragenter', handleDragEnter);
    exerciseItem.addEventListener('dragleave', handleDragLeave);
    exerciseItem.addEventListener('dragend', handleDragEnd);
    
    // Collapsed view
    if (!isExpanded && isComplete) {
      const header = document.createElement('div');
      header.className = 'exercise-item-header';
      
      // Add drag handle
      const dragHandle = document.createElement('div');
      dragHandle.className = 'drag-handle';
      dragHandle.innerHTML = '⋮⋮';
      dragHandle.title = 'Drag to reorder';
      
      const info = document.createElement('div');
      info.className = 'exercise-collapsed-info';
      
      const setsSummary = exercise.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');
      info.innerHTML = `
        <div class="exercise-number">Exercise ${exerciseIndex + 1}</div>
        <div class="exercise-summary">${exercise.machine} - ${exercise.sets.length} set${exercise.sets.length > 1 ? 's' : ''}: ${setsSummary}</div>
      `;
      
      const actions = document.createElement('div');
      actions.className = 'history-entry-actions';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-icon edit';
      editBtn.innerHTML = '✏️';
      editBtn.title = 'Edit';
      editBtn.type = 'button';
      editBtn.addEventListener('click', () => {
        expandedExerciseIndex = exerciseIndex;
        renderPlanExercises();
      });
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Remove';
      deleteBtn.type = 'button';
      deleteBtn.addEventListener('click', () => {
        currentPlanExercises.splice(exerciseIndex, 1);
        if (expandedExerciseIndex === exerciseIndex) {
          expandedExerciseIndex = null;
        } else if (expandedExerciseIndex > exerciseIndex) {
          expandedExerciseIndex--;
        }
        renderPlanExercises();
      });
      
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      header.appendChild(dragHandle);
      header.appendChild(info);
      header.appendChild(actions);
      exerciseItem.appendChild(header);
    } else {
      // Expanded view
      const header = document.createElement('div');
      header.className = 'exercise-item-header';
      
      // Add drag handle
      const dragHandle = document.createElement('div');
      dragHandle.className = 'drag-handle';
      dragHandle.innerHTML = '⋮⋮';
      dragHandle.title = 'Drag to reorder';
      
      const number = document.createElement('div');
      number.className = 'exercise-number';
      number.textContent = exercise.machine ? exercise.machine : `Exercise ${exerciseIndex + 1}`;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Remove Exercise';
      deleteBtn.type = 'button';
      deleteBtn.addEventListener('click', () => {
        currentPlanExercises.splice(exerciseIndex, 1);
        if (expandedExerciseIndex === exerciseIndex) {
          expandedExerciseIndex = null;
        } else if (expandedExerciseIndex > exerciseIndex) {
          expandedExerciseIndex--;
        }
        renderPlanExercises();
      });
      
      header.appendChild(dragHandle);
      header.appendChild(number);
      header.appendChild(deleteBtn);
      
      const fields = document.createElement('div');
      fields.className = 'exercise-fields';
      
      // Machine select
      const machineGroup = document.createElement('div');
      machineGroup.className = 'form-group-inline';
      const machineLabel = document.createElement('label');
      machineLabel.textContent = 'Machine';
      const machineSelect = document.createElement('select');
      machineSelect.innerHTML = '<option value="">Select machine</option>';
      
      // Sort machines alphabetically
      const sortedMachines = [...machines].sort((a, b) => a.localeCompare(b));
      sortedMachines.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        if (m === exercise.machine) opt.selected = true;
        machineSelect.appendChild(opt);
      });
      machineSelect.addEventListener('change', (e) => {
        currentPlanExercises[exerciseIndex].machine = e.target.value;
        renderPlanExercises(); // Re-render to update the title
      });
      machineGroup.appendChild(machineLabel);
      machineGroup.appendChild(machineSelect);
      fields.appendChild(machineGroup);
      
      // Sets section
      const setsLabel = document.createElement('label');
      setsLabel.textContent = 'Sets';
      setsLabel.style.marginTop = '1rem';
      fields.appendChild(setsLabel);
      
      const setsContainer = document.createElement('div');
      setsContainer.className = 'sets-container';
      
      exercise.sets.forEach((set, setIndex) => {
        const setRow = document.createElement('div');
        setRow.className = 'set-row';
        
        const setNumber = document.createElement('div');
        setNumber.className = 'set-number';
        setNumber.textContent = `Set ${setIndex + 1}`;
        
        const setInputs = document.createElement('div');
        setInputs.className = 'set-inputs';
        
        // Weight input
        const weightGroup = document.createElement('div');
        weightGroup.className = 'set-input-group';
        const weightLabel = document.createElement('label');
        weightLabel.textContent = 'Weight (kg)';
        weightLabel.className = 'set-input-label';
        const weightInput = document.createElement('input');
        weightInput.type = 'text';
        weightInput.pattern = '\\d*\\.?\\d*';
        weightInput.value = set.weight;
        weightInput.min = 0;
        weightInput.max = 500;
        weightInput.step = 2.5;
        weightInput.placeholder = 'kg';
        weightInput.className = 'set-number-input';
        weightInput.addEventListener('input', (e) => {
          currentPlanExercises[exerciseIndex].sets[setIndex].weight = parseFloat(e.target.value) || 0;
        });
        weightGroup.appendChild(weightLabel);
        weightGroup.appendChild(weightInput);
        
        // Reps input
        const repsGroup = document.createElement('div');
        repsGroup.className = 'set-input-group';
        const repsLabel = document.createElement('label');
        repsLabel.textContent = 'Reps';
        repsLabel.className = 'set-input-label';
        const repsInput = document.createElement('input');
        repsInput.type = 'text';
        repsInput.pattern = '\\d*';
        repsInput.value = set.reps;
        repsInput.min = 1;
        repsInput.max = 100;
        repsInput.step = 1;
        repsInput.placeholder = 'reps';
        repsInput.className = 'set-number-input';
        repsInput.addEventListener('input', (e) => {
          currentPlanExercises[exerciseIndex].sets[setIndex].reps = parseInt(e.target.value) || 0;
        });
        repsGroup.appendChild(repsLabel);
        repsGroup.appendChild(repsInput);
        
        // Delete set button
        const deleteSetBtn = document.createElement('button');
        deleteSetBtn.type = 'button';
        deleteSetBtn.className = 'btn-icon delete';
        deleteSetBtn.innerHTML = '🗑️';
        deleteSetBtn.title = 'Remove Set';
        deleteSetBtn.addEventListener('click', () => {
          if (exercise.sets.length > 1) {
            currentPlanExercises[exerciseIndex].sets.splice(setIndex, 1);
            renderPlanExercises();
          } else {
            alert('Each exercise must have at least one set');
          }
        });
        
        setInputs.appendChild(weightGroup);
        setInputs.appendChild(repsGroup);
        setInputs.appendChild(deleteSetBtn);
        
        setRow.appendChild(setNumber);
        setRow.appendChild(setInputs);
        setsContainer.appendChild(setRow);
      });
      
      fields.appendChild(setsContainer);
      
      // Add set button
      const addSetBtn = document.createElement('button');
      addSetBtn.type = 'button';
      addSetBtn.className = 'btn-secondary btn-add-set';
      addSetBtn.textContent = '+ Add Set';
      addSetBtn.addEventListener('click', () => {
        const settings = getSettings();
        const lastSet = exercise.sets[exercise.sets.length - 1];
        currentPlanExercises[exerciseIndex].sets.push({
          weight: lastSet ? lastSet.weight : settings.defaultWeight,
          reps: lastSet ? lastSet.reps : settings.defaultReps
        });
        renderPlanExercises();
      });
      fields.appendChild(addSetBtn);
      
      exerciseItem.appendChild(header);
      exerciseItem.appendChild(fields);
    }
    
    planExercisesDiv.appendChild(exerciseItem);
  });
}

// Add new exercise to plan
addExerciseBtn.addEventListener('click', () => {
  const settings = getSettings();
  currentPlanExercises.push({
    machine: '',
    sets: [
      { weight: settings.defaultWeight, reps: settings.defaultReps }
    ]
  });
  // Expand the newly added exercise
  expandedExerciseIndex = currentPlanExercises.length - 1;
  renderPlanExercises();
});

// Manage exercises button in settings
manageExercisesBtn.addEventListener('click', () => {
  machinesScreenContext = 'settingsExercises'; // Set context from settings
  showScreen('machines');
  renderMachineList();
});

// Create new plan
createPlanBtn.addEventListener('click', () => {
  editPlan(null);
});

// Save plan form
editPlanForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = planNameInput.value.trim();
  if (!name) {
    alert('Please enter a plan name');
    return;
  }
  
  if (currentPlanExercises.length === 0) {
    alert('Please add at least one exercise');
    return;
  }
  
  // Validate all exercises have required fields
  for (let ex of currentPlanExercises) {
    if (!ex.machine) {
      alert('Please select a machine for all exercises');
      return;
    }
    if (!ex.sets || ex.sets.length === 0) {
      alert('Please add at least one set for each exercise');
      return;
    }
    for (let set of ex.sets) {
      if (!set.weight || !set.reps) {
        alert('Please complete all set fields (weight and reps)');
        return;
      }
    }
  }
  
  const plan = {
    name: name,
    exercises: currentPlanExercises,
    updatedAt: new Date().toISOString()
  };
  
  if (currentEditingPlanId) {
    plan.id = currentEditingPlanId;
  }
  
  savePlan(plan);
  renderHomeWorkoutPlans();
  showScreen('settingsPlans');
});

// Start plan button (deprecated - now using home screen widget)
// startPlanBtn.addEventListener('click', startPlan);

// ===== HISTORY =====

// Get today's date in YYYY-MM-DD format
function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Format date for display
function formatDate(dateString) {
  const settings = getSettings();
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  
  // Format based on setting
  if (settings.dateFormat === 'us') {
    return `${weekday}, ${monthName} ${day}`;
  } else if (settings.dateFormat === 'iso') {
    return `${weekday}, ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else { // eu
    return `${weekday}, ${day} ${monthName}`;
  }
}

// Format time based on user settings
function formatTime(timestamp) {
  const settings = getSettings();
  const date = new Date(timestamp);
  
  if (settings.timeFormat === '12h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } else { // 24h
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}

// Get history from localStorage
function getHistory() {
  return JSON.parse(localStorage.getItem('fitnessHistory') || '{}');
}

// Save history to localStorage
function saveHistory(history) {
  localStorage.setItem('fitnessHistory', JSON.stringify(history));
}

// Get last used values for a machine
function getLastValues(machineName) {
  const settings = getSettings();
  const history = getHistory();
  const allEntries = [];
  
  // Collect all entries for this machine
  Object.values(history).forEach(dayEntries => {
    dayEntries.forEach(entry => {
      if (entry.machine === machineName) {
        allEntries.push(entry);
      }
    });
  });
  
  // Sort by timestamp (newest first)
  allEntries.sort((a, b) => {
    const timeA = a.timestamp || a.id || '0';
    const timeB = b.timestamp || b.id || '0';
    return timeB.localeCompare(timeA);
  });
  
  // Return last used values or defaults
  if (allEntries.length > 0) {
    return {
      weight: allEntries[0].weight,
      reps: allEntries[0].reps
    };
  }
  
  return {
    weight: settings.defaultWeight,
    reps: settings.defaultReps
  };
}

// Add a new entry
function addEntry(entry) {
  const today = getToday();
  const history = getHistory();
  if (!history[today]) history[today] = [];
  
  // Add timestamp and unique ID to entry
  entry.id = Date.now().toString();
  entry.timestamp = new Date().toISOString();
  
  history[today].push(entry);
  saveHistory(history);
  renderTodaySection(); // Update today section after adding
}

// Render today's workout section
function renderTodaySection() {
  const today = getToday();
  const history = getHistory();
  const todayEntries = history[today] || [];
  
  if (todayEntries.length === 0) {
    todaySection.style.display = 'none';
    return;
  }
  
  todaySection.style.display = 'block';
  todayList.innerHTML = '';
  
  // Show entries in reverse order (newest first)
  [...todayEntries].reverse().forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'today-entry';
    
    const time = formatTime(entry.timestamp);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'today-entry-info';
    infoDiv.innerHTML = `
      <div class="today-entry-machine">${entry.machine}</div>
      <div class="today-entry-details">${entry.reps} reps × ${entry.weight} kg</div>
      <div class="today-entry-time">${time}</div>
    `;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteEntry(today, entry.id);
      renderTodaySection(); // Refresh today section
      renderHistory(); // Also refresh history
    });
    
    entryDiv.appendChild(infoDiv);
    entryDiv.appendChild(deleteBtn);
    todayList.appendChild(entryDiv);
  });
}

// Delete an entry
function deleteEntry(date, entryId) {
  const history = getHistory();
  if (history[date]) {
    history[date] = history[date].filter(entry => entry.id !== entryId);
    if (history[date].length === 0) {
      delete history[date];
    }
    saveHistory(history);
    renderHistory();
  }
}

// Update an entry
function updateEntry(date, entryId, updatedData) {
  const history = getHistory();
  if (history[date]) {
    const entryIndex = history[date].findIndex(entry => entry.id === entryId);
    if (entryIndex !== -1) {
      history[date][entryIndex] = {
        ...history[date][entryIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      saveHistory(history);
      renderHistory();
    }
  }
}

// Create edit form for an entry
function createEditForm(date, entry) {
  const editForm = document.createElement('div');
  editForm.className = 'edit-form';
  
  const machines = getMachines();
  const machineOptions = machines.map(m => 
    `<option value="${m}" ${entry.machine === m ? 'selected' : ''}>${m}</option>`
  ).join('');
  
  editForm.innerHTML = `
    <select class="edit-input edit-machine">
      ${machineOptions}
    </select>
    <div class="edit-input-group">
      <input type="text" pattern="\d*\.?\d*" class="edit-input edit-weight" value="${entry.weight}" min="0" max="500" step="2.5" placeholder="Weight (kg)">
      <input type="text" pattern="\d*" class="edit-input edit-reps" value="${entry.reps}" min="1" max="100" step="1" placeholder="Reps">
    </div>
    <div class="edit-actions">
      <button type="button" class="btn-small btn-save">Save</button>
      <button type="button" class="btn-small btn-cancel">Cancel</button>
    </div>
  `;
  
  const saveBtn = editForm.querySelector('.btn-save');
  const cancelBtn = editForm.querySelector('.btn-cancel');
  
  saveBtn.addEventListener('click', () => {
    const newMachine = editForm.querySelector('.edit-machine').value;
    const newWeight = parseFloat(editForm.querySelector('.edit-weight').value);
    const newReps = parseInt(editForm.querySelector('.edit-reps').value);
    
    if (newMachine && newWeight > 0 && newReps > 0) {
      updateEntry(date, entry.id, {
        machine: newMachine,
        weight: newWeight,
        reps: newReps
      });
    }
  });
  
  cancelBtn.addEventListener('click', () => {
    renderHistory();
  });
  
  return editForm;
}

// Render history
function renderHistory() {
  const history = getHistory();
  const historyStatsSummary = document.getElementById('historyStatsSummary');
  const lastWorkoutContainer = document.getElementById('lastWorkoutContainer');
  const historyList = document.getElementById('historyList');
  
  historyStatsSummary.innerHTML = '';
  lastWorkoutContainer.innerHTML = '';
  historyList.innerHTML = '';
  
  const days = Object.keys(history).sort().reverse();
  
  if (days.length === 0) {
    historyList.innerHTML = '<div class="empty-state">No workout history yet. Add your first set from the Workout tab! 💪</div>';
    return;
  }
  
  // Calculate overall stats
  let totalWorkouts = 0;
  let totalSetsAllTime = 0;
  let totalExercisesAllTime = 0; // Count unique exercises across all workouts
  let totalMinutesAllTime = 0;
  let uniqueExercisesAllTime = new Set();
  
  Object.keys(history).forEach(day => {
    const entries = history[day];
    if (entries && entries.length > 0) {
      totalWorkouts++;
      totalSetsAllTime += entries.length;
      
      // Count unique exercises in this workout
      const exercisesInWorkout = [...new Set(entries.map(e => e.machine))];
      totalExercisesAllTime += exercisesInWorkout.length;
      
      // Add to the set of all unique exercises
      exercisesInWorkout.forEach(exercise => uniqueExercisesAllTime.add(exercise));
      
      // Calculate workout duration
      const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
      if (timestamps.length > 1) {
        const earliest = new Date(Math.min(...timestamps));
        const latest = new Date(Math.max(...timestamps));
        totalMinutesAllTime += Math.round((latest - earliest) / 1000 / 60);
      }
    }
  });
  
  // Render total stats
  renderTotalStats(totalWorkouts, totalSetsAllTime, uniqueExercisesAllTime.size, totalMinutesAllTime);
  
  // Render last workout (first day in the sorted days array)
  if (days.length > 0) {
    const lastWorkoutDay = days[0];
    const lastWorkoutEntries = history[lastWorkoutDay];
    renderLastWorkout(lastWorkoutDay, lastWorkoutEntries);
  }
  
  days.forEach(day => {
    const entries = history[day];
    if (!entries || entries.length === 0) return;
    
    // Skip the most recent workout as it's already shown in lastWorkoutContainer
    if (days.length > 0 && day === days[0]) {
      return;
    }
    
    // Calculate workout summary
    const totalSets = entries.length;
    const uniqueExercises = [...new Set(entries.map(e => e.machine))].length;
    
    // Calculate time span (earliest to latest entry)
    const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
    let timeSpentSeconds = 0;
    if (timestamps.length > 1) {
      const earliest = new Date(Math.min(...timestamps));
      const latest = new Date(Math.max(...timestamps));
      timeSpentSeconds = Math.round((latest - earliest) / 1000); // seconds
    }
    
    // Format the time as HH:MM:SS
    const hours = Math.floor(timeSpentSeconds / 3600);
    const minutes = Math.floor((timeSpentSeconds % 3600) / 60);
    const seconds = timeSpentSeconds % 60;
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
    
    const summaryCard = document.createElement('div');
    summaryCard.className = 'workout-summary-card';
    summaryCard.tabIndex = 0; // Make the card focusable for accessibility
    
    // Create a container for the card content
    const cardContent = document.createElement('div');
    cardContent.className = 'workout-summary-content';
    
    // Date with calendar icon
    const dateDiv = document.createElement('div');
    dateDiv.className = 'workout-summary-date';
    dateDiv.innerHTML = `
      <div class="workout-summary-date-icon">📅</div>
      <div>${formatDate(day)}</div>
    `;
    
    // We're removing the exercise and set counts as they're redundant with badges
    
    // Duration with clock icon and HH:MM:SS format
    const timeDiv = document.createElement('div');
    timeDiv.className = 'workout-summary-time';
    timeDiv.innerHTML = `
      <div class="workout-summary-time-icon">⏱️</div>
      <div class="workout-summary-time-value">${timeSpentSeconds > 0 ? formattedTime : 'N/A'}</div>
    `;
    
    // Group by exercise for badges
    const exerciseGroups = {};
    entries.forEach(entry => {
      if (!exerciseGroups[entry.machine]) {
        exerciseGroups[entry.machine] = [];
      }
      exerciseGroups[entry.machine].push(entry);
    });
    
    // Exercises as badges
    const exercisesDiv = document.createElement('div');
    exercisesDiv.className = 'workout-summary-exercises';
    
    const exercisesTitle = document.createElement('div');
    exercisesTitle.className = 'workout-summary-exercises-title';
    exercisesTitle.innerHTML = '<span class="workout-summary-exercises-icon">🏋️</span> Exercises';
    
    const exercisesBadges = document.createElement('div');
    exercisesBadges.className = 'workout-summary-badges';
    
    Object.keys(exerciseGroups).forEach(exercise => {
      const badge = document.createElement('div');
      badge.className = 'exercise-badge';
      badge.textContent = exercise;
      exercisesBadges.appendChild(badge);
    });
    
    exercisesDiv.appendChild(exercisesTitle);
    exercisesDiv.appendChild(exercisesBadges);
    
    // View Details button indicator in top right
    const viewDetailsIndicator = document.createElement('div');
    viewDetailsIndicator.className = 'view-details-indicator';
    viewDetailsIndicator.innerHTML = '👁️'; // Eye icon to indicate viewing details
    viewDetailsIndicator.title = "View Workout Details"; // Tooltip
    
    // Add content to card content container
    cardContent.appendChild(dateDiv);
    cardContent.appendChild(timeDiv);
    cardContent.appendChild(exercisesDiv);
    // Add the indicator to the card instead of the content for absolute positioning
    summaryCard.appendChild(viewDetailsIndicator);
    
    // Add card content to the main card
    summaryCard.appendChild(cardContent);
    
    // Make the entire card clickable
    summaryCard.addEventListener('click', () => {
      showWorkoutDetail(day, entries);
    });
    
    // Add keyboard support for accessibility
    summaryCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showWorkoutDetail(day, entries);
      }
    });
    
    historyList.appendChild(summaryCard);
  });
}

// Render total stats summary
function renderTotalStats(totalWorkouts, totalSets, uniqueExercises, totalMinutes) {
  const historyStatsSummary = document.getElementById('historyStatsSummary');
  historyStatsSummary.innerHTML = '';
  
  // Workouts stat
  const workoutsStat = document.createElement('div');
  workoutsStat.className = 'total-stat-card';
  workoutsStat.innerHTML = `
    <div class="total-stat-value">${totalWorkouts}</div>
    <div class="total-stat-label">Workouts</div>
  `;
  
  // Sets stat
  const setsStat = document.createElement('div');
  setsStat.className = 'total-stat-card';
  setsStat.innerHTML = `
    <div class="total-stat-value">${totalSets}</div>
    <div class="total-stat-label">Total Sets</div>
  `;
  
  // Unique exercises stat
  const exercisesStat = document.createElement('div');
  exercisesStat.className = 'total-stat-card';
  exercisesStat.innerHTML = `
    <div class="total-stat-value">${uniqueExercises}</div>
    <div class="total-stat-label">Exercises</div>
  `;
  
  // Total workout time
  const timeStat = document.createElement('div');
  timeStat.className = 'total-stat-card';
  timeStat.innerHTML = `
    <div class="total-stat-value">${totalMinutes}</div>
    <div class="total-stat-label">Minutes</div>
  `;
  
  historyStatsSummary.appendChild(workoutsStat);
  historyStatsSummary.appendChild(setsStat);
  historyStatsSummary.appendChild(exercisesStat);
  historyStatsSummary.appendChild(timeStat);
}

// Render last workout
function renderLastWorkout(day, entries) {
  const lastWorkoutContainer = document.getElementById('lastWorkoutContainer');
  lastWorkoutContainer.innerHTML = '';
  
  // Use the same card creation logic as in the main history rendering
  const totalSets = entries.length;
  const uniqueExercises = [...new Set(entries.map(e => e.machine))].length;
  
  // Calculate time span
  const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
  let timeSpentSeconds = 0;
  if (timestamps.length > 1) {
    const earliest = new Date(Math.min(...timestamps));
    const latest = new Date(Math.max(...timestamps));
    timeSpentSeconds = Math.round((latest - earliest) / 1000); // seconds
  }
  
  // Format the time as HH:MM:SS
  const hours = Math.floor(timeSpentSeconds / 3600);
  const minutes = Math.floor((timeSpentSeconds % 3600) / 60);
  const seconds = timeSpentSeconds % 60;
  const formattedTime = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
  
  const summaryCard = document.createElement('div');
  summaryCard.className = 'workout-summary-card last-workout-card';
  summaryCard.tabIndex = 0;
  
  // Create a container for the card content
  const cardContent = document.createElement('div');
  cardContent.className = 'workout-summary-content';
  
  // Date with calendar icon
  const dateDiv = document.createElement('div');
  dateDiv.className = 'workout-summary-date';
  dateDiv.innerHTML = `
    <div class="workout-summary-date-icon">📅</div>
    <div>${formatDate(day)}</div>
  `;
  
  // We're removing the exercise and set counts as they're redundant with badges
  
  // Duration with clock icon and HH:MM:SS format
  const timeDiv = document.createElement('div');
  timeDiv.className = 'workout-summary-time';
  timeDiv.innerHTML = `
    <div class="workout-summary-time-icon">⏱️</div>
    <div class="workout-summary-time-value">${timeSpentSeconds > 0 ? formattedTime : 'N/A'}</div>
  `;
  
  // Group by exercise for badges
  const exerciseGroups = {};
  entries.forEach(entry => {
    if (!exerciseGroups[entry.machine]) {
      exerciseGroups[entry.machine] = [];
    }
    exerciseGroups[entry.machine].push(entry);
  });
  
  // Exercises as badges
  const exercisesDiv = document.createElement('div');
  exercisesDiv.className = 'workout-summary-exercises';
  
  const exercisesTitle = document.createElement('div');
  exercisesTitle.className = 'workout-summary-exercises-title';
  exercisesTitle.innerHTML = '<span class="workout-summary-exercises-icon">🏋️</span> Exercises';
  
  const exercisesBadges = document.createElement('div');
  exercisesBadges.className = 'workout-summary-badges';
  
  Object.keys(exerciseGroups).forEach(exercise => {
    const badge = document.createElement('div');
    badge.className = 'exercise-badge';
    badge.textContent = exercise;
    exercisesBadges.appendChild(badge);
  });
  
  exercisesDiv.appendChild(exercisesTitle);
  exercisesDiv.appendChild(exercisesBadges);
  
  // View Details button indicator in top right
  const viewDetailsIndicator = document.createElement('div');
  viewDetailsIndicator.className = 'view-details-indicator';
  viewDetailsIndicator.innerHTML = '👁️'; // Eye icon to indicate viewing details
  viewDetailsIndicator.title = "View Workout Details"; // Tooltip
  
  // Add content to card content container
  cardContent.appendChild(dateDiv);
  cardContent.appendChild(timeDiv);
  cardContent.appendChild(exercisesDiv);
  // Add the indicator to the card instead of the content for absolute positioning
  summaryCard.appendChild(viewDetailsIndicator);
  
  // Add card content to the main card
  summaryCard.appendChild(cardContent);
  
  // Make the entire card clickable
  summaryCard.addEventListener('click', () => {
    showWorkoutDetail(day, entries);
  });
  
  // Add keyboard support for accessibility
  summaryCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showWorkoutDetail(day, entries);
    }
  });
  
  lastWorkoutContainer.appendChild(summaryCard);
}

// Show workout detail screen
function showWorkoutDetail(date, entries) {
  // Track current detail for refreshing when settings change
  currentWorkoutDetail = { date, entries };
  
  const detailContent = document.getElementById('workoutDetailContent');
  const detailTitle = document.getElementById('workoutDetailTitle');
  
  detailTitle.textContent = formatDate(date);
  detailContent.innerHTML = '';
  
  // Summary stats at top
  const totalSets = entries.length;
  const uniqueExercises = [...new Set(entries.map(e => e.machine))].length;
  const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
  let timeSpent = 0;
  if (timestamps.length > 1) {
    const earliest = new Date(Math.min(...timestamps));
    const latest = new Date(Math.max(...timestamps));
    timeSpent = Math.round((latest - earliest) / 1000 / 60);
  }
  
  const statsCard = document.createElement('div');
  statsCard.className = 'workout-detail-stats';
  statsCard.innerHTML = `
    <div class="workout-stat">
      <div class="workout-stat-value">${uniqueExercises}</div>
      <div class="workout-stat-label">Exercises</div>
    </div>
    <div class="workout-stat">
      <div class="workout-stat-value">${totalSets}</div>
      <div class="workout-stat-label">Total Sets</div>
    </div>
    <div class="workout-stat">
      <div class="workout-stat-value">${timeSpent > 0 ? timeSpent + 'm' : '-'}</div>
      <div class="workout-stat-label">Duration</div>
    </div>
  `;
  detailContent.appendChild(statsCard);
  
  // Group entries by exercise
  const exerciseGroups = {};
  entries.forEach(entry => {
    if (!exerciseGroups[entry.machine]) {
      exerciseGroups[entry.machine] = [];
    }
    exerciseGroups[entry.machine].push(entry);
  });
  
  // Render each exercise group
  Object.keys(exerciseGroups).forEach(machine => {
    const sets = exerciseGroups[machine];
    
    const exerciseCard = document.createElement('div');
    exerciseCard.className = 'workout-detail-exercise';
    
    const exerciseHeader = document.createElement('div');
    exerciseHeader.className = 'workout-detail-exercise-header';
    exerciseHeader.innerHTML = `${machine} <span style="font-size: 0.8rem; color: var(--text-secondary); margin-left: auto;">${sets.length} sets</span>`;
    
    const setsContainer = document.createElement('div');
    setsContainer.className = 'workout-detail-sets';
    
    sets.forEach((set, index) => {
      const setDiv = document.createElement('div');
      setDiv.className = 'workout-detail-set';
      
      const time = formatTime(set.timestamp);
      
      setDiv.innerHTML = `
        <div class="workout-detail-set-number">Set ${index + 1}</div>
        <div class="workout-detail-set-info">
          <span style="font-weight: 700;">${set.weight}</span> kg × 
          <span style="font-weight: 700;">${set.reps}</span> reps
        </div>
        <div class="workout-detail-set-time">${time}</div>
      `;
      
      setsContainer.appendChild(setDiv);
    });
    
    exerciseCard.appendChild(exerciseHeader);
    exerciseCard.appendChild(setsContainer);
    detailContent.appendChild(exerciseCard);
  });
  
  showScreen('workoutDetail');
}

// ===== SPINNER CONTROLS =====

// Handle spinner buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('spinner-btn')) {
    const action = e.target.dataset.action;
    const targetId = e.target.dataset.target;
    const input = document.getElementById(targetId);
    const step = parseFloat(input.step) || 1;
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || Infinity;
    
    let value = parseFloat(input.value) || 0;
    
    if (action === 'increase') {
      value = Math.min(value + step, max);
    } else if (action === 'decrease') {
      value = Math.max(value - step, min);
    }
    
    input.value = value;
    
    // Trigger change event to let the normal save logic handle it
    input.dispatchEvent(new Event('change'));
  }
});

// Update weight and reps when machine changes
machineSelect.addEventListener('change', () => {
  const selectedMachine = machineSelect.value;
  if (selectedMachine) {
    const lastValues = getLastValues(selectedMachine);
    weightInput.value = lastValues.weight;
    repsInput.value = lastValues.reps;
  }
});

// ===== FORM SUBMISSION =====

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!machineSelect.value || !weightInput.value || !repsInput.value) {
    return;
  }
  
  addEntry({
    machine: machineSelect.value,
    weight: parseFloat(weightInput.value),
    reps: parseInt(repsInput.value)
  });
  
  // Reset form but keep the machine selected for quick consecutive sets
  const currentMachine = machineSelect.value;
  // Don't reset machine select - keep it for next set
  // machineSelect.value = '';
  // Keep weight and reps for quick repeats
  // const settings = getSettings();
  // weightInput.value = settings.defaultWeight;
  // repsInput.value = settings.defaultReps;
  
  renderHistory();
  // Stay on tracker screen to see today's section
  // showScreen('history'); 
});

// ===== TIMER/STOPWATCH FUNCTIONALITY =====

// Tab switching
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // Show active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabId}Tab`);
    });
  });
});

// Stopwatch variables
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchStartTime;
let stopwatchElapsedTime = 0;
let lapCounter = 0;

// Timer variables
let timerInterval;
let timerRunning = false;
let timerDuration = 0;
let timerEndTime;

// Stopwatch elements
const stopwatchDisplay = document.querySelector('.stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatchStartBtn');
const stopwatchResetBtn = document.getElementById('stopwatchResetBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Timer elements
const timerDisplay = document.querySelector('.timer-display');
const timerMinutesInput = document.getElementById('timerMinutes');
const timerSecondsInput = document.getElementById('timerSeconds');
const timerStartBtn = document.getElementById('timerStartBtn');
const timerResetBtn = document.getElementById('timerResetBtn');

// Format time display (HH:MM:SS)
function formatStopwatchTime(timeInMs) {
  const totalSeconds = Math.floor(timeInMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((timeInMs % 1000) / 10);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Format timer display (MM:SS)
function formatTimerTime(timeInMs) {
  const totalSeconds = Math.ceil(timeInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start/stop stopwatch
stopwatchStartBtn.addEventListener('click', () => {
  if (stopwatchRunning) {
    // Stop the stopwatch
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchStartBtn.textContent = 'Resume';
    stopwatchStartBtn.classList.remove('active');
    
    // Add lap when pausing
    addLap();
  } else {
    // Start or resume the stopwatch
    const now = Date.now();
    if (stopwatchElapsedTime === 0) {
      // First start - clear laps
      lapsContainer.innerHTML = '';
      lapCounter = 0;
    }
    stopwatchStartTime = now - stopwatchElapsedTime;
    
    stopwatchInterval = setInterval(() => {
      const elapsed = Date.now() - stopwatchStartTime;
      stopwatchDisplay.textContent = formatStopwatchTime(elapsed);
      stopwatchElapsedTime = elapsed;
    }, 100);
    
    stopwatchRunning = true;
    stopwatchStartBtn.textContent = 'Pause';
    stopwatchStartBtn.classList.add('active');
  }
});

// Reset stopwatch
stopwatchResetBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchElapsedTime = 0;
  stopwatchDisplay.textContent = '00:00:00';
  stopwatchStartBtn.textContent = 'Start';
  stopwatchStartBtn.classList.remove('active');
  lapsContainer.innerHTML = '';
  lapCounter = 0;
});

// Add lap
function addLap() {
  if (stopwatchElapsedTime > 0) {
    lapCounter++;
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    
    const lapNumber = document.createElement('div');
    lapNumber.className = 'lap-number';
    lapNumber.textContent = `Lap ${lapCounter}`;
    
    const lapTime = document.createElement('div');
    lapTime.className = 'lap-time';
    lapTime.textContent = formatStopwatchTime(stopwatchElapsedTime);
    
    lapItem.appendChild(lapNumber);
    lapItem.appendChild(lapTime);
    
    lapsContainer.prepend(lapItem);
  }
}

// Start/stop timer
timerStartBtn.addEventListener('click', () => {
  if (timerRunning) {
    // Stop the timer
    clearInterval(timerInterval);
    timerRunning = false;
    timerStartBtn.textContent = 'Resume';
    timerStartBtn.classList.remove('active');
    
    // Calculate remaining time
    const remaining = timerEndTime - Date.now();
    if (remaining > 0) {
      timerDuration = remaining;
    }
  } else {
    // Get duration from inputs if not running
    if (!timerDuration) {
      const minutes = parseInt(timerMinutesInput.value) || 0;
      const seconds = parseInt(timerSecondsInput.value) || 0;
      timerDuration = (minutes * 60 + seconds) * 1000;
    }
    
    // Don't start if duration is 0
    if (timerDuration <= 0) {
      return;
    }
    
    // Disable inputs while timer is running
    timerMinutesInput.disabled = true;
    timerSecondsInput.disabled = true;
    
    // Set end time
    timerEndTime = Date.now() + timerDuration;
    
    timerInterval = setInterval(() => {
      const remaining = timerEndTime - Date.now();
      
      if (remaining <= 0) {
        // Timer finished
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        timerRunning = false;
        timerDuration = 0;
        timerStartBtn.textContent = 'Start';
        timerStartBtn.classList.remove('active');
        timerMinutesInput.disabled = false;
        timerSecondsInput.disabled = false;
        
        // Play alarm sound or vibration
        navigator.vibrate && navigator.vibrate([500, 250, 500]);
      } else {
        // Update display
        timerDisplay.textContent = formatTimerTime(remaining);
      }
    }, 100);
    
    timerRunning = true;
    timerStartBtn.textContent = 'Pause';
    timerStartBtn.classList.add('active');
  }
});

// Reset timer
timerResetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timerDuration = 0;
  timerStartBtn.textContent = 'Start';
  timerStartBtn.classList.remove('active');
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  
  // Set to default timer duration from settings
  const settings = getSettings();
  timerMinutesInput.value = settings.defaultTimerMinutes;
  timerSecondsInput.value = 0;
  
  // Update display to show default duration
  const defaultDurationMs = settings.defaultTimerMinutes * 60 * 1000;
  timerDisplay.textContent = formatTimerTime(defaultDurationMs);
});

// ===== BOTTOM NAVIGATION =====

// Bottom navigation event listeners
navHome.addEventListener('click', () => {
  renderHomeWorkoutPlans();
  showScreen('home');
});

navWorkout.addEventListener('click', () => {
  // Check if there's an active workout
  if (currentWorkoutPlan) {
    // Show the active workout screen
    activeWorkoutTitle.textContent = `🏋️ ${currentWorkoutPlan.name}`;
    renderActiveWorkout();
    // Restart timer if it's not running
    if (!workoutTimerInterval) {
      startWorkoutTimer();
    }
    showScreen('activeWorkout');
  } else {
    // Show the tracker screen
    showScreen('tracker');
  }
});

navProfile.addEventListener('click', () => {
  showScreen('profile');
});

// Home screen card navigation
document.addEventListener('click', (e) => {
  const homeCard = e.target.closest('.home-card');
  if (homeCard && homeCard.dataset.nav) {
    const target = homeCard.dataset.nav;
    
    // Handle special cases
    if (target === 'history') {
      renderHistory();
      showScreen('history');
    } else if (target === 'timer') {
      // If timer is not running and is at 0:00, set to default duration
      if (!timerRunning && timerMinutesInput.value === '0' && timerSecondsInput.value === '0') {
        const settings = getSettings();
        timerMinutesInput.value = settings.defaultTimerMinutes;
        timerSecondsInput.value = 0;
        const defaultDurationMs = settings.defaultTimerMinutes * 60 * 1000;
        timerDisplay.textContent = formatTimerTime(defaultDurationMs);
      }
      showScreen('timer');
    } else if (target === 'settingsPlans') {
      plansScreenContext = 'profile';
      renderPlansList();
      showScreen('settingsPlans');
    } else if (target === 'settingsExercises') {
      machinesScreenContext = 'profile';
      renderMachineList();
      showScreen('settingsExercises');
    } else if (target === 'settingsMenu') {
      showSettingsScreen();
    } else if (target === 'settings') {
      showSettingsScreen();
    } else {
      showScreen(target);
    }
  }
});

// Workout widget toggle on home screen
const workoutWidgetToggle = document.getElementById('workoutWidgetToggle');
const workoutWidgetContent = document.getElementById('workoutWidgetContent');

if (workoutWidgetToggle && workoutWidgetContent) {
  // Start expanded
  workoutWidgetToggle.classList.add('expanded');
  workoutWidgetContent.classList.add('expanded');
  
  workoutWidgetToggle.addEventListener('click', () => {
    workoutWidgetToggle.classList.toggle('expanded');
    workoutWidgetContent.classList.toggle('expanded');
  });
}

// Close plan menu dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.home-plan-menu')) {
    document.querySelectorAll('.plan-menu-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
    document.querySelectorAll('.plan-menu-btn.active').forEach(btn => {
      btn.classList.remove('active');
    });
  }
});

// ===== SETTINGS NAVIGATION =====

// Show settings main menu screen
function showSettingsScreen() {
  showScreen('settings');
}

// Settings menu navigation
document.querySelectorAll('.settings-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const page = item.dataset.settingPage;
    if (page) {
      const screenName = `settings${page.charAt(0).toUpperCase() + page.slice(1)}`;
      showScreen(screenName);
      
      // Render content for specific screens
      if (page === 'plans') {
        renderPlansList();
      } else if (page === 'exercises') {
        renderMachineList();
      }
    }
  });
});

// Back to settings buttons
document.querySelectorAll('.back-to-settings').forEach(btn => {
  btn.addEventListener('click', () => {
    showScreen('settings');
  });
});

// ===== INITIALIZATION =====

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  applySettings();
  renderMachineSelect();
  renderHistory();
  renderTodaySection(); // Show today's workout on load
  renderActivePlanSelect();
  renderHomeWorkoutPlans(); // Render home screen workout plans
  
  // Restore active workout if one exists
  const hasActiveWorkout = loadActiveWorkout();
  if (hasActiveWorkout) {
    // Show the active workout screen
    activeWorkoutTitle.textContent = `🏋️ ${currentWorkoutPlan.name}`;
    renderActiveWorkout();
    startWorkoutTimer(); // Start the timer for the restored workout
    showScreen('activeWorkout');
  } else {
    // Start at home screen
    showScreen('home');
  }
  
  // Set timer inputs and display to default timer duration
  const settings = getSettings();
  timerMinutesInput.value = settings.defaultTimerMinutes;
  timerSecondsInput.value = 0;
  const defaultDurationMs = settings.defaultTimerMinutes * 60 * 1000;
  timerDisplay.textContent = formatTimerTime(defaultDurationMs);
});
