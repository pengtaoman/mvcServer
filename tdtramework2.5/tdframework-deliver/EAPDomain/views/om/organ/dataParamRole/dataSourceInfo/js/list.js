/**
 * 页面初始化
*/
var eccn=new ECCN("ec");

function init(message){

    eccn.doPrep=false;//不使用预查询 
	//不使用ajax翻页
	eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}
	
	parent.query.document.getElementById('bDelete').disabled=false;
	parent.detail.location.href='about:blank';
}
	
//删除方法
function doDelete(webpath){
 	var canBeSubmit='';
 	var array=document.getElementsByName('checkboxs');
 	for (i=0;i<array.length;i++){
 		if(array[i].checked==true){
 			canBeSubmit="submit";
 			break;
 		}
 	}
 	if(canBeSubmit==''){
 		alert("请选择要删除的列(选中列前复选框)!");
 		return false;
 	}
 	//提示信息
 	if(!confirm('注意：删除该数据则该数据源表对应的数据权限将被收回')){
 		return false;
 	}
 	
 	//刷新EC TABLE的状态信息
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	document.getElementById('ec').action=webpath+"/om/datasourceinfo.do?method=doDelete";
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
}

//双击某行打开修改页面
function doModify(tableId,columnInfo){
	var param="&tableId="+tableId+"&columnInfo="+columnInfo;	

	var url=APP_PATH+"/om/datasourceinfo.do?method=modiInit&param="+param;
    var style="status:no;dialogWidth:600px;dialogHeight:250px";
    window.showModalDialog(url,window,style);
}
