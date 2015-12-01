if(!window.trim){
	function trim(str, wh){
		if(typeof(str)!="string"){ return str; }
		if(!str.length){ return str; }
		var re = (wh > 0) ? (/^\s+/) : (wh < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
		return str.replace(re, "");
	}
}


if(!window.trimField){
	function trimField(obj){
		if(obj&&obj.value){
			obj.value=trim(obj.value);
		}
	}
}