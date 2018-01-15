class PreImage{
	static init(){
		this.images={};
	}
	//マップチップをプリロード
	static preLoadMapChip(aData,aCallBack){
		this.MapChipLength=0;
		for(let tMas in aData.mapChip){
			this.MapChipLength+=3;
		}
		this.callBack=aCallBack;
		for(let tNum in aData.mapChip){
			let tMas=aData.mapChip[tNum];
			for(let tImage of [tMas.ground,tMas.object,tMas.accessories]){
				if(tImage.divide==true){
					//さらに4分割
					this.MapChipLength+=3;
					for(let tQuarter of [tImage.lt,tImage.rt,tImage.lb,tImage.rb]){
						this.preLoad(tQuarter.image);
					}
				}
				else{
					this.preLoad(tImage.image);
				}
			}
		}
	}
	static getImage(aPath){
		return this.images[aPath].img.cloneNode(true);
	}
	//引数のパスの画像をプリロードしていないならプリロード
	static preLoad(aPath){
		if(this.images[aPath]==undefined&&aPath!=""){
			let tImage=document.createElement("img");
			tImage.src=getImagePath(aPath);
			tImage.onload=()=>{
				this.images[aPath]={img:tImage,width:tImage.width,height:tImage.height};
				tImage.width=tImage.width*mMasSize/mMasChipSize;
				tImage.height=tImage.height*mMasSize/mMasChipSize;
				this.endLoad();
			}
		}
		else{
			this.endLoad();
		}
	}
	//プリロードが終わったら呼ばれる(全てのプリロードが終わったらcallback)
	static endLoad(){
		this.MapChipLength--;
		if(this.MapChipLength>0) return;
		this.callBack();
	}
}
PreImage.init();
