<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root/create">
<html>
<head>
	<title>logquerybutton</title>
	<LINK REL="stylesheet" HREF="{path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	function getPageLink(pageLink,webPath){
		var url = webPath+"/"+pageLink;
		//alert(url);
		this.location = url;
	}
	]]>
	</xsl:comment>
	</script>
</head>
<body class="BODY">
<form name="myform" method="post" action="">
<TABLE border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
<TR class="thList">
	<TD class="tdfontstyle">序号</TD>
	<TD class="tdfontstyle">任务名称</TD>
	<TD class="tdfontstyle">所属系统</TD>
</TR>
<xsl:for-each select="WorkInfo">
<TR>
	<xsl:choose>
		<xsl:when test="(position() mod 2) = 1 ">
			<xsl:attribute name="class">trList</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
			<xsl:attribute name="class">trListDark</xsl:attribute>
			</xsl:otherwise>
	</xsl:choose>	
	<TD align="center" ><xsl:value-of select="RowNo"/></TD>
	<TD style="cursor:hand;color:blue;text-Decoration:underline" onclick="getPageLink('{WorkPageLink}','{//create/path}')"><xsl:value-of select="WorkMenuName"/></TD>
	<TD><xsl:value-of select="SystemName"/></TD>
</TR>
</xsl:for-each>
</TABLE>

</form>
</body>
</html>	
</xsl:template>
</xsl:stylesheet>