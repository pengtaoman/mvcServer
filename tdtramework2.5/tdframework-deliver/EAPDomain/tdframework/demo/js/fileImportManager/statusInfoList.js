var eccn=new ECCN("ec");
  
function init(){
	//不使用预读取技术，使用传统方式提交form
	//eccn.doPrep=false;
	// 不预读取“前一页”
	//eccn.doPrepPrev=false;
	eccn.init();
	//var alertMessage = document.all("alertMsg").value;
	//if(alertMessage!="null"){
	//	alert(alertMessage);
	//}
}

function showAllText(obj){
    if(obj.style.width=="100px" && obj.className=="ellipsis"){
    	obj.style.width="100%";
    	obj.className="";
    }
	else{
		obj.style.width="100px";
		obj.className="ellipsis";
	}
}