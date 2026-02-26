import { CONFIG, GROUP_STAGES, METAL_NAMES, ROLES, STARTING_STAFF } from './config.js';
import { SCENARIOS } from './scenarios.js';

// --- Game State ---

function createFreshState() {
    return {
        money: CONFIG.startMoney,
        happiness: CONFIG.startHappiness,
        reputation: CONFIG.startReputation,
        day: CONFIG.startDay,
        groupStage: CONFIG.startGroupStage,
        staff: STARTING_STAFF.map(s => ({ ...s }))
    };
}

let gameState = loadGame() || createFreshState();

// --- Persistence (localStorage) ---

function saveGame() {
    try {
        localStorage.setItem('metalMayhemSave', JSON.stringify(gameState));
    } catch {
        // Storage full or unavailable - game still works, just won't persist
    }
}

function loadGame() {
    try {
        const data = localStorage.getItem('metalMayhemSave');
        if (!data) return null;
        const parsed = JSON.parse(data);
        // Basic validation: make sure it has the expected shape
        if (typeof parsed.money !== 'number' || !Array.isArray(parsed.staff)) return null;
        return parsed;
    } catch {
        return null;
    }
}

function clearSave() {
    try {
        localStorage.removeItem('metalMayhemSave');
    } catch {
        // Ignore
    }
}

// --- Display ---

function updateDisplay() {
    document.getElementById('money').textContent = '\u20AC' + gameState.money;
    document.getElementById('happiness').textContent = gameState.happiness + '%';
    document.getElementById('reputation').textContent = gameState.reputation + '%';
    document.getElementById('day').textContent = gameState.day;
    const stageIndex = Math.max(0, Math.min(CONFIG.maxGroupStage, gameState.groupStage));
    document.getElementById('group-stage').textContent = GROUP_STAGES[stageIndex];
}

function renderStaff() {
    const staffList = document.getElementById('staff-list');
    staffList.innerHTML = '';

    if (gameState.staff.length === 0) {
        staffList.innerHTML = '<p style="color: #999;">No band members! Recruit someone!</p>';
        return;
    }

    gameState.staff.forEach((member, index) => {
        const div = document.createElement('div');
        div.className = 'staff-member';
        div.innerHTML = `
            <div class="staff-name">${member.name}</div>
            <div class="staff-role">\uD83C\uDFB8 ${member.role} | \uD83D\uDCB0 \u20AC${member.salary}/week</div>
            <div class="staff-actions">
                <button class="btn btn-secondary btn-small" data-action="change-role" data-index="${index}">Change Role</button>
                <button class="btn btn-danger btn-small" data-action="fire" data-index="${index}">Kick Out</button>
            </div>
        `;
        staffList.appendChild(div);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, CONFIG.notificationDuration);
}

// --- Staff Management ---

function hireStaff() {
    if (gameState.money < CONFIG.hireCost) {
        showNotification(`Not enough cash to recruit! Need \u20AC${CONFIG.hireCost}`, 'error');
        return;
    }

    const randomName = METAL_NAMES[Math.floor(Math.random() * METAL_NAMES.length)];
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];

    gameState.staff.push({
        name: randomName,
        role: randomRole.name,
        salary: randomRole.salary
    });

    gameState.money -= CONFIG.hireCost;

    showNotification(`Recruited ${randomName} as ${randomRole.name}!`, 'success');
    updateDisplay();
    renderStaff();
    saveGame();
}

function fireStaff(index) {
    const member = gameState.staff[index];
    if (!member) return;

    if (gameState.staff.length <= CONFIG.minStaff) {
        showNotification("You need at least one band member! Can't be a one-person metal band!", 'error');
        return;
    }

    gameState.staff.splice(index, 1);
    gameState.happiness -= CONFIG.fireMoralePenalty;
    gameState.reputation -= CONFIG.fireReputationPenalty;

    showNotification(`Kicked out ${member.name}. Band morale decreased.`, 'warning');
    updateDisplay();
    renderStaff();
    saveGame();
    checkGameOver();
}

function changeRole(index) {
    const member = gameState.staff[index];
    if (!member) return;

    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    member.role = randomRole.name;
    member.salary = randomRole.salary;

    showNotification(`${member.name} is now the ${randomRole.name}!`, 'success');
    renderStaff();
    saveGame();
}

// --- Scenarios ---

function showNewScenario() {
    const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];

    document.getElementById('scenario').innerHTML = `
        <p class="scenario-text">${scenario.text}</p>
    `;

    document.getElementById('theory-text').textContent = scenario.theory;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    scenario.choices.forEach((choice, i) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.dataset.action = 'choose';
        button.dataset.choiceIndex = i;
        // Store the choice data on the button for the event handler
        button._choiceData = choice;
        choicesDiv.appendChild(button);
    });
}

