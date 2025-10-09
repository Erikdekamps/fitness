// Fitness Tracker App with Dark Mode, Editable History, Custom Machines, and Settings
const form = document.getElementById('entryForm');
const machineSelect = document.getElementById('machine');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const historyList = document.getElementById('historyList');

// Screens
const trackerScreen = document.getElementById('trackerScreen');
const machineScreen = document.getElementById('machineScreen');
const settingsScreen = document.getElementById('settingsScreen');

// Buttons
const manageMachinesBtn = document.getElementById('manageMachinesBtn');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');
const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
const addMachineForm = document.getElementById('addMachineForm');
const newMachineNameInput = document.getElementById('newMachineName');
const machineListDiv = document.getElementById('machineList');

// Settings inputs
const weightIncrementInput = document.getElementById('weightIncrement');
const defaultWeightInput = document.getElementById('defaultWeight');
const defaultRepsInput = document.getElementById('defaultReps');

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
    defaultReps: 10
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
  
  // Update weight input step
  weightInput.step = settings.weightIncrement;
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

// Render machine select dropdown
function renderMachineSelect() {
  const machines = getMachines();
  const currentValue = machineSelect.value;
  
  machineSelect.innerHTML = '<option value="">Select machine</option>';
  machines.forEach(machine => {
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
function renderMachineList() {
  const machines = getMachines();
  machineListDiv.innerHTML = '';
  
  if (machines.length === 0) {
    machineListDiv.innerHTML = '<div class="empty-state">No machines added yet.</div>';
    return;
  }
  
  machines.forEach(machine => {
    const machineItem = document.createElement('div');
    machineItem.className = 'machine-item';
    
    const machineName = document.createElement('div');
    machineName.className = 'machine-name';
    machineName.textContent = machine;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Delete "${machine}"?`)) {
        deleteMachine(machine);
      }
    });
    
    machineItem.appendChild(machineName);
    machineItem.appendChild(deleteBtn);
    machineListDiv.appendChild(machineItem);
  });
}

// ===== SCREEN NAVIGATION =====

function showScreen(screen) {
  trackerScreen.classList.toggle('screen-hidden', screen !== 'tracker');
  machineScreen.classList.toggle('screen-hidden', screen !== 'machines');
  settingsScreen.classList.toggle('screen-hidden', screen !== 'settings');
}

manageMachinesBtn.addEventListener('click', () => {
  showScreen('machines');
  renderMachineList();
});

settingsBtn.addEventListener('click', () => {
  showScreen('settings');
  applySettings();
});

backBtn.addEventListener('click', () => showScreen('tracker'));

backFromSettingsBtn.addEventListener('click', () => {
  // Save settings when going back
  const settings = {
    weightIncrement: parseFloat(weightIncrementInput.value),
    defaultWeight: parseFloat(defaultWeightInput.value),
    defaultReps: parseInt(defaultRepsInput.value)
  };
  saveSettings(settings);
  
  // Reload the interface with new settings
  const currentMachine = machineSelect.value;
  if (!currentMachine) {
    // If no machine selected, use defaults
    weightInput.value = settings.defaultWeight;
    repsInput.value = settings.defaultReps;
  }
  // If machine is selected, values will be correct already
  
  showScreen('tracker');
});

// Add machine form
addMachineForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = newMachineNameInput.value.trim();
  if (name) {
    if (addMachine(name)) {
      newMachineNameInput.value = '';
    }
  }
});

// Auto-save settings when inputs change
weightIncrementInput.addEventListener('change', () => {
  const settings = {
    weightIncrement: parseFloat(weightIncrementInput.value),
    defaultWeight: parseFloat(defaultWeightInput.value),
    defaultReps: parseInt(defaultRepsInput.value)
  };
  saveSettings(settings);
});

defaultWeightInput.addEventListener('change', () => {
  const settings = {
    weightIncrement: parseFloat(weightIncrementInput.value),
    defaultWeight: parseFloat(defaultWeightInput.value),
    defaultReps: parseInt(defaultRepsInput.value)
  };
  saveSettings(settings);
});

defaultRepsInput.addEventListener('change', () => {
  const settings = {
    weightIncrement: parseFloat(weightIncrementInput.value),
    defaultWeight: parseFloat(defaultWeightInput.value),
    defaultReps: parseInt(defaultRepsInput.value)
  };
  saveSettings(settings);
});

// ===== HISTORY =====

// Get today's date in YYYY-MM-DD format
function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
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
      <input type="number" class="edit-input edit-weight" value="${entry.weight}" min="0" max="500" step="2.5" placeholder="Weight (kg)">
      <input type="number" class="edit-input edit-reps" value="${entry.reps}" min="1" max="100" step="1" placeholder="Reps">
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
  historyList.innerHTML = '';
  
  const days = Object.keys(history).sort().reverse();
  
  if (days.length === 0) {
    historyList.innerHTML = '<div class="empty-state">No workout history yet. Start by adding your first set! 💪</div>';
    return;
  }
  
  days.forEach(day => {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'history-day';
    
    const dayHeader = document.createElement('div');
    dayHeader.className = 'history-day-header';
    dayHeader.textContent = formatDate(day);
    dayContainer.appendChild(dayHeader);
    
    history[day].forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'history-entry';
      entryDiv.dataset.entryId = entry.id;
      
      const entryInfo = document.createElement('div');
      entryInfo.className = 'history-entry-info';
      entryInfo.innerHTML = `
        <div class="history-entry-machine">${entry.machine}</div>
        <div class="history-entry-details">${entry.weight}kg × ${entry.reps} reps</div>
      `;
      
      const entryActions = document.createElement('div');
      entryActions.className = 'history-entry-actions';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-icon edit';
      editBtn.innerHTML = '✏️';
      editBtn.title = 'Edit';
      editBtn.addEventListener('click', () => {
        entryDiv.classList.add('editing');
        entryDiv.innerHTML = '';
        entryDiv.appendChild(createEditForm(day, entry));
      });
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Delete';
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete this entry?')) {
          deleteEntry(day, entry.id);
        }
      });
      
      entryActions.appendChild(editBtn);
      entryActions.appendChild(deleteBtn);
      
      entryDiv.appendChild(entryInfo);
      entryDiv.appendChild(entryActions);
      
      dayContainer.appendChild(entryDiv);
    });
    
    historyList.appendChild(dayContainer);
  });
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
    
    // Auto-save settings when changed
    if (targetId === 'weightIncrement' || targetId === 'defaultWeight' || targetId === 'defaultReps') {
      const settings = {
        weightIncrement: parseFloat(weightIncrementInput.value),
        defaultWeight: parseFloat(defaultWeightInput.value),
        defaultReps: parseInt(defaultRepsInput.value)
      };
      saveSettings(settings);
    }
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
  
  // Reset form but keep the machine selected
  const currentMachine = machineSelect.value;
  machineSelect.value = '';
  const settings = getSettings();
  weightInput.value = settings.defaultWeight;
  repsInput.value = settings.defaultReps;
  
  renderHistory();
  
  // Scroll to history
  document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
});

// ===== INITIALIZATION =====

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  applySettings();
  renderMachineSelect();
  renderHistory();
});
