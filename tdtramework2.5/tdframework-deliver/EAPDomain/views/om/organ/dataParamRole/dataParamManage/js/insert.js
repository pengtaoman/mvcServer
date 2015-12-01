/**
		 * 页面初始化
		 */
var eccn=new ECCN("ec");
function init(flagDisplay,tableName,tableDesc){
    eccn.doPrep=false;//不使用预查询 
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

//新增保存方法
function doSave(webpath){
	//校验不可多于一个ID用
 	var arrayObj=new Array();
	//为checkbox 赋值。
	var objs=document.getElementsByName('checkboxs');
	for(i=0;i<objs.length;i++){
		if(objs[i].checked==true){
		var cbs=getValue(objs[i],arrayObj);
			if(cbs*1>0){
				return false;
			}
		}
	}
	//刷新EC TABLE的状态信息
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	document.getElementById('ec').action=webpath+"/om/datasourceinfo.do?method=doSave";
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
}



//checkbox 单击事件
function getValue(cheObj,arrayObj){	
	var canBeSub=-1;
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
	if(colEffectVal==1){
		arrayObj.push(colEffectVal);
		if(arrayObj.length>1){
			alert("字段作用'ID'不能选中多于一个");
			canBeSub=1;
		}
		//Id 时不能关联过滤器
		if(fillterEffVal!=''){
			alert("字段作用为'ID'时不能关联过滤器");
			canBeSub=1;
		}
	}
	//name 时不能关联过滤器
	else if(colEffectVal==2&&fillterEffVal!=''){
		alert("字段作用为'NAME'时不能关联过滤器");
		canBeSub=1;
	}//pK 时不能关联过滤器
	else if(colEffectVal==3&&fillterEffVal!=''){
		alert("字段作用为'PK'时不能关联过滤器");
		canBeSub=1;
	}
	
	//该行字段顺序的id
	var colOrderId=val+'colOrder';
	//该行字段顺序的value
	var	colOrderVal=document.getElementById(colOrderId).value;
	if(colOrderVal==''){
		alert("请添写字段顺序");
		document.getElementById(colOrderId).focus();
		canBeSub=1;
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
// 提取表内信息方法时 校验 页面输入
function checkValue(){
	var message='';
	var tableName=document.getElementById('tableName').value;
	var tableDesc=document.getElementById('tableDesc').value;
	if(tableName==''){
		message+="表名不可以为空 \n";
		document.getElementById('tableName').focus();
	}
	if(tableDesc==''){
		message+="数据表描述不可以为空 \n";
		document.getElementById('tableDesc').focus();
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

