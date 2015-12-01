/**
 * 页面初始化
 */
var eccn=new ECCN("ec");

function init(flagDisplay,tableName,tableDesc,showNewData){
    eccn.doPrep=false;//不使用预查询 
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

//新增保存方法
function doSave(webpath){
	var message=checkValue();
	if(message!=''){
		alert(message);
		return false;
	}
	//校验不可多于一个ID用
 	var arrayObj=new Array();
	//为checkbox 赋值。
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
	//刷新EC TABLE的状态信息
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	//将unieap form tableDesc的值赋值给 ec form tableDesc
	document.getElementsByName('tableDesc')[1].value=document.getElementsByName('tableDesc')[0].value;
	var showNewData = document.getElementById('showNewData').value;
	document.getElementById('ec').action=webpath+"/om/datasourceinfo.do?method=doSave&showNewData="+showNewData;
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
	window.close();
}

//checkbox 单击事件
function getValue(cheObj,arrayObj){	
	var canBeSub="";
	//获取clomnName 值& dataType 值
    var vals=cheObj.id;
    var point=vals.indexOf('~');
    //clomnName 值
	var val=vals.substring(0,point);
	//dataType 值
	var dataType=vals.substr(point+1);
	
	//该行字段描述的id
	var colDescId=val+'colDesc';
	//该行字段描述的value
	var	colDescVal=document.getElementById(colDescId).value;
	
	//该行关联过滤器的id
	var fillterEffId=val+'fillterEff';
	//该行关联过滤器的value
	var	fillterEffVal=document.getElementById(fillterEffId).value;
	//该行字段作用的id
	var colEffectId=val+'colEffect';
	//该行字段作用的value
	var	colEffectVal=document.getElementById(colEffectId).value;
	if(colEffectVal==''){
		canBeSub+="请选择'字段作用' \n";
	}
	else if(colEffectVal==1){
		arrayObj.push(colEffectVal);
		if(arrayObj.length>1){
			canBeSub+="字段作用'ID'不能选中多于一个 \n";
		}
		//Id 时不能关联过滤器
		if(fillterEffVal!=''){
			canBeSub+="字段作用为'ID'时不能关联过滤器\n";
		}
	}
	//name 时不能关联过滤器
	else if(colEffectVal==2&&fillterEffVal!=''){
		canBeSub+="字段作用为'NAME'时不能关联过滤器\n";
	}//pK 时不能关联过滤器
	else if(colEffectVal==3&&fillterEffVal!=''){
		canBeSub+="字段作用为'PK'时不能关联过滤器\n";
	}
	
	//该行字段顺序的id
	var colOrderId=val+'colOrder';
	//该行字段顺序的value
	var	colOrderVal=document.getElementById(colOrderId).value;
	if(colOrderVal==''){
		//alert("请添写字段顺序");
		document.getElementById(colOrderId).focus();
		canBeSub+="请添写字段顺序\n";
	}
	//给checkbox 值赋值。
	cheObj.value=val+'-'+colDescVal+'-'+dataType+'-'+colEffectVal+'-'+fillterEffVal+'-'+colOrderVal;
	//alert(cheObj.value);
	return canBeSub;
}

//checkbox 全选 方法
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
//提取表信息方法
function getTablleInfo(webpath){
	var tableName=document.getElementById('tableName').value;
	if(tableName==''){
		alert("表名不可以为空，请填写");
		document.getElementById('tableName').focus();
		return;
	}
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=insert";
	//document.EAPForm.target='list';
    document.EAPForm.submit();
	//document.getElementById('tableInfo').style.display="";
}
// 校验 页面输入
function checkValue(){
	var message='';
	var tableName=document.getElementById('tableName').value;
	var tableDesc=document.getElementById('tableDesc').value;
	var showNewData = document.getElementById('showNewData').value;
	if(tableName==''){
		message+="表名不可以为空，请填写\n";
		document.getElementById('tableName').focus();
	}
	if(tableDesc==''){
		message+="数据表描述不可以为空，请填写\n";
		document.getElementById('tableDesc').focus();
	}
	if(showNewData != '0' && showNewData != '1'){
		message+="请选择新增数据是否可见\n";
		document.getElementById('showNewData').focus();
	}
	return message;
}
// 校验页面字段顺序只能输入数字
function checkNum(keyVal){
	if(keyVal<48||keyVal>57){
		alert('此处只可以输入数字');
		return false;
	}
}

