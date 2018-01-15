class Event{
	//リストで渡されたイベント実行
	static operateEventList(aEventList,aChara){
		return new Promise((res,rej)=>{
			let tOperateEvent=(i)=>{
				if(i>=aEventList.length){
					//全てイベント終了
					res();
					return;
				}
				//イベント処理
				let tEvent=aEventList[i];
				let tChara=(tEvent.target==undefined)?aChara:Map.getCreatureById(tEvent.target);
				switch (tEvent.event) {
					case "turnToHero"://主人公の方をむく
						tChara.turnToHero();
						tOperateEvent(i+1);
						break;
					case "speak"://会話文表示
						this.speakEvent(tEvent.sentence).then(()=>{tOperateEvent(i+1)})
						break;
					case "turn"://振り向く
						tChara.turn(tEvent.direction);
						tOperateEvent(i+1);
						break;
					case "move"://移動
						this.moveEvent(tEvent.directions,tChara).then(()=>{tOperateEvent(i+1)})
						break;
					case "battle"://バトル
						this.battleEvent(tEvent.data).then((aWinOrLose)=>{
							this.operateEventList(tEvent[aWinOrLose],aChara).then((aFlag)=>{
								if(aFlag=="end"){
									res("end");
									return;
								}
								tOperateEvent(i+1);
							})
						})
						break;
					case "branch"://条件分岐
						let tFlag=SaveDatabase.getFlag(tEvent.flag);
						this.operateEventList(tEvent[tFlag],aChara).then((aFlag)=>{
							if(aFlag=="end"){
								res("end");
								return;
							}
							tOperateEvent(i+1);
						})
						break;
					case "setFlag"://フラグセット
						SaveDatabase.setFlag(tEvent.flag,tEvent.value);
						tOperateEvent(i+1);
						break;
					case "end"://イベント強制終了
						res("end");
						break;
					default:
					console.log("存在しないイベント",tEvent);
				}
			}
			tOperateEvent(0);
		})
	}
	//会話イベント
	static speakEvent(aSentence){
		return PopupBox.display(aSentence);
	}
	//移動イベント
	static moveEvent(aDirections,tChara){
		return new Promise((res,rej)=>{
			let tMoveFunction=(i)=>{
				if(i>=aDirections.length){
					//移動終了
					res();
					return;
				}
				//強制移動
				tChara.moveHard(convertDirectionToPosition(aDirections[i]),tChara.getMoveComa(aDirections[i]),()=>{tMoveFunction(i+1);})
			}
			tMoveFunction(0);
		})
	}
	//バトルイベント
	static battleEvent(aData){
		return new Promise((res,rej)=>{
			Frame.displayBattle(aData).then(()=>{
				//バトル終了
				if(mWinLose=="win"){
					res("win");
				}
				else if(mWinLose="lose"){
					res("lose");
					// this.speakEvent("敗北した")
				}
			})
		})
	}
}
