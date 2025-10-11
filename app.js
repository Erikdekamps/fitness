// ========================================
// FITNESS TRACKER APP
// ========================================

// ========== DOM ELEMENT REFERENCES ==========

// Form elements
const form = document.getElementById('entryForm');
const machineSelect = document.getElementById('machine');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const cardioExerciseSelect = document.getElementById('cardioExercise');
const cardioDurationInput = document.getElementById('cardioDuration');
const strengthFields = document.getElementById('strengthFields');
const cardioFields = document.getElementById('cardioFields');
const submitBtn = document.getElementById('submitBtn');
const historyCalendar = document.getElementById('historyCalendar');
const calendarPrevMonth = document.getElementById('calendarPrevMonth');
const calendarNextMonth = document.getElementById('calendarNextMonth');
const calendarMonthYear = document.getElementById('calendarMonthYear');
const selectedDayDetails = document.getElementById('selectedDayDetails');

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
const settingsCardioScreen = document.getElementById('settingsCardioScreen');
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
const closeTimerBtn = document.getElementById('closeTimerBtn');

// Bottom Navigation
const bottomNav = document.getElementById('bottomNav');
const navHome = document.getElementById('navHome');
const navWorkout = document.getElementById('navWorkout');
const navHistory = document.getElementById('navHistory');
const navProfile = document.getElementById('navProfile');
const navSettings = document.getElementById('navSettings');

// Machine management
const addMachineBtn = document.getElementById('addMachineBtn');
const newMachineNameInput = document.getElementById('newMachineName');
const newMachineCategorySelect = document.getElementById('newMachineCategory');
const newMachineMuscleGroupSelect = document.getElementById('newMachineMuscleGroup');
const machineListDiv = document.getElementById('machineList');

// Home screen elements
const startEmptyWorkoutBtn = document.getElementById('startEmptyWorkoutBtn');

// Exercise elements (for settings exercises screen)
const addMachineBtnExercises = document.getElementById('addMachineBtnExercises');
const newMachineNameInputExercises = document.getElementById('newMachineNameExercises');
const newMachineCategorySelectExercises = document.getElementById('newMachineCategoryExercises');
const newMachineMuscleGroupSelectExercises = document.getElementById('newMachineMuscleGroupExercises');
const machineListDivExercises = document.getElementById('machineListExercises');

// Cardio elements
const addCardioBtn = document.getElementById('addCardioBtn');
const newCardioNameInput = document.getElementById('newCardioName');

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
const addCardioExerciseBtn = document.getElementById('addCardioExerciseBtn');

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

// Settings inputs
const weightIncrementInput = document.getElementById('weightIncrement');
const defaultWeightInput = document.getElementById('defaultWeight');
const defaultRepsInput = document.getElementById('defaultReps');
const defaultTimerMinutesInput = document.getElementById('defaultTimerMinutes');

// Setting badge containers
const fontSizeBadges = document.getElementById('fontSizeBadges');
const layoutDensityBadges = document.getElementById('layoutDensityBadges');
const dateFormatBadges = document.getElementById('dateFormatBadges');
const timeFormatBadges = document.getElementById('timeFormatBadges');

// Data management buttons
const exportDataBtn = document.getElementById('exportDataBtn');
const importDataBtn = document.getElementById('importDataBtn');
const importFileInput = document.getElementById('importFileInput');
const resetEverythingBtn = document.getElementById('resetEverythingBtn');

// ========== STATE MANAGEMENT ==========

// Calendar state
let currentCalendarDate = new Date();

// Current editing state
let currentEditingPlanId = null;
let currentPlanExercises = [];
let currentWorkoutPlan = null;
let completedExercises = new Set();
let expandedExerciseIndex = null;
let workoutTimerInterval = null;

// Cardio timer state tracking
let cardioTimerStates = {}; // { globalIndex: { elapsed: number, isRunning: boolean, startTimestamp: number } }

// Track current workout detail for refreshing when settings change
let currentWorkoutDetail = null;

// Track navigation context for proper back navigation
let machinesScreenContext = 'settings';
let plansScreenContext = 'profile';

