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
	var strOverName,strTRClassName;
	var myObj='';

function SetDownBtnEnable(){
	parent.actionbtn.document.all['bAdd'].disabled=true;
	//parent.actionbtn.document.all['imgAdd'].src=myform.Path.value+'/views/om/organ/dutyrole/add_disabled.gif';
	parent.actionbtn.document.all['bDelete'].disabled=false;
	//parent.actionbtn.document.all['imgDelete'].src=myform.Path.value+'/views/om/organ/dutyrole/delete_normal.gif';
}

function selectRow(obj){
/*
var myRows=new Array();
myRows.push(obj);
	contentExchange(document.all['tblRole'],parent.allemployee.document.all['tblRole'],myRows,'parent.allemployee.SetRow(myRow)');
*/
}

function init(){
	if (myform.alertMessage.value!='')
		alert (myform.alertMessage.value);
	parent.allemployee.reloadRows();
	RemoveSD(parent.employeelist.document.all['tblRole'],parent.allemployee.document.all['tblRole']);
	AllBtnDisabled();
}

//去处tblD中与tblS相同的数据
function RemoveSD(tblS,tblD)
{
	var RowCont='';var TC='';
	for(var i=0;i<tblS.rows.length;i++)
	{
		//得到上面表格所有行的内容.
		RowCont=tblS.rows[i].cells[1].innerHTML;
		for(var j=1;j<tblD.rows.length;j++)
		{
			TC=tblD.rows[j].cells[1].innerHTML;
			//如果有相同的数据,则删除行
			if (RowCont==TC)
			{
				tblD.rows[j].style.display="none";					
			}					
		}
	}
}
function ckbCheck(){
	var myInput=document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				SetDownBtnEnable();
				return;
			}
		}
	}
	AllBtnDisabled();
}
function  checkAll(ckbObj){
	var myInput=document.all.tags("input");
	var flag=ckbObj.checked;
	var flagDisplay=false;
	for (var i=0;i<myInput.length;i++){
			myInput[i].checked=flag;
			if (myInput[i].parentElement.parentElement.style.display=='block')
				flagDisplay=true;
	}
	if (flag&&flagDisplay)
		SetDownBtnEnable();
	else{
		AllBtnDisabled();
		ckbObj.checked=false;
	}
}
function checkTD(id){
	var objCkb=document.all['ckb'+id.substring(3)];
	objCkb.checked=!objCkb.checked;
	ckbCheck(objCkb);
}

	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY" onload="init();">
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
                  <TABLE border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore" id="tblRole">
                          <TBODY>
                          <tr class="thList" onselectstart="return false">
							 	<td width="30"><input type="checkbox" id="sltCheckAll"  onclick="checkAll(this);"/></td>
                          <td width="100" class="tdfontstyle">职员编号</td>
                          <td class="tdfontstyle">姓名</td></tr>
		<xsl:for-each select="role">
	                         <TR ondblclick="selectRow(this);return false;" style="display:block;">
<xsl:attribute name="id">row<xsl:value-of select="roleId"/></xsl:attribute>
				<xsl:choose>
				<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>	                         
                              <TD><input type="checkbox" id="ckb{roleId}" onclick="ckbCheck();"/></TD>
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