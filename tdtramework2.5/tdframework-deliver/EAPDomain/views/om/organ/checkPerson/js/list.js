/**
		 * ҳ���ʼ��
		 */
var obj=parent.query.document;		 
var eccn=new ECCN("ec");
function init(message){
	if(message != ""){
    	alert(message);
    }
    eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	//��ʹ��ajax��ҳ
	eccn.ajaxSubmit=false;
	eccn.init();
	
	obj.getElementById('bcheck').disabled=true;
 	obj.getElementById('bback').disabled=true;
}	

function getWorkNO(workno,checkFlag){
	if(checkFlag=='�����'){
		obj.getElementById('bback').disabled=false;
		obj.getElementById('bcheck').disabled=true;
	}else{
		obj.getElementById('bcheck').disabled=false;
		obj.getElementById('bback').disabled=true;
	}
	//action �� check & undoCheck �����õ�
	obj.getElementById('fWorkNO').value=workno;
}

