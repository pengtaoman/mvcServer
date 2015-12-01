<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String webpath=request.getContextPath();
%>
<html>
<head>
   <title>权限信息</title>
   <LINK REL="stylesheet" HREF="<%=webpath%>/views/common/css/crm_style.css" TYPE="text/css"/>	
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/example/pages/eapmanager/menumanager/js/fw_menu.js"></script>
   <script  language=javascript src="<%=webpath%>/example/pages/eapmanager/menumanager/js/fw_menuEvent.js"> </script>
   
   
   	<script language="javascript" src="<%=webpath%>/views/common/js/nas_trim.js"></script>
	<script language="javascript" src="<%=webpath%>/{root/actionJS}"></script>
	<script language="javascript" src="<%=webpath%>/views/om/organ/menu/common.js"></script>
	<script language="javascript" src="<%=webpath%>/views/om/organ/duty/dutyprivilege/MenuTree.js"></script>
	<script language="javascript" src="<%=webpath%>/views/om/organ/menu/mouseAction.js"></script>

   <script language=javascript>
   //把Exec里面functionid为ckbId的checkbox设置为选中
function setExec(ckbId){
	var obj=formExec.all.tags("input");
	for(var i=0;i<obj.length;i++)
		if (obj[i].functionid==ckbId)
			obj[i].checked=true;
}

//根据strValue设置checkBox
function bResetClick(strValue){
	//if (strValue=='') return ;//初始没有值;
	var tmpValue=false;
	setCheckBox(tmpValue);
	var myArray=strValue.split(';');
	var tempArray;
	for (var i=0;i<myArray.length;i++){
		if (myArray[i]!=''){	
			setExec(myArray[i]);
		}
	}
}
//获取当前整个串的值
function getFuncStr(){
		var funcStr='';
		var execObj,temp;
		
		var execCheckBox=formExec.all.tags("input");
		alert("1111 = "+execCheckBox.length);
		for(var i=0;i<execCheckBox.length;i++){
			execObj=execCheckBox[i];			
			if (execObj.type=='checkbox') {
				if (execObj.checked && typeof(execObj.sysId) == 'undefined'){
				    alert("execObj.id = "+execObj.id);
				    alert("execObj.value = "+execObj.value);
				//	funcStr=funcStr+execObj.functionid + ";";
				funcStr=funcStr+execObj.name+"="+stringFilter(execObj.value)+ ";";
				alert("funcStr111 = "+funcStr);
				}
			}
		}
		alert("funcStr = "+funcStr);
	return funcStr;
	
}
function stringFilter(arg){

   return arg;

}
		function selectAll(){
			var len=document.formExec.elements.length;
			var i;
		    for (i=0;i<len;i++){
			if (document.formExec.elements[i].type=="checkbox"){
		        document.formExec.elements[i].checked=true;								
						 }
					}
				}
		
			function selectReset(){
			var len=document.formExec.elements.length;
			var i;
		    for (i=0;i<len;i++){
			if (document.formExec.elements[i].type=="checkbox"){
		        document.formExec.elements[i].checked=false;								
						 }
					}
				}

		function CheckSelectValue(v)
		{
			if (v==true)
			{
				selectAll();
			}
			else
			{
				selectReset();
			}
		
		}



function setCheckBox(val){
		var funcStr='';
		var execObj,temp;
		var execCheckBox=formExec.all.tags("input");
		for(var i=0;i<execCheckBox.length;i++){
			execObj=execCheckBox[i];
			if (typeof(execObj)=='object'){
				execObj.checked=val;
			}
		}
}

   </script>
   
   
   
<style>
.TreeNode {
	padding:0px;
	margin:0px;
}
.TreeNode img { 
	border:0px
}
.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
.TreeNode a:visited {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
</style>
</head>
<body onunload="removetreefromsession()">
<form name="formExec">
<input type="hidden" name="selectedFun"/>
<unieap:tree  tree='eap' includeRootNode="true" readOnly="false"  needCheckBox="true"  textClass="TreeNode"  checkboxLogical="1"/>
<tr >
 <input type="checkbox" name="execSelectAll" onclick="CheckSelectValue(this.checked);"/>

<input type="button" name="bExecSelectAll" value="全部选中" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"  onclick="selectAll();"></input>

		<input type="button" name="bReset" value="重 置" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="bResetClick('{/root/FuncExec/AllSelect}')"></input>

		<input type="button" name="bModify" value="修 改" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" 
 onclick="bModifyClick('<%=webpath%>');">
       </input>
		<input type="hidden" name="strSelected" value="'{/root/FuncExec/AllSelect}'"/>       
		</tr>                                         
</form>
		<form name="submitForm" method="post">
			<input type="hidden" name="operType"/>
			<input type="hidden" name="dutyId" />
			<input type="hidden" name="roleId" />
			<input type="hidden" name="selectedMenuList"/>
			<input type="hidden" name="addMenuList"/>
			<input type="hidden" name="delMenuList"/>
		</form>
</body>
</html>