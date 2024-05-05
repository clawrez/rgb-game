setInterval(() => {
    // Light
    player.potentialLight = Decimal.floor(Decimal.pow(Decimal.divide(player.totalPoints,"1e9"),"0.5"))
}, 1000 / 30);