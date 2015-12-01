<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root">
<html>
<head>
	<title>test button disabled </title>
	<LINK REL="stylesheet" HREF="{Path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{Path}/views/common/js/nas_set_button_disabled.js"></script> 
</head>
<body class="BODY" onload="nas_set_button_disabled('','')">
<form name="myform" method="post" action="">
<TABLE border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
<TR class="thList">
	<TD>测试按钮</TD>
	<td>
	<input TYPE="button" name ="addbutton" width="100" onclick=""/>
	</td>
</TR>
</TABLE>
</form>
</body>
</html>	
</xsl:template>
</xsl:stylesheet>