// Game configuration - all tunable constants in one place
export const CONFIG = {
    // Starting state
    startMoney: 500,
    startHappiness: 50,
    startReputation: 50,
    startDay: 1,
    startGroupStage: 0,

    // Bounds
    maxHappiness: 100,
    maxReputation: 100,
    maxGroupStage: 3,

    // Costs
    hireCost: 100,

    // Firing penalties
    fireMoralePenalty: 15,
    fireReputationPenalty: 10,

    // Game over thresholds
    bankruptcyThreshold: -200,
    winWeek: 30,
    winMoney: 500,
    winGroupStage: 2,

    // Random events
    bonusChance: 0.15,    // chance of merch bonus each week
    bonusAmount: 100,
    expenseChance: 0.10,  // chance of unexpected expense each week
    expenseAmount: 50,

    // Notification display time (ms)
    notificationDuration: 4000,
    scenarioDelay: 2500,

    // Minimum band size
    minStaff: 1,
};

// Tuckman's group development stages
export const GROUP_STAGES = ["Forming", "Storming", "Norming", "Performing"];

// Random band member names
export const METAL_NAMES = [
    "Dante", "Alessia", "Enzo", "Chiara", "Matteo", "Francesca",
    "Lorenzo", "Sofia", "Riccardo", "Valentina", "Fabio", "Elena",
    "Luca", "Martina", "Stefano", "Beatrice", "Diego", "Serena"
];

// Available roles with salaries
export const ROLES = [
    { name: "Vocalist", salary: 30, description: "Front person, leads the chaos" },
    { name: "Guitarist", salary: 30, description: "Shreds riffs, breaks strings" },
    { name: "Bassist", salary: 25, description: "Holds down the groove" },
    { name: "Drummer", salary: 35, description: "Keeps time, loses drumsticks" },
    { name: "Keyboardist", salary: 25, description: "Adds symphonic darkness" },
    { name: "Manager", salary: 40, description: "Books gigs, negotiates" },
    { name: "Sound Tech", salary: 35, description: "Makes you sound less terrible" }
];

// Default starting band
export const STARTING_STAFF = [
    { name: "Marco", role: "Vocalist", salary: 30 },
    { name: "Giulia", role: "Guitarist", salary: 30 }
];
