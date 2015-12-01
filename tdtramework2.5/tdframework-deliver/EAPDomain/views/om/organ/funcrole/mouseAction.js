	var mObj;
	var strClassName;
	function tabClick(obj){
		if(mObj != obj){
			mObj.style.cursor="hand";
			mObj.className='info_off';
			var tmpID="tab"+mObj.id.substring(3);
						
			document.all[tmpID].style.display="none";
			mObj=obj;
			obj.style.color="black";
			obj.style.textDecoration = "";
			obj.className='info_on';
			obj.style.cursor="none";
			tmpID="tab"+obj.id.substring(3);
			//alert (tmpID);
			document.all[tmpID].style.display="block";
		}
	}		
	function mouseOverTab(obj){
		if(mObj != obj){
			obj.style.color="red";
			obj.style.textDecoration = "underline";
		}
	}
	function mouseOutTab(obj){
		if(mObj != obj){
			obj.style.color="black";
			obj.style.textDecoration = "";
		}
	}