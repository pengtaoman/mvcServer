/**
		 * ҳ���ʼ��
		 */
var eccn=new ECCN("ec");
function init(flagDisplay,tableName,tableDesc){
    eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	eccn.init();
	if(flagDisplay!=''){
		document.getElementById('tableInfo').style.display="";
		document.getElementById('filebutton2').style.display="";
	}
	if(tableName!=''){
		document.getElementById('tableName').value=tableName;
	}
	if(tableDesc!=''){
		document.getElementById('tableDesc').value=tableDesc;
	}
}

//�������淽��
function doSave(webpath){
	//У�鲻�ɶ���һ��ID��
 	var arrayObj=new Array();
	//Ϊcheckbox ��ֵ��
	var objs=document.getElementsByName('checkboxs');
	for(i=0;i<objs.length;i++){
		if(objs[i].checked==true){
		var cbs=getValue(objs[i],arrayObj);
			if(cbs*1>0){
				return false;
			}
		}
	}
	//ˢ��EC TABLE��״̬��Ϣ
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	document.getElementById('ec').action=webpath+"/om/datasourceinfo.do?method=doSave";
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
}



//checkbox �����¼�
function getValue(cheObj,arrayObj){	
	var canBeSub=-1;
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
	if(colEffectVal==1){
		arrayObj.push(colEffectVal);
		if(arrayObj.length>1){
			alert("�ֶ�����'ID'����ѡ�ж���һ��");
			canBeSub=1;
		}
		//Id ʱ���ܹ���������
		if(fillterEffVal!=''){
			alert("�ֶ�����Ϊ'ID'ʱ���ܹ���������");
			canBeSub=1;
		}
	}
	//name ʱ���ܹ���������
	else if(colEffectVal==2&&fillterEffVal!=''){
		alert("�ֶ�����Ϊ'NAME'ʱ���ܹ���������");
		canBeSub=1;
	}//pK ʱ���ܹ���������
	else if(colEffectVal==3&&fillterEffVal!=''){
		alert("�ֶ�����Ϊ'PK'ʱ���ܹ���������");
		canBeSub=1;
	}
	
	//�����ֶ�˳���id
	var colOrderId=val+'colOrder';
	//�����ֶ�˳���value
	var	colOrderVal=document.getElementById(colOrderId).value;
	if(colOrderVal==''){
		alert("����д�ֶ�˳��");
		document.getElementById(colOrderId).focus();
		canBeSub=1;
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
	var message=checkValue();	
	if(message!=''){
		alert(message);
		return false;
	}
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=insert";
	document.EAPForm.target='detail';
    document.EAPForm.submit();
	document.getElementById('tableInfo').style.display="";
}
// ��ȡ������Ϣ����ʱ У�� ҳ������
function checkValue(){
	var message='';
	var tableName=document.getElementById('tableName').value;
	var tableDesc=document.getElementById('tableDesc').value;
	if(tableName==''){
		message+="����������Ϊ�� \n";
		document.getElementById('tableName').focus();
	}
	if(tableDesc==''){
		message+="���ݱ�����������Ϊ�� \n";
		document.getElementById('tableDesc').focus();
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

