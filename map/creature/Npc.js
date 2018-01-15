class Npc extends Creature{
	constructor(aData){
		super(aData,"../image/map/キャラチップ/"+aData.image+".png");
		if(aData.direction!=undefined)this.turn(aData.direction);
	}
}
