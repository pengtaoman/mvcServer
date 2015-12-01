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
	
	function deal_click(webPath)
	{
	//校验
		
	//写值
		document.addIframe.document.myform.OperType.value="add";
		document.addIframe.document.myform.OrganId.value=document.myform.OrganId.value;
		document.addIframe.document.myform.OrganName.value=document.myform.OrganName.value;
		document.addIframe.document.myform.OrganStatus.value=document.myform.OrganStatus.value;
		document.addIframe.document.myform.OrganKind.value = document.myform.OrganKind.value;
		//上级组织机构
		document.addIframe.document.myform.ParentOrganId.value = parent.document.myform.OrganId.value;
		//所属地市
		document.addIframe.document.myform.AreaId.value = parent.document.myform.BelongArea.value;
		document.addIframe.document.myform.InnerDuty.value = document.myform.InnerDuty.value;
		document.addIframe.document.myform.Principal.value = document.myform.Principal.value;	
		document.addIframe.document.myform.ActiveDate.value = document.myform.ActiveDate.value;			
		document.addIframe.document.myform.InactiveDate.value = document.myform.InactiveDate.value;
		document.addIframe.document.myform.OrganDesc.value = document.myform.OrganDesc.value;
		document.addIframe.document.myform.target = "_self";
		//alert(document.addIframe.document.myform.OperType.value);
		document.addIframe.document.myform.action = webPath + "/om/OrganMaintanceAction.do";
		document.addIframe.document.myform.submit();
	}
   
	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY">
		<form method="POST" name="myform" action="{root/create/path}/om/OrganMaintanceAction.do">		
			<xsl:apply-templates select="root/create"/>
		</form>
	</body>
	</html>	
</xsl:template>	

<xsl:template match="root/create">
	<!--table width="100%" border="0" cellspacing="0" cellpadding="0" background="{path}../views/common/images/map_maintop.gif">
		<tr>
			<td width="5%" align="center"><img src="{path}../views/common/images/icon_arrow_button.gif" align="center" width="15" height="16" /></td>
	   	 <td width="95%" class="h14">详细信息</td>
	  	</tr>
	  	<tr><td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td></tr>
	</table-->
	<table width="100%" border="2" cellpadding="1" cellspacing="1" class="tablebluemore" >
		<!--input type="hidden" name ="Id" value = "{Id}" /-->
		<!--input type="hidden" name="Message" value = "{Message}" /-->
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构编号</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true" value="不必填"> 
  				</input>
  			</td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构名称</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="OrganName"  maxlength ="32" size="30%"  onkeypress="" value =""/>
  			</td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构状态</td>
			<td class="tdtextStyle" colspan="1" width="30%">
            <select class="dropdownStyle" name="OrganStatus" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/OrganStatus/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          </td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">组织机构类型</td>
			<td class="tdtextStyle" colspan="1" width="30%">
            <select class="dropdownStyle" name="OrganKind" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/OrganKind/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          </td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">所属区域</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="AreaId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true" value="不必填">
  					
  				</input>
  			</td>
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">上级组织机构</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="ParentOrganId"  maxlength ="32" size="30%"  onkeypress="" disabled = "true" value = "不必填"> 
	  				
  				</input>
  			</td>
  		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">是否内部组织机构</td>
			<td class="tdtextStyle" colspan="1" width="30%">
            <select class="dropdownStyle" name="InnerDuty" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/InnerDuty/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          </td>
  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">负责人</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle">
  				<input type="text"  name="Principal"  maxlength ="32" size="30%" onkeypress="" />
  			</td>
		</tr>
		<tr class="trcolor">
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">生效日期</td>
				<td bgcolor="#F0F0F0" class="tdtextStyle">
	  				<input type="text"  name="ActiveDate"  maxlength ="32" size="30%"  onkeypress="" value = ""/> 
	  			</td>
	  			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">失效日期</td>
				<td bgcolor="#F0F0F0" class="tdtextStyle">
	  				<input type="text"  name="InactiveDate"  maxlength ="32" size="30%"  onkeypress="" value = ""/> 
  			</td>
		</tr>
		<tr>
			<td align = "left" bgcolor="#F0F0F0" class="tdlabelStyleL" size ="20%">详细描述</td>
			<td bgcolor="#F0F0F0" class="tdtextStyle" colspan="4">
  				<input type="text"  name="OrganDesc"  maxlength ="32" size="49%"  onkeypress="" value = "" /> 
  				<input type="button" name="delete" class="buttonStyle" value="提交" onclick="deal_click('{//create/path}')" />
  			</td>
		</tr>	
	</table>
	<iframe name="addIframe" id="addIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" height ="0" src="{//create/path}/views/om/organ/organ/OrganHidden.jsp" />
</xsl:template>
</xsl:stylesheet>