// Default machines
const DEFAULT_MACHINES = [
  // Chest
  { name: 'Bench Press', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Incline Bench Press', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Decline Bench Press', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Chest Press Machine', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Chest Fly Machine', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Cable Chest Fly', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Dumbbell Fly', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Push-ups', category: 'weight', muscleGroup: 'Chest' },
  { name: 'Dips', category: 'weight', muscleGroup: 'Chest' },
  
  // Back
  { name: 'Lat Pulldown', category: 'weight', muscleGroup: 'Back' },
  { name: 'Pull-ups', category: 'weight', muscleGroup: 'Back' },
  { name: 'Chin-ups', category: 'weight', muscleGroup: 'Back' },
  { name: 'Seated Cable Row', category: 'weight', muscleGroup: 'Back' },
  { name: 'Bent Over Row', category: 'weight', muscleGroup: 'Back' },
  { name: 'T-Bar Row', category: 'weight', muscleGroup: 'Back' },
  { name: 'Deadlift', category: 'weight', muscleGroup: 'Back' },
  { name: 'Romanian Deadlift', category: 'weight', muscleGroup: 'Back' },
  { name: 'Face Pulls', category: 'weight', muscleGroup: 'Back' },
  { name: 'Hyperextension', category: 'weight', muscleGroup: 'Back' },
  
  // Shoulders
  { name: 'Shoulder Press', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Overhead Press', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Lateral Raise', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Front Raise', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Rear Delt Fly', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Upright Row', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Arnold Press', category: 'weight', muscleGroup: 'Shoulders' },
  { name: 'Shrugs', category: 'weight', muscleGroup: 'Shoulders' },
  
  // Arms - Biceps
  { name: 'Bicep Curl', category: 'weight', muscleGroup: 'Biceps' },
  { name: 'Hammer Curl', category: 'weight', muscleGroup: 'Biceps' },
  { name: 'Preacher Curl', category: 'weight', muscleGroup: 'Biceps' },
  { name: 'Cable Curl', category: 'weight', muscleGroup: 'Biceps' },
  { name: 'Concentration Curl', category: 'weight', muscleGroup: 'Biceps' },
  { name: 'EZ Bar Curl', category: 'weight', muscleGroup: 'Biceps' },
  
  // Arms - Triceps
  { name: 'Tricep Extension', category: 'weight', muscleGroup: 'Triceps' },
  { name: 'Tricep Pushdown', category: 'weight', muscleGroup: 'Triceps' },
  { name: 'Overhead Tricep Extension', category: 'weight', muscleGroup: 'Triceps' },
  { name: 'Skull Crushers', category: 'weight', muscleGroup: 'Triceps' },
  { name: 'Close Grip Bench Press', category: 'weight', muscleGroup: 'Triceps' },
  { name: 'Tricep Dips', category: 'weight', muscleGroup: 'Triceps' },
  
  // Legs - Quads
  { name: 'Squat', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Front Squat', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Leg Press', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Leg Extension', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Bulgarian Split Squat', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Lunges', category: 'weight', muscleGroup: 'Quads' },
  { name: 'Hack Squat', category: 'weight', muscleGroup: 'Quads' },
  
  // Legs - Hamstrings
  { name: 'Leg Curl', category: 'weight', muscleGroup: 'Hamstrings' },
  { name: 'Seated Leg Curl', category: 'weight', muscleGroup: 'Hamstrings' },
  { name: 'Lying Leg Curl', category: 'weight', muscleGroup: 'Hamstrings' },
  { name: 'Stiff Leg Deadlift', category: 'weight', muscleGroup: 'Hamstrings' },
  
  // Legs - Glutes
  { name: 'Hip Thrust', category: 'weight', muscleGroup: 'Glutes' },
  { name: 'Glute Bridge', category: 'weight', muscleGroup: 'Glutes' },
  { name: 'Cable Kickbacks', category: 'weight', muscleGroup: 'Glutes' },
  { name: 'Abductor Machine', category: 'weight', muscleGroup: 'Glutes' },
  { name: 'Adductor Machine', category: 'weight', muscleGroup: 'Glutes' },
  
  // Legs - Calves
  { name: 'Calf Raise', category: 'weight', muscleGroup: 'Calves' },
  { name: 'Seated Calf Raise', category: 'weight', muscleGroup: 'Calves' },
  { name: 'Standing Calf Raise', category: 'weight', muscleGroup: 'Calves' },
  
  // Core
  { name: 'Cable Crunch', category: 'weight', muscleGroup: 'Core' },
  { name: 'Ab Wheel', category: 'weight', muscleGroup: 'Core' },
  { name: 'Plank', category: 'weight', muscleGroup: 'Core' },
  { name: 'Side Plank', category: 'weight', muscleGroup: 'Core' },
  { name: 'Russian Twist', category: 'weight', muscleGroup: 'Core' },
  { name: 'Leg Raises', category: 'weight', muscleGroup: 'Core' },
  { name: 'Hanging Leg Raise', category: 'weight', muscleGroup: 'Core' },
  { name: 'Sit-ups', category: 'weight', muscleGroup: 'Core' },
  { name: 'Bicycle Crunches', category: 'weight', muscleGroup: 'Core' },
  
  // Cardio Machines
  { name: 'Treadmill', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Stationary Bike', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Rowing Machine', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Elliptical', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Stair Climber', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Assault Bike', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Spin Bike', category: 'cardio', muscleGroup: 'Cardio' },
  
  // Cardio Activities
  { name: 'Running', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Jogging', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Walking', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Cycling', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Swimming', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Jump Rope', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Burpees', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Mountain Climbers', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'High Knees', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Jumping Jacks', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Box Jumps', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Battle Ropes', category: 'cardio', muscleGroup: 'Cardio' },
  { name: 'Kettlebell Swings', category: 'cardio', muscleGroup: 'Cardio' },
  
  // Functional/CrossFit
  { name: 'Clean and Press', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Power Clean', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Snatch', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Thruster', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Wall Balls', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Farmer\'s Walk', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Sled Push', category: 'weight', muscleGroup: 'Full Body' },
  { name: 'Sled Pull', category: 'weight', muscleGroup: 'Full Body' }
];

const DEFAULT_CARDIO = [
  'Running',
  'Cycling',
  'Rowing',
  'Elliptical',
  'Swimming',
  'Jump Rope',
  'Stair Climber',
  'Walking'
];

// ===== DEFAULT WORKOUT PLAN TEMPLATES =====
const DEFAULT_WORKOUT_PLANS = [
  {
    name: 'Upper/Lower 4 Day',
    description: 'Classic 4-day upper/lower split for balanced muscle development',
    workouts: [
      {
        name: 'Upper Body A',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Lat Pulldown', sets: 4, reps: 10, weight: 0 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Seated Cable Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Bicep Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Lower Body A',
        exercises: [
          { name: 'Squat', sets: 4, reps: 8, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 0 },
          { name: 'Leg Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Calf Raise', sets: 4, reps: 15, weight: 0 },
          { name: 'Plank', sets: 3, reps: 60, weight: 0 }
        ]
      },
      {
        name: 'Upper Body B',
        exercises: [
          { name: 'Incline Bench Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Pull-ups', sets: 4, reps: 8, weight: 0 },
          { name: 'Overhead Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Bent Over Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Hammer Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Lower Body B',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: 6, weight: 0 },
          { name: 'Front Squat', sets: 3, reps: 10, weight: 0 },
          { name: 'Lunges', sets: 3, reps: 12, weight: 0 },
          { name: 'Leg Extension', sets: 3, reps: 12, weight: 0 },
          { name: 'Seated Calf Raise', sets: 4, reps: 15, weight: 0 },
          { name: 'Russian Twist', sets: 3, reps: 20, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Push/Pull/Legs',
    description: '6-day PPL split for maximum volume',
    workouts: [
      {
        name: 'Push Day',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Incline Bench Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Lateral Raise', sets: 3, reps: 12, weight: 0 },
          { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: 0 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Pull Day',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: 6, weight: 0 },
          { name: 'Lat Pulldown', sets: 3, reps: 10, weight: 0 },
          { name: 'Seated Cable Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Face Pulls', sets: 3, reps: 15, weight: 0 },
          { name: 'Bicep Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Hammer Curl', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Leg Day',
        exercises: [
          { name: 'Squat', sets: 4, reps: 8, weight: 0 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Leg Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Leg Extension', sets: 3, reps: 12, weight: 0 },
          { name: 'Calf Raise', sets: 4, reps: 15, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Full Body 3 Day',
    description: 'Efficient 3-day full body routine',
    workouts: [
      {
        name: 'Full Body A',
        exercises: [
          { name: 'Squat', sets: 4, reps: 8, weight: 0 },
          { name: 'Bench Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Lat Pulldown', sets: 3, reps: 10, weight: 0 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Bicep Curl', sets: 2, reps: 12, weight: 0 },
          { name: 'Tricep Pushdown', sets: 2, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Full Body B',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: 6, weight: 0 },
          { name: 'Incline Bench Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Pull-ups', sets: 3, reps: 8, weight: 0 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 0 },
          { name: 'Lateral Raise', sets: 3, reps: 12, weight: 0 },
          { name: 'Plank', sets: 3, reps: 60, weight: 0 }
        ]
      },
      {
        name: 'Full Body C',
        exercises: [
          { name: 'Front Squat', sets: 3, reps: 10, weight: 0 },
          { name: 'Overhead Press', sets: 3, reps: 8, weight: 0 },
          { name: 'Bent Over Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Hammer Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Cable Crunch', sets: 3, reps: 15, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Strength 5x5',
    description: 'Classic 5x5 strength building program',
    workouts: [
      {
        name: 'Workout A',
        exercises: [
          { name: 'Squat', sets: 5, reps: 5, weight: 0 },
          { name: 'Bench Press', sets: 5, reps: 5, weight: 0 },
          { name: 'Bent Over Row', sets: 5, reps: 5, weight: 0 },
          { name: 'Plank', sets: 3, reps: 60, weight: 0 }
        ]
      },
      {
        name: 'Workout B',
        exercises: [
          { name: 'Squat', sets: 5, reps: 5, weight: 0 },
          { name: 'Overhead Press', sets: 5, reps: 5, weight: 0 },
          { name: 'Deadlift', sets: 5, reps: 5, weight: 0 },
          { name: 'Pull-ups', sets: 3, reps: 8, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Dumbbell Only',
    description: 'Complete dumbbell-only workout program',
    workouts: [
      {
        name: 'Upper Body',
        exercises: [
          { name: 'Dumbbell Fly', sets: 3, reps: 12, weight: 0 },
          { name: 'Bent Over Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Arnold Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Lateral Raise', sets: 3, reps: 12, weight: 0 },
          { name: 'Bicep Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Lower Body',
        exercises: [
          { name: 'Bulgarian Split Squat', sets: 3, reps: 12, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Lunges', sets: 3, reps: 12, weight: 0 },
          { name: 'Calf Raise', sets: 4, reps: 15, weight: 0 },
          { name: 'Russian Twist', sets: 3, reps: 20, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Fat Loss Circuit',
    description: 'High-intensity fat burning workout',
    workouts: [
      {
        name: 'Circuit Workout',
        exercises: [
          { name: 'Burpees', duration: 30 },
          { name: 'Kettlebell Swings', sets: 3, reps: 15, weight: 0 },
          { name: 'Mountain Climbers', duration: 30 },
          { name: 'Jump Rope', duration: 60 },
          { name: 'Battle Ropes', duration: 30 },
          { name: 'Box Jumps', sets: 3, reps: 12, weight: 0 },
          { name: 'Running', duration: 300 }
        ]
      }
    ]
  },
  {
    name: 'Beginner Full Body',
    description: 'Perfect starting point for beginners',
    workouts: [
      {
        name: 'Day 1',
        exercises: [
          { name: 'Squat', sets: 3, reps: 10, weight: 0 },
          { name: 'Bench Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Lat Pulldown', sets: 3, reps: 10, weight: 0 },
          { name: 'Plank', sets: 3, reps: 30, weight: 0 }
        ]
      },
      {
        name: 'Day 2',
        exercises: [
          { name: 'Leg Press', sets: 3, reps: 12, weight: 0 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Seated Cable Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Bicycle Crunches', sets: 3, reps: 15, weight: 0 }
        ]
      },
      {
        name: 'Day 3',
        exercises: [
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Incline Bench Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Pull-ups', sets: 3, reps: 5, weight: 0 },
          { name: 'Russian Twist', sets: 3, reps: 20, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Powerlifting',
    description: 'Focus on the big three lifts',
    workouts: [
      {
        name: 'Squat Day',
        exercises: [
          { name: 'Squat', sets: 5, reps: 3, weight: 0 },
          { name: 'Front Squat', sets: 3, reps: 8, weight: 0 },
          { name: 'Leg Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Leg Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Cable Crunch', sets: 3, reps: 15, weight: 0 }
        ]
      },
      {
        name: 'Bench Day',
        exercises: [
          { name: 'Bench Press', sets: 5, reps: 3, weight: 0 },
          { name: 'Incline Bench Press', sets: 3, reps: 8, weight: 0 },
          { name: 'Close Grip Bench Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: 0 },
          { name: 'Lateral Raise', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Deadlift Day',
        exercises: [
          { name: 'Deadlift', sets: 5, reps: 3, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 8, weight: 0 },
          { name: 'Bent Over Row', sets: 3, reps: 10, weight: 0 },
          { name: 'Lat Pulldown', sets: 3, reps: 12, weight: 0 },
          { name: 'Bicep Curl', sets: 3, reps: 12, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Bodybuilding Split',
    description: '5-day bodybuilding muscle building split',
    workouts: [
      {
        name: 'Chest Day',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Incline Bench Press', sets: 4, reps: 10, weight: 0 },
          { name: 'Chest Fly Machine', sets: 3, reps: 12, weight: 0 },
          { name: 'Cable Chest Fly', sets: 3, reps: 12, weight: 0 },
          { name: 'Dips', sets: 3, reps: 10, weight: 0 }
        ]
      },
      {
        name: 'Back Day',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: 6, weight: 0 },
          { name: 'Lat Pulldown', sets: 4, reps: 10, weight: 0 },
          { name: 'Bent Over Row', sets: 4, reps: 10, weight: 0 },
          { name: 'Seated Cable Row', sets: 3, reps: 12, weight: 0 },
          { name: 'Face Pulls', sets: 3, reps: 15, weight: 0 }
        ]
      },
      {
        name: 'Shoulder Day',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: 8, weight: 0 },
          { name: 'Arnold Press', sets: 3, reps: 10, weight: 0 },
          { name: 'Lateral Raise', sets: 4, reps: 12, weight: 0 },
          { name: 'Front Raise', sets: 3, reps: 12, weight: 0 },
          { name: 'Rear Delt Fly', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Arm Day',
        exercises: [
          { name: 'Bicep Curl', sets: 4, reps: 10, weight: 0 },
          { name: 'Hammer Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Preacher Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Tricep Pushdown', sets: 4, reps: 10, weight: 0 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: 0 },
          { name: 'Skull Crushers', sets: 3, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Leg Day',
        exercises: [
          { name: 'Squat', sets: 4, reps: 8, weight: 0 },
          { name: 'Leg Press', sets: 4, reps: 12, weight: 0 },
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 0 },
          { name: 'Leg Curl', sets: 3, reps: 12, weight: 0 },
          { name: 'Leg Extension', sets: 3, reps: 12, weight: 0 },
          { name: 'Calf Raise', sets: 4, reps: 15, weight: 0 }
        ]
      }
    ]
  },
  {
    name: 'Athlete Performance',
    description: 'Athletic performance and explosive power',
    workouts: [
      {
        name: 'Power Day',
        exercises: [
          { name: 'Box Jumps', sets: 5, reps: 5, weight: 0 },
          { name: 'Power Clean', sets: 5, reps: 3, weight: 0 },
          { name: 'Jump Squat', sets: 4, reps: 6, weight: 0 },
          { name: 'Battle Ropes', duration: 30 },
          { name: 'Sled Push', sets: 5, reps: 10, weight: 0 }
        ]
      },
      {
        name: 'Strength Day',
        exercises: [
          { name: 'Squat', sets: 5, reps: 5, weight: 0 },
          { name: 'Deadlift', sets: 5, reps: 5, weight: 0 },
          { name: 'Bench Press', sets: 4, reps: 6, weight: 0 },
          { name: 'Pull-ups', sets: 4, reps: 8, weight: 0 }
        ]
      },
      {
        name: 'Conditioning',
        exercises: [
          { name: 'Burpees', duration: 30 },
          { name: 'Kettlebell Swings', sets: 4, reps: 15, weight: 0 },
          { name: 'Battle Ropes', duration: 30 },
          { name: 'Rowing Machine', duration: 300 },
          { name: 'Mountain Climbers', duration: 30 }
        ]
      }
    ]
  }
];


// ===== ACTIVE WORKOUT PERSISTENCE =====

// Save active workout to localStorage
function saveActiveWorkout() {
  if (currentWorkoutPlan) {
    const workoutState = {
      plan: currentWorkoutPlan,
      completedExercises: Array.from(completedExercises),
      startTime: currentWorkoutPlan.startTime,
      endTime: currentWorkoutPlan.endTime,
      cardioTimerStates: cardioTimerStates
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
      cardioTimerStates = workoutState.cardioTimerStates || {};
      
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
  cardioTimerStates = {};
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

// ===== SETTINGS =====

/**
 * Get user settings from localStorage with defaults
 * @returns {Object} Settings object with weightIncrement, defaultWeight, defaultReps, fontSize, layoutDensity, dateFormat, timeFormat, defaultTimerMinutes
 */
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

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object to save
 */
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

/**
 * Get exercise machines list from localStorage
 * @returns {Array<string>} Array of machine names
 */
/**
 * Get machines list from localStorage with defaults
 * @returns {Array<Object>} Array of machine objects with name and category
 */
function getMachines() {
  const saved = localStorage.getItem('fitnessMachines');
  if (!saved) return DEFAULT_MACHINES;
  
  const parsed = JSON.parse(saved);
  
  // Helper function to find muscle group from DEFAULT_MACHINES
  const findMuscleGroup = (name, category) => {
    const defaultExercise = DEFAULT_MACHINES.find(
      m => m.name.toLowerCase() === name.toLowerCase()
    );
    if (defaultExercise) {
      return defaultExercise.muscleGroup;
    }
    // If not found in defaults, use category to determine group
    return category === 'cardio' ? 'Cardio' : 'Other';
  };
  
  // Migrate old string format to new object format
  if (parsed.length > 0 && typeof parsed[0] === 'string') {
    const migrated = parsed.map(name => {
      const category = 'weight'; // Default to weight for old exercises
      return {
        name: name,
        category: category,
        muscleGroup: findMuscleGroup(name, category)
      };
    });
    saveMachines(migrated);
    return migrated;
  }
  
  // Migrate objects without muscleGroup OR re-migrate exercises in "Other" that match defaults
  let needsMigration = false;
  if (parsed.length > 0) {
    // Check if any exercise needs migration
    needsMigration = parsed.some(machine => {
      if (!machine.muscleGroup) return true;
      // Re-migrate if it's in "Other" but matches a default exercise with a specific group
      if (machine.muscleGroup === 'Other') {
        const defaultExercise = DEFAULT_MACHINES.find(
          m => m.name.toLowerCase() === machine.name.toLowerCase()
        );
        if (defaultExercise && defaultExercise.muscleGroup !== 'Other') {
          return true;
        }
      }
      return false;
    });
  }
  
  if (needsMigration) {
    const migrated = parsed.map(machine => ({
      ...machine,
      muscleGroup: findMuscleGroup(machine.name, machine.category || 'weight')
    }));
    saveMachines(migrated);
    return migrated;
  }
  
  return parsed;
}

/**
 * Save machines list to localStorage
 * @param {Array<Object>} machines - Array of machine objects with name and category
 */
function saveMachines(machines) {
  localStorage.setItem('fitnessMachines', JSON.stringify(machines));
}

/**
 * Get cardio exercises list from localStorage
 * @returns {Array<string>} Array of cardio exercise names
 */
function getCardio() {
  const saved = localStorage.getItem('fitnessCardio');
  return saved ? JSON.parse(saved) : DEFAULT_CARDIO;
}

/**
 * Save cardio exercises list to localStorage
 * @param {Array<string>} cardio - Array of cardio exercise names to save
 */
function saveCardio(cardio) {
  localStorage.setItem('fitnessCardio', JSON.stringify(cardio));
}

/**
 * Add a new exercise machine to the list
 * @param {string} name - Name of the machine to add
 * @returns {boolean} True if successful, false if invalid or duplicate
 */
function addMachine(name, category = 'weight', muscleGroup = null) {
  const machines = getMachines();
  const trimmed = name.trim();
  
  if (!trimmed) return false;
  if (machines.some(m => m.name === trimmed)) {
    alert('This exercise already exists!');
    return false;
  }
  
  // Auto-assign muscle group if not provided
  if (!muscleGroup) {
    muscleGroup = category === 'cardio' ? 'Cardio' : 'Other';
  }
  
  machines.push({ name: trimmed, category: category, muscleGroup: muscleGroup });
  machines.sort((a, b) => a.name.localeCompare(b.name));
  saveMachines(machines);
  renderMachineList();
  renderMachineList(machineListDivExercises);
  renderMachineSelect();
  return true;
}

/**
 * Add a new cardio exercise to the list
 * @param {string} name - Name of the cardio exercise to add
 * @returns {boolean} True if successful, false if invalid or duplicate
 */
function addCardio(name) {
  const cardio = getCardio();
  const trimmed = name.trim();
  
  if (!trimmed) return false;
  if (cardio.includes(trimmed)) {
    alert('This cardio exercise already exists!');
    return false;
  }
  
  cardio.push(trimmed);
  cardio.sort();
  saveCardio(cardio);
  renderCardioList();
  return true;
}

/**
 * Delete an exercise machine from the list
 * @param {string} name - Name of the machine to delete
 */
function deleteMachine(name) {
  const machines = getMachines();
  const filtered = machines.filter(m => m.name !== name);
  saveMachines(filtered);
  renderMachineList();
  renderMachineList(machineListDivExercises);
  renderMachineSelect();
}

/**
 * Delete a cardio exercise from the list
 * @param {string} name - Name of the cardio exercise to delete
 */
function deleteCardio(name) {
  const cardio = getCardio();
  const filtered = cardio.filter(c => c !== name);
  saveCardio(filtered);
  renderCardioList();
}

/**
 * Rename an exercise machine
 * @param {string} oldName - Current name of the machine
 * @param {string} newName - New name for the machine
 */
function renameMachine(oldName, newName) {
  newName = newName.trim();
  
  if (!newName) {
    alert('Exercise name cannot be empty');
    return false;
  }
  
  const machines = getMachines();
  
  if (newName !== oldName && machines.some(m => m.name === newName)) {
    alert('An exercise with this name already exists');
    return false;
  }
  
  if (newName === oldName) {
    return true; // No change needed
  }
  
  // Update machine name in the list
  const machine = machines.find(m => m.name === oldName);
  if (machine) {
    machine.name = newName;
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
  renderMachineList(machineListDivExercises);
  renderMachineSelect();
  renderHistory();
  renderPlansList();
  
  return true;
}

// Render machine select dropdown
function renderMachineSelect() {
  const machines = getMachines();
  const currentValue = machineSelect.value;
  
  // Filter only weight exercises and sort alphabetically
  const weightMachines = machines.filter(m => m.category === 'weight');
  const sortedMachines = [...weightMachines].sort((a, b) => a.name.localeCompare(b.name));
  
  machineSelect.innerHTML = '<option value="">Select exercise</option>';
  sortedMachines.forEach(machine => {
    const option = document.createElement('option');
    option.value = machine.name;
    option.textContent = machine.name;
    machineSelect.appendChild(option);
  });
  
  // Restore selection if it still exists
  if (currentValue && machines.some(m => m.name === currentValue)) {
    machineSelect.value = currentValue;
  }
}

// Render cardio select dropdown
function renderCardioSelect() {
  const cardioExercises = getMachines().filter(m => m.category === 'cardio');
  const currentValue = cardioExerciseSelect.value;
  
  // Sort alphabetically
  const sortedCardio = [...cardioExercises].sort((a, b) => a.name.localeCompare(b.name));
  
  cardioExerciseSelect.innerHTML = '<option value="">Select cardio exercise</option>';
  sortedCardio.forEach(exercise => {
    const option = document.createElement('option');
    option.value = exercise.name;
    option.textContent = exercise.name;
    cardioExerciseSelect.appendChild(option);
  });
  
  // Restore selection if it still exists
  if (currentValue && cardioExercises.some(c => c.name === currentValue)) {
    cardioExerciseSelect.value = currentValue;
  }
}

// Workout type toggle state
let currentWorkoutType = 'strength';

// Handle workout type toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.workout-type-btn')) {
    const btn = e.target.closest('.workout-type-btn');
    const type = btn.dataset.type;
    
    // Update button states
    document.querySelectorAll('.workout-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update form fields
    currentWorkoutType = type;
    if (type === 'strength') {
      strengthFields.style.display = 'block';
      cardioFields.style.display = 'none';
      submitBtn.textContent = 'Add Set';
      // Make strength fields required
      machineSelect.required = true;
      weightInput.required = true;
      repsInput.required = true;
      // Make cardio fields not required
      cardioExerciseSelect.required = false;
      cardioDurationInput.required = false;
    } else {
      strengthFields.style.display = 'none';
      cardioFields.style.display = 'block';
      submitBtn.textContent = 'Add Cardio';
      // Make cardio fields required
      cardioExerciseSelect.required = true;
      cardioDurationInput.required = true;
      // Make strength fields not required
      machineSelect.required = false;
      weightInput.required = false;
      repsInput.required = false;
    }
  }
});

// Exercise display mode toggle state
let currentExerciseDisplayMode = 'category';

// Handle exercise display toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.display-toggle-btn')) {
    const btn = e.target.closest('.display-toggle-btn');
    const displayMode = btn.dataset.display;
    
    // Update button states
    document.querySelectorAll('.display-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update display mode and re-render
    currentExerciseDisplayMode = displayMode;
    renderMachineList(machineListDivExercises);
  }
});

/**
 * Render machine list for management
 * Displays machines with rename and delete options
 * @param {HTMLElement|null} targetDiv - Optional target div, defaults to machineListDiv
 */
let currentEditingMachine = null;

function renderMachineList(targetDiv = null) {
  const machines = getMachines();
  const container = targetDiv || machineListDiv;
  container.innerHTML = '';
  currentEditingMachine = null; // Reset editing state
  
  if (machines.length === 0) {
    container.innerHTML = '<div class="empty-state">No exercises added yet.</div>';
    return;
  }
  
  // Check if we should render alphabetically (only for exercise settings screen)
  const isExercisesScreen = container === machineListDivExercises;
  const useAlphabetical = isExercisesScreen && currentExerciseDisplayMode === 'alphabetical';
  
  if (useAlphabetical) {
    // Alphabetical display
    const sortedMachines = [...machines].sort((a, b) => a.name.localeCompare(b.name));
    
    // Group by first letter
    const alphabetGroups = {};
    sortedMachines.forEach(machine => {
      const firstLetter = machine.name.charAt(0).toUpperCase();
      if (!alphabetGroups[firstLetter]) {
        alphabetGroups[firstLetter] = [];
      }
      alphabetGroups[firstLetter].push(machine);
    });
    
    // Render alphabetical groups
    Object.keys(alphabetGroups).sort().forEach(letter => {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'exercise-group-header';
      groupHeader.style.cursor = 'pointer';
      groupHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="group-toggle">▼</span>
          <span class="exercise-group-name">${letter}</span>
        </div>
        <span class="exercise-group-count">${alphabetGroups[letter].length} exercise${alphabetGroups[letter].length !== 1 ? 's' : ''}</span>
      `;
      
      const groupContainer = document.createElement('div');
      groupContainer.className = 'exercise-group-content';
      groupContainer.style.display = 'block';
      
      alphabetGroups[letter].forEach(machine => {
        renderMachineItem(machine, groupContainer, targetDiv);
      });
      
      groupHeader.addEventListener('click', () => {
        const toggle = groupHeader.querySelector('.group-toggle');
        if (groupContainer.style.display === 'none') {
          groupContainer.style.display = 'block';
          toggle.textContent = '▼';
        } else {
          groupContainer.style.display = 'none';
          toggle.textContent = '▶';
        }
      });
      
      container.appendChild(groupHeader);
      container.appendChild(groupContainer);
    });
    
    return;
  }
  
  // Category/muscle group display (original behavior)
  const groupedMachines = {};
  machines.forEach(machine => {
    const group = machine.muscleGroup || 'Other';
    if (!groupedMachines[group]) {
      groupedMachines[group] = [];
    }
    groupedMachines[group].push(machine);
  });
  
  // Define display order for muscle groups
  const groupOrder = [
    'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
    'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core',
    'Full Body', 'Cardio', 'Other'
  ];
  
  // Sort exercises within each group
  Object.keys(groupedMachines).forEach(group => {
    groupedMachines[group].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  // Render groups in order
  groupOrder.forEach(groupName => {
    if (!groupedMachines[groupName] || groupedMachines[groupName].length === 0) {
      return; // Skip empty groups
    }
    
    // Create group header (collapsible)
    const groupHeader = document.createElement('div');
    groupHeader.className = 'exercise-group-header';
    groupHeader.style.cursor = 'pointer';
    groupHeader.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="group-toggle">▼</span>
        <span class="exercise-group-name">${groupName}</span>
      </div>
      <span class="exercise-group-count">${groupedMachines[groupName].length} exercise${groupedMachines[groupName].length !== 1 ? 's' : ''}</span>
    `;
    
    // Create container for exercises in this group
    const groupContainer = document.createElement('div');
    groupContainer.className = 'exercise-group-content';
    groupContainer.style.display = 'block'; // Start expanded
    
    // Render exercises in this group
    groupedMachines[groupName].forEach(machine => {
      renderMachineItem(machine, groupContainer, targetDiv);
    });
    
    // Toggle collapse/expand on header click
    groupHeader.addEventListener('click', () => {
      const toggle = groupHeader.querySelector('.group-toggle');
      if (groupContainer.style.display === 'none') {
        groupContainer.style.display = 'block';
        toggle.textContent = '▼';
      } else {
        groupContainer.style.display = 'none';
        toggle.textContent = '▶';
      }
    });
    
    container.appendChild(groupHeader);
    container.appendChild(groupContainer);
  });
  
  // Render any groups not in the predefined order
  Object.keys(groupedMachines).forEach(groupName => {
    if (!groupOrder.includes(groupName) && groupedMachines[groupName].length > 0) {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'exercise-group-header';
      groupHeader.style.cursor = 'pointer';
      groupHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="group-toggle">▼</span>
          <span class="exercise-group-name">${groupName}</span>
        </div>
        <span class="exercise-group-count">${groupedMachines[groupName].length} exercise${groupedMachines[groupName].length !== 1 ? 's' : ''}</span>
      `;
      
      // Create container for exercises in this group
      const groupContainer = document.createElement('div');
      groupContainer.className = 'exercise-group-content';
      groupContainer.style.display = 'block'; // Start expanded
      
      groupedMachines[groupName].forEach(machine => {
        renderMachineItem(machine, groupContainer, targetDiv);
      });
      
      // Toggle collapse/expand on header click
      groupHeader.addEventListener('click', () => {
        const toggle = groupHeader.querySelector('.group-toggle');
        if (groupContainer.style.display === 'none') {
          groupContainer.style.display = 'block';
          toggle.textContent = '▼';
        } else {
          groupContainer.style.display = 'none';
          toggle.textContent = '▶';
        }
      });
      
      container.appendChild(groupHeader);
      container.appendChild(groupContainer);
    }
  });
}

// Render individual machine item
function renderMachineItem(machine, container, targetDiv) {
  const machineItem = document.createElement('div');
  machineItem.className = 'machine-item';
  
  const machineInfo = document.createElement('div');
  machineInfo.style.display = 'flex';
  machineInfo.style.alignItems = 'center';
  machineInfo.style.gap = '8px';
  machineInfo.style.flex = '1';
  
  const machineName = document.createElement('div');
  machineName.className = 'machine-item-name';
  machineName.textContent = machine.name;
  
  const badgesContainer = document.createElement('div');
  badgesContainer.style.display = 'flex';
  badgesContainer.style.gap = '4px';
  
  const categoryBadge = document.createElement('span');
    categoryBadge.className = `category-badge category-${machine.category}`;
    categoryBadge.textContent = machine.category === 'weight' ? '🏋️' : '🏃';
    categoryBadge.title = machine.category === 'weight' ? 'Weight' : 'Cardio';
    categoryBadge.style.fontSize = '0.75rem';
    categoryBadge.style.padding = '2px 6px';
    categoryBadge.style.borderRadius = '12px';
    categoryBadge.style.backgroundColor = machine.category === 'weight' ? 'var(--primary-light)' : 'var(--accent-light)';
    categoryBadge.style.color = machine.category === 'weight' ? 'var(--primary)' : 'var(--accent)';
    categoryBadge.style.fontWeight = '600';
    
    const muscleGroupBadge = document.createElement('span');
    muscleGroupBadge.className = 'muscle-group-badge';
    muscleGroupBadge.textContent = machine.muscleGroup || 'Other';
    muscleGroupBadge.style.fontSize = '0.7rem';
    muscleGroupBadge.style.padding = '2px 6px';
    muscleGroupBadge.style.borderRadius = '12px';
    muscleGroupBadge.style.backgroundColor = 'var(--bg-tertiary)';
    muscleGroupBadge.style.color = 'var(--text-secondary)';
    muscleGroupBadge.style.border = '1px solid var(--border)';
    
    badgesContainer.appendChild(categoryBadge);
    badgesContainer.appendChild(muscleGroupBadge);
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'machine-edit-input';
    editInput.value = machine.name;
    editInput.style.display = 'none';
    
    const categorySelect = document.createElement('select');
    categorySelect.className = 'category-select';
    categorySelect.style.display = 'none';
    categorySelect.style.padding = '4px 8px';
    categorySelect.style.borderRadius = '4px';
    categorySelect.style.border = '1px solid var(--border)';
    categorySelect.innerHTML = `
      <option value="weight" ${machine.category === 'weight' ? 'selected' : ''}>🏋️ Weight</option>
      <option value="cardio" ${machine.category === 'cardio' ? 'selected' : ''}>🏃 Cardio</option>
    `;
    
    const muscleGroupSelect = document.createElement('select');
    muscleGroupSelect.className = 'category-select';
    muscleGroupSelect.style.display = 'none';
    muscleGroupSelect.style.padding = '4px 8px';
    muscleGroupSelect.style.borderRadius = '4px';
    muscleGroupSelect.style.border = '1px solid var(--border)';
    const currentMuscleGroup = machine.muscleGroup || 'Other';
    muscleGroupSelect.innerHTML = `
      <option value="Chest" ${currentMuscleGroup === 'Chest' ? 'selected' : ''}>Chest</option>
      <option value="Back" ${currentMuscleGroup === 'Back' ? 'selected' : ''}>Back</option>
      <option value="Shoulders" ${currentMuscleGroup === 'Shoulders' ? 'selected' : ''}>Shoulders</option>
      <option value="Biceps" ${currentMuscleGroup === 'Biceps' ? 'selected' : ''}>Biceps</option>
      <option value="Triceps" ${currentMuscleGroup === 'Triceps' ? 'selected' : ''}>Triceps</option>
      <option value="Quads" ${currentMuscleGroup === 'Quads' ? 'selected' : ''}>Quads</option>
      <option value="Hamstrings" ${currentMuscleGroup === 'Hamstrings' ? 'selected' : ''}>Hamstrings</option>
      <option value="Glutes" ${currentMuscleGroup === 'Glutes' ? 'selected' : ''}>Glutes</option>
      <option value="Calves" ${currentMuscleGroup === 'Calves' ? 'selected' : ''}>Calves</option>
      <option value="Core" ${currentMuscleGroup === 'Core' ? 'selected' : ''}>Core</option>
      <option value="Full Body" ${currentMuscleGroup === 'Full Body' ? 'selected' : ''}>Full Body</option>
      <option value="Cardio" ${currentMuscleGroup === 'Cardio' ? 'selected' : ''}>Cardio</option>
      <option value="Other" ${currentMuscleGroup === 'Other' ? 'selected' : ''}>Other</option>
    `;
    
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
      badgesContainer.style.display = 'none';
      editInput.style.display = 'block';
      categorySelect.style.display = 'block';
      muscleGroupSelect.style.display = 'block';
      editInput.focus();
      editInput.select();
      editBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      saveBtn.style.display = 'flex';
      cancelBtn.style.display = 'flex';
      
      // Store current editing state
      currentEditingMachine = {
        machineInfo,
        machineName,
        badgesContainer,
        editInput,
        categorySelect,
        muscleGroupSelect,
        editBtn,
        deleteBtn,
        saveBtn,
        cancelBtn,
        originalMachine: machine
      };
    });
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-icon edit';
    saveBtn.innerHTML = '✓';
    saveBtn.title = 'Save';
    saveBtn.style.display = 'none';
    saveBtn.addEventListener('click', () => {
      const newName = editInput.value.trim();
      const newCategory = categorySelect.value;
      const newMuscleGroup = muscleGroupSelect.value;
      
      if (newName && renameMachine(machine.name, newName)) {
        // Update category and muscle group if changed
        const machines = getMachines();
        const updated = machines.find(m => m.name === newName);
        if (updated) {
          updated.category = newCategory;
          updated.muscleGroup = newMuscleGroup;
          saveMachines(machines);
        }
        currentEditingMachine = null;
        renderMachineList(targetDiv);
        renderMachineSelect();
      } else {
        editInput.value = machine.name;
      }
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-icon';
    cancelBtn.innerHTML = '✕';
    cancelBtn.title = 'Cancel';
    cancelBtn.style.display = 'none';
    cancelBtn.addEventListener('click', () => {
      editInput.value = machine.name;
      categorySelect.value = machine.category;
      muscleGroupSelect.value = machine.muscleGroup || 'Other';
      machineName.style.display = 'block';
      badgesContainer.style.display = 'flex';
      editInput.style.display = 'none';
      categorySelect.style.display = 'none';
      muscleGroupSelect.style.display = 'none';
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
      if (confirm(`Delete "${machine.name}"?`)) {
        deleteMachine(machine.name);
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
    
    machineInfo.appendChild(machineName);
    machineInfo.appendChild(badgesContainer);
    machineInfo.appendChild(editInput);
    machineInfo.appendChild(categorySelect);
    machineInfo.appendChild(muscleGroupSelect);
    
    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    actions.appendChild(deleteBtn);
    
    machineItem.appendChild(machineInfo);
    machineItem.appendChild(actions);
    container.appendChild(machineItem);
}

function renderCardioList() {
  const cardio = getCardio();
  const container = document.getElementById('cardioListDiv');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (cardio.length === 0) {
    container.innerHTML = '<div class="empty-state">No cardio exercises added yet.</div>';
    return;
  }
  
  // Sort alphabetically
  const sortedCardio = [...cardio].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  
  sortedCardio.forEach(exercise => {
    const item = document.createElement('div');
    item.className = 'machine-item';
    
    const name = document.createElement('div');
    name.className = 'machine-item-name';
    name.textContent = exercise;
    
    const actions = document.createElement('div');
    actions.className = 'history-entry-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Delete "${exercise}"?`)) {
        deleteCardio(exercise);
      }
    });
    
    actions.appendChild(deleteBtn);
    
    item.appendChild(name);
    item.appendChild(actions);
    container.appendChild(item);
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
  settingsCardioScreen.classList.toggle('screen-hidden', screen !== 'settingsCardio');
  settingsDefaultsScreen.classList.toggle('screen-hidden', screen !== 'settingsDefaults');
  settingsAppearanceScreen.classList.toggle('screen-hidden', screen !== 'settingsAppearance');
  settingsDataScreen.classList.toggle('screen-hidden', screen !== 'settingsData');
  editPlanScreen.classList.toggle('screen-hidden', screen !== 'editPlan');
  activeWorkoutScreen.classList.toggle('screen-hidden', screen !== 'activeWorkout');
  timerScreen.classList.toggle('screen-hidden', screen !== 'timer');
  historyScreen.classList.toggle('screen-hidden', screen !== 'history');
  workoutDetailScreen.classList.toggle('screen-hidden', screen !== 'workoutDetail');
  
  // Render example plans when showing settingsPlans screen
  if (screen === 'settingsPlans') {
    renderExamplePlans();
  }
  
  // Update profile statistics when showing profile screen
  if (screen === 'profile') {
    updateProfileStats();
    renderWeightChart();
  }
  
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
  [navHome, navWorkout, navHistory, navProfile, navSettings].forEach(btn => btn.classList.remove('active'));

  // Screens that conceptually belong to the workout flow
  const workoutScreens = new Set(['tracker', 'activeWorkout', 'editPlan']);
  
  // Screens that belong to history
  const historyScreens = new Set(['history', 'workoutDetail']);
  
  // Screens that belong to settings
  const settingsScreens = new Set(['settings', 'settingsPlans', 'settingsExercises', 'settingsCardio', 'settingsDefaults', 'settingsAppearance', 'settingsData', 'machines']);
  
  // Profile screen - just stats dashboard
  const profileScreens = new Set(['profile']);
  
  // Timer screen - doesn't highlight any nav
  const standaloneScreens = new Set(['timer']);

  // Home screen
  if (screen === 'home') {
    navHome.classList.add('active');
    return;
  }

  if (workoutScreens.has(screen)) {
    navWorkout.classList.add('active');
    return;
  }
  
  if (historyScreens.has(screen)) {
    navHistory.classList.add('active');
    return;
  }
  
  if (profileScreens.has(screen)) {
    navProfile.classList.add('active');
    return;
  }
  
  if (settingsScreens.has(screen)) {
    navSettings.classList.add('active');
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

// Close timer button - return to home
closeTimerBtn.addEventListener('click', () => {
  showScreen('home');
});

// Start empty workout button
startEmptyWorkoutBtn.addEventListener('click', () => {
  showScreen('tracker');
});

// Add machine button
addMachineBtn.addEventListener('click', () => {
  const name = newMachineNameInput.value.trim();
  const category = newMachineCategorySelect.value;
  const muscleGroup = newMachineMuscleGroupSelect.value;
  if (name) {
    if (addMachine(name, category, muscleGroup)) {
      newMachineNameInput.value = '';
    }
  }
});

// Allow Enter key to add machine
newMachineNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = newMachineNameInput.value.trim();
    const category = newMachineCategorySelect.value;
    const muscleGroup = newMachineMuscleGroupSelect.value;
    if (name) {
      if (addMachine(name, category, muscleGroup)) {
        newMachineNameInput.value = '';
      }
    }
  }
});

// Add machine button for exercises screen
addMachineBtnExercises.addEventListener('click', () => {
  const name = newMachineNameInputExercises.value.trim();
  const category = newMachineCategorySelectExercises.value;
  const muscleGroup = newMachineMuscleGroupSelectExercises.value;
  if (name) {
    if (addMachine(name, category, muscleGroup)) {
      newMachineNameInputExercises.value = '';
    }
  }
});

// Allow Enter key to add machine for exercises screen
newMachineNameInputExercises.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = newMachineNameInputExercises.value.trim();
    const category = newMachineCategorySelectExercises.value;
    const muscleGroup = newMachineMuscleGroupSelectExercises.value;
    if (name) {
      if (addMachine(name, category, muscleGroup)) {
        newMachineNameInputExercises.value = '';
      }
    }
  }
});

// Collapsible sections
const collapsibleSections = document.querySelectorAll('.collapsible-section');
collapsibleSections.forEach(section => {
  const header = section.querySelector('.collapsible-header');
  if (header) {
    header.addEventListener('click', () => {
      section.classList.toggle('collapsed');
    });
  }
});

// Add cardio button
addCardioBtn.addEventListener('click', () => {
  const name = newCardioNameInput.value.trim();
  if (name) {
    if (addCardio(name)) {
      newCardioNameInput.value = '';
    }
  }
});

// Allow Enter key to add cardio
newCardioNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = newCardioNameInput.value.trim();
    if (name) {
      if (addCardio(name)) {
        newCardioNameInput.value = '';
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
      
      // Handle cardio vs strength exercises
      if (ex.type === 'cardio') {
        exDiv.textContent = `🏃 ${ex.exercise} - ${ex.duration} min`;
      } else if (ex.sets && ex.sets.length > 0) {
        const setsSummary = ex.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');
        exDiv.textContent = `🏋️ ${ex.machine} - ${ex.sets.length} set${ex.sets.length > 1 ? 's' : ''}: ${setsSummary}`;
      } else {
        // Old format fallback
        exDiv.textContent = `🏋️ ${ex.machine} - ${ex.weight}kg × ${ex.reps} reps`;
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
    
    // Exercise names (comma separated)
    const exerciseNames = document.createElement('div');
    exerciseNames.className = 'home-plan-exercises';
    const names = plan.exercises.map(ex => {
      if (ex.type === 'cardio') {
        return ex.exercise;
      }
      return ex.machine;
    }).filter(Boolean);
    exerciseNames.textContent = names.join(', ');
    
    // Start button
    const startBtn = document.createElement('button');
    startBtn.className = 'home-plan-start';
    startBtn.innerHTML = '<span>▶️</span><span>Start Workout</span>';
    startBtn.addEventListener('click', () => {
      startWorkoutPlan(plan.id);
    });
    
    card.appendChild(header);
    card.appendChild(exerciseNames);
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

// Render example workout plans
function renderExamplePlans() {
  const examplePlansContainer = document.getElementById('examplePlansList');
  if (!examplePlansContainer) return;
  
  examplePlansContainer.innerHTML = '';
  
  DEFAULT_WORKOUT_PLANS.forEach(template => {
    const planCard = document.createElement('div');
    planCard.className = 'example-plan-card';
    
    const header = document.createElement('div');
    header.className = 'example-plan-header';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'example-plan-name';
    nameDiv.textContent = template.name;
    
    const importBtn = document.createElement('button');
    importBtn.className = 'btn-icon-small';
    importBtn.innerHTML = '📥';
    importBtn.title = 'Import Plan';
    importBtn.addEventListener('click', () => importExamplePlan(template));
    
    header.appendChild(nameDiv);
    header.appendChild(importBtn);
    
    const description = document.createElement('div');
    description.className = 'example-plan-description';
    description.textContent = template.description;
    
    const workoutsInfo = document.createElement('div');
    workoutsInfo.className = 'example-plan-info';
    
    const workoutCount = template.workouts.length;
    const totalExercises = template.workouts.reduce((sum, w) => sum + w.exercises.length, 0);
    
    workoutsInfo.innerHTML = `
      <span>📋 ${workoutCount} workout${workoutCount !== 1 ? 's' : ''}</span>
      <span>•</span>
      <span>🏋️ ${totalExercises} exercises</span>
    `;
    
    // Show first few exercises as preview
    const previewDiv = document.createElement('div');
    previewDiv.className = 'example-plan-preview';
    const firstWorkout = template.workouts[0];
    const previewExercises = firstWorkout.exercises.slice(0, 3);
    previewDiv.innerHTML = `<strong>${firstWorkout.name}:</strong> ${previewExercises.map(e => e.name).join(', ')}${firstWorkout.exercises.length > 3 ? '...' : ''}`;
    
    planCard.appendChild(header);
    planCard.appendChild(description);
    planCard.appendChild(workoutsInfo);
    planCard.appendChild(previewDiv);
    
    examplePlansContainer.appendChild(planCard);
  });
}

// Import an example workout plan
function importExamplePlan(template) {
  const plans = getPlans();
  
  // Check if a plan with this name already exists
  let planName = template.name;
  let counter = 1;
  while (plans.some(p => p.name === planName)) {
    planName = `${template.name} (${counter})`;
    counter++;
  }
  
  // Convert template format to app format
  const newPlan = {
    id: Date.now(),
    name: planName,
    exercises: [],
    createdAt: new Date().toISOString()
  };
  
  // Convert each workout's exercises
  template.workouts.forEach((workout, workoutIndex) => {
    workout.exercises.forEach((exercise, exerciseIndex) => {
      // Check if exercise has duration (cardio) or sets/reps (strength)
      if (exercise.duration) {
        // Cardio exercise
        newPlan.exercises.push({
          type: 'cardio',
          exercise: exercise.name,
          duration: exercise.duration / 60, // Convert seconds to minutes
          order: workoutIndex * 1000 + exerciseIndex
        });
      } else {
        // Strength exercise - create sets array
        const sets = [];
        for (let i = 0; i < (exercise.sets || 3); i++) {
          sets.push({
            reps: exercise.reps || 10,
            weight: exercise.weight || 0
          });
        }
        
        newPlan.exercises.push({
          type: 'strength',
          machine: exercise.name,
          sets: sets,
          order: workoutIndex * 1000 + exerciseIndex
        });
      }
    });
  });
  
  plans.push(newPlan);
  savePlans(plans);
  renderHomeWorkoutPlans();
  renderPlansList();
  renderActivePlanSelect();
  
  // Highlight the newly imported plan and scroll to it
  setTimeout(() => {
    const plansList = document.getElementById('plansList');
    if (plansList && plansList.lastElementChild) {
      const newPlanElement = plansList.lastElementChild;
      // Add highlight animation
      newPlanElement.style.backgroundColor = 'var(--primary-light)';
      newPlanElement.style.transition = 'background-color 1s ease';
      newPlanElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Remove highlight after animation
      setTimeout(() => {
        newPlanElement.style.backgroundColor = '';
      }, 1500);
    }
  }, 100);
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
  
  // Process all exercises (both cardio and strength)
  const processedExercises = [];
  let globalIndex = 0;
  
  currentWorkoutPlan.exercises.forEach((exercise, exIndex) => {
    if (exercise.type === 'cardio') {
      // Cardio exercise - treat as single unit
      processedExercises.push({
        type: 'cardio',
        exerciseIndex: exIndex,
        exercise: exercise.exercise,
        duration: exercise.duration,
        globalIndex: globalIndex++
      });
    } else {
      // Strength exercise - expand into sets
      const sets = exercise.sets || [{ weight: exercise.weight, reps: exercise.reps }];
      const setsData = [];
      sets.forEach((set, setIndex) => {
        setsData.push({
          setIndex: setIndex,
          weight: set.weight,
          reps: set.reps,
          globalIndex: globalIndex++
        });
      });
      processedExercises.push({
        type: 'strength',
        exerciseIndex: exIndex,
        machine: exercise.machine,
        sets: setsData
      });
    }
  });
  
  const completed = completedExercises.size;
  const total = globalIndex;
  
  // Update progress
  progressCurrent.textContent = completed;
  progressTotal.textContent = total;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;
  progressBarFill.style.width = `${progressPercent}%`;
  
  // Find the first incomplete exercise
  let firstIncompleteIndex = -1;
  for (let i = 0; i < processedExercises.length; i++) {
    const ex = processedExercises[i];
    if (ex.type === 'cardio') {
      if (!completedExercises.has(ex.globalIndex)) {
        firstIncompleteIndex = i;
        break;
      }
    } else {
      const allSetsCompleted = ex.sets.every(s => completedExercises.has(s.globalIndex));
      if (!allSetsCompleted) {
        firstIncompleteIndex = i;
        break;
      }
    }
  }
  
  // Render exercises
  workoutExercisesDiv.innerHTML = '';
  
  processedExercises.forEach((ex, index) => {
    if (ex.type === 'cardio') {
      renderCardioExercise(ex, index === firstIncompleteIndex);
    } else {
      renderStrengthExercise(ex, index === firstIncompleteIndex);
    }
  });
  
  // Show finish button if all complete
  if (completed === total && total > 0) {
    finishWorkoutBtn.style.display = 'block';
  } else {
    finishWorkoutBtn.style.display = 'none';
  }
}

// Render a cardio exercise card with timer
function renderCardioExercise(exercise, isCurrent) {
  const isCompleted = completedExercises.has(exercise.globalIndex);
  
  const exerciseCard = document.createElement('div');
  exerciseCard.className = `workout-exercise-card ${isCompleted ? 'completed' : ''} ${isCurrent && !isCompleted ? 'current' : ''}`;
  exerciseCard.dataset.cardioIndex = exercise.globalIndex;
  
  // If completed, show collapsed view (expandable)
  if (isCompleted) {
    exerciseCard.className = 'workout-exercise-card completed collapsed';
    
    const collapsedHeader = document.createElement('div');
    collapsedHeader.className = 'workout-exercise-collapsed';
    collapsedHeader.innerHTML = `
      <span class="collapsed-check">✓</span>
      <span class="collapsed-text">Exercise ${exercise.exerciseIndex + 1} completed: ${exercise.exercise}</span>
      <span class="collapsed-toggle">▼</span>
    `;
    
    // Create expanded content (initially hidden)
    const expandedContent = document.createElement('div');
    expandedContent.className = 'workout-exercise-expanded';
    expandedContent.style.display = 'none';
    expandedContent.innerHTML = `
      <div class="workout-exercise-machine" style="margin-top: var(--spacing-md); margin-bottom: var(--spacing-sm);">${exercise.exercise}</div>
      <div style="color: var(--text-secondary); font-size: 0.9rem;">Duration: ${exercise.duration} minutes</div>
    `;
    
    // Toggle expand/collapse on click
    collapsedHeader.style.cursor = 'pointer';
    collapsedHeader.addEventListener('click', () => {
      const isExpanded = expandedContent.style.display === 'block';
      expandedContent.style.display = isExpanded ? 'none' : 'block';
      const toggle = collapsedHeader.querySelector('.collapsed-toggle');
      toggle.textContent = isExpanded ? '▼' : '▲';
      exerciseCard.classList.toggle('expanded', !isExpanded);
    });
    
    exerciseCard.appendChild(collapsedHeader);
    exerciseCard.appendChild(expandedContent);
    workoutExercisesDiv.appendChild(exerciseCard);
    return;
  }
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'workout-exercise-header';
  
  const exerciseNumber = document.createElement('div');
  exerciseNumber.className = 'workout-exercise-number';
  exerciseNumber.textContent = `🏃 Exercise ${exercise.exerciseIndex + 1}`;
  
  const status = document.createElement('div');
  status.className = 'workout-exercise-status';
  if (isCurrent) {
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
  
  const exerciseName = document.createElement('div');
  exerciseName.className = 'workout-exercise-machine';
  exerciseName.textContent = exercise.exercise;
  
  cardBody.appendChild(exerciseName);
  
  // Cardio timer UI
  const cardioTimer = document.createElement('div');
  cardioTimer.className = 'cardio-timer';
  
  const timerDisplay = document.createElement('div');
  timerDisplay.className = 'cardio-timer-display';
  timerDisplay.dataset.duration = exercise.duration * 60; // Store in seconds
  
  const timerBar = document.createElement('div');
  timerBar.className = 'cardio-timer-bar';
  
  const timerBarFill = document.createElement('div');
  timerBarFill.className = 'cardio-timer-bar-fill';
  
  // Check if there's saved timer state for this exercise
  const savedState = cardioTimerStates[exercise.globalIndex];
  if (savedState && !isCompleted) {
    // Restore from saved state
    timerDisplay.dataset.elapsed = savedState.elapsed.toString();
    const duration = exercise.duration * 60;
    const remaining = duration - savedState.elapsed;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const percent = (savedState.elapsed / duration) * 100;
    timerBarFill.style.width = `${percent}%`;
    
    // If it was running, resume the timer
    if (savedState.isRunning && isCurrent) {
      setTimeout(() => {
        startCardioTimerFromElapsed(exercise.globalIndex, exercise.duration * 60, savedState.elapsed, exercise.exercise, exercise.duration);
      }, 100); // Small delay to ensure DOM is ready
    }
  } else {
    // Fresh start
    timerDisplay.dataset.elapsed = '0';
    timerDisplay.textContent = `${exercise.duration}:00`;
    timerBarFill.style.width = '0%';
  }
  
  timerBar.appendChild(timerBarFill);
  
  cardioTimer.appendChild(timerDisplay);
  cardioTimer.appendChild(timerBar);
  
  cardBody.appendChild(cardioTimer);
  
  exerciseCard.appendChild(cardHeader);
  exerciseCard.appendChild(cardBody);
  
  // Add control buttons if current and not completed
  if (isCurrent && !isCompleted) {
    const controls = document.createElement('div');
    controls.className = 'cardio-controls';
    
    const startBtn = document.createElement('button');
    startBtn.className = 'btn-cardio-control btn-cardio-start';
    
    // Check if timer is already running from saved state
    const isRunning = savedState && savedState.isRunning;
    startBtn.textContent = isRunning ? '⏸️ Pause' : '▶️ Start';
    if (isRunning) {
      startBtn.classList.remove('btn-cardio-start');
      startBtn.classList.add('btn-cardio-pause');
    }
    
    startBtn.addEventListener('click', () => {
      if (savedState && savedState.isRunning) {
        // Pause logic is handled in the timer function itself
        // This button just needs to trigger startCardioTimer which detects running state
        startCardioTimer(exercise.globalIndex, exercise.duration * 60, exercise.exercise, exercise.duration);
      } else {
        const elapsed = parseInt(timerDisplay.dataset.elapsed || '0');
        if (elapsed > 0) {
          startCardioTimerFromElapsed(exercise.globalIndex, exercise.duration * 60, elapsed, exercise.exercise, exercise.duration);
        } else {
          startCardioTimer(exercise.globalIndex, exercise.duration * 60, exercise.exercise, exercise.duration);
        }
      }
    });
    
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-cardio-control btn-cardio-skip';
    skipBtn.textContent = 'Skip';
    skipBtn.addEventListener('click', () => {
      completedExercises.add(exercise.globalIndex);
      saveActiveWorkout();
      renderActiveWorkout();
      
      // Check if all complete
      const total = currentWorkoutPlan.exercises.reduce((sum, ex) => {
        return sum + (ex.type === 'cardio' ? 1 : (ex.sets?.length || 1));
      }, 0);
      if (completedExercises.size === total) {
        finishWorkoutBtn.style.display = 'block';
      }
    });
    
    controls.appendChild(startBtn);
    controls.appendChild(skipBtn);
    exerciseCard.appendChild(controls);
  }
  
  workoutExercisesDiv.appendChild(exerciseCard);
}

// Render a strength exercise card
function renderStrengthExercise(bundle, isCurrent) {
  const allSetsCompleted = bundle.sets.every(s => completedExercises.has(s.globalIndex));
  const anySetsCompleted = bundle.sets.some(s => completedExercises.has(s.globalIndex));
  const currentSetIndex = bundle.sets.findIndex(s => !completedExercises.has(s.globalIndex));
  
  const exerciseCard = document.createElement('div');
  exerciseCard.className = `workout-exercise-card ${allSetsCompleted ? 'completed' : ''} ${isCurrent && !allSetsCompleted ? 'current' : ''}`;
  
  // If all sets completed, show collapsed view (expandable)
  if (allSetsCompleted) {
    exerciseCard.className = 'workout-exercise-card completed collapsed';
    
    const collapsedHeader = document.createElement('div');
    collapsedHeader.className = 'workout-exercise-collapsed';
    collapsedHeader.innerHTML = `
      <span class="collapsed-check">✓</span>
      <span class="collapsed-text">Exercise ${bundle.exerciseIndex + 1} completed: ${bundle.machine}</span>
      <span class="collapsed-toggle">▼</span>
    `;
    
    // Create expanded content showing all completed sets
    const expandedContent = document.createElement('div');
    expandedContent.className = 'workout-exercise-expanded';
    expandedContent.style.display = 'none';
    
    const machineName = document.createElement('div');
    machineName.className = 'workout-exercise-machine';
    machineName.style.marginTop = 'var(--spacing-md)';
    machineName.style.marginBottom = 'var(--spacing-md)';
    machineName.textContent = bundle.machine;
    expandedContent.appendChild(machineName);
    
    // Show all completed sets
    const setsContainer = document.createElement('div');
    setsContainer.className = 'workout-sets-container';
    bundle.sets.forEach((s, i) => {
      const setDiv = document.createElement('div');
      setDiv.className = 'workout-set-item completed';
      setDiv.style.marginBottom = 'var(--spacing-sm)';
      setDiv.innerHTML = `
        <span style="color: var(--success);">✓</span>
        <span style="color: var(--text-secondary);">Set ${i + 1}: ${s.weight}kg × ${s.reps} reps</span>
      `;
      setsContainer.appendChild(setDiv);
    });
    expandedContent.appendChild(setsContainer);
    
    // Toggle expand/collapse on click
    collapsedHeader.style.cursor = 'pointer';
    collapsedHeader.addEventListener('click', () => {
      const isExpanded = expandedContent.style.display === 'block';
      expandedContent.style.display = isExpanded ? 'none' : 'block';
      const toggle = collapsedHeader.querySelector('.collapsed-toggle');
      toggle.textContent = isExpanded ? '▼' : '▲';
      exerciseCard.classList.toggle('expanded', !isExpanded);
    });
    
    exerciseCard.appendChild(collapsedHeader);
    exerciseCard.appendChild(expandedContent);
    workoutExercisesDiv.appendChild(exerciseCard);
    return;
  }
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'workout-exercise-header';
  
  const exerciseNumber = document.createElement('div');
  exerciseNumber.className = 'workout-exercise-number';
  exerciseNumber.textContent = `🏋️ Exercise ${bundle.exerciseIndex + 1}`;
  
  const status = document.createElement('div');
  status.className = 'workout-exercise-status';
  const completedCount = bundle.sets.filter(s => completedExercises.has(s.globalIndex)).length;
  if (anySetsCompleted) {
    status.innerHTML = `${completedCount}/${bundle.sets.length} Complete`;
    status.style.color = 'var(--accent)';
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
  machineName.textContent = bundle.machine;
  
  cardBody.appendChild(machineName);
  
  // Render individual sets
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
    
    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.value = s.weight;
    weightInput.step = '2.5';
    weightInput.min = '0';
    weightInput.className = 'workout-set-input';
    weightInput.disabled = isCompleted;
    weightInput.addEventListener('change', (e) => {
      const newWeight = parseFloat(e.target.value) || 0;
      currentWorkoutPlan.exercises[bundle.exerciseIndex].sets[i].weight = newWeight;
      saveActiveWorkout();
    });
    
    const weightLabel = document.createElement('span');
    weightLabel.textContent = 'kg × ';
    
    const repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.value = s.reps;
    repsInput.step = '1';
    repsInput.min = '1';
    repsInput.className = 'workout-set-input';
    repsInput.disabled = isCompleted;
    repsInput.addEventListener('change', (e) => {
      const newReps = parseInt(e.target.value) || 0;
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
      saveActiveWorkout();
      
      const actualSet = currentWorkoutPlan.exercises[bundle.exerciseIndex].sets[currentSetIndex];
      
      addEntry({
        machine: bundle.machine,
        weight: actualSet.weight,
        reps: actualSet.reps
      });
      
      renderActiveWorkout();
      
      // Check if all complete
      const total = currentWorkoutPlan.exercises.reduce((sum, ex) => {
        return sum + (ex.type === 'cardio' ? 1 : (ex.sets?.length || 1));
      }, 0);
      if (completedExercises.size === total) {
        finishWorkoutBtn.style.display = 'block';
      }
    });
    exerciseCard.appendChild(completeBtn);
  }
  
  workoutExercisesDiv.appendChild(exerciseCard);
}

// Start cardio timer
let cardioTimerInterval = null;

function startCardioTimer(globalIndex, durationSeconds, exerciseName = null, exerciseDuration = null) {
  const card = document.querySelector(`[data-cardio-index="${globalIndex}"]`);
  if (!card) return;
  
  // If exercise info not provided, try to find it
  if (!exerciseName || !exerciseDuration) {
    // Rebuild processedExercises to find the exercise
    let tempGlobalIndex = 0;
    for (const exercise of currentWorkoutPlan.exercises) {
      if (exercise.type === 'cardio') {
        if (tempGlobalIndex === globalIndex) {
          exerciseName = exercise.exercise;
          exerciseDuration = exercise.duration;
          break;
        }
        tempGlobalIndex++;
      } else {
        const sets = exercise.sets || [{ weight: exercise.weight, reps: exercise.reps }];
        tempGlobalIndex += sets.length;
      }
    }
  }
  
  const timerDisplay = card.querySelector('.cardio-timer-display');
  const timerBarFill = card.querySelector('.cardio-timer-bar-fill');
  const controls = card.querySelector('.cardio-controls');
  
  let elapsed = 0;
  
  // Initialize state
  cardioTimerStates[globalIndex] = {
    elapsed: 0,
    isRunning: true,
    startTimestamp: Date.now(),
    exerciseName: exerciseName,
    exerciseDuration: exerciseDuration
  };
  saveActiveWorkout();
  
  // Update UI to show pause button
  controls.innerHTML = '';
  const pauseBtn = document.createElement('button');
  pauseBtn.className = 'btn-cardio-control btn-cardio-pause';
  pauseBtn.textContent = '⏸️ Pause';
  
  const stopBtn = document.createElement('button');
  stopBtn.className = 'btn-cardio-control btn-cardio-stop';
  stopBtn.textContent = '⏹️ Stop';
  
  controls.appendChild(pauseBtn);
  controls.appendChild(stopBtn);
  
  // Start timer
  cardioTimerInterval = setInterval(() => {
    elapsed++;
    
    // Update state
    cardioTimerStates[globalIndex].elapsed = elapsed;
    if (elapsed % 5 === 0) { // Save every 5 seconds to reduce overhead
      saveActiveWorkout();
    }
    
    const remaining = durationSeconds - elapsed;
    
    if (remaining <= 0) {
      // Timer complete
      clearInterval(cardioTimerInterval);
      cardioTimerInterval = null;
      timerDisplay.textContent = '0:00';
      timerBarFill.style.width = '100%';
      
      // Mark as complete and add to history
      completedExercises.add(globalIndex);
      
      // Get exercise info from state and add to history
      const exerciseInfo = cardioTimerStates[globalIndex];
      if (exerciseInfo && exerciseInfo.exerciseName) {
        addEntry({
          type: 'cardio',
          exercise: exerciseInfo.exerciseName,
          duration: exerciseInfo.exerciseDuration
        });
      }
      
      delete cardioTimerStates[globalIndex];
      saveActiveWorkout();
      renderActiveWorkout();
      
      // Check if all complete
      const total = currentWorkoutPlan.exercises.reduce((sum, ex) => {
        return sum + (ex.type === 'cardio' ? 1 : (ex.sets?.length || 1));
      }, 0);
      if (completedExercises.size === total) {
        finishWorkoutBtn.style.display = 'block';
      }
      
      return;
    }
    
    // Update display
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update progress bar
    const progress = (elapsed / durationSeconds) * 100;
    timerBarFill.style.width = `${progress}%`;
  }, 1000);
  
  // Pause button handler
  pauseBtn.addEventListener('click', () => {
    clearInterval(cardioTimerInterval);
    cardioTimerInterval = null;
    
    // Update state
    cardioTimerStates[globalIndex].isRunning = false;
    saveActiveWorkout();
    
    // Show resume button
    controls.innerHTML = '';
    const resumeBtn = document.createElement('button');
    resumeBtn.className = 'btn-cardio-control btn-cardio-start';
    resumeBtn.textContent = '▶️ Resume';
    resumeBtn.addEventListener('click', () => {
      // Continue from where we left off
      const remaining = durationSeconds - elapsed;
      startCardioTimerFromElapsed(globalIndex, durationSeconds, elapsed);
    });
    
    const stopBtn2 = document.createElement('button');
    stopBtn2.className = 'btn-cardio-control btn-cardio-stop';
    stopBtn2.textContent = '⏹️ Stop';
    stopBtn2.addEventListener('click', () => stopCardioTimer(globalIndex, durationSeconds));
    
    controls.appendChild(resumeBtn);
    controls.appendChild(stopBtn2);
  });
  
  // Stop button handler
  stopBtn.addEventListener('click', () => stopCardioTimer(globalIndex, durationSeconds));
}

function startCardioTimerFromElapsed(globalIndex, durationSeconds, startElapsed, exerciseName = null, exerciseDuration = null) {
  const card = document.querySelector(`[data-cardio-index="${globalIndex}"]`);
  if (!card) return;
  
  // If exercise info not provided, try to find it or get from existing state
  if (!exerciseName || !exerciseDuration) {
    const existingState = cardioTimerStates[globalIndex];
    if (existingState) {
      exerciseName = existingState.exerciseName;
      exerciseDuration = existingState.exerciseDuration;
    } else {
      // Rebuild processedExercises to find the exercise
      let tempGlobalIndex = 0;
      for (const exercise of currentWorkoutPlan.exercises) {
        if (exercise.type === 'cardio') {
          if (tempGlobalIndex === globalIndex) {
            exerciseName = exercise.exercise;
            exerciseDuration = exercise.duration;
            break;
          }
          tempGlobalIndex++;
        } else {
          const sets = exercise.sets || [{ weight: exercise.weight, reps: exercise.reps }];
          tempGlobalIndex += sets.length;
        }
      }
    }
  }
  
  const timerDisplay = card.querySelector('.cardio-timer-display');
  const timerBarFill = card.querySelector('.cardio-timer-bar-fill');
  const controls = card.querySelector('.cardio-controls');
  
  let elapsed = startElapsed;
  
  // Update state
  cardioTimerStates[globalIndex] = {
    elapsed: elapsed,
    isRunning: true,
    startTimestamp: Date.now(),
    exerciseName: exerciseName,
    exerciseDuration: exerciseDuration
  };
  saveActiveWorkout();
  
  // Update UI
  controls.innerHTML = '';
  const pauseBtn = document.createElement('button');
  pauseBtn.className = 'btn-cardio-control btn-cardio-pause';
  pauseBtn.textContent = '⏸️ Pause';
  
  const stopBtn = document.createElement('button');
  stopBtn.className = 'btn-cardio-control btn-cardio-stop';
  stopBtn.textContent = '⏹️ Stop';
  
  controls.appendChild(pauseBtn);
  controls.appendChild(stopBtn);
  
  cardioTimerInterval = setInterval(() => {
    elapsed++;
    
    // Update state
    cardioTimerStates[globalIndex].elapsed = elapsed;
    if (elapsed % 5 === 0) {
      saveActiveWorkout();
    }
    
    const remaining = durationSeconds - elapsed;
    
    if (remaining <= 0) {
      clearInterval(cardioTimerInterval);
      cardioTimerInterval = null;
      timerDisplay.textContent = '0:00';
      timerBarFill.style.width = '100%';
      
      completedExercises.add(globalIndex);
      
      // Get exercise info from state and add to history
      const exerciseInfo = cardioTimerStates[globalIndex];
      if (exerciseInfo && exerciseInfo.exerciseName) {
        addEntry({
          type: 'cardio',
          exercise: exerciseInfo.exerciseName,
          duration: exerciseInfo.exerciseDuration
        });
      }
      
      delete cardioTimerStates[globalIndex];
      saveActiveWorkout();
      renderActiveWorkout();
      
      const total = currentWorkoutPlan.exercises.reduce((sum, ex) => {
        return sum + (ex.type === 'cardio' ? 1 : (ex.sets?.length || 1));
      }, 0);
      if (completedExercises.size === total) {
        finishWorkoutBtn.style.display = 'block';
      }
      
      return;
    }
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const progress = (elapsed / durationSeconds) * 100;
    timerBarFill.style.width = `${progress}%`;
  }, 1000);
  
  pauseBtn.addEventListener('click', () => {
    clearInterval(cardioTimerInterval);
    cardioTimerInterval = null;
    
    // Update state
    cardioTimerStates[globalIndex].isRunning = false;
    saveActiveWorkout();
    
    controls.innerHTML = '';
    const resumeBtn = document.createElement('button');
    resumeBtn.className = 'btn-cardio-control btn-cardio-start';
    resumeBtn.textContent = '▶️ Resume';
    resumeBtn.addEventListener('click', () => {
      startCardioTimerFromElapsed(globalIndex, durationSeconds, elapsed);
    });
    
    const stopBtn2 = document.createElement('button');
    stopBtn2.className = 'btn-cardio-control btn-cardio-stop';
    stopBtn2.textContent = '⏹️ Stop';
    stopBtn2.addEventListener('click', () => stopCardioTimer(globalIndex, durationSeconds));
    
    controls.appendChild(resumeBtn);
    controls.appendChild(stopBtn2);
  });
  
  stopBtn.addEventListener('click', () => stopCardioTimer(globalIndex, durationSeconds));
}

function stopCardioTimer(globalIndex, durationSeconds) {
  if (cardioTimerInterval) {
    clearInterval(cardioTimerInterval);
    cardioTimerInterval = null;
  }
  
  // Clear state
  delete cardioTimerStates[globalIndex];
  saveActiveWorkout();
  
  renderActiveWorkout();
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
  const cardioExercises = getCardio();
  
  currentPlanExercises.forEach((exercise, exerciseIndex) => {
    // Migrate old exercises to have type
    if (!exercise.type) {
      exercise.type = 'strength';
    }
    
    const exerciseItem = document.createElement('div');
    const isExpanded = expandedExerciseIndex === exerciseIndex;
    
    // Ensure strength exercise has sets array (migration for old plans)
    if (exercise.type === 'strength' && !exercise.sets) {
      exercise.sets = exercise.weight && exercise.reps ? 
        [{ weight: exercise.weight, reps: exercise.reps }] : 
        [{ weight: 0, reps: 0 }];
      delete exercise.weight;
      delete exercise.reps;
    }
    
    const isComplete = exercise.type === 'cardio' 
      ? (exercise.exercise && exercise.duration > 0)
      : (exercise.machine && exercise.sets && exercise.sets.length > 0 && exercise.sets.every(s => s.weight && s.reps));
    
    exerciseItem.className = 'exercise-item';
    
    // Make draggable for mouse users (desktop)
    exerciseItem.draggable = true;
    exerciseItem.dataset.exerciseIndex = exerciseIndex;
    
    // Add drag event listeners
    exerciseItem.addEventListener('dragstart', handleDragStart);
    exerciseItem.addEventListener('dragover', handleDragOver);
    exerciseItem.addEventListener('drop', handleDrop);
    exerciseItem.addEventListener('dragenter', handleDragEnter);
    exerciseItem.addEventListener('dragleave', handleDragLeave);
    exerciseItem.addEventListener('dragend', handleDragEnd);
    
    // Collapsed view (always show collapsed, expand on header click)
    const header = document.createElement('div');
    header.className = 'exercise-item-header';
    
    // Add expand/collapse indicator
    const expandIcon = document.createElement('div');
    expandIcon.className = 'expand-icon';
    expandIcon.innerHTML = isExpanded ? '▼' : '▶';
    
    // Add drag handle (visible only on desktop)
    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle-icon';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.title = 'Drag to reorder';
    
    const info = document.createElement('div');
    info.className = 'exercise-collapsed-info';
    
    let summary = '';
    let title = '';
    
    if (exercise.type === 'cardio') {
      const exerciseName = exercise.exercise || 'Select cardio exercise';
      const duration = exercise.duration || 10;
      title = exerciseName;
      summary = `${duration} min`;
    } else {
      const machineName = exercise.machine || 'Select machine';
      title = machineName;
      if (exercise.sets && exercise.sets.length > 0) {
        const setsSummary = exercise.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');
        summary = `${exercise.sets.length} set${exercise.sets.length !== 1 ? 's' : ''}: ${setsSummary}`;
      } else {
        summary = 'No sets';
      }
    }
    
    const icon = exercise.type === 'cardio' ? '🏃' : '🏋️';
    info.innerHTML = `
      <div class="exercise-number">${icon} ${title}</div>
      <div class="exercise-summary">${summary}</div>
    `;
    
    // Three-dot menu
      const menuBtn = document.createElement('button');
      menuBtn.className = 'btn-icon menu-btn';
      menuBtn.innerHTML = '⋮';
      menuBtn.title = 'Options';
      menuBtn.type = 'button';
      
      const menuDropdown = document.createElement('div');
      menuDropdown.className = 'exercise-menu-dropdown';
      
      const moveUpOption = document.createElement('button');
      moveUpOption.className = 'menu-option';
      moveUpOption.innerHTML = '↑ Move Up';
      moveUpOption.type = 'button';
      moveUpOption.disabled = exerciseIndex === 0;
      moveUpOption.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exerciseIndex > 0) {
          const temp = currentPlanExercises[exerciseIndex];
          currentPlanExercises[exerciseIndex] = currentPlanExercises[exerciseIndex - 1];
          currentPlanExercises[exerciseIndex - 1] = temp;
          if (expandedExerciseIndex === exerciseIndex) {
            expandedExerciseIndex--;
          } else if (expandedExerciseIndex === exerciseIndex - 1) {
            expandedExerciseIndex++;
          }
          renderPlanExercises();
        }
      });
      
      const moveDownOption = document.createElement('button');
      moveDownOption.className = 'menu-option';
      moveDownOption.innerHTML = '↓ Move Down';
      moveDownOption.type = 'button';
      moveDownOption.disabled = exerciseIndex === currentPlanExercises.length - 1;
      moveDownOption.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exerciseIndex < currentPlanExercises.length - 1) {
          const temp = currentPlanExercises[exerciseIndex];
          currentPlanExercises[exerciseIndex] = currentPlanExercises[exerciseIndex + 1];
          currentPlanExercises[exerciseIndex + 1] = temp;
          if (expandedExerciseIndex === exerciseIndex) {
            expandedExerciseIndex++;
          } else if (expandedExerciseIndex === exerciseIndex + 1) {
            expandedExerciseIndex--;
          }
          renderPlanExercises();
        }
      });
      
      const deleteOption = document.createElement('button');
      deleteOption.className = 'menu-option delete-option';
      deleteOption.innerHTML = '🗑️ Delete';
      deleteOption.type = 'button';
      deleteOption.addEventListener('click', (e) => {
        e.stopPropagation();
        currentPlanExercises.splice(exerciseIndex, 1);
        if (expandedExerciseIndex === exerciseIndex) {
          expandedExerciseIndex = null;
        } else if (expandedExerciseIndex > exerciseIndex) {
          expandedExerciseIndex--;
        }
        renderPlanExercises();
      });
      
      menuDropdown.appendChild(moveUpOption);
      menuDropdown.appendChild(moveDownOption);
      menuDropdown.appendChild(deleteOption);
      
      const menuContainer = document.createElement('div');
      menuContainer.className = 'exercise-menu-container';
      menuContainer.appendChild(menuBtn);
      menuContainer.appendChild(menuDropdown);
      
      // Toggle menu
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other menus
        document.querySelectorAll('.exercise-menu-dropdown.active').forEach(m => {
          if (m !== menuDropdown) m.classList.remove('active');
        });
        menuDropdown.classList.toggle('active');
      });
      
      // Toggle expand/collapse on header click
      header.addEventListener('click', (e) => {
        if (!e.target.closest('.exercise-menu-container') && !e.target.closest('.drag-handle-icon')) {
          expandedExerciseIndex = isExpanded ? null : exerciseIndex;
          renderPlanExercises();
        }
      });
      
      header.appendChild(dragHandle);
      header.appendChild(expandIcon);
      header.appendChild(info);
      header.appendChild(menuContainer);
      exerciseItem.appendChild(header);
      
      // If expanded, show the fields
      if (isExpanded) {
        const fields = document.createElement('div');
        fields.className = 'exercise-fields';
        
        if (exercise.type === 'cardio') {
          // Cardio exercise fields
          const cardioGroup = document.createElement('div');
          cardioGroup.className = 'form-group-inline';
          const cardioLabel = document.createElement('label');
          cardioLabel.textContent = 'Cardio Exercise';
        const cardioSelect = document.createElement('select');
        cardioSelect.innerHTML = '<option value="">Select cardio</option>';
        
        // Sort cardio alphabetically
        const sortedCardio = [...cardioExercises].sort((a, b) => a.localeCompare(b));
        sortedCardio.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          if (c === exercise.exercise) opt.selected = true;
          cardioSelect.appendChild(opt);
        });
        cardioSelect.addEventListener('change', (e) => {
          currentPlanExercises[exerciseIndex].exercise = e.target.value;
          renderPlanExercises(); // Re-render to update the title
        });
        cardioGroup.appendChild(cardioLabel);
        cardioGroup.appendChild(cardioSelect);
        fields.appendChild(cardioGroup);
        
        // Duration input
        const durationGroup = document.createElement('div');
        durationGroup.className = 'form-group-inline';
        const durationLabel = document.createElement('label');
        durationLabel.textContent = 'Duration (minutes)';
        const durationInput = document.createElement('input');
        durationInput.type = 'text';
        durationInput.pattern = '\\d*\\.?\\d*';
        durationInput.inputMode = 'decimal';
        durationInput.className = 'duration-input';
        durationInput.value = exercise.duration || 10;
        durationInput.min = 0.5;
        durationInput.step = 0.5;
        durationInput.placeholder = 'minutes';
        durationInput.addEventListener('input', (e) => {
          currentPlanExercises[exerciseIndex].duration = parseFloat(e.target.value) || 0;
        });
        durationGroup.appendChild(durationLabel);
        durationGroup.appendChild(durationInput);
        fields.appendChild(durationGroup);
      } else {
        // Strength exercise fields (existing code)
        // Machine select
        const machineGroup = document.createElement('div');
        machineGroup.className = 'form-group-inline';
        const machineLabel = document.createElement('label');
        machineLabel.textContent = 'Machine';
        const machineSelect = document.createElement('select');
        machineSelect.innerHTML = '<option value="">Select machine</option>';
        
        // Sort machines alphabetically by name
        const sortedMachines = [...machines].sort((a, b) => {
          const nameA = typeof a === 'string' ? a : a.name;
          const nameB = typeof b === 'string' ? b : b.name;
          return nameA.localeCompare(nameB);
        });
        sortedMachines.forEach(m => {
          const machineName = typeof m === 'string' ? m : m.name;
          const opt = document.createElement('option');
          opt.value = machineName;
          opt.textContent = machineName;
          if (machineName === exercise.machine) opt.selected = true;
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
        setsLabel.style.marginTop = 'var(--spacing-sm)';
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
      }
      
      exerciseItem.appendChild(fields);
    }
    
    planExercisesDiv.appendChild(exerciseItem);
  });
}

// Add new exercise to plan
addExerciseBtn.addEventListener('click', () => {
  const settings = getSettings();
  
  // Add strength exercise
  currentPlanExercises.push({
    type: 'strength',
    machine: '',
    sets: [
      { weight: settings.defaultWeight, reps: settings.defaultReps }
    ]
  });
  
  // Expand the newly added exercise
  expandedExerciseIndex = currentPlanExercises.length - 1;
  renderPlanExercises();
});

// Add new cardio exercise to plan
addCardioExerciseBtn.addEventListener('click', () => {
  // Add cardio exercise
  currentPlanExercises.push({
    type: 'cardio',
    exercise: '',
    duration: 10 // default 10 minutes
  });
  
  // Expand the newly added exercise
  expandedExerciseIndex = currentPlanExercises.length - 1;
  renderPlanExercises();
});

// Manage exercises button in settings - DEPRECATED (now goes directly to exercise list)
// manageExercisesBtn.addEventListener('click', () => {
//   machinesScreenContext = 'settingsExercises';
//   showScreen('machines');
//   renderMachineList();
// });

// Create new plan
createPlanBtn.addEventListener('click', () => {
  editPlan(null);
});

// Save plan form
editPlanForm.addEventListener('submit', (e) => {
  e.preventDefault();
  savePlanData();
});

// Top save button
const savePlanBtnTop = document.getElementById('savePlanBtnTop');
if (savePlanBtnTop) {
  savePlanBtnTop.addEventListener('click', () => {
    savePlanData();
  });
}

function savePlanData() {
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
    if (ex.type === 'cardio') {
      // Validate cardio exercise
      if (!ex.exercise) {
        alert('Please select a cardio exercise for all cardio entries');
        return;
      }
      if (!ex.duration || ex.duration <= 0) {
        alert('Please set a duration for all cardio exercises');
        return;
      }
    } else {
      // Validate strength exercise
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
}

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
    
    if (entry.type === 'cardio') {
      infoDiv.innerHTML = `
        <div class="today-entry-machine">🏃 ${entry.exercise}</div>
        <div class="today-entry-details">${entry.duration} min</div>
        <div class="today-entry-time">${time}</div>
      `;
    } else {
      infoDiv.innerHTML = `
        <div class="today-entry-machine">🏋️ ${entry.machine}</div>
        <div class="today-entry-details">${entry.reps} reps × ${entry.weight} kg</div>
        <div class="today-entry-time">${time}</div>
      `;
    }
    
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
  
  // Render based on current view
  const activeView = document.querySelector('.view-toggle-btn.active');
  if (activeView && activeView.dataset.view === 'list') {
    renderHistoryList();
  } else {
    renderCalendar();
  }
}

// Render history list view
function renderHistoryList() {
  const history = getHistory();
  const listContainer = document.getElementById('historyWorkoutsList');
  
  if (!listContainer) return;
  
  listContainer.innerHTML = '';
  
  const days = Object.keys(history).sort().reverse();
  
  if (days.length === 0) {
    listContainer.innerHTML = '<div class="empty-state">No workout history yet. Start logging your workouts!</div>';
    return;
  }
  
  days.forEach(date => {
    const entries = history[date];
    if (!entries || entries.length === 0) return;
    
    // Create workout summary card (same as calendar day detail but always shown)
    const card = document.createElement('div');
    card.className = 'workout-summary-card';
    card.style.cursor = 'pointer';
    
    // Calculate stats
    const totalSets = entries.filter(e => e.type !== 'cardio').length;
    const totalCardio = entries.filter(e => e.type === 'cardio').length;
    const uniqueExercises = [...new Set(entries.map(e => e.machine || e.exercise))];
    
    const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
    let timeSpentSeconds = 0;
    if (timestamps.length > 1) {
      const earliest = new Date(Math.min(...timestamps));
      const latest = new Date(Math.max(...timestamps));
      timeSpentSeconds = Math.round((latest - earliest) / 1000);
    }
    
    const hours = Math.floor(timeSpentSeconds / 3600);
    const minutes = Math.floor((timeSpentSeconds % 3600) / 60);
    const formattedTime = hours > 0 
      ? `${hours}h ${minutes}m`
      : `${minutes}m`;
    
    card.innerHTML = `
      <div class="workout-summary-date">
        <span class="workout-summary-date-icon">📅</span>
        <span>${formatDate(date)}</span>
      </div>
      ${timeSpentSeconds > 0 ? `
        <div class="workout-summary-duration">
          <span class="workout-summary-duration-icon">⏱️</span>
          <span>${formattedTime}</span>
        </div>
      ` : ''}
      <div class="workout-summary-exercises">
        <div class="workout-summary-exercises-title">
          <span class="workout-summary-exercises-icon">🏋️</span>
          <span>Exercises (${uniqueExercises.length})</span>
        </div>
        <div class="workout-summary-badges">
          ${uniqueExercises.map(ex => `<span class="exercise-badge">${ex}</span>`).join('')}
        </div>
      </div>
      <div class="workout-summary-stats">
        ${totalSets > 0 ? `<span class="workout-summary-stat">💪 ${totalSets} sets</span>` : ''}
        ${totalCardio > 0 ? `<span class="workout-summary-stat">🏃 ${totalCardio} cardio</span>` : ''}
      </div>
      <div class="view-details-indicator">›</div>
    `;
    
    // Click to view details
    card.addEventListener('click', () => {
      showWorkoutDetail(date, entries);
    });
    
    listContainer.appendChild(card);
  });
}

function renderCalendar() {
  const history = getHistory();
  const historyCalendar = document.getElementById('historyCalendar');
  const calendarMonthYear = document.getElementById('calendarMonthYear');
  
  historyCalendar.innerHTML = '';
  
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  // Set header
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  calendarMonthYear.textContent = `📅 ${monthNames[month]} ${year}`;
  
  // Add day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(day => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header-cell';
    header.textContent = day;
    historyCalendar.appendChild(header);
  });
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day-cell empty';
    historyCalendar.appendChild(emptyCell);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const entries = history[dateStr];
    const hasWorkout = entries && entries.length > 0;
    
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day-cell';
    
    // Check if it's today
    const today = new Date();
    const isToday = today.getFullYear() === year && 
                    today.getMonth() === month && 
                    today.getDate() === day;
    
    if (isToday) {
      dayCell.classList.add('today');
    }
    
    if (hasWorkout) {
      dayCell.classList.add('has-workout');
      
      dayCell.innerHTML = `
        <div class="calendar-day-number">${day}</div>
      `;
      
      // Make clickable
      dayCell.style.cursor = 'pointer';
      dayCell.addEventListener('click', (e) => {
        // Remove 'selected' class from all calendar cells
        document.querySelectorAll('.calendar-day-cell.selected').forEach(cell => {
          cell.classList.remove('selected');
        });
        
        // Add 'selected' class to clicked day
        dayCell.classList.add('selected');
        
        showDayDetails(dateStr, entries);
      });
    } else {
      dayCell.innerHTML = `<div class="calendar-day-number">${day}</div>`;
    }
    
    historyCalendar.appendChild(dayCell);
  }
}

function showDayDetails(dateStr, entries) {
  const selectedDayDetails = document.getElementById('selectedDayDetails');
  selectedDayDetails.innerHTML = '';
  
  if (!entries || entries.length === 0) return;
  
  const detailCard = document.createElement('div');
  detailCard.className = 'day-detail-card';
  
  // Header
  const header = document.createElement('div');
  header.className = 'day-detail-header';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'day-detail-close';
  closeBtn.innerHTML = '×';
  closeBtn.addEventListener('click', () => {
    selectedDayDetails.innerHTML = '';
  });
  
  const dateTitle = document.createElement('h3');
  dateTitle.textContent = formatDate(dateStr);
  
  header.appendChild(dateTitle);
  header.appendChild(closeBtn);
  
  // Calculate stats
  const totalSets = entries.filter(e => e.type !== 'cardio').length;
  const totalCardio = entries.filter(e => e.type === 'cardio').length;
  const uniqueExercises = [...new Set(entries.map(e => e.machine || e.exercise))].length;
  
  const timestamps = entries.map(e => new Date(e.timestamp)).filter(d => !isNaN(d));
  let timeSpentSeconds = 0;
  if (timestamps.length > 1) {
    const earliest = new Date(Math.min(...timestamps));
    const latest = new Date(Math.max(...timestamps));
    timeSpentSeconds = Math.round((latest - earliest) / 1000);
  }
  
  const hours = Math.floor(timeSpentSeconds / 3600);
  const minutes = Math.floor((timeSpentSeconds % 3600) / 60);
  const formattedTime = hours > 0 
    ? `${hours}h ${minutes}m`
    : `${minutes}m`;
  
  const stats = document.createElement('div');
  stats.className = 'day-detail-stats';
  stats.innerHTML = `
    <span class="detail-stat">🏋️ ${uniqueExercises} exercises</span>
    ${totalSets > 0 ? `<span class="detail-stat">📊 ${totalSets} sets</span>` : ''}
    ${totalCardio > 0 ? `<span class="detail-stat">🏃 ${totalCardio} cardio</span>` : ''}
    ${timeSpentSeconds > 0 ? `<span class="detail-stat">⏱️ ${formattedTime}</span>` : ''}
  `;
  
  // Group entries by exercise
  const exerciseGroups = {};
  entries.forEach(entry => {
    const key = entry.machine || entry.exercise;
    if (!exerciseGroups[key]) {
      exerciseGroups[key] = {
        name: key,
        type: entry.type || 'strength',
        entries: []
      };
    }
    exerciseGroups[key].entries.push(entry);
  });
  
  // Exercises container
  const exercisesContainer = document.createElement('div');
  exercisesContainer.className = 'day-detail-exercises';
  
  Object.keys(exerciseGroups).forEach(exerciseKey => {
    const group = exerciseGroups[exerciseKey];
    
    const exerciseCard = document.createElement('div');
    exerciseCard.className = 'detail-exercise-card';
    
    const exerciseHeader = document.createElement('div');
    exerciseHeader.className = 'detail-exercise-header';
    
    if (group.type === 'cardio') {
      exerciseHeader.innerHTML = `
        <span class="detail-exercise-name">🏃 ${group.name}</span>
        <span class="detail-exercise-count">${group.entries.length} session${group.entries.length > 1 ? 's' : ''}</span>
      `;
      
      const setsContainer = document.createElement('div');
      setsContainer.className = 'detail-exercise-sets';
      
      group.entries.forEach((entry, index) => {
        const setItem = document.createElement('div');
        setItem.className = 'detail-set-item';
        setItem.innerHTML = `
          <span class="detail-set-number">Session ${index + 1}</span>
          <span class="detail-set-details">${entry.duration} min</span>
        `;
        setsContainer.appendChild(setItem);
      });
      
      exerciseCard.appendChild(exerciseHeader);
      exerciseCard.appendChild(setsContainer);
    } else {
      exerciseHeader.innerHTML = `
        <span class="detail-exercise-name">🏋️ ${group.name}</span>
        <span class="detail-exercise-count">${group.entries.length} set${group.entries.length > 1 ? 's' : ''}</span>
      `;
      
      const setsContainer = document.createElement('div');
      setsContainer.className = 'detail-exercise-sets';
      
      group.entries.forEach((entry, index) => {
        const setItem = document.createElement('div');
        setItem.className = 'detail-set-item';
        const time = formatTime(entry.timestamp);
        setItem.innerHTML = `
          <span class="detail-set-number">Set ${index + 1}:</span>
          <span class="detail-set-details"><strong>${entry.weight}kg</strong> × <strong>${entry.reps}</strong> reps</span>
          <span class="detail-set-time">${time}</span>
        `;
        setsContainer.appendChild(setItem);
      });
      
      exerciseCard.appendChild(exerciseHeader);
      exerciseCard.appendChild(setsContainer);
    }
    
    exercisesContainer.appendChild(exerciseCard);
  });
  
  detailCard.appendChild(header);
  detailCard.appendChild(stats);
  detailCard.appendChild(exercisesContainer);
  selectedDayDetails.appendChild(detailCard);
  
  // Scroll to details
  selectedDayDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Render total stats summary
function renderTotalStats(totalWorkouts, totalSets, uniqueExercises, totalMinutes) {
  const historyStatsSummary = document.getElementById('historyStatsSummary');
  historyStatsSummary.innerHTML = '';
  
  // Create a compact single-line stats bar
  const statsBar = document.createElement('div');
  statsBar.className = 'compact-stats-bar';
  statsBar.innerHTML = `
    <div class="compact-stat">
      <span class="compact-stat-value">${totalWorkouts}</span>
      <span class="compact-stat-label">Workouts</span>
    </div>
    <div class="compact-stat">
      <span class="compact-stat-value">${totalSets}</span>
      <span class="compact-stat-label">Sets</span>
    </div>
    <div class="compact-stat">
      <span class="compact-stat-value">${uniqueExercises}</span>
      <span class="compact-stat-label">Exercises</span>
    </div>
    <div class="compact-stat">
      <span class="compact-stat-value">${totalMinutes}</span>
      <span class="compact-stat-label">Minutes</span>
    </div>
  `;
  
  historyStatsSummary.appendChild(statsBar);
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
    exerciseHeader.innerHTML = `${machine} <span style="font-size: 0.8rem; color: var(--text-secondary); margin-left: auto;">${sets.length} set${sets.length !== 1 ? 's' : ''}</span>`;
    
    const setsContainer = document.createElement('div');
    setsContainer.className = 'workout-detail-sets';
    
    sets.forEach((set, index) => {
      const setDiv = document.createElement('div');
      setDiv.className = 'workout-detail-set';
      
      const time = formatTime(set.timestamp);
      
      setDiv.innerHTML = `
        <span class="workout-detail-set-number">Set ${index + 1}:</span>
        <span class="workout-detail-set-info"><strong>${set.weight}kg</strong> × <strong>${set.reps}</strong> reps</span>
        <span class="workout-detail-set-time">${time}</span>
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
  
  if (currentWorkoutType === 'strength') {
    if (!machineSelect.value || !weightInput.value || !repsInput.value) {
      return;
    }
    
    addEntry({
      machine: machineSelect.value,
      weight: parseFloat(weightInput.value),
      reps: parseInt(repsInput.value)
    });
  } else {
    if (!cardioExerciseSelect.value || !cardioDurationInput.value) {
      return;
    }
    
    addEntry({
      type: 'cardio',
      exercise: cardioExerciseSelect.value,
      duration: parseFloat(cardioDurationInput.value)
    });
  }
  
  renderHistory();
 
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

navHistory.addEventListener('click', () => {
  renderHistory();
  showScreen('history');
});

navProfile.addEventListener('click', () => {
  showScreen('profile');
});

navSettings.addEventListener('click', () => {
  showScreen('settings');
});

// Calendar navigation
if (calendarPrevMonth) {
  calendarPrevMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });
}

if (calendarNextMonth) {
  calendarNextMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });
}

// Home screen card navigation
document.addEventListener('click', (e) => {
  const navElement = e.target.closest('[data-nav]');
  if (navElement && navElement.dataset.nav) {
    const target = navElement.dataset.nav;
    
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
      renderMachineList(machineListDivExercises);
      showScreen('settingsExercises');
    } else if (target === 'settingsCardio') {
      renderCardioList();
      showScreen('settingsCardio');
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
  
  // Close exercise menu dropdowns
  if (!e.target.closest('.exercise-menu-container')) {
    document.querySelectorAll('.exercise-menu-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// History view toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.view-toggle-btn')) {
    const btn = e.target.closest('.view-toggle-btn');
    const view = btn.dataset.view;
    
    // Update button states
    document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update view visibility
    const calendarView = document.getElementById('historyCalendarView');
    const listView = document.getElementById('historyListView');
    
    if (view === 'calendar') {
      calendarView.style.display = 'block';
      listView.style.display = 'none';
      renderCalendar();
    } else {
      calendarView.style.display = 'none';
      listView.style.display = 'block';
      renderHistoryList();
    }
  }
});

// Stats section collapsible toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.stats-section-header')) {
    const header = e.target.closest('.stats-section-header');
    const section = header.parentElement;
    section.classList.toggle('collapsed');
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
        renderMachineList(machineListDivExercises);
      } else if (page === 'cardio') {
        renderCardioList();
      }
    }
  });
});

// Back to settings buttons
document.querySelectorAll('.back-to-settings').forEach(btn => {
  btn.addEventListener('click', () => {
    // Determine which screen to go back to based on context
    const currentScreen = Array.from(document.querySelectorAll('.screen-hidden')).find(screen => {
      return !screen.classList.contains('screen-hidden');
    });
    
    if (currentScreen) {
      const screenId = currentScreen.id;
      
      // Navigate based on the screen we're leaving
      if (screenId === 'settingsPlansScreen') {
        // Use plansScreenContext if it exists, otherwise go to profile
        showScreen(plansScreenContext || 'profile');
      } else if (screenId === 'settingsExercisesScreen') {
        // Use machinesScreenContext if it exists, otherwise go to profile
        showScreen(machinesScreenContext || 'profile');
      } else {
        // Default behavior: go back to settings or profile
        showScreen('profile');
      }
    } else {
      // Fallback to profile
      showScreen('profile');
    }
  });
});

// Back to profile buttons
document.querySelectorAll('.back-to-profile').forEach(btn => {
  btn.addEventListener('click', () => {
    showScreen('profile');
  });
});

// ===== INITIALIZATION =====

// Initialize app
// ==========================================
// Weight Tracking & Statistics
// ==========================================

// Get weight data from localStorage
function getWeightData() {
  return JSON.parse(localStorage.getItem('fitnessWeightData') || '[]');
}

// Save weight data to localStorage
function saveWeightData(data) {
  localStorage.setItem('fitnessWeightData', JSON.stringify(data));
}

// Add weight entry
function addWeightEntry(weight, date) {
  const weightData = getWeightData();
  const entry = {
    weight: parseFloat(weight),
    date: date,
    timestamp: new Date(date).getTime()
  };
  
  // Remove any existing entry for this date
  const filtered = weightData.filter(w => w.date !== date);
  filtered.push(entry);
  
  // Sort by date
  filtered.sort((a, b) => a.timestamp - b.timestamp);
  
  saveWeightData(filtered);
  updateProfileStats();
  renderWeightChart();
}

// Calculate workout statistics
function calculateWorkoutStats() {
  const history = getHistory();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const weekMs = 7 * dayMs;
  const monthMs = 30 * dayMs;
  const yearMs = 365 * dayMs;
  
  let totalWorkouts = 0;
  let totalTimeMs = 0;
  let workoutDates = new Set();
  let weekWorkouts = 0;
  let weekTimeMs = 0;
  let monthWorkouts = 0;
  let monthTimeMs = 0;
  let yearWorkouts = 0;
  let yearTimeMs = 0;
  
  Object.keys(history).forEach(dateKey => {
    const entries = history[dateKey];
    if (!entries || entries.length === 0) return;
    
    // Count unique workout sessions by checking timestamps
    const sessions = {};
    entries.forEach(entry => {
      const sessionId = entry.workoutId || entry.timestamp || 'default';
      if (!sessions[sessionId]) {
        sessions[sessionId] = {
          duration: 0,
          timestamp: entry.timestamp
        };
      }
      // Add duration if it exists
      if (entry.duration) {
        sessions[sessionId].duration = Math.max(sessions[sessionId].duration, entry.duration);
      }
    });
    
    Object.values(sessions).forEach(session => {
      const sessionTime = session.timestamp ? new Date(session.timestamp).getTime() : 0;
      const age = now - sessionTime;
      
      totalWorkouts++;
      totalTimeMs += session.duration || 0;
      workoutDates.add(dateKey);
      
      if (age <= weekMs) {
        weekWorkouts++;
        weekTimeMs += session.duration || 0;
      }
      if (age <= monthMs) {
        monthWorkouts++;
        monthTimeMs += session.duration || 0;
      }
      if (age <= yearMs) {
        yearWorkouts++;
        yearTimeMs += session.duration || 0;
      }
    });
  });
  
  // Calculate streak
  let streak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);
  
  while (true) {
    const dateKey = checkDate.toISOString().split('T')[0];
    if (workoutDates.has(dateKey)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (streak === 0) {
      // Allow today to not have a workout yet
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterdayKey = checkDate.toISOString().split('T')[0];
      if (workoutDates.has(yesterdayKey)) {
        streak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return {
    total: {
      workouts: totalWorkouts,
      timeMs: totalTimeMs,
      avgTimeMs: totalWorkouts > 0 ? totalTimeMs / totalWorkouts : 0
    },
    week: {
      workouts: weekWorkouts,
      timeMs: weekTimeMs,
      avgTimeMs: weekWorkouts > 0 ? weekTimeMs / weekWorkouts : 0
    },
    month: {
      workouts: monthWorkouts,
      timeMs: monthTimeMs,
      avgTimeMs: monthWorkouts > 0 ? monthTimeMs / monthWorkouts : 0
    },
    year: {
      workouts: yearWorkouts,
      timeMs: yearTimeMs,
      avgTimeMs: yearWorkouts > 0 ? yearTimeMs / yearWorkouts : 0
    },
    streak: streak
  };
}

// Format time duration
function formatDuration(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Update profile statistics
function updateProfileStats() {
  try {
    const stats = calculateWorkoutStats();
    const weightData = getWeightData();
    
    console.log('Profile Stats Debug:', {
      stats,
      weightData,
      totalWorkouts: stats.total.workouts,
      hasWeightData: weightData.length > 0
    });
    
    // Update total stats
    const totalWorkoutsEl = document.getElementById('statTotalWorkouts');
    const totalTimeEl = document.getElementById('statTotalTime');
    const avgTimeEl = document.getElementById('statAvgTime');
    const streakEl = document.getElementById('statStreak');
    
    if (totalWorkoutsEl) totalWorkoutsEl.textContent = stats.total.workouts;
    if (totalTimeEl) totalTimeEl.textContent = formatDuration(stats.total.timeMs);
    if (avgTimeEl) avgTimeEl.textContent = formatDuration(stats.total.avgTimeMs);
    if (streakEl) streakEl.textContent = stats.streak;
    
    // Update current weight
    const currentWeightDisplay = document.getElementById('currentWeightDisplay');
    const weightChangeDisplay = document.getElementById('weightChangeDisplay');
    
    if (!currentWeightDisplay || !weightChangeDisplay) {
      console.error('Weight display elements not found');
      return;
    }
    
    if (weightData.length > 0) {
      const latest = weightData[weightData.length - 1];
      const weightValueEl = currentWeightDisplay.querySelector('.weight-value');
      if (weightValueEl) {
        weightValueEl.textContent = latest.weight.toFixed(1);
      }
      
      // Calculate weight change from first entry
      if (weightData.length > 1) {
        const first = weightData[0];
        const change = latest.weight - first.weight;
        const changeText = change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1);
        const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
        weightChangeDisplay.textContent = `${changeText} kg from start`;
        weightChangeDisplay.className = `weight-change ${changeClass}`;
      } else {
        weightChangeDisplay.textContent = '';
        weightChangeDisplay.className = 'weight-change';
      }
    } else {
      const weightValueEl = currentWeightDisplay.querySelector('.weight-value');
      if (weightValueEl) {
        weightValueEl.textContent = '--';
      }
      weightChangeDisplay.textContent = '';
    }
    
    // Update period stats (default to week)
    updatePeriodStats('week');
  } catch (error) {
    console.error('Error updating profile stats:', error);
  }
}

// Update period-specific statistics
function updatePeriodStats(period) {
  try {
    const stats = calculateWorkoutStats();
    const weightData = getWeightData();
    const periodData = stats[period];
    
    console.log('Period Stats Debug:', { period, periodData, weightDataLength: weightData.length });
    
    const periodWorkoutsEl = document.getElementById('periodWorkouts');
    const periodTimeEl = document.getElementById('periodTime');
    const periodAvgTimeEl = document.getElementById('periodAvgTime');
    const periodWeightChangeEl = document.getElementById('periodWeightChange');
    
    if (periodWorkoutsEl) periodWorkoutsEl.textContent = periodData.workouts;
    if (periodTimeEl) periodTimeEl.textContent = formatDuration(periodData.timeMs);
    if (periodAvgTimeEl) periodAvgTimeEl.textContent = formatDuration(periodData.avgTimeMs);
    
    // Calculate weight change for period
    const now = Date.now();
    const periodMs = period === 'week' ? 7 * 24 * 60 * 60 * 1000 :
                     period === 'month' ? 30 * 24 * 60 * 60 * 1000 :
                     365 * 24 * 60 * 60 * 1000;
    
    const periodStart = now - periodMs;
    const periodWeights = weightData.filter(w => w.timestamp >= periodStart);
    
    if (periodWeightChangeEl) {
      if (periodWeights.length >= 2) {
        const change = periodWeights[periodWeights.length - 1].weight - periodWeights[0].weight;
        const changeText = change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1);
        periodWeightChangeEl.textContent = `${changeText} kg`;
      } else if (weightData.length > 0 && periodWeights.length === 1) {
        periodWeightChangeEl.textContent = 'No change';
      } else {
        periodWeightChangeEl.textContent = '--';
      }
    }
    
    renderPeriodChart(period);
  } catch (error) {
    console.error('Error updating period stats:', error);
  }
}

// Render weight chart
function renderWeightChart() {
  try {
    const canvas = document.getElementById('weightChart');
    if (!canvas) {
      console.warn('Weight chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    const weightData = getWeightData();
    
    console.log('Rendering weight chart with data:', weightData);
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = rect.width;
    const height = rect.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  if (weightData.length === 0) {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('No weight data yet', width / 2, height / 2);
    return;
  }
  
  // Get last 30 entries or all if less
  const dataToShow = weightData.slice(-30);
  
  // Find min/max for scaling
  const weights = dataToShow.map(d => d.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const range = maxWeight - minWeight || 1;
  
  // Add padding to range
  const padding = range * 0.1;
  const yMin = minWeight - padding;
  const yMax = maxWeight + padding;
  const yRange = yMax - yMin;
  
  // Chart area
  const chartPadding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - chartPadding.left - chartPadding.right;
  const chartHeight = height - chartPadding.top - chartPadding.bottom;
  
  // Draw grid lines
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= 4; i++) {
    const y = chartPadding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(chartPadding.left, y);
    ctx.lineTo(width - chartPadding.right, y);
    ctx.stroke();
    
    // Draw y-axis labels
    const value = yMax - (yRange / 4) * i;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    ctx.font = '11px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(value.toFixed(1), chartPadding.left - 5, y + 4);
  }
  
  // Draw line
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  dataToShow.forEach((point, i) => {
    const x = chartPadding.left + (chartWidth / (dataToShow.length - 1 || 1)) * i;
    const y = chartPadding.top + chartHeight - ((point.weight - yMin) / yRange) * chartHeight;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw points
  ctx.fillStyle = accentColor;
  dataToShow.forEach((point, i) => {
    const x = chartPadding.left + (chartWidth / (dataToShow.length - 1 || 1)) * i;
    const y = chartPadding.top + chartHeight - ((point.weight - yMin) / yRange) * chartHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  } catch (error) {
    console.error('Error rendering weight chart:', error);
  }
}

// Render period chart (workout frequency)
function renderPeriodChart(period) {
  try {
    const canvas = document.getElementById('periodChart');
    if (!canvas) {
      console.warn('Period chart canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    const history = getHistory();
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = rect.width;
    const height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get data for period
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const barData = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayEntries = history[dateKey] || [];
      
      // Count unique workouts
      const workoutIds = new Set();
      dayEntries.forEach(entry => {
        workoutIds.add(entry.workoutId || entry.timestamp || 'default');
      });
      
      barData.push({
        date: dateKey,
        dateObj: new Date(date),
        workouts: workoutIds.size
      });
    }
    
    if (barData.every(d => d.workouts === 0)) {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('No workouts in this period', width / 2, height / 2);
      return;
    }
    
    const maxWorkouts = Math.max(...barData.map(d => d.workouts), 1);
    
    // Chart area
    const chartPadding = { top: 20, right: 15, bottom: 35, left: 35 };
    const chartWidth = width - chartPadding.left - chartPadding.right;
    const chartHeight = height - chartPadding.top - chartPadding.bottom;
    
    // Draw horizontal grid lines
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
      const y = chartPadding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(chartPadding.left, y);
      ctx.lineTo(width - chartPadding.right, y);
      ctx.stroke();
      
      // Draw y-axis labels
      const value = maxWorkouts - (maxWorkouts / 4) * i;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
      ctx.font = '11px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value).toString(), chartPadding.left - 5, y + 4);
    }
    
    // Calculate bar dimensions
    const barWidth = chartWidth / barData.length;
    const barPadding = Math.max(1, barWidth * 0.15);
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const bgTertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary').trim();
    
    // Draw bars
    barData.forEach((point, i) => {
      const x = chartPadding.left + barWidth * i;
      const actualBarWidth = barWidth - barPadding * 2;
      const barHeight = (point.workouts / maxWorkouts) * chartHeight;
      const y = chartPadding.top + chartHeight - barHeight;
      
      // Draw bar with rounded top
      ctx.fillStyle = point.workouts > 0 ? accentColor : bgTertiaryColor;
      
      if (point.workouts > 0) {
        const radius = Math.min(3, actualBarWidth / 2);
        ctx.beginPath();
        ctx.moveTo(x + barPadding, y + radius);
        ctx.arcTo(x + barPadding, y, x + barPadding + radius, y, radius);
        ctx.lineTo(x + barPadding + actualBarWidth - radius, y);
        ctx.arcTo(x + barPadding + actualBarWidth, y, x + barPadding + actualBarWidth, y + radius, radius);
        ctx.lineTo(x + barPadding + actualBarWidth, chartPadding.top + chartHeight);
        ctx.lineTo(x + barPadding, chartPadding.top + chartHeight);
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw empty state bar
        ctx.fillRect(x + barPadding, chartPadding.top + chartHeight - 2, actualBarWidth, 2);
      }
      
      // Highlight today's bar
      const today = new Date().toISOString().split('T')[0];
      if (point.date === today) {
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + barPadding - 1, chartPadding.top - 1, actualBarWidth + 2, chartHeight + 2);
      }
    });
    
    // Draw x-axis labels (show day labels for appropriate periods)
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    
    if (period === 'week') {
      // Show all 7 days
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      barData.forEach((point, i) => {
        const x = chartPadding.left + barWidth * i + barWidth / 2;
        const dayLabel = dayLabels[point.dateObj.getDay()];
        ctx.fillText(dayLabel, x, chartPadding.top + chartHeight + 15);
      });
    } else if (period === 'month') {
      // Show every 5th day
      barData.forEach((point, i) => {
        if (i % 5 === 0 || i === barData.length - 1) {
          const x = chartPadding.left + barWidth * i + barWidth / 2;
          const day = point.dateObj.getDate();
          ctx.fillText(day.toString(), x, chartPadding.top + chartHeight + 15);
        }
      });
    } else {
      // Year view - show months
      const monthLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
      const monthStarts = [];
      let lastMonth = -1;
      
      barData.forEach((point, i) => {
        const month = point.dateObj.getMonth();
        if (month !== lastMonth) {
          monthStarts.push({ index: i, month });
          lastMonth = month;
        }
      });
      
      monthStarts.forEach(start => {
        const x = chartPadding.left + barWidth * start.index + barWidth / 2;
        ctx.fillText(monthLabels[start.month], x, chartPadding.top + chartHeight + 15);
      });
    }
    
  } catch (error) {
    console.error('Error rendering period chart:', error);
  }
}

// Initialize weight modal
const weightEntryModal = document.getElementById('weightEntryModal');
const addWeightBtn = document.getElementById('addWeightBtn');
const closeWeightModal = document.getElementById('closeWeightModal');
const cancelWeightBtn = document.getElementById('cancelWeightBtn');
const saveWeightBtn = document.getElementById('saveWeightBtn');
const bodyWeightInput = document.getElementById('weightInput');
const weightDateInput = document.getElementById('weightDateInput');

if (addWeightBtn) {
  addWeightBtn.addEventListener('click', () => {
    bodyWeightInput.value = '';
    weightDateInput.value = new Date().toISOString().split('T')[0];
    weightEntryModal.classList.add('show');
    setTimeout(() => bodyWeightInput.focus(), 100);
  });
}

if (closeWeightModal) {
  closeWeightModal.addEventListener('click', () => {
    weightEntryModal.classList.remove('show');
  });
}

if (cancelWeightBtn) {
  cancelWeightBtn.addEventListener('click', () => {
    weightEntryModal.classList.remove('show');
  });
}

if (saveWeightBtn) {
  saveWeightBtn.addEventListener('click', () => {
    const weight = parseFloat(bodyWeightInput.value);
    const date = weightDateInput.value;
    
    if (weight > 0 && date) {
      addWeightEntry(weight, date);
      weightEntryModal.classList.remove('show');
    } else {
      alert('Please enter a valid weight and date');
    }
  });
}

// Close modal on background click
if (weightEntryModal) {
  weightEntryModal.addEventListener('click', (e) => {
    if (e.target === weightEntryModal) {
      weightEntryModal.classList.remove('show');
    }
  });
}

// Period tab switching
document.querySelectorAll('.period-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updatePeriodStats(tab.dataset.period);
  });
});

// DEBUG: Add sample data function (for testing)
window.addSampleStatsData = function() {
  // Add sample weight data
  const today = new Date();
  const weightData = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    weightData.push({
      weight: 75 + Math.random() * 3 - 1.5, // Random weight around 75kg
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime()
    });
  }
  saveWeightData(weightData);
  
  // Add sample workout history
  const history = {};
  for (let i = 20; i >= 0; i -= 2) { // Every other day
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    const timestamp = date.getTime();
    
    history[dateKey] = [
      {
        machine: 'Bench Press',
        weight: 80,
        reps: 10,
        id: `${timestamp}-1`,
        timestamp: new Date(timestamp).toISOString(),
        workoutId: `workout-${dateKey}`
      },
      {
        machine: 'Bench Press',
        weight: 85,
        reps: 8,
        id: `${timestamp}-2`,
        timestamp: new Date(timestamp + 60000).toISOString(),
        workoutId: `workout-${dateKey}`
      },
      {
        machine: 'Squat',
        weight: 100,
        reps: 10,
        id: `${timestamp}-3`,
        timestamp: new Date(timestamp + 120000).toISOString(),
        workoutId: `workout-${dateKey}`
      },
      {
        machine: 'Squat',
        weight: 110,
        reps: 8,
        id: `${timestamp}-4`,
        timestamp: new Date(timestamp + 180000).toISOString(),
        workoutId: `workout-${dateKey}`
      }
    ];
  }
  
  saveHistory(history);
  
  console.log('Sample data added! Refresh the profile screen.');
  alert('Sample data added! Navigate to Profile to see the statistics.');
};

console.log('Debug mode: Type addSampleStatsData() in console to add sample data');

window.addEventListener('DOMContentLoaded', () => {
  applySettings();
  renderMachineSelect();
  renderCardioSelect();
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
  
  // Redraw charts on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!profileScreen.classList.contains('screen-hidden')) {
        renderWeightChart();
        const activeTab = document.querySelector('.period-tab.active');
        if (activeTab) {
          renderPeriodChart(activeTab.dataset.period);
        }
      }
    }, 250);
  });
});

// ==========================================
// Workout Programs
// ==========================================

// Get programs from localStorage
function getPrograms() {
  return JSON.parse(localStorage.getItem('fitnessPrograms') || '[]');
}

// Save programs to localStorage
function savePrograms(programs) {
  localStorage.setItem('fitnessPrograms', JSON.stringify(programs));
}

// Save a single program
function saveProgram(program) {
  const programs = getPrograms();
  
  if (program.id) {
    // Update existing
    const index = programs.findIndex(p => p.id === program.id);
    if (index !== -1) {
      programs[index] = program;
    }
  } else {
    // Create new
    program.id = Date.now().toString();
    program.createdAt = new Date().toISOString();
    programs.push(program);
  }
  
  savePrograms(programs);
}

// Delete a program
function deleteProgram(programId) {
  const programs = getPrograms();
  const filtered = programs.filter(p => p.id !== programId);
  savePrograms(filtered);
}

// Render programs list
function renderProgramsList() {
  const programsList = document.getElementById('programsList');
  if (!programsList) return;
  
  const programs = getPrograms();
  
  if (programs.length === 0) {
    programsList.innerHTML = '<div class="empty-state">No programs yet. Create your first training program!</div>';
    return;
  }
  
  programsList.innerHTML = '';
  
  programs.forEach(program => {
    const programCard = document.createElement('div');
    programCard.className = 'plan-card';
    
    // Count total workouts in program
    let totalWorkouts = 0;
    program.weeks.forEach(week => {
      week.days.forEach(day => {
        if (day.workoutPlanId || day.customWorkout) totalWorkouts++;
      });
    });
    
    programCard.innerHTML = `
      <div class="plan-card-header">
        <div class="plan-card-title">
          <span class="plan-icon">📚</span>
          <span>${program.name}</span>
        </div>
        <div class="plan-card-actions">
          <button type="button" class="btn-icon edit" data-program-id="${program.id}" title="Edit">✏️</button>
          <button type="button" class="btn-icon delete" data-program-id="${program.id}" title="Delete">🗑️</button>
        </div>
      </div>
      <div class="plan-card-info">
        <span>${program.weeks.length} weeks</span>
        <span>•</span>
        <span>${totalWorkouts} workouts</span>
      </div>
    `;
    
    // Edit button
    programCard.querySelector('.edit').addEventListener('click', () => {
      editProgram(program.id);
    });
    
    // Delete button
    programCard.querySelector('.delete').addEventListener('click', () => {
      if (confirm(`Delete program "${program.name}"?`)) {
        deleteProgram(program.id);
        renderProgramsList();
      }
    });
    
    programsList.appendChild(programCard);
  });
}

// Edit or create a program
let currentEditingProgramId = null;
let currentProgramWeeks = [];

function editProgram(programId) {
  const programs = getPrograms();
  const program = programs.find(p => p.id === programId);
  
  if (program) {
    currentEditingProgramId = program.id;
    document.getElementById('programName').value = program.name;
    document.getElementById('programDuration').value = program.weeks.length;
    currentProgramWeeks = JSON.parse(JSON.stringify(program.weeks)); // Deep copy
    document.getElementById('editProgramTitle').textContent = '✏️ Edit Program';
  } else {
    currentEditingProgramId = null;
    document.getElementById('programName').value = '';
    document.getElementById('programDuration').value = '4';
    currentProgramWeeks = [];
    document.getElementById('editProgramTitle').textContent = '✏️ Create Program';
  }
  
  renderProgramSchedule();
  showScreen('editProgram');
}

// Render program schedule
function renderProgramSchedule() {
  const scheduleDiv = document.getElementById('programSchedule');
  const duration = parseInt(document.getElementById('programDuration').value) || 4;
  
  // Initialize weeks if needed
  while (currentProgramWeeks.length < duration) {
    currentProgramWeeks.push({
      weekNumber: currentProgramWeeks.length + 1,
      days: Array(7).fill(null).map((_, i) => ({ dayOfWeek: i, workoutPlanId: null, customWorkout: null }))
    });
  }
  
  // Remove extra weeks if duration decreased
  currentProgramWeeks = currentProgramWeeks.slice(0, duration);
  
  scheduleDiv.innerHTML = '';
  
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const plans = getPlans();
  
  currentProgramWeeks.forEach((week, weekIndex) => {
    const weekCard = document.createElement('div');
    weekCard.className = 'program-week-card';
    
    const weekHeader = document.createElement('div');
    weekHeader.className = 'program-week-header';
    weekHeader.innerHTML = `<h3>Week ${week.weekNumber}</h3>`;
    weekCard.appendChild(weekHeader);
    
    const daysGrid = document.createElement('div');
    daysGrid.className = 'program-days-grid';
    
    week.days.forEach((day, dayIndex) => {
      const dayCard = document.createElement('div');
      dayCard.className = 'program-day-card';
      
      const dayName = document.createElement('div');
      dayName.className = 'program-day-name';
      dayName.textContent = dayNames[dayIndex];
      
      const workoutSelect = document.createElement('select');
      workoutSelect.className = 'program-day-select';
      
      workoutSelect.innerHTML = '<option value="">Rest Day</option>';
      plans.forEach(plan => {
        const option = document.createElement('option');
        option.value = plan.id;
        option.textContent = plan.name;
        if (day.workoutPlanId === plan.id) option.selected = true;
        workoutSelect.appendChild(option);
      });
      
      workoutSelect.addEventListener('change', (e) => {
        currentProgramWeeks[weekIndex].days[dayIndex].workoutPlanId = e.target.value || null;
      });
      
      dayCard.appendChild(dayName);
      dayCard.appendChild(workoutSelect);
      daysGrid.appendChild(dayCard);
    });
    
    weekCard.appendChild(daysGrid);
    scheduleDiv.appendChild(weekCard);
  });
}

// Update schedule when duration changes
document.getElementById('programDuration').addEventListener('change', () => {
  renderProgramSchedule();
});

// Create program button
const createProgramBtn = document.getElementById('createProgramBtn');
if (createProgramBtn) {
  createProgramBtn.addEventListener('click', () => {
    editProgram(null);
  });
}

// Back button
const backFromEditProgramBtn = document.getElementById('backFromEditProgramBtn');
if (backFromEditProgramBtn) {
  backFromEditProgramBtn.addEventListener('click', () => {
    showScreen('settingsPrograms');
  });
}

// Save program form
const editProgramForm = document.getElementById('editProgramForm');
if (editProgramForm) {
  editProgramForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProgramData();
  });
}

// Top save button
const saveProgramBtnTop = document.getElementById('saveProgramBtnTop');
if (saveProgramBtnTop) {
  saveProgramBtnTop.addEventListener('click', () => {
    saveProgramData();
  });
}

function saveProgramData() {
  const name = document.getElementById('programName').value.trim();
  if (!name) {
    alert('Please enter a program name');
    return;
  }
  
  if (currentProgramWeeks.length === 0) {
    alert('Please set program duration');
    return;
  }
  
  const program = {
    name: name,
    weeks: currentProgramWeeks,
    updatedAt: new Date().toISOString()
  };
  
  if (currentEditingProgramId) {
    program.id = currentEditingProgramId;
  }
  
  saveProgram(program);
  showScreen('settingsPrograms');
  renderProgramsList();
}

// Initialize programs list when navigating to programs settings
const originalShowScreen = showScreen;
showScreen = function(screenName) {
  originalShowScreen(screenName);
  
  if (screenName === 'settingsPrograms') {
    renderProgramsList();
  }
};
