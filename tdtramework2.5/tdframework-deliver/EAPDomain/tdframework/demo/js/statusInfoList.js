var eccn=new ECCN("ec");
  
function init(){
	//��ʹ��Ԥ��ȡ������ʹ�ô�ͳ��ʽ�ύform
	//eccn.doPrep=false;
	// ��Ԥ��ȡ��ǰһҳ��
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