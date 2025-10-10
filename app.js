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
const plansScreen = document.getElementById('plansScreen');
const editPlanScreen = document.getElementById('editPlanScreen');
const activeWorkoutScreen = document.getElementById('activeWorkoutScreen');
const timerScreen = document.getElementById('timerScreen');
const historyScreen = document.getElementById('historyScreen');

// Buttons
const backBtn = document.getElementById('backBtn');
const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
const backFromPlansBtn = document.getElementById('backFromPlansBtn');
const backFromEditPlanBtn = document.getElementById('backFromEditPlanBtn');
const cancelWorkoutBtn = document.getElementById('cancelWorkoutBtn');

// Bottom Navigation
const bottomNav = document.getElementById('bottomNav');
// Home tab removed; Workout is default
const navExercises = document.getElementById('navExercises');
const navWorkout = document.getElementById('navWorkout');
const navHistory = document.getElementById('navHistory');
const navTimer = document.getElementById('navTimer');
const navSettings = document.getElementById('navSettings');
const addMachineBtn = document.getElementById('addMachineBtn');
const newMachineNameInput = document.getElementById('newMachineName');
const machineListDiv = document.getElementById('machineList');

// Plan elements
const planSelector = document.getElementById('planSelector');
const activePlanSelect = document.getElementById('activePlan');
const startPlanBtn = document.getElementById('startPlanBtn');
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

let currentEditingPlanId = null;
let currentPlanExercises = [];
let currentWorkoutPlan = null;
let completedExercises = new Set();
let expandedExerciseIndex = null; // Track which exercise is expanded

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
  plansScreen.classList.toggle('screen-hidden', screen !== 'plans');
  editPlanScreen.classList.toggle('screen-hidden', screen !== 'editPlan');
  activeWorkoutScreen.classList.toggle('screen-hidden', screen !== 'activeWorkout');
  timerScreen.classList.toggle('screen-hidden', screen !== 'timer');
  historyScreen.classList.toggle('screen-hidden', screen !== 'history');
  
  // Update bottom navigation active state
  updateNavActiveState(screen);
}

// Update bottom navigation active state
function updateNavActiveState(screen) {
  // Remove active class from all nav buttons
  // Remove active class from all nav buttons
  navExercises.classList.remove('active');
  navWorkout.classList.remove('active');
  navHistory.classList.remove('active');
  navTimer.classList.remove('active');
  navSettings.classList.remove('active');
  
  // Set active class based on current screen
  switch(screen) {
    case 'tracker':
    case 'activeWorkout':
      navWorkout.classList.add('active');
      break;
    case 'machines':
      navExercises.classList.add('active');
      break;
    case 'activeWorkout':
      navWorkout.classList.add('active');
      break;
    case 'history':
      navHistory.classList.add('active');
      break;
    case 'timer':
      navTimer.classList.add('active');
      break;
    case 'settings':
      navSettings.classList.add('active');
      break;
  }
}

backBtn.addEventListener('click', () => showScreen('tracker'));

backFromPlansBtn.addEventListener('click', () => showScreen('tracker'));

backFromEditPlanBtn.addEventListener('click', () => {
  showScreen('plans');
  renderPlansList();
});

cancelWorkoutBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel this workout? Progress will not be saved.')) {
    currentWorkoutPlan = null;
    completedExercises.clear();
    showScreen('tracker');
  }
});

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
    }
  } else {
    // Create new plan
    plan.id = Date.now().toString();
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
      exDiv.textContent = `${ex.machine} - ${ex.weight}kg × ${ex.reps} reps`;
      exercises.appendChild(exDiv);
    });
    
    planItem.appendChild(header);
    planItem.appendChild(exercises);
    plansListDiv.appendChild(planItem);
  });
}

