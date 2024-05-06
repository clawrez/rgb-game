function reset() {
    player = {
        lastTick: Date.now(),
        // Options
        fontFace: [0],
        autoSave: true,
    
        // Game
        points: new Decimal("0"),
        pointsMulti: new Decimal("1"),
        startingPoints: new Decimal("0"),
        totalPoints: new Decimal("0"),
        rgb: [
            0, 0, 0
        ],
        rgbMin: [
            0, 0, 0
        ],
        rgbMinCost: new Decimal("1e6"),
        rgbMax: [
            1, 1, 1
        ],
        rgbMaxCost: new Decimal("100"),
        colourMulti: [
            0, 0, 0
        ],
        colourMultiCost: new Decimal("1000"),
        rgbCostScaling: new Decimal("1"),
        hexcode: "#000000",
        light: new Decimal("0"),
        totalLight: new Decimal("0"),
        potentialLight: new Decimal("0"),
        lightUpgrades: [],
        lightMilestones: [],
    }
}

let rollInterval = 1000/6

const lightUpgradeCosts = [1, 3, 10, 100, 1000]
const lightMilestoneReqs = [1, 5, 75, 5000]


var saveItemName = "rgb save";

function save(){
    localStorage.setItem(saveItemName, btoa(JSON.stringify(player)));
}

function load(){
    reset()
    var loadedSave = localStorage.getItem(saveItemName);
    if (loadedSave===null) return;
    decoded = JSON.parse(atob(loadedSave));
    for (let item in decoded) player[item] = decoded[item]
}