setInterval(() => {
    let dt = (Date.now() - player.lastTick) / 1000;
    player.lastTick = Date.now();

    let rPoints = Decimal.times(Decimal.pow("2",player.colourMulti[0]),Decimal.add(1,player.rgbMin[0]))
    let gPoints = Decimal.times(Decimal.pow("2",player.colourMulti[1]),Decimal.add(1,player.rgbMin[1]))
    let bPoints = Decimal.times(Decimal.pow("2",player.colourMulti[2]),Decimal.add(1,player.rgbMin[2]))

    player.lowestRoll = Decimal.times(Decimal.times(Decimal.times(rPoints,gPoints),bPoints),player.pointsMulti)

    player.pointsMulti = player.pointMultis.reduce( (a, b) => Decimal.times(a,b) )
    // Light
    player.potentialLight = Decimal.floor(Decimal.pow(Decimal.divide(player.totalPoints, "1e9"), "0.33"))

    // Light Milestones
    for (let i = 0; i < lightMilestoneReqs.length; i++) {
        if (Decimal.gte(player.totalLight, lightMilestoneReqs[i])) {
            player.lightMilestones[i] = true
        }
    }

    // Light Milestone Rewards
    if (player.lightMilestones[1]) {
        player.points = Decimal.add(player.points,Decimal.times(player.lowestRoll,dt))
        player.totalPoints = Decimal.add(player.totalPoints,Decimal.times(player.lowestRoll,dt))

    }
    if (player.lightMilestones[2]) {
        player.startingPoints = new Decimal("10000")
    }

    // Light Upgrades
    if (player.lightUpgrades[0]){
        player.pointMultis[0] = Decimal.add("1",Decimal.log2(Decimal.add("1",player.totalLight)))
    } else {
        player.pointMultis[0] = new Decimal("1")
    }
    if (player.lightUpgrades[1] && rollDoubled == false){
        rollDoubled = true;
        clearInterval(rgbRoll)
        rgbRoll = setInterval(() => {
            if(squareHovered) {rollRGB()}
        }, 1000/12);
    }
    if (player.lightUpgrades[2]){
        player.rgbCostScaling = new Decimal("0.95")
    } else {
        player.rgbCostScaling = new Decimal("1")
    } if(player.lightUpgrades[3]){
        player.pointMultis[1] = new Decimal("4")
    } else {
        player.pointMultis[1] = new Decimal("1")
    }
}, 1000 / 30);