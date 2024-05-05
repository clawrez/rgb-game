setInterval(() => {
    // Light
    player.potentialLight = Decimal.floor(Decimal.pow(Decimal.divide(player.totalPoints,"1e9"),"0.5"))

    // Light Milestones
    for(let i = 0;i < lightMilestoneReqs.length;i++){
        if(Decimal.gte(player.totalLight,lightMilestoneReqs[i])){
            player.lightMilestones[i] = true
        }
    }
}, 1000 / 30);