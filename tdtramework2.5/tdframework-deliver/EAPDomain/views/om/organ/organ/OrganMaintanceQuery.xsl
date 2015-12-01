<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<title></title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
					  
	<script language="javascript">
	<xsl:comment>
	<![CDATA[

   
	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY">
		<form method="POST" name="myform" action="">		
			<xsl:apply-templates select="root/create/Organ"/>
		</form>
	</body>
	</html>	
</xsl:template>	

<xsl:template match="root/create/Organ">
	<!--table width="100%" border="0" cellspacing="0" cellpadding="0" background="{path}../views/common/images/map_maintop.gif">
		<tr>
			<td width="5%" align="center"><img src="{path}../views/common/images/icon_arrow_button.gif" align="center" width="15" height="16" /></td>
	   	 <td width="95%" class="h14">详细信息</td>
	  	</tr>
	  	<tr><td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td></tr>
	</table-->
	<table width="100%" border="2" cellpadding="1" cellspacing="1" class="tablebluemore" >
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构编号</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value"><xsl:value-of select="OrganId"/></xsl:attribute>
  				</input>
  			</td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构名称</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganName"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value"><xsl:value-of select="OrganName"/></xsl:attribute>
  				</input>
  			</td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构状态</td>
			<!--td class="tdtextStyle" colspan="1" width="30%">
            <select class="dropdownStyle" name="OrganStatus" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/OrganKind/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          </td-->
			<!--td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganStatus"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value"><xsl:value-of select="OrganStatus"/></xsl:attribute>
  				</input>
  			</td-->
  			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganStatus"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value">
  						<xsl:variable name="vOrgnStatus" select="//create/Organ/OrganStatus" />
  						<xsl:for-each select="//create/OrganStatus/option">
							<xsl:if test="value = $vOrgnStatus">
							<xsl:value-of select="caption"/>
							</xsl:if>
              		</xsl:for-each>
  					</xsl:attribute>
  				</input>
  			</td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构类型</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganKind"  maxlength ="32" size="30%"  onkeypress="" disabled = "true">
  					<xsl:attribute name="value">
  						<xsl:variable name="vOrgnKind" select="//create/Organ/OrganKind" />
  						<xsl:for-each select="//create/OrganKind/option">
							<xsl:if test="value = $vOrgnKind">
							<xsl:value-of select="caption"/>
							</xsl:if>
              		</xsl:for-each>
  					</xsl:attribute>
  				</input>
  			</td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">所属区域</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="AreaId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true">
  					<xsl:attribute name="value"><xsl:value-of select="AreaId"/></xsl:attribute>
  				</input>
  			</td>
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">上级组织机构</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="ParentOrganId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
	  				<xsl:attribute name="value">
	  					<xsl:value-of select="ParentOrganId"/>
	  				</xsl:attribute>
  				</input>
  			</td>
  		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">是否内部组织机构</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="InnerDuty"  maxlength ="32" size="30%"   onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value">
  						<xsl:variable name="vInnerDuty" select="//create/Organ/InnerDuty" />
  						<xsl:for-each select="//create/InnerDuty/option">
							<xsl:if test="value = $vInnerDuty">
							<xsl:value-of select="caption"/>
							</xsl:if>
              		</xsl:for-each>
  					</xsl:attribute>
  				</input>
  			</td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">负责人</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="Principal"  maxlength ="32" size="30%" onkeypress="" disabled = "true"> 
  					<xsl:attribute name="value"><xsl:value-of select="Principal"/></xsl:attribute>
  				</input>
  			</td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">生效日期</td>
				<td bgcolor="#F0F0F0" class="tdtextStyle">
	  				<input type="text"  name="ActiveDate"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
	  					<xsl:attribute name="value"><xsl:value-of select="ActiveDate"/></xsl:attribute>
	  				</input>
	  			</td>
	  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">失效日期</td>
				<td bgcolor="#F0F0F0" class="tdtextStyle">
	  				<input type="text"  name="InactiveDate"  maxlength ="32" size="30%"  onkeypress="" disabled = "true"> 
	  					<xsl:attribute name="value"><xsl:value-of select="InactiveDate"/></xsl:attribute>
	  				</input>
  			</td>
		</tr>
		<tr>
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">详细描述</td>
			<td bgcolor="#F0F0F0" class="tdType4" colspan="4">
  				<input type="text"  name="OrganDesc"  maxlength ="32" size="49%"  onkeypress="" disabled = "true" > 
  					<xsl:attribute name="value"><xsl:value-of select="OrganDesc"/></xsl:attribute>
  				</input>
  			</td>
	  		
		</tr>	
	</table>
</xsl:template>
</xsl:stylesheet>