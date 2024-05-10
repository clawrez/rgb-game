function reset() {
    player = {
        lastTick: Date.now(),
        // Options
        fontFace: [0],
        autoSave: true,
        lessFlash: false,
        // Game
        points: new Decimal("0"),
        pointsMulti: new Decimal("1"),
        pointMultis: [new Decimal("1"),new Decimal("1"),],
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
        unlockedLight: false,
        light: new Decimal("0"),
        totalLight: new Decimal("0"),
        potentialLight: new Decimal("0"),
        lightUpgrades: [],
        lightMilestones: [],
        photons: new Decimal("0"),
        totalPhotons: new Decimal("0"),
    }
}

const lightUpgradeCosts = [new Decimal("1"), new Decimal("71"), new Decimal("150"), new Decimal("1000"), new Decimal("8500"), new Decimal("1e6")]
const lightMilestoneReqs = [new Decimal("1"), new Decimal("15"), new Decimal("325"), new Decimal("25000")]


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

function importSave(){
    let importedSave = prompt("Paste your save below.")
    if (importedSave && importedSave != null && importedSave != "") {
        localStorage.setItem(saveItemName, importedSave);
            location.reload()
      }
      else {
        alert("Not a valid save.")
      }
}

function hardReset() {
    if (confirm("Are you SURE you want to COMPLETELY RESET your save?")) {
        if (confirm("Like... /srs fr..???")) {
            reset()
            save()
            location.reload()
        }
    }
}

function exportSave(){
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function() {
        alert("Save exported to clipboard successfully.")
    }, function() {
        alert("Error exporting to clipboard.")
  });
}

setInterval(function(){ // auto save
    save();
}, 15000);