class KeyMonitor{
	static setMapPage(){
		this.downMoveKey=new Array();
		$(window).keydown((e)=>{
			//移動
			if(e.keyCode==37){
				mMyChara.move("left");
				if(this.downMoveKey.indexOf("left")==-1){
					this.downMoveKey.unshift("left");
				}
			}
			if(e.keyCode==38){
				mMyChara.move("up");
				if(this.downMoveKey.indexOf("up")==-1){
					this.downMoveKey.unshift("up");
				}
			}
			if(e.keyCode==39){
				mMyChara.move("right");
				if(this.downMoveKey.indexOf("right")==-1){
					this.downMoveKey.unshift("right");
				}
			}
			if(e.keyCode==40){
				mMyChara.move("down");
				if(this.downMoveKey.indexOf("down")==-1){
					this.downMoveKey.unshift("down");
				}
			}
			//メニュー
			if(e.keyCode==88)Frame.displayMenu();
			//話かける
			if(e.keyCode==90)mMyChara.speakTo();
		})
		$(window).keyup((e)=>{
			if(e.keyCode==37){
				mMyChara.move("left");
				if(this.downMoveKey.indexOf("left")!=-1){
					this.downMoveKey.splice(this.downMoveKey.indexOf("left"),1);
				}
			}
			if(e.keyCode==38){
				mMyChara.move("up");
				if(this.downMoveKey.indexOf("up")!=-1){
					this.downMoveKey.splice(this.downMoveKey.indexOf("up"),1);
				}
			}
			if(e.keyCode==39){
				mMyChara.move("right");
				if(this.downMoveKey.indexOf("right")!=-1){
					this.downMoveKey.splice(this.downMoveKey.indexOf("right"),1);
				}
			}
			if(e.keyCode==40){
				mMyChara.move("down");
				if(this.downMoveKey.indexOf("down")!=-1){
					this.downMoveKey.splice(this.downMoveKey.indexOf("down"),1);
				}
			}
		})
	}
	//押し込まれている移動キーを取得
	static getDownMoveKey(){
		if(this.downMoveKey==undefined) return [];
		return this.downMoveKey;
	}
	//ユーザからの応答待ち
	static waitKey(aCallBack){
		$(window).keydown((e)=>{
			if(e.keyCode==90)aCallBack();
		})
	}
	//キー入力監視ストップ
	static stop(){
		$(window).off();
	}
}
