<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	<head>
	<title>EmployList</title>
	<LINK REL="stylesheet" HREF="{/root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	var strOverName,strTRClassName;
	var myObj='';
	 function deal_click_link(this_link)
		{
			var url ="EmployeeMaintanceAction.do?&EmployeeId="+this_link.id+"&OperType=query";
			//alert(this_link.id);
			parent.mainFrameset.cols="35%,0,*,0,0,0";
		 	parent.employeemaintance.location.href = url;
		}

	 function add_click()
		{
			var organKind = parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			//var dutyId = parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			//var url = "EmployeeMaintanceAction.do?&OrganKind="+organKind+"&OrganId="+organId+"&DutyId="+dutyId+"&BelongArea="+belongArea+"&OperType=init"
		 	var currentOrganName = "";
		 	var url = "EmployeeMaintanceAction.do?&OrganKind="+organKind+"&OrganId="+organId+"&BelongArea="+belongArea+"&OperType=init"
		 	
		 	//先判断一下当前选中的结点是否为职务结点,如果是,则允许增加,如果不是,则不允许增加
			/*
			if(organKind != "duty"){
				if(organKind =="organ"){
					currentOrganName = "部门";
				}else{
					currentOrganName = "行政区域";
				}
				alert("对不起,您当前选中结点为"+currentOrganName+",增加职员请选择职务结点!");
				return;
			}
			*/
		 	//判断结束
		 	
		 	parent.mainFrameset.cols="35%,0,*,0,0";
		 	parent.employeemaintance.location.href = url;
		 	//return false;
		 }
	function MouseOver(obj) 
	{ 
		strOverName=obj.className;
		obj.className = "trmore"; 
	} 
	function MouseOut(obj) 
	{ 
		obj.className = "clsLabel";
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
	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY" background="{root/create/path}/views/common/images/bg_content.gif" leftmargin="0" topmargin="0">

		<form method="POST" name="myform" action="">		
				<xsl:apply-templates select="root/create"/>
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
<xsl:template match="root/create">
<TABLE cellSpacing="0" cellPadding="0" width="110" border="0">
              <TBODY>
              <TR>
                <TD colSpan="5"><IMG height="25" alt="" 
                  src="{/root/create/path}/views/common/images/topsellers_off.gif" 
                  width="50" border="0"/>
                  
                  <IMG height="25"
                  src="{/root/create/path}/views/common/images/used_topsellers_tab.gif" 
                  width="60" border="0" onclick="return add_click();" style="cursor:hand;"/></TD></TR>
              <TR>
                <TD width="1" bgColor="#7F9DB9"><IMG height="32" alt="" 
                  src="{/root/create/path}/views/common/images/spacer.gif" 
                  width="1" border="0"/></TD>
                <TD><IMG height="20" alt="" 
                  src="{/root/create/path}/views/common/images/spacer.gif" 
                  width="4" border="0"/></TD>
                <TD vAlign="top" align="left">
                  <TABLE cellSpacing="0" cellPadding="0" width="100%" 
                  border="0">
                          <TBODY>
		<xsl:for-each select="list">
		<!-- >是在单元格上处理的onclick事件，单元格当中显示的是人名和序号，点击单元格就转到人员详细信息的页面。<-->
	                         <TR style="cursor:hand;"> 
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
                              <TD vAlign="top" width="18">
                         	     <xsl:value-of select="RowNo"/>
							  </TD>
                              <TD vAlign="top" width="140">
                              <IMG
                              src="{/root/create/path}/views/common/images/yarrow.gif" /><xsl:value-of select = "EmployeeName"/>
                              </TD>
                            </TR>
 		</xsl:for-each>
                           
                            <TR> 
                              <TD vAlign="top" colSpan="2"> <TABLE cellSpacing="0" cellPadding="0" width="100%" 
border="0">
                                  <TBODY>
                                    <TR> 
                                      <TD><IMG height="7" 
                              src="{/root/create/path}/views/common/images/spacer.gif" 
                              width="100%"/></TD>
                                    </TR>
                                    <TR> 
                                      <TD 
                            background="{/root/create/path}/views/common/images/dots4.gif"><IMG 
                              height="2" alt="" 
                              src="{/root/create/path}/views/common/images/spacer.gif" 
                              width="32" border="0"/></TD>
                                    </TR>
                                    <TR> 
                                      <TD><IMG height="4" 
                              src="{/root/create/path}/views/common/images/spacer.gif" 
                              width="100%"/></TD>
                                    </TR>
                                  </TBODY>
                                </TABLE></TD>
                            </TR>
                          </TBODY>
                        </TABLE></TD>
                <TD><IMG height="20" alt="" 
                  src="{/root/create/path}/views/common/images/spacer.gif" 
                  width="4" border="0"/></TD>
                <TD width="3" bgColor="#7F9DB9"><IMG height="3" alt="" 
                  src="{/root/create/path}/views/common/images/spacer.gif" 
                  width="3" border="0"/></TD></TR>
              <TR>
                <TD width="1"></TD>
                <TD bgColor="#7F9DB9" colSpan="4"><IMG height="1" alt="" 
                  src="{/root/create/path}/views/common/images/spacer.gif" 
                  width="1" border="0"/></TD></TR></TBODY></TABLE>
</xsl:template>
</xsl:stylesheet>