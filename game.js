// Game State
let gameState = {
    money: 100,
    happiness: 50,
    reputation: 50,
    day: 1,
    staff: [
        { name: "Giuseppe", role: "Scooper", salary: 5, skill: "fast" },
        { name: "Maria", role: "Cashier", salary: 5, skill: "friendly" }
    ]
};

// Funny Italian names for staff
const italianNames = [
    "Luigi", "Francesca", "Marco", "Giulia", "Antonio", "Sofia",
    "Lorenzo", "Isabella", "Matteo", "Chiara", "Alessandro", "Valentina",
    "Giovanni", "Elena", "Davide", "Martina", "Luca", "Federica"
];

// Role descriptions
const roles = [
    { name: "Scooper", salary: 5, description: "Scoops gelato" },
    { name: "Cashier", salary: 5, description: "Handles money" },
    { name: "Gelato Maker", salary: 8, description: "Creates gelato" },
    { name: "Manager", salary: 10, description: "Manages chaos" },
    { name: "Social Media Influencer", salary: 7, description: "Takes photos of gelato" }
];

// Funny scenarios about organizational design
const scenarios = [
    {
        text: "A bus of 50 Japanese tourists just arrived! They all want pistachio gelato and want to take photos. You only have one scooper working the counter. What do you do?",
        choices: [
            {
                text: "Make everyone scoop gelato! CHAOS MODE!",
                effect: { money: 30, happiness: -10, reputation: -5 },
                message: "Everyone is scooping! Giuseppe accidentally scooped stracciatella into the pistachio container. The tourists loved the 'fusion flavor'! 😅"
            },
            {
                text: "Organize a proper queue system and rotate scoopers",
                effect: { money: 25, happiness: 5, reputation: 10 },
                message: "Great organizational skills! The tourists were impressed and left 5-star reviews on TripAdvisor! 🌟"
            },
            {
                text: "Close the shop and hide in the back",
                effect: { money: -10, happiness: -20, reputation: -15 },
                message: "They posted angry reviews. 'Closed for no reason!' Bologna's tourism board is disappointed. 😰"
            }
        ]
    },
    {
        text: "Your Gelato Maker calls in sick, but you have a huge order from the University of Bologna's graduation ceremony. Three staff members want to try making gelato but none have experience!",
        choices: [
            {
                text: "Let the most enthusiastic person try (Giuseppe the scooper)",
                effect: { money: -5, happiness: 10, reputation: -5 },
                message: "Giuseppe made 'experimental gelato'. Students loved the weird flavors! They called it 'avant-garde'. 🎨"
            },
            {
                text: "Cancel the order and be honest",
                effect: { money: 0, happiness: -5, reputation: 5 },
                message: "The university appreciated your honesty. They rescheduled and gave you a second chance. 🎓"
            },
            {
                text: "Buy cheap gelato from a competitor and rebrand it",
                effect: { money: 15, happiness: -10, reputation: -20 },
                message: "Someone recognized the competitor's recipe! Your reputation takes a hit. The scandal is called 'Gelato-gate'. 📰"
            }
        ]
    },
    {
        text: "Two staff members (Maria and Luigi) are arguing about who should clean the gelato machine. Meanwhile, customers are waiting and the machine is dripping everywhere!",
        choices: [
            {
                text: "Fire both of them immediately! You'll clean it yourself!",
                effect: { money: -20, happiness: -30, reputation: -10 },
                message: "Bad move! Now you're understaffed AND covered in melted gelato. Your back hurts. 😫"
            },
            {
                text: "Create a cleaning schedule and rotation system",
                effect: { money: 5, happiness: 15, reputation: 5 },
                message: "Brilliant organizational design! Everyone knows their duties now. Peace restored! ☮️"
            },
            {
                text: "Hire someone specifically for cleaning (€8/day)",
                effect: { money: 10, happiness: 20, reputation: 0 },
                message: "Expensive but effective! Maria and Luigi are happy. New hire Antonio is the 'Cleaning Maestro'. 🧹"
            }
        ]
    },
    {
        text: "A food blogger with 100k followers wants to feature your gelateria! But she demands a 'flat organizational structure' where everyone makes decisions together. This could take hours!",
        choices: [
            {
                text: "Accept! Democracy in the gelateria!",
                effect: { money: 40, happiness: -15, reputation: 25 },
                message: "The 4-hour staff meeting about pistachio vs. nocciola was exhausting, but the blog post went viral! 📱"
            },
            {
                text: "Politely decline and keep your hierarchy",
                effect: { money: 0, happiness: 5, reputation: -5 },
                message: "She wrote 'Old-fashioned management style' but your staff appreciated the decision-making speed. ⚡"
            },
            {
                text: "Fake a flat structure just for the visit",
                effect: { money: 35, happiness: -5, reputation: 20 },
                message: "Your staff played along perfectly! Oscar-worthy performances! After she left, back to normal. 🎭"
            }
        ]
    },
    {
        text: "Giuseppe wants to be promoted to 'Senior Scooper' (costing €2 more per day), but Maria says she deserves to be 'Head Cashier'. Your budget is tight!",
        choices: [
            {
                text: "Promote both! Make everyone happy!",
                effect: { money: -10, happiness: 25, reputation: 5 },
                message: "Expensive but worth it! Their morale skyrocketed! They now wear fancy name tags. 🏷️"
            },
            {
                text: "Promote neither, everyone is equal!",
                effect: { money: 5, happiness: -20, reputation: 0 },
                message: "They're both sulking. The gelato scoops are noticeably smaller today. 😠"
            },
            {
                text: "Create a monthly 'Employee of the Month' rotation",
                effect: { money: 0, happiness: 15, reputation: 10 },
                message: "Genius! Competition brings out the best in them! Customers notice the improved service! 🏆"
            }
        ]
    },
    {
        text: "Peak summer! You need to hire 3 more people fast. Do you: A) Hire family members (cheap but dramatic), B) Hire students (unreliable but energetic), or C) Hire professionals (expensive but reliable)?",
        choices: [
            {
                text: "Hire family! Nonna, Uncle Enzo, and Cousin Tina!",
                effect: { money: 20, happiness: -25, reputation: -10 },
                message: "Nonna keeps criticizing everyone's technique! Uncle Enzo eats all the profits! But the gelato tastes like home! 👵"
            },
            {
                text: "Hire university students from Bologna",
                effect: { money: 25, happiness: 10, reputation: 15 },
                message: "They're always on their phones, but their TikToks about your gelateria are getting thousands of views! 📱"
            },
            {
                text: "Hire experienced professionals",
                effect: { money: 15, happiness: 20, reputation: 20 },
                message: "They're efficient and know what they're doing! Your gelateria runs like a Swiss clock! ⏰"
            }
        ]
    },
    {
        text: "The city inspector arrives unannounced! Your organizational structure has everyone doing multiple jobs (not officially recorded). He's asking for proper job descriptions!",
        choices: [
            {
                text: "Panic and make up job descriptions on the spot",
                effect: { money: -15, happiness: -10, reputation: -5 },
                message: "Your nervous improvisation was obvious. 'Chief Cone Optimization Officer' raised eyebrows. 🤨"
            },
            {
                text: "Admit the flexible structure and explain it's more efficient",
                effect: { money: -5, happiness: 5, reputation: 10 },
                message: "The inspector was impressed by your honesty! He called it 'agile methodology'. You passed! ✅"
            },
            {
                text: "Bribe him with free gelato for life",
                effect: { money: -20, happiness: 0, reputation: -15 },
                message: "He took the gelato but still wrote you up. Now you're out gelato AND have fines. 🚫"
            }
        ]
    },
    {
        text: "Staff burnout alert! Everyone is exhausted from the heat and customer rush. Do you implement better work-life balance or push through for profit?",
        choices: [
            {
                text: "Mandatory siesta time! Close from 2-4 PM daily",
                effect: { money: -10, happiness: 30, reputation: 5 },
                message: "Very Italian! Staff is refreshed and energetic! Tourists find it 'authentically Bologna'. 😴"
            },
            {
                text: "Push through! Gelato waits for no one!",
                effect: { money: 20, happiness: -30, reputation: -5 },
                message: "You made money but Giuseppe threw a gelato scoop at the wall. Maria is updating her resume. 💼"
            },
            {
                text: "Hire temporary help and rotate shifts",
                effect: { money: 5, happiness: 15, reputation: 10 },
                message: "Smart organizational design! Everyone gets rest, business keeps flowing! 🔄"
            }
        ]
    },
    {
        text: "A rival gelateria is poaching your staff with better pay! Maria got an offer for €12/day (you pay her €5). How do you respond?",
        choices: [
            {
                text: "Match the offer! Pay Maria €12/day!",
                effect: { money: -15, happiness: 20, reputation: 5 },
                message: "Maria stayed! But now everyone else wants raises too. The dominoes are falling! 💰"
            },
            {
                text: "Let her go and hire someone new",
                effect: { money: -5, happiness: -15, reputation: -10 },
                message: "Maria left and posted on Instagram about 'corporate greed'. The new hire keeps giving wrong change. 🤦"
            },
            {
                text: "Offer profit-sharing instead of just salary",
                effect: { money: 10, happiness: 25, reputation: 15 },
                message: "Revolutionary! Maria stays and everyone works harder! You invented cooperative capitalism! 🤝"
            }
        ]
    },
    {
        text: "A customer wants to speak to the manager about 'organizational inefficiency' - they waited 3 minutes for gelato! You don't have an official manager. What now?",
        choices: [
            {
                text: "You are the manager! Face the customer yourself!",
                effect: { money: 0, happiness: -5, reputation: 5 },
                message: "You handled it professionally! Customer left satisfied. But you realize you need better systems. 🎯"
            },
            {
                text: "Promote someone to manager on the spot (Giuseppe)",
                effect: { money: -5, happiness: 15, reputation: 0 },
                message: "Giuseppe LOVED being 'manager' for 5 minutes! He gives himself this title on LinkedIn now. 📊"
            },
            {
                text: "Explain that flat organizations are modern and efficient",
                effect: { money: 0, happiness: 0, reputation: -10 },
                message: "The customer looked confused and asked for a refund. They posted 'Hipster nonsense' online. 🙄"
            }
        ]
    }
];

