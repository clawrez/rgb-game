setInterval(() => {
    let dt = (Date.now() - player.lastTick) / 1000;
    player.lastTick = Date.now();

    let rPoints = Decimal.times(Decimal.pow("2",player.colourMulti[0]),Decimal.add(1,player.rgbMin[0]))
    let gPoints = Decimal.times(Decimal.pow("2",player.colourMulti[1]),Decimal.add(1,player.rgbMin[1]))
    let bPoints = Decimal.times(Decimal.pow("2",player.colourMulti[2]),Decimal.add(1,player.rgbMin[2]))

    player.lowestRoll = Decimal.times(Decimal.times(Decimal.times(rPoints,gPoints),bPoints),player.pointsMulti)

    // Light
    player.potentialLight = Decimal.floor(Decimal.pow(Decimal.divide(player.totalPoints, "1e9"), "0.5"))

    // Light Milestones
    for (let i = 0; i < lightMilestoneReqs.length; i++) {
        if (Decimal.gte(player.totalLight, lightMilestoneReqs[i])) {
            player.lightMilestones[i] = true
        }
    }

    // Light Milestone Rewards
    if (player.lightMilestones[1]) {
        player.points = Decimal.add(player.points,Decimal.times(player.lowestRoll,dt))
    }
    if (player.lightMilestones[2]) {
        player.startingPoints = new Decimal("10000")
    }
}, 1000 / 30);