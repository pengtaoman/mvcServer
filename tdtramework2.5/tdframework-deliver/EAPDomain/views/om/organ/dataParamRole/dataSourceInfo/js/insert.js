/**
 * ҳ���ʼ��
 */
var eccn=new ECCN("ec");

function init(flagDisplay,tableName,tableDesc,showNewData){
    eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	eccn.init();
	if(flagDisplay!=''){
		document.getElementById('tableInfo').style.display="";
		document.getElementById('bSave').style.display="";
		document.getElementById('bBack').style.display="";
	}
	if(tableName!=''){
		document.getElementById('tableName').value=tableName;
	}
	if(tableDesc!=''){
		document.getElementById('tableDesc').value=tableDesc;
	}
	if(showNewData!=''){
		document.getElementById('showNewData').value=showNewData;
	}
}

//�������淽��
function doSave(webpath){
	var message=checkValue();
	if(message!=''){
		alert(message);
		return false;
	}
	//У�鲻�ɶ���һ��ID��
 	var arrayObj=new Array();
	//Ϊcheckbox ��ֵ��
	var objs=document.getElementsByName('checkboxs');
	for(i=0;i<objs.length;i++){
		if(objs[i].checked==true){
		var msg=getValue(objs[i],arrayObj);
			if(msg!=''){
				alert(msg);
				return false;
			}
		}
	}
	//ˢ��EC TABLE��״̬��Ϣ
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	//��unieap form tableDesc��ֵ��ֵ�� ec form tableDesc
	document.getElementsByName('tableDesc')[1].value=document.getElementsByName('tableDesc')[0].value;
	var showNewData = document.getElementById('showNewData').value;
	document.getElementById('ec').action=webpath+"/om/datasourceinfo.do?method=doSave&showNewData="+showNewData;
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
	window.close();
}

//checkbox �����¼�
function getValue(cheObj,arrayObj){	
	var canBeSub="";
	//��ȡclomnName ֵ& dataType ֵ
    var vals=cheObj.id;
    var point=vals.indexOf('~');
    //clomnName ֵ
	var val=vals.substring(0,point);
	//dataType ֵ
	var dataType=vals.substr(point+1);
	
	//�����ֶ�������id
	var colDescId=val+'colDesc';
	//�����ֶ�������value
	var	colDescVal=document.getElementById(colDescId).value;
	
	//���й�����������id
	var fillterEffId=val+'fillterEff';
	//���й�����������value
	var	fillterEffVal=document.getElementById(fillterEffId).value;
	//�����ֶ����õ�id
	var colEffectId=val+'colEffect';
	//�����ֶ����õ�value
	var	colEffectVal=document.getElementById(colEffectId).value;
	if(colEffectVal==''){
		canBeSub+="��ѡ��'�ֶ�����' \n";
	}
	else if(colEffectVal==1){
		arrayObj.push(colEffectVal);
		if(arrayObj.length>1){
			canBeSub+="�ֶ�����'ID'����ѡ�ж���һ�� \n";
		}
		//Id ʱ���ܹ���������
		if(fillterEffVal!=''){
			canBeSub+="�ֶ�����Ϊ'ID'ʱ���ܹ���������\n";
		}
	}
	//name ʱ���ܹ���������
	else if(colEffectVal==2&&fillterEffVal!=''){
		canBeSub+="�ֶ�����Ϊ'NAME'ʱ���ܹ���������\n";
	}//pK ʱ���ܹ���������
	else if(colEffectVal==3&&fillterEffVal!=''){
		canBeSub+="�ֶ�����Ϊ'PK'ʱ���ܹ���������\n";
	}
	
	//�����ֶ�˳���id
	var colOrderId=val+'colOrder';
	//�����ֶ�˳���value
	var	colOrderVal=document.getElementById(colOrderId).value;
	if(colOrderVal==''){
		//alert("����д�ֶ�˳��");
		document.getElementById(colOrderId).focus();
		canBeSub+="����д�ֶ�˳��\n";
	}
	//��checkbox ֵ��ֵ��
	cheObj.value=val+'-'+colDescVal+'-'+dataType+'-'+colEffectVal+'-'+fillterEffVal+'-'+colOrderVal;
	//alert(cheObj.value);
	return canBeSub;
}

//checkbox ȫѡ ����
function allCheck(obj){
	var checkboxs=document.getElementsByName("checkboxs");
	
	if(obj.checked){
		for(i=0;i<checkboxs.length;i++){
			if(checkboxs[i].checked==false){
				checkboxs[i].click();
			}
		}
	}else{
		for(i=0;i<checkboxs.length;i++){
			if(checkboxs[i].checked==true){
				checkboxs[i].click();
			}
		}
	}
}
//��ȡ����Ϣ����
function getTablleInfo(webpath){
	var tableName=document.getElementById('tableName').value;
	if(tableName==''){
		alert("����������Ϊ�գ�����д");
		document.getElementById('tableName').focus();
		return;
	}
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=insert";
	//document.EAPForm.target='list';
    document.EAPForm.submit();
	//document.getElementById('tableInfo').style.display="";
}
// У�� ҳ������
function checkValue(){
	var message='';
	var tableName=document.getElementById('tableName').value;
	var tableDesc=document.getElementById('tableDesc').value;
	var showNewData = document.getElementById('showNewData').value;
	if(tableName==''){
		message+="����������Ϊ�գ�����д\n";
		document.getElementById('tableName').focus();
	}
	if(tableDesc==''){
		message+="���ݱ�����������Ϊ�գ�����д\n";
		document.getElementById('tableDesc').focus();
	}
	if(showNewData != '0' && showNewData != '1'){
		message+="��ѡ�����������Ƿ�ɼ�\n";
		document.getElementById('showNewData').focus();
	}
	return message;
}
// У��ҳ���ֶ�˳��ֻ����������
function checkNum(keyVal){
	if(keyVal<48||keyVal>57){
		alert('�˴�ֻ������������');
		return false;
	}
}

