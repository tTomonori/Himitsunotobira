class Frame{
	//メニューを開く
	static displayMenu(){
		$(window).off();
		let tFrame=document.getElementById("frame");
		tFrame.style.display="block";
		tFrame.src="../menu/menu.html";
		tFrame.focus();
		this.closeFrame=()=>{
			tFrame.style.display="none";
			tFrame.src="";
			KeyMonitor.setMapPage();
			window.focus();
		}
	}
	//バトル画面を開く
	static displayBattle(aData){
		$(window).off();
		let tFrame=document.getElementById("frame");
		tFrame.style.display="block";
		tFrame.src='../battle/battle.html?chara='+aData.enemy+'&num='+(1);
		tFrame.focus();
		return new Promise((res,rej)=>{
			this.closeFrame=()=>{
				tFrame.style.display="none";
				tFrame.src="";
				window.focus();
				res();
			}
		})
	}
	//iframeを閉じる時に実行(他のメソッドで上書きする)
	static closeFrame(){}
}
var mWinLose;
//勝敗結果を受け取る
function setWinLose(aWinLose){
	mWinLose=aWinLose;
}
