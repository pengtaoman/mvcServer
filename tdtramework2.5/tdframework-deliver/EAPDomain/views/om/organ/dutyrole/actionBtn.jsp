<%@ page contentType="text/html; charset=gb2312" %>
<%
String path = request.getContextPath();
%>
<HTML><HEAD><TITLE>actionBtn</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1226" name=GENERATOR>
<LINK REL="stylesheet" HREF="../../../common/css/crm_style.css" TYPE="text/css"/>
<script language="javascript" src="common.js"></script> 			  			  
<script language="javascript">
<!--
function bAddClick(){
	if (!confirm('您确定要增加么？')) return;
	//exchangeRows(parent.employeelist,parent.allemployee,'parent.allemployee.SetRow(myRow);');
	var strRoleId=getRoleIdStr(parent.allemployee);
	if (strRoleId=='')	return false;
	areaId=parent.organdisplayhidden.myform.CurrentSelectBelongArea.value;
	organId=parent.organdisplayhidden.myform.CurrentSelectOrganId.value;
	dutyId=parent.organdisplayhidden.myform.CurrentSelectDutyId.value;
	var link=myform.path.value+'/om/addRoleToDuty.do?areaId='+areaId+'&organId='+organId+'&DutyId='+dutyId+'&RoleIdStr='+strRoleId;
	//alert(link);
	parent.employeelist.location.href=link;
	//parent.allemployee.location.reload();//恢复角色列表
}
function getRoleIdStr(objFrame){
	var strRoleId='';
	var myInput=objFrame.document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked&&myInput[i].parentElement.parentElement.style.display=='block'){
				strRoleId=strRoleId+myInput[i].id.substring(3)+',';
			}
		}
	}
	return strRoleId;
}
function bDeleteClick(){
	if (!confirm('您确定要删除么？')) return;
	var strRoleId=getRoleIdStr(parent.employeelist);
	areaId=parent.organdisplayhidden.myform.CurrentSelectBelongArea.value;
	organId=parent.organdisplayhidden.myform.CurrentSelectOrganId.value;
	dutyId=parent.organdisplayhidden.myform.CurrentSelectDutyId.value;
	var link=myform.path.value+'/om/delRoleFromDuty.do?areaId='+areaId+'&organId='+organId+'&DutyId='+dutyId+'&RoleIdStr='+strRoleId;
	alert(link);
	parent.employeelist.location.href=link;
	//parent.allemployee.location.reload();//恢复角色列表
}
function exchangeRows(objS,objD,strSetRow){
	var tblS=objS.document.all['tblRole'];
	var tblD=objD.document.all['tblRole'];
	var myRows=new Array();//生成要操作的行对象
	var myInput=objS.document.all.tags("input");
	for (var i=1;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				myInput[i].checked=false;
				myRows.push(myInput[i].parentElement.parentElement);//增加要操作的行对象
			}
		}
	}
	contentExchange(tblS,tblD,myRows,strSetRow);
	AllBtnDisabled();
}
-->
</script>
</HEAD>
<BODY class="BODY">
<form id="myform" action="" method="post">
<INPUT TYPE="button" value="增加" id="bAdd" disabled="true" onClick="bAddClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'">
<INPUT TYPE="button" value="删除" id="bDelete" disabled="true" onClick="bDeleteClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'">
<input type="hidden" value="<%=path%>" name="path"> 
</form>
</BODY>
</HTML>