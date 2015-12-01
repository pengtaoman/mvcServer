<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<title></title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{root/path}/views/om/organ/employeeduty/OrganTree.js"></script> 			  			  
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	var openImg = new Image;
	var closedImg = new Image;
	var doc = document.XMLDocument;
	var webpath = doc.selectNodes("root/path").nextNode().text;
	openImg.src = webpath+"/views/common/images/minus.gif";
	closedImg.src = webpath+"/views/common/images/plus.gif";
	function MouseOver(obj) 
	{ 
		//obj.className = "clsMouseOver"; 
	} 
	function MouseOut(obj) 
	{ 
		/*if(!obj.Checked) 
			obj.className = "clsLabel"; 
		else 
			obj.className = "clsCurrentHasFocus"; */
	} 
	function MouseDown(obj) 
	{ 
		//obj.className = "clsMouseDown"; 
	} 
	function MouseUp(obj) 
	{ 
		//MouseOut(obj); 
	}
	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="Body">
		<form method="POST" name="myform" action="">
			<xsl:apply-templates select="root/organDisplayColl"/>
		<input type="hidden" id="alertMessage" value="{root/alertMessage}"/>
		</form>
	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/organDisplayColl">
	<input type="hidden" name="alertMessage"  value="{alertMessage}"></input>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" background="{path}/views/common/images/map_maintop.gif">
		<tr>
	   	 <td>
	   	 <table align="center"  border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="5%" align="center" valign="top">
					<img src="{//path}/views/common/images/current2.gif" align="center" width="20" height="20"/>
				</td>
				<td  class="h14">组织机构</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="15"/>
			</tr>
		</table>
	   	 </td>
	  	</tr>
	 	<tr><td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td></tr>
	<script>
		init();
		dealtree();
	</script>
</table>	
</xsl:template>

</xsl:stylesheet>