class Creature{
	constructor(aData,aImage){
		this.id=aData.id
		this.x=aData.position.x;
		this.y=aData.position.y;
		this.tag=document.createElement("div");
		this.tag.style.position="absolute";
		this.tag.style.width=mMasSize+"px";
		this.tag.style.height=mMasSize+"px";
		this.tag.style.marginTop=-mMasSize+"px";
		this.tag.style.overflow="hidden";
		this.tag.style.zIndex="5";
		this.image=document.createElement("img");
		this.image.src=aImage;
		this.tag.appendChild(this.image);
		this.tag.id="creature"+(mCreatureCounter++);
		this.image.onload=()=>{
			this.image.width=this.image.width*mMasSize/(mMasChipSize*aData.size);
			// this.image.height=this.image.height*mMasSize/(mMasChipSize*4);
		}
		//移動アニメーションのコマ
		this.moveComa={
			up:[[0,3],[1,3],[2,3],[1,3]],
			down:[[0,0],[1,0],[2,0],[1,0]],
			left:[[0,1],[1,1],[2,1],[1,1]],
			right:[[0,2],[1,2],[2,2],[1,2]],
		}
		this.setImage(1,0);
		Map.getMas(this.x,this.y).onChara(this);//マスクラスにキャラセット
		this.appendToMas();
		this.moveFlag=false;
		this.direction="down";//向いている方向
		//話しかけた時の関数セット
		if(aData.speak!=undefined){
			this.speaked=()=>{
				//キー入力監視ストップ
				KeyMonitor.stop();
				//イベント実行
				Event.operateEventList(aData.speak,this).then(()=>{
					//イベント終了時
					KeyMonitor.setMapPage();
				})
			}
		}
	}
	//このキャラのidを返す
	getId(){return this.id};
	//移動用アニメーションコマを返す
	getMoveComa(aDirection){return this.moveComa[aDirection]}
	//今いるマスを返す
	getPosition(){
		return {x:this.x,y:this.y};
	}
	//画像のコマ変更
	setImage(aX,aY){
		this.image.style.marginTop=-mMasSize*aY+"px";
		this.image.style.marginLeft=-mMasSize*aX+"px";
	}
	//振り向く
	turn(aDirection){
		this.direction=aDirection;
		switch (aDirection) {
			case "up":
				this.setImage(1,3)
				break;
			case "down":
				this.setImage(1,0)
				break;
			case "left":
				this.setImage(1,1)
				break;
			case "right":
				this.setImage(1,2)
				break;
			default:
		}
	}
	//このキャラがいるマスから指定した方向１マス隣のマスを返す
	getDirectionMas(aDirection){
		switch (aDirection) {
			case "up":
				return Map.getMas(this.x,this.y-1);
				break;
			case "down":
				return Map.getMas(this.x,this.y+1);
				break;
			case "left":
				return Map.getMas(this.x-1,this.y);
				break;
			case "right":
				return Map.getMas(this.x+1,this.y);
				break;
			default:
		}
	}
	//移動する
	move(aDirection){
		if(this.moveFlag)return;
		this.moveFlag=true;
		let tNextMas=this.getDirectionMas(aDirection);
		//移動できない
		if(tNextMas==null||tNextMas.getOnChara()!=null||tNextMas.canOn()==false){
			this.turn(aDirection);
			this.moveFlag=false;
			return;
		}
		//移動できる
		this.moveHard(convertDirectionToPosition(aDirection),this.moveComa[aDirection],()=>{this.moveEnd();})
	}
	//強制的に移動
	moveHard(aDirectionPosition,aComa,aCallBack){
		let tPreMas=Map.getMas(this.x,this.y);
		//マスクラスの操作
		if(tPreMas.getOnChara()==this)tPreMas.outChara();
		this.x+=aDirectionPosition[0];
		this.y+=aDirectionPosition[1];
		let tNextMas=Map.getMas(this.x,this.y);
		if(tNextMas.getOnChara()==null)tNextMas.onChara(this)
		//画像変更アニメーション
		for(let i=0;i<aComa.length;i++){
			setTimeout(()=>{this.setImage(aComa[i][0],aComa[i][1])},300/aComa.length*i)
		}
		//移動アニメーション
		$("#"+this.tag.id).animate({
			marginTop:aDirectionPosition[1]*mMasSize-mMasSize+"px",
			marginLeft:aDirectionPosition[0]*mMasSize+"px"
		},300,"linear",()=>{
			//アニメーション終了時
			this.tag.style.marginTop=-mMasSize+"px";
			this.tag.style.marginLeft="0";
			this.appendToMas();
			this.moveFlag=false;
			aCallBack();
		})
	}
	//移動終了時に呼ばれる
	moveEnd(){

	}
	appendToMas(){
		let tMas=Map.getMas(this.x,this.y);
		tMas.getElement().appendChild(this.tag);
	}
	//話しかけた時
	speaked(){

	}
	//主人公の方をむく
	turnToHero(){
		let tHeroPosition=mMyChara.getPosition();
		let tXDif=(this.x-tHeroPosition.x<0)?-(this.x-tHeroPosition.x):(this.x-tHeroPosition.x);
		let tYDif=(this.y-tHeroPosition.y<0)?-(this.y-tHeroPosition.y):(this.y-tHeroPosition.y);
		if(tXDif>tYDif){
			if(this.x-tHeroPosition.x<0) this.turn("right");
			else this.turn("left");
		}
		else{
			if(this.y-tHeroPosition.y<0) this.turn("down");
			else this.turn("up");
		}
	}
	//話す
	speak(aSentence){
		return PopupBox.display(aSentence);
	}
}
var mCreatureCounter=0;
//方向を座標の変化量に変換
function convertDirectionToPosition(aDirection){
	switch (aDirection) {
		case "up":
			return [0,-1]
			break;
		case "down":
			return [0,1]
			break;
		case "left":
			return [-1,0]
			break;
		case "right":
			return [1,0]
			break;
		default:
	}
}
