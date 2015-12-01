<%@ page language="java" contentType="text/html;charset=gb2312" %>

<%
	String Path = request.getContextPath();
%>
<HTML><HEAD><TITLE>actionList</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1226" name=GENERATOR>
<LINK REL="stylesheet" HREF="<%=Path%>/views/common/css/crm_style.css" TYPE="text/css"/>
<script language="javascript" src="<%=Path%>/views/om/organ/employeeduty/common.js"></script> 			  			  
<SCRIPT LANGUAGE="JavaScript">
<!--

function ckbCheck(ckbObj){
	if(parent.organdisplayhidden.myform.CurrentSelectOrganKind.value!='duty'){
		ckbObj.checked=false;
		return;
	}
	var myInput=document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				if(parent.organdisplayhidden.myform.CurrentSelectOrganKind.value=='duty'){
					SetAddBtnEnable(myform.Path.value);
					return;
				}
			}
		}
	}
	AllBtnDisabled(myform.Path.value);
}

function selectRow(objRow){
	var objTbl=document.all['tblEmployee'];
	objTbl.deleteRow(objRow.rowIndex);
}

function SetAddBtnEnable(webpath){
	parent.actionbtn.document.myform.bAdd.disabled=false;
	parent.actionbtn.document.myform.bSelect.disabled=true;
	parent.actionbtn.document.myform.bCancel.disabled=false;
	parent.actionbtn.document.myform.bDelete.disabled=true;
/*	parent.actionbtn.document.all['imgSelect'].disabled=true;
	parent.actionbtn.document.all['imgSelect'].src=webpath+'/views/common/images/select_disabled.gif';
	parent.actionbtn.document.all['imgCancel'].disabled=false;
	parent.actionbtn.document.all['imgCancel'].src=webpath+'/views/common/images/cancel_normal.gif';
	parent.actionbtn.document.all['imgAdd'].disabled=false;
	parent.actionbtn.document.all['imgAdd'].src=webpath+'/views/common/images/add_normal.gif';	
	parent.actionbtn.document.all['imgDelete'].disabled=true;
	parent.actionbtn.document.all['imgDelete'].src=webpath+'/views/common/images/delete_disabled.gif';*/
}
function checkTD(id){
	var objCkb=document.all['ckb'+id.substring(3)];
	objCkb.checked=!objCkb.checked;
	ckbCheck(objCkb);
}

function  checkAll(ckbObj){
	if(parent.organdisplayhidden.myform.CurrentSelectOrganKind.value!='duty'){
		ckbObj.checked=false;
		return;
	}
	var myInput=document.all.tags("input");
	var flag=ckbObj.checked;
	for (var i=0;i<myInput.length;i++){
			myInput[i].checked=flag;
	}
	if (flag&&myInput.length>2)
			SetAddBtnEnable(myform.Path.value);
	else
		AllBtnDisabled(myform.Path.value);
}
//-->
</SCRIPT>
</HEAD>
<body class="body">
<form method="POST" name="myform" action="">		
	<TABLE border="0"  cellpadding="0" cellspacing="1"  class="tablebluemore" align="center" id="tblEmployee">
	<TR class="thList">
		<TD width="30"><input type="checkbox" id="sltCheckAll" onclick="checkAll(this);"/></TD>
		<TD width="100" class="tdfontstyle">职员编号</TD>
		<TD class="tdfontstyle">职员姓名</TD>
	</TR>	
	</TABLE>
<input type="hidden" name ="Path" value="<%=Path%>"/>
</form>
</BODY>

</HTML>