<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	<head>
	<title>EmployList</title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{/root/path}/views/om/organ/dutyrole/common.js"></script> 			  			  
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
//	var strOverName,strTRClassName;
//	var myObj='';
var myRows=new Array();
function SetUpBtnEnable(){
	parent.actionbtn.document.all['bAdd'].disabled=false;
	//parent.actionbtn.document.all['imgAdd'].src=myform.Path.value+'/views/om/organ/dutyrole/add_normal.gif';
	parent.actionbtn.document.all['bDelete'].disabled=true;
	//parent.actionbtn.document.all['imgDelete'].src=myform.Path.value+'/views/om/organ/dutyrole/delete_disabled.gif';
}

//表格选定指定行
function selectRow(obj)
{
/*
var myRows=new Array();
myRows.push(obj);
contentExchange(document.all['tblRole'],parent.employeelist.document.all['tblRole'],myRows,'parent.employeelist.SetRow(myRow)');
*/
}

//初始化
function init(){
//	RemoveSD(parent.employeelist.document.all['tblRole'],parent.allemployee.document.all['tblRole']);
//	parent.employeelist.RemoveSD(parent.employeelist.document.all['tblRole'],parent.allemployee.document.all['tblRole']);
	var rowObj=document.all.tblRole.rows;
	for (var i=1;i<rowObj.length;i++)
		myRows.push(rowObj[i].innerHTML);
	//clearRows();
	//reloadRows();
}
//重新载入角色数据
function reloadRows(){
	var tblObj=document.all.tblRole;
	for (var i=1;i<tblObj.rows.length;i++)
		tblObj.rows[i].style.display="block";

	var myInput=document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
			myInput[i].checked=false;
	}
}
//清空角色数据
function clearRows(){
	var tblObj=document.all.tblRole;
	for (var i=1;i<tblObj.rows.length;i++)
		tblObj.rows[i].style.display="none";
}

function checkTD(id){
	var objCkb=document.all['ckb'+id.substring(3)];
	objCkb.checked=!objCkb.checked;
	ckbCheck(objCkb);
}

function ckbCheck(ckbObj){
	if (parent.organdisplayhidden.myform.CurrentSelectOrganKind.value!='duty') {
		ckbObj.checked=false;
		return;
	}
	var myInput=document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				SetUpBtnEnable();
				return;
			}
		}
	}
	AllBtnDisabled();
}
function  checkAll(ckbObj){
	if (parent.organdisplayhidden.myform.CurrentSelectOrganKind.value!='duty') {
		ckbObj.checked=false;
		return;
	}
	var myInput=document.all.tags("input");
	var flag=ckbObj.checked;

	var flagDisplay=false;
	for (var i=0;i<myInput.length;i++){
			myInput[i].checked=flag;
			if (myInput[i].parentElement.parentElement.style.display=='block')
				flagDisplay=true;
	}
	if (flag&&flagDisplay)
		SetUpBtnEnable();
	else{
		AllBtnDisabled();
		ckbObj.checked=false;
	}

}
	]]>
	</xsl:comment>
	</script>
	</head>
	<body CLASS="BODY" onload="init();">
		<form method="POST" name="myform" action="">
		<input type="hidden" id="employeeId"/>
		<input type="hidden" id="employeeName"/>
		<input type="hidden" id="alertMessage" value="{root/alertMessage}"/>
		<input type="hidden" id="Path" value="{root/path}"/>
		<xsl:apply-templates select="root/roleColl"/>
		</form>
	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/roleColl">
                  <TABLE border="0"  cellpadding="0" cellspacing="1"  class="tablebluemore" align="center" id="tblRole">
                          <TBODY>
                          <tr class="thList" onselectstart="return false">
							 	<td width="30"><input type="checkbox" id="sltCheckAll"  onclick="checkAll(this);"/></td>
                          <td width="100" class="tdfontstyle">职员编号</td>
                          <td class="tdfontstyle">姓名</td></tr>
		<xsl:for-each select="role">
	                         <TR ondblclick="selectRow(this);return false;" style="display:block">
<xsl:attribute name="id">row<xsl:value-of select="roleId"/></xsl:attribute>
				<xsl:choose>
				<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>	                         
                              <TD><input type="checkbox" id="ckb{roleId}" onclick="ckbCheck(this);"/></TD>
									<TD vAlign="top" align="left"  onclick="checkTD(this.parentElement.id);">
                         	     <xsl:value-of select="roleId"/>
									</TD>
                              <TD vAlign="top" align="left"  onclick="checkTD(this.parentElement.id);">
                              <IMG
                              src="{/root/path}/views/common/images/yarrow.gif" /><xsl:value-of select = "roleName"/>
                              </TD>
                            </TR>
 		</xsl:for-each>
                          </TBODY>
                        </TABLE>

</xsl:template>

</xsl:stylesheet>