// Initialize game
function init() {
    updateDisplay();
    renderStaff();
    showNewScenario();

    document.getElementById('hire-btn').addEventListener('click', hireStaff);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
}

function updateDisplay() {
    document.getElementById('money').textContent = '€' + gameState.money;
    document.getElementById('happiness').textContent = gameState.happiness + '%';
    document.getElementById('reputation').textContent = gameState.reputation + '%';
    document.getElementById('day').textContent = gameState.day;
}

function renderStaff() {
    const staffList = document.getElementById('staff-list');
    staffList.innerHTML = '';

    if (gameState.staff.length === 0) {
        staffList.innerHTML = '<p style="color: #999;">No staff! Hire someone!</p>';
        return;
    }

    gameState.staff.forEach((staff, index) => {
        const staffDiv = document.createElement('div');
        staffDiv.className = 'staff-member';
        staffDiv.innerHTML = `
            <div class="staff-name">${staff.name}</div>
            <div class="staff-role">📋 ${staff.role} | 💰 €${staff.salary}/day</div>
            <div class="staff-actions">
                <button class="btn btn-secondary btn-small" onclick="changeRole(${index})">Change Role</button>
                <button class="btn btn-danger btn-small" onclick="fireStaff(${index})">Fire</button>
            </div>
        `;
        staffList.appendChild(staffDiv);
    });
}

