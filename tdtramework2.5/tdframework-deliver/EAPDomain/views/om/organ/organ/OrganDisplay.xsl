<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<meta http-equiv="pragma" content="no-cache"/>
	<title></title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{root/create/path}/views/om/organ/organ/OrganDisplay.js"></script> 			  			  
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	var openImg = new Image;
	var closedImg = new Image;
	var doc = document.XMLDocument;	
	var webpath = doc.selectNodes("root/create/path").nextNode().text;
	openImg.src = webpath+"/views/common/images/minus.gif";
	closedImg.src = webpath+"/views/common/images/plus.gif";
	
	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY">
		<form method="POST" name="myform" action="">
			<xsl:apply-templates select="root/create"/>		
		</form>
	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/create">
	<input type="hidden" name="alertMessage"  value="{Message}"></input>
	<input type="hidden" name="openFlagValue" value="{OpenFlag}"></input>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<input type="hidden" name = "Path" value ="{path}"/>
		<tr>
		<td>
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
		//dealtree();
	</script>
</table>	
</xsl:template>

</xsl:stylesheet>