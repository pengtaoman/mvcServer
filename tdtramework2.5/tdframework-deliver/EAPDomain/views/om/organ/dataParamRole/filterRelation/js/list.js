/**
 * ҳ���ʼ��
 */
var eccn=new ECCN("ec");

function init(message){

    eccn.doPrep=false;
	eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}
	
	parent.query.document.getElementById('bSave').disabled=false;
}
/*
 *ִ�б��淽��
 */
function doSave(webpath){
	var operType = document.getElementById('operType').value;
	var checkboxValues = '';
	
	var array = document.getElementsByName('checkboxs');
 	for (i=0;i<array.length;i++){
 		var obj = array[i];
 		if(obj.checked==true && obj.value!=''){
 			var values = obj.value.split("~");
 			var parmColumn = document.getElementById(values[4]).value;
 			if(parmColumn!=null && parmColumn!=''){
 				checkboxValues = checkboxValues+values[0]+"~"+values[1]+"~"+values[2]+"~"+values[3]+"~"+parmColumn+":";
 			}else{
 				alert("��ѡ�� "+values[2]+" ����Ӧ�Ĺ����������ֶ�");
 				return;
 			}
 		}
 	}
 	
 	if(checkboxValues == ''){
 		if(operType != 'modify'){
			return;
		}
 	}
 	
	document.forms[0].action=webpath+"/om/filterRelManage.do?method=addFilterRel&checkboxValues="+checkboxValues;
	document.forms[0].target='detail';
	document.forms[0].submit();
}