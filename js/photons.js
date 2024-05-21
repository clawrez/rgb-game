function buyPhotonEmitter(x){
    if(Decimal.gt(player.photonEmitters[x].cost,player.light))return
    player.light = Decimal.minus(player.light,player.photonEmitters[x].cost)
    player.photonEmitters[x].cost = Decimal.mult(player.photonEmitters[x].cost,"1e3")
}