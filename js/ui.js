let pointsContainer = document.getElementById("points-container")
let lightContainer = document.getElementById("light-container")
let photonsContainer = document.getElementById("photons-container")


let pointsDisplay = document.getElementById("points")
let lightDisplay = document.getElementById("light")
let photonsDisplay = document.getElementById("photons")

let pointsTooltip = document.getElementById("points-tooltip")
let lightTooltip = document.getElementById("light-tooltip")
let photonsTooltip = document.getElementById("photons-tooltip")

let lightNav = document.getElementById("light-nav")
let fidgetToysNav = document.getElementById("fidget-toys-nav")

let redNumber = document.getElementById("red")
let greenNumber = document.getElementById("green")
let blueNumber = document.getElementById("blue")

let hexCodeValue = document.getElementById("hexcode")

let square = document.getElementById("square")

let rgbMinUpgradePanel = document.getElementById("rgb-min-panel")

let rgbMinUpgrade0 = document.getElementById("rgb-min-0")
let rgbMinUpgrade1 = document.getElementById("rgb-min-1")
let rgbMinUpgrade2 = document.getElementById("rgb-min-2")

let rgbMinUpgradeCost = document.getElementById("rgb-min-cost")

let rgbMaxUpgrade0 = document.getElementById("rgb-max-0")
let rgbMaxUpgrade1 = document.getElementById("rgb-max-1")
let rgbMaxUpgrade2 = document.getElementById("rgb-max-2")

let rgbMaxUpgradeCost = document.getElementById("rgb-max-cost")

let colourMult0 = document.getElementById("colour-mult-0")
let colourMult1 = document.getElementById("colour-mult-1")
let colourMult2 = document.getElementById("colour-mult-2")

let colourMultUpgradeCost = document.getElementById("colour-mult-cost")

let lightUpgradesUI = [
    document.getElementById("light-upgrade-0"),
    document.getElementById("light-upgrade-1"),
    document.getElementById("light-upgrade-2"),
    document.getElementById("light-upgrade-3"),
    document.getElementById("light-upgrade-4"),
    document.getElementById("light-upgrade-5"),
]

let lightUpgradeStatsUI = [
    document.getElementById("light-upgrade-stat-0"),
    null,
    null,
    null,
    null,
    null,
]

let lightUpgradeCostsUI = [
    document.getElementById("light-upgrade-cost-0"),
    document.getElementById("light-upgrade-cost-1"),
    document.getElementById("light-upgrade-cost-2"),
    document.getElementById("light-upgrade-cost-3"),
    document.getElementById("light-upgrade-cost-4"),
    document.getElementById("light-upgrade-cost-5"),
]

let lightMilestonesUI = [
    document.getElementById("light-milestone-0"),
    document.getElementById("light-milestone-1"),
    document.getElementById("light-milestone-2"),
    document.getElementById("light-milestone-3"),
]

let lightMilestoneReqsUI = [
    document.getElementById("light-milestone-req-0"),
    document.getElementById("light-milestone-req-1"),
    document.getElementById("light-milestone-req-2"),
    document.getElementById("light-milestone-req-3"),
]

let lessFlashButton = document.getElementById("less-flash-button")

let colourClickerTimeDisplay = document.getElementById("colour-clicker-time")


function updateCurrency(c) {
    switch (c) {
        case 'points':
            pointsContainer.classList.add("add-to-currency");
            setTimeout(() => {
                pointsContainer.classList.remove("add-to-currency");
            }, 100);
            break;
        case 'light':
            lightContainer.classList.add("add-to-currency");
            setTimeout(() => {
                lightContainer.classList.remove("add-to-currency");
            }, 100);
            break;
        case 'photons':
            photonsContainer.classList.add("add-to-currency");
            setTimeout(() => {
                photonsContainer.classList.remove("add-to-currency");
            }, 100);
            break;
        default:
            console.log(`bleh`);
    }
}