function hireStaff() {
    if (gameState.money < 30) {
        showNotification('Not enough money to hire! Need €30', 'error');
        return;
    }

    const randomName = italianNames[Math.floor(Math.random() * italianNames.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    gameState.staff.push({
        name: randomName,
        role: randomRole.name,
        salary: randomRole.salary
    });

    gameState.money -= 30;

    showNotification(`Hired ${randomName} as ${randomRole.name}!`, 'success');
    updateDisplay();
    renderStaff();
}

function fireStaff(index) {
    const staff = gameState.staff[index];

    if (gameState.staff.length <= 1) {
        showNotification("You need at least one employee! Can't run a gelateria alone!", 'error');
        return;
    }

    gameState.staff.splice(index, 1);
    gameState.happiness -= 10;
    gameState.reputation -= 5;

    showNotification(`Fired ${staff.name}. Morale decreased. 😢`, 'warning');
    updateDisplay();
    renderStaff();
    checkGameOver();
}

function changeRole(index) {
    const staff = gameState.staff[index];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    staff.role = randomRole.name;
    staff.salary = randomRole.salary;

    showNotification(`${staff.name} is now a ${randomRole.name}!`, 'success');
    renderStaff();
}

function showNewScenario() {
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    document.getElementById('scenario').innerHTML = `
        <p class="scenario-text">${scenario.text}</p>
    `;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    scenario.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', () => handleChoice(choice));
        choicesDiv.appendChild(button);
    });
}

