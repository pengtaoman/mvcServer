<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<SCRIPT language="javascript" src="{root/create/path}/views/common/js/nas_select_default.js"/>
	<title></title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
		
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
function init(){

	nas_select_default('menu','menuType','create/MenuType/selected');//组织机构状态
	nas_select_default('menu','openMethod','create/OpenMethod/selected');//所属区域
	nas_select_default('menu','ifMyWork','create/IfMyWork/selected');//是否内部组织机构
	nas_select_default('menu','inuse','create/Inuse/selected');//组织机构类型

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
function willaddmenu()
{
	        menu.action="menuoperate.do?oprType=willaddmenu";
			menu.submit();
}
function addmenu()
{
	        menu.action="menuoperate.do?oprType=addmenu";
			menu.submit();
}
function updatemenu()
{
	if(confirm("确定要修改这个菜单么？"))
		{
	        menu.action="menuoperate.do?oprType=updatemenu";
			menu.submit();
			//parent.location.href="/tdframework/views/om/organ/menuoperate/MenuOperateMain.jsp";
		}
	else
	    return false;
}
function deletemenu()
{
	if(confirm("确定要删除这个菜单么？"))
		{
	        menu.action="menuoperate.do?oprType=deletemenu";
			menu.submit();
		}
	else
	    return false;
}
  ]]>
	</xsl:comment>
	</script>
	</head>
	<body onload="init()" class="BODY ">
		<form method="POST" name="menu" action="">		
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
			<td class="tdlabelStyle">菜单编码</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuId"  maxlength ="32"  value="{MenuId}" />
  				<input type="hidden"  name="oldMenuId"  value="{MenuId}" />
  			</td>
  			<td class="tdlabelStyle">菜单名称</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuName"  maxlength ="32"  value="{MenuName}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">系统编码</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="systemId"  maxlength ="32"  value="{SystemId}" />
  			</td>
  			<td class="tdlabelStyle">模块编码</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="moduleId"  maxlength ="32"  value="{ModuleId}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">类型0：按钮；1：最小子菜单 2：菜单</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="menuType" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/MenuType/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">打开方式0:在框架中打开1:在新窗口中打开</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="openMethod" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/OpenMethod/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">页面链接</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="pageLink"  maxlength ="32"  value="{PageLink}" />
  			</td>
  			<td class="tdlabelStyle">菜单层次</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="layer"  maxlength ="32"  value="{Layer}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">记录日志</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="log"  maxlength ="32"  value="{Log}" />
  			</td>
  			<td class="tdlabelStyle">菜单顺序</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="order"  maxlength ="32"  value="{Order}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">ifMyWork0:不显示,1:显示</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="ifMyWork" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/IfMyWork/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">上级菜单</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="parentMenuId"  maxlength ="32"  value="{ParentMenuId}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">使用状态 1:使用中 0：停用</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="inuse" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/Inuse/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">备注</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuDesc"  maxlength ="32"  value="{MenuDesc}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">对应portal中的window_id</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="portalWinId"  maxlength ="32"  value="{PortalWinId}" />
  			</td>
  			<td> </td><td> </td>
		</tr>
	</table>
	<center>
			 <input type="button" name="Submit"  onClick="updatemenu()" value="修改"/>
			 <input type="button" name="Submit2"  onClick="deletemenu()" value="删除"/>
			 <input type="button" name="Submit3"  onClick="addmenu()" value="增加"/>
			 <input type="button" name="Submit3"  onClick="willaddmenu()" value="新增"/>
			</center>
</xsl:template>
</xsl:stylesheet>