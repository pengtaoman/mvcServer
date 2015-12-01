/**
		 * 页面初始化
		 */
var obj=parent.query.document;		 
var eccn=new ECCN("ec");
function init(message){
	if(message != ""){
    	alert(message);
    }
    eccn.doPrep=false;//不使用预查询 
	//不使用ajax翻页
	eccn.ajaxSubmit=false;
	eccn.init();
	
	obj.getElementById('bcheck').disabled=true;
 	obj.getElementById('bback').disabled=true;
}	

function getWorkNO(workno,checkFlag){
	if(checkFlag=='已审核'){
		obj.getElementById('bback').disabled=false;
		obj.getElementById('bcheck').disabled=true;
	}else{
		obj.getElementById('bcheck').disabled=false;
		obj.getElementById('bback').disabled=true;
	}
	//action 中 check & undoCheck 方法用到
	obj.getElementById('fWorkNO').value=workno;
}