function handleChoice(choice) {
    // Apply effects
    gameState.money += choice.effect.money || 0;
    gameState.happiness += choice.effect.happiness || 0;
    gameState.reputation += choice.effect.reputation || 0;

    if (choice.effect.stage !== undefined) {
        gameState.groupStage += choice.effect.stage;
    }

    // Clamp values
    gameState.happiness = Math.max(0, Math.min(CONFIG.maxHappiness, gameState.happiness));
    gameState.reputation = Math.max(0, Math.min(CONFIG.maxReputation, gameState.reputation));
    gameState.groupStage = Math.max(0, Math.min(CONFIG.maxGroupStage, gameState.groupStage));

    // Pay weekly salaries
    const weeklySalary = gameState.staff.reduce((sum, m) => sum + m.salary, 0);
    gameState.money -= weeklySalary;

    // Random events
    const roll = Math.random();
    if (roll > (1 - CONFIG.bonusChance)) {
        gameState.money += CONFIG.bonusAmount;
        showNotification('Bonus! Merchandise sold out at your last gig!', 'success');
    } else if (roll < CONFIG.expenseChance) {
        gameState.money -= CONFIG.expenseAmount;
        showNotification('Unexpected expense! Amplifier blew up!', 'warning');
    }

    showNotification(choice.message, 'success');

    gameState.day++;
    updateDisplay();
    saveGame();

    // Small delay before next scenario (let player read the outcome)
    setTimeout(() => {
        if (!checkGameOver()) {
            showNewScenario();
        }
    }, CONFIG.scenarioDelay);
}

// --- Game Over ---

function checkGameOver() {
    let message = '';

    if (gameState.money < CONFIG.bankruptcyThreshold) {
        message = `BANKRUPT! You're \u20AC${Math.abs(gameState.money)} in debt on week ${gameState.day}! Your equipment was repossessed. The band dissolved in Bologna's underground scene... Time to get a day job?`;
    } else if (gameState.happiness <= 0) {
        message = `BAND BREAKUP! Everyone quit on week ${gameState.day}! Poor leadership and team dynamics destroyed morale. They formed a new band without you. Remember: organizational psychology matters!`;
    } else if (gameState.reputation <= 0) {
        message = `REPUTATION DESTROYED! On week ${gameState.day}, you're permanently banned from Bologna's venues. Word spread fast. Your social identity is 'that terrible band nobody likes.' Ouch.`;
    } else if (gameState.day > CONFIG.winWeek && gameState.money > CONFIG.winMoney && gameState.groupStage >= CONFIG.winGroupStage) {
        message = `METAL LEGENDS! You survived ${CONFIG.winWeek} weeks, earned \u20AC${gameState.money}, and reached ${GROUP_STAGES[gameState.groupStage]} stage! Bologna's metal scene bows to your organizational psychology mastery! You understood Tuckman, motivated with Maslow, and avoided groupthink!`;
    } else if (gameState.day > CONFIG.winWeek) {
        message = `SURVIVED! You made it ${CONFIG.winWeek} weeks but didn't thrive. \u20AC${gameState.money} and ${GROUP_STAGES[gameState.groupStage]} stage. Better understanding of organizational psychology could've helped. Try again and apply those theories!`;
    }

    if (message) {
        clearSave();
        document.getElementById('game-over-message').textContent = message;
        document.getElementById('game-over').classList.remove('hidden');
        return true;
    }

    return false;
}

function restartGame() {
    clearSave();
    gameState = createFreshState();

    document.getElementById('game-over').classList.add('hidden');
    updateDisplay();
    renderStaff();
    showNewScenario();
}

// --- Event Delegation ---

function setupEventDelegation() {
    // Hire button
    document.getElementById('hire-btn').addEventListener('click', hireStaff);

    // Restart button
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    // Staff actions (change role / fire) - delegated from the staff list
    document.getElementById('staff-list').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const index = parseInt(btn.dataset.index, 10);
        if (btn.dataset.action === 'change-role') {
            changeRole(index);
        } else if (btn.dataset.action === 'fire') {
            fireStaff(index);
        }
    });

    // Scenario choices - delegated from the choices container
    document.getElementById('choices').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="choose"]');
        if (!btn || !btn._choiceData) return;
        handleChoice(btn._choiceData);
    });
}

// --- Init ---

function init() {
    setupEventDelegation();
    updateDisplay();
    renderStaff();

    // If resuming a saved game, check if it was already over
    if (!checkGameOver()) {
        showNewScenario();
    }
}

init();