// Render active plan selector
function renderActivePlanSelect() {
  const plans = getPlans();
  activePlanSelect.innerHTML = '<option value="">No plan selected</option>';
  
  plans.forEach(plan => {
    const option = document.createElement('option');
    option.value = plan.id;
    option.textContent = plan.name;
    activePlanSelect.appendChild(option);
  });
  
  // Show/hide plan selector based on whether plans exist
  planSelector.style.display = plans.length > 0 ? 'block' : 'none';
}

// Start a workout plan
function startPlan() {
  const planId = activePlanSelect.value;
  if (!planId) return;
  
  const plans = getPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) return;
  
  // Start active workout session
  currentWorkoutPlan = plan;
  completedExercises.clear();
  
  activeWorkoutTitle.textContent = `🏋️ ${plan.name}`;
  renderActiveWorkout();
  showScreen('activeWorkout');
}

// Render active workout screen
function renderActiveWorkout() {
  if (!currentWorkoutPlan) return;
  
  const exercises = currentWorkoutPlan.exercises;
  const completed = completedExercises.size;
  const total = exercises.length;
  
  // Update progress
  progressCurrent.textContent = completed;
  progressTotal.textContent = total;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;
  progressBarFill.style.width = `${progressPercent}%`;
  
  // Render exercises
  workoutExercisesDiv.innerHTML = '';
  
  exercises.forEach((exercise, index) => {
    const isCompleted = completedExercises.has(index);
    const isCurrent = !isCompleted && completedExercises.size === index;
    
    const exerciseCard = document.createElement('div');
    exerciseCard.className = `workout-exercise-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'workout-exercise-header';
    
    const exerciseNumber = document.createElement('div');
    exerciseNumber.className = 'workout-exercise-number';
    exerciseNumber.textContent = `Exercise ${index + 1}`;
    
    const status = document.createElement('div');
    status.className = 'workout-exercise-status';
    if (isCompleted) {
      status.innerHTML = '✓ Completed';
      status.style.color = 'var(--success)';
    } else if (isCurrent) {
      status.innerHTML = '● In Progress';
      status.style.color = 'var(--accent)';
    } else {
      status.innerHTML = '○ Pending';
      status.style.color = 'var(--text-secondary)';
    }
    
    cardHeader.appendChild(exerciseNumber);
    cardHeader.appendChild(status);
    
    const cardBody = document.createElement('div');
    cardBody.className = 'workout-exercise-body';
    
    const machineName = document.createElement('div');
    machineName.className = 'workout-exercise-machine';
    machineName.textContent = exercise.machine;
    
    const details = document.createElement('div');
    details.className = 'workout-exercise-details';
    details.textContent = `${exercise.weight}kg × ${exercise.reps} reps`;
    
    cardBody.appendChild(machineName);
    cardBody.appendChild(details);
    
    exerciseCard.appendChild(cardHeader);
    exerciseCard.appendChild(cardBody);
    
    // Add complete button for current exercise
    if (isCurrent) {
      const completeBtn = document.createElement('button');
      completeBtn.className = 'btn-complete-exercise';
      completeBtn.textContent = 'Mark as Complete';
      completeBtn.addEventListener('click', () => {
        completedExercises.add(index);
        
        // Add to history
        addEntry({
          machine: exercise.machine,
          weight: exercise.weight,
          reps: exercise.reps
        });
        
        renderActiveWorkout();
        
        // Check if all exercises are complete
        if (completedExercises.size === exercises.length) {
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
  currentWorkoutPlan = null;
  completedExercises.clear();
  activePlanSelect.value = '';
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

// Render exercise editor
function renderPlanExercises() {
  planExercisesDiv.innerHTML = '';
  const machines = getMachines();
  
  currentPlanExercises.forEach((exercise, index) => {
    const exerciseItem = document.createElement('div');
    const isExpanded = expandedExerciseIndex === index;
    const isComplete = exercise.machine && exercise.weight && exercise.reps;
    
    exerciseItem.className = 'exercise-item';
    
    // Collapsed view
    if (!isExpanded && isComplete) {
      const header = document.createElement('div');
      header.className = 'exercise-item-header';
      
      const info = document.createElement('div');
      info.className = 'exercise-collapsed-info';
      info.innerHTML = `
        <div class="exercise-number">Exercise ${index + 1}</div>
        <div class="exercise-summary">${exercise.machine} - ${exercise.weight}kg × ${exercise.reps} reps</div>
      `;
      
      const actions = document.createElement('div');
      actions.className = 'history-entry-actions';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-icon edit';
      editBtn.innerHTML = '✏️';
      editBtn.title = 'Edit';
      editBtn.type = 'button';
      editBtn.addEventListener('click', () => {
        expandedExerciseIndex = index;
        renderPlanExercises();
      });
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Remove';
      deleteBtn.type = 'button';
      deleteBtn.addEventListener('click', () => {
        currentPlanExercises.splice(index, 1);
        if (expandedExerciseIndex === index) {
          expandedExerciseIndex = null;
        } else if (expandedExerciseIndex > index) {
          expandedExerciseIndex--;
        }
        renderPlanExercises();
      });
      
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      header.appendChild(info);
      header.appendChild(actions);
      exerciseItem.appendChild(header);
    } else {
      // Expanded view
      const header = document.createElement('div');
      header.className = 'exercise-item-header';
      
      const number = document.createElement('div');
      number.className = 'exercise-number';
      number.textContent = `Exercise ${index + 1}`;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon delete';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Remove';
      deleteBtn.type = 'button';
      deleteBtn.addEventListener('click', () => {
        currentPlanExercises.splice(index, 1);
        if (expandedExerciseIndex === index) {
          expandedExerciseIndex = null;
        } else if (expandedExerciseIndex > index) {
          expandedExerciseIndex--;
        }
        renderPlanExercises();
      });
      
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
      machines.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        if (m === exercise.machine) opt.selected = true;
        machineSelect.appendChild(opt);
      });
      machineSelect.addEventListener('change', (e) => {
        currentPlanExercises[index].machine = e.target.value;
      });
      machineGroup.appendChild(machineLabel);
      machineGroup.appendChild(machineSelect);
      
      // Weight with spinners
      const weightGroup = document.createElement('div');
      weightGroup.className = 'form-group-inline';
      const weightLabel = document.createElement('label');
      weightLabel.textContent = 'Weight (kg)';
      const weightSpinner = document.createElement('div');
      weightSpinner.className = 'spinner-input';
      
      const weightDecrease = document.createElement('button');
      weightDecrease.type = 'button';
      weightDecrease.className = 'spinner-btn';
      weightDecrease.textContent = '−';
      weightDecrease.addEventListener('click', () => {
        const settings = getSettings();
        const step = settings.weightIncrement;
        const newValue = Math.max(0, exercise.weight - step);
        currentPlanExercises[index].weight = newValue;
        renderPlanExercises();
      });
      
      const weightInput = document.createElement('input');
      weightInput.type = 'number';
      weightInput.value = exercise.weight;
      weightInput.min = 0;
      weightInput.max = 500;
      weightInput.step = 2.5;
      weightInput.addEventListener('change', (e) => {
        currentPlanExercises[index].weight = parseFloat(e.target.value) || 0;
      });
      
      const weightIncrease = document.createElement('button');
      weightIncrease.type = 'button';
      weightIncrease.className = 'spinner-btn';
      weightIncrease.textContent = '+';
      weightIncrease.addEventListener('click', () => {
        const settings = getSettings();
        const step = settings.weightIncrement;
        const newValue = Math.min(500, exercise.weight + step);
        currentPlanExercises[index].weight = newValue;
        renderPlanExercises();
      });
      
      weightSpinner.appendChild(weightDecrease);
      weightSpinner.appendChild(weightInput);
      weightSpinner.appendChild(weightIncrease);
      weightGroup.appendChild(weightLabel);
      weightGroup.appendChild(weightSpinner);
      
      // Reps with spinners
      const repsGroup = document.createElement('div');
      repsGroup.className = 'form-group-inline';
      const repsLabel = document.createElement('label');
      repsLabel.textContent = 'Reps';
      const repsSpinner = document.createElement('div');
      repsSpinner.className = 'spinner-input';
      
      const repsDecrease = document.createElement('button');
      repsDecrease.type = 'button';
      repsDecrease.className = 'spinner-btn';
      repsDecrease.textContent = '−';
      repsDecrease.addEventListener('click', () => {
        const newValue = Math.max(1, exercise.reps - 1);
        currentPlanExercises[index].reps = newValue;
        renderPlanExercises();
      });
      
      const repsInput = document.createElement('input');
      repsInput.type = 'number';
      repsInput.value = exercise.reps;
      repsInput.min = 1;
      repsInput.max = 100;
      repsInput.step = 1;
      repsInput.addEventListener('change', (e) => {
        currentPlanExercises[index].reps = parseInt(e.target.value) || 1;
      });
      
      const repsIncrease = document.createElement('button');
      repsIncrease.type = 'button';
      repsIncrease.className = 'spinner-btn';
      repsIncrease.textContent = '+';
      repsIncrease.addEventListener('click', () => {
        const newValue = Math.min(100, exercise.reps + 1);
        currentPlanExercises[index].reps = newValue;
        renderPlanExercises();
      });
      
      repsSpinner.appendChild(repsDecrease);
      repsSpinner.appendChild(repsInput);
      repsSpinner.appendChild(repsIncrease);
      repsGroup.appendChild(repsLabel);
      repsGroup.appendChild(repsSpinner);
      
      fields.appendChild(machineGroup);
      fields.appendChild(weightGroup);
      fields.appendChild(repsGroup);
      
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
    weight: settings.defaultWeight,
    reps: settings.defaultReps
  });
  // Expand the newly added exercise
  expandedExerciseIndex = currentPlanExercises.length - 1;
  renderPlanExercises();
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
    if (!ex.machine || !ex.weight || !ex.reps) {
      alert('Please complete all exercise fields');
      return;
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
  showScreen('plans');
});

// Start plan button
startPlanBtn.addEventListener('click', startPlan);

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
    historyList.innerHTML = '<div class="empty-state">No workout history yet. Add your first set from the Home tab! 💪</div>';
  historyList.innerHTML = '<div class="empty-state">No workout history yet. Add your first set from the Workout tab! 💪</div>';
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
  showScreen('history'); // Show history screen after adding a set
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
  timerDisplay.textContent = '00:00';
  timerStartBtn.textContent = 'Start';
  timerStartBtn.classList.remove('active');
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  timerMinutesInput.value = 0;
  timerSecondsInput.value = 0;
});

// ===== BOTTOM NAVIGATION =====

// Bottom navigation event listeners
navExercises.addEventListener('click', () => {
  showScreen('machines');
  renderMachineList();
});
navWorkout.addEventListener('click', () => {
  const plans = getPlans();
  if (plans.length > 0) {
    showScreen('tracker');
    planSelector.style.display = 'block';
    planSelector.scrollIntoView({ behavior: 'smooth' });
  } else {
    showScreen('plans');
  }
});
navHistory.addEventListener('click', () => {
  showScreen('history');
  renderHistory(); // Refresh history when switching to history tab
});
navTimer.addEventListener('click', () => showScreen('timer'));
navSettings.addEventListener('click', () => {
  showScreen('settings');
  applySettings();
});

// ===== INITIALIZATION =====

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  applySettings();
  renderMachineSelect();
  renderHistory();
  renderActivePlanSelect();
  showScreen('tracker'); // Ensure we start at the home screen
  showScreen('tracker'); // Start at workout screen (formerly home)
});
