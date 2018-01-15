class MyChara extends Creature{
	constructor(aX,aY,aImage){
		super({id:"hero",position:{x:aX,y:aY},size:3},"../image/map/"+aImage+".png");
		//マップ表示位置調整
		let tMap=document.getElementById("map");
		tMap.style.marginTop=-aY*mMasSize+350-mMasSize+"px";
		tMap.style.marginLeft=-aX*mMasSize+500-mMasSize+"px";
	}
	//移動終了時にキー入力状態を見て,即次の移動
	moveEnd(){
		let tDownMoveKey=KeyMonitor.getDownMoveKey();
		if(tDownMoveKey.length<=0)return;
		this.move(tDownMoveKey[0]);
	}
	//正面のマスに話かける
	speakTo(){
		let tMas;
		switch (this.direction) {
			case "up":
				tMas=Map.getMas(this.x,this.y-1);
				break;
			case "down":
				tMas=Map.getMas(this.x,this.y+1);
				break;
			case "left":
				tMas=Map.getMas(this.x-1,this.y);
				break;
			case "right":
				tMas=Map.getMas(this.x+1,this.y);
				break;
			default:
		}
		if(tMas==null||tMas.getOnChara()==null)return;

		tMas.getOnChara().speaked();
	}
	//移動時にマップも移動させる
	moveHard(aDirectionPosition,aComa,aCallBack){
		super.moveHard(aDirectionPosition,aComa,aCallBack);
		$("#map").animate({
			marginTop:"-="+aDirectionPosition[1]*mMasSize+"px",
			marginLeft:"-="+aDirectionPosition[0]*mMasSize+"px"
		},300,"linear")
	}
}
