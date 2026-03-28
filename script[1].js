const resetBtn = document.getElementById('reset-btn');
// 1. Starting Variables
let score = 0;
let clickPower = 1;
let upgradeCost = 10;

// 2. Element Selectors
const scoreEl = document.getElementById('score');
const powerEl = document.getElementById('power-val');
const costEl = document.getElementById('cost-val');
const mainBtn = document.getElementById('main-clicker');
const upgradeBtn = document.getElementById('upgrade-btn');
const resetBtn = document.getElementById('reset-btn');

// 3. Saving & Loading Functions
function saveGame() {
    const gameData = { score, clickPower, upgradeCost };
    localStorage.setItem("clickerSave", JSON.stringify(gameData));
}

function loadGame() {
    const savedData = JSON.parse(localStorage.getItem("clickerSave"));
    if (savedData) {
        score = savedData.score;
        clickPower = savedData.clickPower;
        upgradeCost = savedData.upgradeCost;
    }
    updateUI();
}

function updateUI() {
    scoreEl.innerText = Math.floor(score);
    powerEl.innerText = clickPower;
    costEl.innerText = upgradeCost;
    upgradeBtn.disabled = (score < upgradeCost);
}

// 4. Button Logic
mainBtn.addEventListener('click', () => {
    score += clickPower;
    updateUI();
    saveGame();
});

upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickPower += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        updateUI();
        saveGame();
    }
});

// 5. THE RESET LOGIC
resetBtn.addEventListener('click', () => {
    if (confirm("Are you sure? This will delete ALL your progress!")) {
        localStorage.removeItem("clickerSave"); // Delete save file
        score = 0;
        clickPower = 1;
        upgradeCost = 50;
        updateUI();
    }
});

// Initialize the game
loadGame();
resetBtn.addEventListener('click', () => {
    if (confirm("Reset everything back to zero?")) {
        localStorage.clear(); // Deletes the save
        location.reload();    // Refreshes the page to start over
    }
});
