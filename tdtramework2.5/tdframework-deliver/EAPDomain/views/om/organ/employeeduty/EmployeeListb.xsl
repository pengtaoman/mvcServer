<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	<head>
	<title>EmployList</title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	var strOverName,strTRClassName;
	var myObj='';

function deal_click_link(obj){
	var employeeId=obj.id;
	var employeeName=obj.cells[1].innerText;
	myform.employeeId.value=employeeId;
	myform.employeeName.value=employeeName;
	parent.actionbtn.document.all['bSelect'].disabled=false;
	parent.actionbtn.document.all['bSelect'].src='select_normal.gif';
	parent.actionbtn.document.all['bCancel'].disabled=true;
	parent.actionbtn.document.all['bCancel'].src='cancel_disabled.gif';
	parent.actionbtn.document.all['bAdd'].disabled=true;
	parent.actionbtn.document.all['bAdd'].src='add_normal.gif';	parent.actionbtn.document.all['bDelete'].disabled=true;
	parent.actionbtn.document.all['bDelete'].src='delete_normal.gif';
	
	if (parent.organdisplayhidden.myform.CurrentSelectOrganKind.value=='duty')
		parent.actionbtn.document.all['bDelete'].disabled=false;

	return false;
}

function containItem(employeeId){
	var tblObj=parent.actionlist.tblEmployeeList;
	var tblLen=tblObj.rows.length;
	var eId;
	for (var i=1;i<tblLen;i++){
		eId=tblObj.rows[i].cells[0].innerText;
		if (employeeId==eId) return true;
	}
	return false;
}

	function MouseOver(obj) 
	{ 
		strOverName=obj.className;
		obj.className = "trListHover"; 
	} 
	function MouseOut(obj) 
	{ 
		obj.className=strOverName;
	} 
	function MouseDown(obj) 
	{ 
		if (myObj!='')
			myObj.style.color="black";
		obj.style.color="red";
		myObj=obj
	} 
	function MouseUp(obj) 
	{ 
	//	MouseOut(obj); 
	} 
	function init(){
		if (myform.alertMessage.value!='')
			alert (myform.alertMessage.value);
	}
	]]>
	</xsl:comment>
	</script>
	</head>
	<body background="{root/create/path}/views/common/images/bg_content.gif" leftmargin="0" topmargin="0" onload="init();">

		<form method="POST" name="myform" action="">
		<input type="hidden" id="employeeId"/>
		<input type="hidden" id="employeeName"/>
		<input type="hidden" id="alertMessage" value="{root/alertMessage}"/>
	
		<xsl:apply-templates select="root/employeeColl"/>
<!--				<input type="hidden" id="OrganKind">
					<xsl:value-of select="OrganKind"></xsl:value-of>
				</input>
				<input type="hidden" id="OrganId">
					<xsl:value-of select="OrganId"></xsl:value-of>
				</input>
				<input type="hidden" id="DutyId">
					<xsl:value-of select="DutyId"></xsl:value-of>
				</input>
				<input type="hidden" id="BelongDuty">
					<xsl:value-of select="BelongDuty"></xsl:value-of>
				</input>
				<input type="hidden" id="BelongDuty">
					<xsl:value-of select="BelongDuty"></xsl:value-of>
				</input>
				<input type="hidden" id="OperType">
					<xsl:value-of select="OperType"></xsl:value-of>
				</input>
-->		</form>

	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/employeeColl">
                <div class="divScroll300">
                  <TABLE cellSpacing="0" cellPadding="0" width="90%" border="0" id="allEmployeeList" class="tblHead" align="center">
                          <TBODY>
                          <tr class="trHead" onselectstart="return false"><td width="40" class="asBtn">序号</td><td class="asBtn">姓名</td></tr>
		<xsl:for-each select="list">
	                         <TR> 
				<xsl:attribute name="onmouseover">MouseOver(this);</xsl:attribute>
				<xsl:attribute name="onmouseout">MouseOut(this);</xsl:attribute>
				<xsl:attribute name="onmousedown">MouseDown(this);</xsl:attribute>
				<xsl:attribute name="onmouseup">MouseUp(this);</xsl:attribute>
				<xsl:attribute name = "id">
					<xsl:value-of select = "EmployeeId"/>
				</xsl:attribute>
				<xsl:attribute name="onclick">deal_click_link(this);return false;</xsl:attribute>
				<xsl:choose>
				<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>	                         
                              <TD vAlign="top" width="18" align="left">
                         	     <xsl:value-of select="RowNo"/>
									</TD>
                              <TD vAlign="top" width="140" align="left">
                              <IMG
                              src="{/root/path}/views/common/images/yarrow.gif" /><xsl:value-of select = "EmployeeName"/>
                              </TD>
                            </TR>
 		</xsl:for-each>
                          </TBODY>
                        </TABLE>
                        </div>
</xsl:template>
</xsl:stylesheet>