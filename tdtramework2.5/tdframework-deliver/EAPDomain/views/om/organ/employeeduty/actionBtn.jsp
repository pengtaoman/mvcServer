<%@ page contentType="text/html; charset=gb2312" %>
<%
String path = request.getContextPath();
%>
<HTML><HEAD><TITLE>actionBtn</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1226" name=GENERATOR>
<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/crm_style.css" TYPE="text/css"/>
<script language="javascript" src="<%=path%>/views/om/organ/employeeduty/common.js"></script> 			  			  
<script language="javascript">
<!--
function bSelectClick(){
	copyRows(parent.employeelist,parent.actionlist,'parent.actionlist.SetRow(myRow);')
	AllBtnDisabled(myform.Path.value);
}

function bAddClick(){
	if (!confirm('��ȷ��Ҫ������Щ����Աô?'))
			return;
	var myInput=parent.actionlist.document.all.tags("input");
	var strEmployeeId='';
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				//��ȥ��ְ���Ѿ����ڵĲ���Ա
				if (!containItem(parent.employeelist,myInput[i].id))
					strEmployeeId=strEmployeeId+myInput[i].id.substring(3)+',';
			}
		}
	}
	var areaId=parent.organdisplayhidden.myform.CurrentSelectBelongArea.value;
	var organId=parent.organdisplayhidden.myform.CurrentSelectOrganId.value;
	var dutyId=parent.organdisplayhidden.myform.CurrentSelectDutyId.value;
	var webPath = myform.Path.value;
	if (strEmployeeId==''){
		alert("��ѡ��Ĳ���Ա�Ѿ��ڴ�ְ����!");
		return;
	}
	var link=webPath+"/om/addEmployeeToDuty.do?employeeId="+strEmployeeId+"&areaId="+areaId+"&organId="+organId+"&dutyId="+dutyId;
	//alert(link);
	//alert(strEmployeeId);
	parent.employeelist.location.href=link;
	var objTbl=parent.actionlist.document.all.tblEmployee;
	parent.actionlist.document.all.sltCheckAll.checked=false;
	while (objTbl.rows.length>1){
		objTbl.deleteRow(1);
	}
	AllBtnDisabled(myform.Path.value);

}
function containItem(objFrame,id){
/*	var eId;
	for (var i=1;i<objTbl.rows.length;i++){
		eId=objTbl.rows[i].id;
		if (eId==objRow.id) return true;
	}
	return false;
*/
	if (typeof(objFrame.document.all[id])=='object')
		return true;
}
function bDeleteClick(){
	var dutyId=parent.organdisplayhidden.myform.CurrentSelectDutyId.value;
	if(dutyId==null||dutyId.length ==0){
		alert("�Բ���,ɾ��ʱӦָ��ְ��,��ѡ��ְ��ڵ�!");
		return;
	}
	var myInput=parent.employeelist.document.all.tags("input");
	var strEmployeeId='';
	var num=0
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				strEmployeeId=strEmployeeId+myInput[i].id.substring(3);
				num = num+1;
			}
		}
	}
	
	if(num>1){
		alert("�Բ���,��ÿ��ֻ��ɾ��һ����Ա!");
		return;
	}
	if (!confirm('��ȷ��Ҫɾ��ô?'))
		return;

	var areaId=parent.organdisplayhidden.myform.CurrentSelectBelongArea.value;
	var organId=parent.organdisplayhidden.myform.CurrentSelectOrganId.value;
	
	var webPath = myform.Path.value;
	var link=webPath+"/om/delEmployeeFromDuty.do?employeeId="+strEmployeeId+"&areaId="+areaId+"&organId="+organId+"&dutyId="+dutyId;
	//alert(link);
	parent.employeelist.location.href=link;
	//�����ѡ�����Ա�б�
}
function copyRows(objS,objD,strSetRow){
	objS.document.all['sltCheckAll'].checked=false;
	objD.document.all['sltCheckAll'].checked=false;
	var tblS=objS.document.all['tblEmployee'];
	var tblD=objD.document.all['tblEmployee'];
	var myRows=new Array();
	var myInput=objS.document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				myInput[i].checked=false;
				if (typeof(objD.document.all[myInput[i].id])=='undefined')//��ȥ��ͬ������
					myRows.push(myInput[i].parentElement.parentElement);
			}
		}
	}
	contentCopy(tblS,tblD,myRows,strSetRow);	//��insertRow() and insertCell()��ʵ������һ�еĹ��ܡ�
}
function bCancelClick(){
	removeRows(parent.actionlist.document.all['tblEmployee']);
	AllBtnDisabled(myform.Path.value);
}
function removeRows(objS){
	var myInput=objS.document.all.tags("input");
	for (var i=myInput.length-1;i>0;i--){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0&&myInput[i].checked){
			objS.deleteRow(myInput[i].parentElement.parentElement.rowIndex);
		}
	}
}
-->
</script>
</HEAD>
<BODY class="body" align="center" bgcolor="transparent">
<form name="myform" action="" method="post">
<TABLE cellSpacing="0" cellPadding="0" width="90%" border="0" align="center">
<TR><TD>
<INPUT TYPE="button" value="ѡ��" id="bSelect" disabled="true" onClick="bSelectClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'"
>
<INPUT TYPE="button" value="ȡ��" id="bCancel" disabled="true" onClick="bCancelClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'">
<INPUT TYPE="button" value="����" id="bAdd" disabled="true" onClick="bAddClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'">
<INPUT TYPE="button" value="ɾ��" id="bDelete" disabled="true" onClick="bDeleteClick();return false;" class="btn2_mouseout" nmouseover="this.className='btn2_mouseover'"
 onmouseout="this.className='btn2_mouseout'" onmousedown="this.className='btn2_mousedown'"  onmouseup="this.className='btn2_mouseup'">
<span id="message"></span>
<input type="hidden" name ="Path" value="<%=path%>"/>
</TD>
</TR>
</form>
</BODY>
</HTML>