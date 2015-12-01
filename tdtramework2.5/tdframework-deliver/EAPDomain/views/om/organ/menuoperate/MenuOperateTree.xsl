<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root">
<html>
<head>
	<title>职务功能信息</title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>	
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	
	function imageExecClick(obj,webpath)
	{
		var tt,stt,flag,mystrID,str_img;
		//alert(obj.id);
		tt=obj.id;
		
		mystrID=tt.substring(0,tt.length-5);//????
		str_img=mystrID+"_imgE";
		if(document.menuform.all.item(mystrID+'E').style.display=="block" )
		{
			document.menuform.all.item(mystrID+'E').style.display="none";
			document.menuform.all.item(str_img).src=webpath+"/views/common/images/close.gif";
		}
			//????????????????????,????????.
		else
		{
			document.menuform.all.item(mystrID+'E').style.display="block";
			document.menuform.all.item(str_img).src=webpath+"/views/common/images/open.gif";
		}
	}
	
	function findmenu(menu)
	{
			//alert("/om/menuoperate.do?oprType=findmenu&menuid="+menu.value);
			parent.rightFrame.location.href="/tdframework/om/menuoperate.do?oprType=findmenu&menuid="+menu.value;
	        
	        //menuform.action="<%=request.getContextPath()%>/om/menuoperate.do?oprType=findmenu&menuid="+menuform.menu.value;
			//menuform.submit();
	}
	function findsys(menu)
	{
			//alert("/om/menuoperate.do?oprType=findmenu&menuid="+menu.value);
			parent.rightFrame.location.href="/tdframework/om/menuoperate.do?oprType=findsys&menuid="+menu.value;
	        
	        //menuform.action="<%=request.getContextPath()%>/om/menuoperate.do?oprType=findsys&menuid="+menuform.menu.value;
			//menuform.submit();
	}
	]]>
	</xsl:comment>
	</script>
</head>
<body class="BODY">
<form name="menuform">
<table border="0">
  <tr>
    <td>
	<xsl:apply-templates select="FuncExec/MainMenu"/> 
    </td>
  </tr>
 </table>
</form>
 </body> 
</html> 
</xsl:template> 
   

<!--ExecFunc-->
<xsl:template match="FuncExec/MainMenu">
	<div style="display:block">
		<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine"  STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
			<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
		</IMG>
		<input type="radio" name="menu" onClick="findsys(this)" value="{FunctionID}"/>
		<span class="First" STYLE="cursor:hand;color:#000000">
			<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
			<xsl:value-of select="Name"/>
		</span>
		<xsl:apply-templates select="Level1"/>
	</div>
</xsl:template>
	<!-- 显示第一层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub1"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1">
		<!-- 第一层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="8" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level2"/>
		</xsl:if>
		<!-- 第一层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="24" height="1"/>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第二层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub2"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2">
		<!-- 第二层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="36" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine"  STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First" STYLE="cursor:hand;color:#000000">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level3"/>
		</xsl:if>
		<!-- 第二层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="52" height="1"/>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第三层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub3"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3">
		<!-- 第三层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="60" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine"   STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First" STYLE="cursor:hand;color:#000000">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level4"/>
		</xsl:if>
		<!-- 第三层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="76" height="1"/>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第四层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3/Level4">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub4"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3/Level4/Sub4">
		<!-- 第四层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="92" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine"   STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level5"/>
		</xsl:if>
		<!-- 第四层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="spacer.gif" align="left" width="110" height="1"/>
						<input type="radio" name="menu" onClick="findmenu(this)" value="{FunctionID}"/>
						
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	
	</xsl:stylesheet>
	