setInterval(() => {
    updateUI()
}, 1000 / 30);

function updateUI() {
    pointsDisplay.textContent = formatWhole(player.points, true)
    lightDisplay.textContent = "(+" + formatWhole(player.potentialLight, true) + ") " + formatWhole(player.light)
    photonsDisplay.textContent = formatWhole(player.photons, true)

    pointsTooltip.textContent = formatWhole(player.totalPoints, true)
    lightTooltip.textContent = formatWhole(player.totalLight, true)
    photonsTooltip.textContent = formatWhole(player.totalPhotons, true)


    redNumber.textContent = ("00" + player.rgb[0]).slice(-3)
    greenNumber.textContent = ("00" + player.rgb[1]).slice(-3)
    blueNumber.textContent = ("00" + player.rgb[2]).slice(-3)

    hexCodeValue.textContent = player.hexcode

    square.style.backgroundColor = player.hexcode

    if(player.lessFlash){
        square.classList.add("less-flash")
        lessFlashButton.classList.add("options-enabled")
    } else {
        square.classList.remove("less-flash")
        lessFlashButton.classList.remove("options-enabled")
    }

    rgbMinUpgrade0.textContent = ("00" + player.rgbMin[0]).slice(-3)
    rgbMinUpgrade1.textContent = ("00" + player.rgbMin[1]).slice(-3)
    rgbMinUpgrade2.textContent = ("00" + player.rgbMin[2]).slice(-3)

    rgbMinUpgradeCost.textContent = formatWhole(player.rgbMinCost)

    rgbMaxUpgrade0.textContent = ("00" + player.rgbMax[0]).slice(-3)
    rgbMaxUpgrade1.textContent = ("00" + player.rgbMax[1]).slice(-3)
    rgbMaxUpgrade2.textContent = ("00" + player.rgbMax[2]).slice(-3)

    rgbMaxUpgradeCost.textContent = formatWhole(player.rgbMaxCost)

    colourMult0.textContent = formatWhole(Decimal.pow("2", player.colourMulti[0]))
    colourMult1.textContent = formatWhole(Decimal.pow("2", player.colourMulti[1]))
    colourMult2.textContent = formatWhole(Decimal.pow("2", player.colourMulti[2]))

    colourMultUpgradeCost.textContent = formatWhole(player.colourMultiCost)


    for (let i = 0; i < lightUpgradesUI.length; i++) {
        lightUpgradeCostsUI[i].textContent = formatWhole(lightUpgradeCosts[i])
    }

    for (let i = 0; i < lightMilestonesUI.length; i++) {
        lightMilestoneReqsUI[i].textContent = formatWhole(lightMilestoneReqs[i])
    }

    for (let i = 0; i < lightMilestonesUI.length; i++) {
        if (player.lightMilestones[i]) {
            lightMilestonesUI[i].classList.add("milestone-earned")
        } else {
            lightMilestonesUI[i].classList.remove("milestone-earned")
        }
    }

    for (let i = 0; i < lightUpgradesUI.length; i++) {
        if (player.lightUpgrades[i]) {
            lightUpgradesUI[i].classList.add("bought")
        } else {
            lightUpgradesUI[i].classList.remove("bought")

        }

    }

    lightUpgradeStatsUI[0].textContent = format(Decimal.add("1", Decimal.log2(Decimal.add("1", player.totalLight))), 1)

    if (player.lightMilestones[0]) {
        rgbMinUpgradePanel.classList.remove("hidden")
    } else {
        rgbMinUpgradePanel.classList.add("hidden")
    }

    if(player.unlockedLight){
        lightNav.classList.remove("hidden")
    }

    if(player.unlockedFidgetToys){
        fidgetToysNav.classList.remove("hidden")
    }

    colourClickerTimeDisplay.textContent = ('0' + (Math.floor(player.colourClickerTime / 60)) % 60).slice(-2) + ":" + ('0' + Math.floor(player.colourClickerTime) % 60).slice(-2)
}