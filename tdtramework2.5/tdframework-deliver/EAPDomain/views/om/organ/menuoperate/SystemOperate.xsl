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
function init(){

	nas_select_default('sys','systemType','create/SystemType/selected');//组织机构状态
}

function nas_select_default(form_name,dwname,dwselect)
{
	source = document.XMLDocument;
	mark="/root/"+dwselect; 
   
	v=source.selectNodes(mark);    
	for(t=v.nextNode();t;t=v.nextNode())
	{ 
		temp=t.text; 
		
		if (temp!="-1" && temp!="")
		{
			var dwobject="document."+form_name+"."+dwname+".value='"+temp+"'";
			eval(dwobject);
		}
	}  
}
function willaddsys()
{
	        sys.action="menuoperate.do?oprType=willaddsys";
			sys.submit();
}
function addsys()
{
	        sys.action="menuoperate.do?oprType=addsys";
			sys.submit();
}
function updatesys()
{
	if(confirm("确定要修改这个菜单么？"))
		{
	        sys.action="menuoperate.do?oprType=updatesys";
			sys.submit();
		}
	else
	    return false;
}
function deletesys()
{
	if(confirm("确定要删除这个菜单么？"))
		{
	        sys.action="menuoperate.do?oprType=deletesys";
			sys.submit();
		}
	else
	    return false;
}
  ]]>
	</xsl:comment>
	</script>
	</head>
	<body onload="init()" class="BODY ">
		<form method="POST" name="sys" action="">		
			<xsl:apply-templates select="root/create"/>
		</form>
	</body>
	</html>	
</xsl:template>	

<xsl:template match="root/create">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" height="20px">
	  	<tr><td><xsl:text disable-output-escaping="no"></xsl:text></td></tr>
	</table>
			
			<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
			<tr class="trcolorT">
				<td class="tdlabelStyle">系统编码</td>
				<td class="tdtextStyle">
	  				<input type="text"  class="textStyle" name="systemId"  maxlength ="32"  value="{SystemId}" />
	  				<input type="hidden"  name="oldSystemId"  value="{SystemId}" />
	  			</td>
			</tr>
			<tr class="trcolorT">
				<td class="tdlabelStyle">系统名称</td>
				<td class="tdtextStyle">
	  				<input type="text"  class="textStyle" name="systemName"  maxlength ="32"  value="{SystemName}" />
	  			</td>
			</tr>
			
			<tr class="trcolorT">
			<td class="tdlabelStyle">系统类型</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="systemType" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/SystemType/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
			</tr>
			
			<tr class="trcolorT">
				<td class="tdlabelStyle">详细描述</td>
				<td class="tdtextStyle">
	  				<input type="text"  class="textStyle" name="detailDesc"  maxlength ="32"  value="{DetailDesc}" />
	  			</td>
			</tr>
		
			<tr class="trcolorT">
				<td class="tdlabelStyle">对应portal中的window_id</td>
				<td class="tdtextStyle">
	  				<input type="text"  class="textStyle" name="portalWinId"  maxlength ="32"  value="{PortalWinId}" />
	  			</td>
			</tr>
	</table>
	<center>
		 	<input type="button" name="Submit"  onClick="updatesys()" value="修改"/>
			 <input type="button" name="Submit2"  onClick="deletesys()" value="删除"/>
			 <input type="button" name="Submit3"  onClick="addsys()" value="增加"/>
			 <input type="button" name="Submit3"  onClick="willaddsys()" value="新增"/>
		</center>
</xsl:template>
</xsl:stylesheet>