function handleChoice(choice) {
    // Apply effects
    gameState.money += choice.effect.money || 0;
    gameState.happiness += choice.effect.happiness || 0;
    gameState.reputation += choice.effect.reputation || 0;

    // Clamp values
    gameState.happiness = Math.max(0, Math.min(100, gameState.happiness));
    gameState.reputation = Math.max(0, Math.min(100, gameState.reputation));

    // Pay staff
    const dailySalary = gameState.staff.reduce((sum, staff) => sum + staff.salary, 0);
    gameState.money -= dailySalary;

    // Random events
    const randomEvent = Math.random();
    if (randomEvent > 0.8) {
        gameState.money += 20;
        showNotification('🎉 Bonus! A rich tourist left a huge tip!', 'success');
    } else if (randomEvent < 0.1) {
        gameState.money -= 10;
        showNotification('💸 Unexpected expense! Gelato machine repair!', 'warning');
    }

    showNotification(choice.message, 'success');

    gameState.day++;
    updateDisplay();

    setTimeout(() => {
        checkGameOver();
        if (!checkGameOver()) {
            showNewScenario();
        }
    }, 2000);
}

function checkGameOver() {
    let gameOver = false;
    let message = '';

    if (gameState.money < 0) {
        gameOver = true;
        message = `💸 BANKRUPTCY! You ran out of money on day ${gameState.day}! Your gelateria dream melted away... Maybe try a career in accounting instead?`;
    } else if (gameState.happiness <= 0) {
        gameOver = true;
        message = `😭 STAFF REBELLION! Everyone quit on day ${gameState.day}! They're now working for your competitor. You're left alone, crying into a tub of stracciatella.`;
    } else if (gameState.reputation <= 0) {
        gameOver = true;
        message = `⭐ REPUTATION DESTROYED! On day ${gameState.day}, the health inspector shut you down. Bologna's newspapers called it 'The Gelato Disaster of 2026'.`;
    } else if (gameState.day > 30 && gameState.money > 200) {
        gameOver = true;
        message = `🏆 VICTORY! You survived 30 days and earned €${gameState.money}! You're a true Bolognese gelato master! The city is naming a gelato flavor after you!`;
    }

    if (gameOver) {
        document.getElementById('game-over-message').textContent = message;
        document.getElementById('game-over').classList.remove('hidden');
        return true;
    }

    return false;
}

function restartGame() {
    gameState = {
        money: 100,
        happiness: 50,
        reputation: 50,
        day: 1,
        staff: [
            { name: "Giuseppe", role: "Scooper", salary: 5 },
            { name: "Maria", role: "Cashier", salary: 5 }
        ]
    };

    document.getElementById('game-over').classList.add('hidden');
    updateDisplay();
    renderStaff();
    showNewScenario();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Start the game when page loads
init();
