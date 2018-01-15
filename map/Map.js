class Map{
	static setMap(aMap){
		this.map=new Array();
		this.creature=new Array();
		//マスセット
		let tMap=document.getElementById("map");
		tMap.textContent="";
		for(let tMasList of aMap.map){
			let tMasArray=new Array();
			this.map.push(tMasArray);
			for(let tCol of tMasList){
				let tMas=new Mas(aMap.mapChip[tCol]);
				tMasArray.push(tMas);
				tMap.appendChild(tMas.getElement());
			}
			tMap.appendChild(document.createElement("br"));
		}
		//npcとかセット
		this.creatures=new Array();
		for(let tCreature of aMap.creatures){
			let tClass;
			if(tCreature.creature=="npc") tClass=Npc;
			else if(tCreature.creature=="thing") tClass=Thing;
			else if(tCreature.creature="item") tClass=ItemObject;
			else if(tCreature.creature="chest") tClass=Chest;
			this.creature.push(new tClass(tCreature));
		}
	}
	static getMas(aX,aY){
		if(aY<0||this.map.length<=aY)return null;
		if(aX<0||this.map[aY].length<=aX)return null;
		return this.map[aY][aX];
	}
	//主人公を作成
	static createHero(aX,aY,aImage){
		let tHero=new MyChara(aX,aY,aImage);
		this.creature.unshift(tHero)
		return tHero;
	}
	static getCreatureById(aId){
		for(let tCreature of this.creature){
			if(tCreature.getId()==aId)return tCreature;
		}
		return null;
	}
}
