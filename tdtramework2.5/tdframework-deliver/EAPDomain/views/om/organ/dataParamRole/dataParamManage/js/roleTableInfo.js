/*
*页面初始化
*/
var eccn=new ECCN("ec");
var roleId = '';
var operType = '';

function init(){
    var msg = document.getElementById("message").value;
    var oper_type = document.getElementById("operType").value;
    var role_id = document.getElementById("roleId").value;
	if(msg!='null' && msg!=''){
		alert(msg);
	}
	if(role_id!='null' && role_id!=''){
		roleId = role_id;
	}
	if(oper_type!='null' && oper_type!=''){
		operType = oper_type;
	}
	if(oper_type == 'grant'){
		document.getElementById("add").disabled = "";
		document.getElementById("delete").disabled = "";
	}else{
		controlCheckBox();
	}
	eccn.doPrep=false;
	eccn.ajaxSubmit=false;
	eccn.init();
}
/*
 *将页面上的所有复选框变为不可编辑状态
 */
function controlCheckBox(){
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i ++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			e.disabled = "true";
		}
	}
}
/*
 *判断页面是否有复选框被选中
 */
function ifHaveChecked(){ 
	var flag = true;
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i ++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if(e.checked == true){
				flag = false;
				break;
			}
		}
	}
	
	return flag;
}
/*
 *控制文本页面显示风格
 */
function showAllText(obj){
    if(obj.style.width=="300px" && obj.className=="ellipsis"){
    	obj.style.width="300%";
    	obj.className="";
    }
	else{
		obj.style.width="300px";
		obj.className="ellipsis";
	}
}
/*
 *打开新增页面
 */
function openAddPage(){ 
	if(roleId == ''){
		alert("未获取到角色信息，操作被迫结束");
		return;
	}
	EccnUtil.noExport("ec");   
	var url  = APP_PATH + "/views/om/organ/dataParamRole/dataParamManage/index.jsp?roleId="+roleId+"&operType=add";           
	var back = showModalDialog(url,window,'status:no;scroll:no;DialogWidth:750px;DialogHeight:560px;');
	if(back!='' && back=='true'){
		parent.RoleManage.bGrantClick();
	}
}
/*
 *打开新增页面
 */
function openDetailPage(tableId){ 
	if(roleId == ''){
		alert("未获取到角色信息，操作被迫结束");
		return;
	}
	
	EccnUtil.noExport("ec");   
	
	var url  = APP_PATH + "/views/om/organ/dataParamRole/dataParamManage/index.jsp?roleId="+roleId+"&tableId="+tableId+"&operType="+operType; 
	var back = showModalDialog(url,window,'status:no;scroll:no;DialogWidth:750px;DialogHeight:560px;');
	if(back!='' && back=='true'){
		parent.RoleManage.bGrantClick();
	}
	//var width = 550;
	//var height = 560;
	//var wleft=(screen.width-width)/2;
	//var wtop=(screen.availHeight-height)/2-20;
	//dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
	//window.open(url,'detaiPage',dimensions);
}
/*
 *删除参数过滤数据源表
 */
function deleteParamTable(){ 
	if(ifHaveChecked()){
		return;
	}
	
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	
	if(confirm("确认要删除吗? ")){
		document.forms[0].target = "Hidden";
		document.forms[0].action = "dataparammanage.do?method=deleteRoleTable";
		document.forms[0].submit();
	}
}
/*
 *返回刷新
 */
function doRefresh(){ 
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	parent.RoleManage.bGrantClick();
}