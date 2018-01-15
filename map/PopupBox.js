class PopupBox{
	static display(aSentence){
		let tBox=document.getElementById("sentence");
		tBox.innerHTML=aSentence;
		tBox.style.display="block";
		return new Promise((res,rej)=>{
			KeyMonitor.waitKey(()=>{
				tBox.style.display="none";
				res();
			})
		})
	}
}
