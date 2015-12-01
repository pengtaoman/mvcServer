<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
<xsl:template match="/">

<html>
<head>
	<title></title>

<script language="javascript"><xsl:comment>
<![CDATA[

function changeDiv(id){
	  divObj = document.all.item("div_"+id);
	  imgObj=document.all.item("img_"+id);
	  if(divObj.style.display=="none")  {
	    	divObj.style.display="block";
	    	imgObj.src="minus.gif";
	   }
	  else {
	    	divObj.style.display="none";
	    	imgObj.src="plus.gif";
	    }
}

]]>
</xsl:comment>	
</script>
</head>
<body>

<form name="myform">
<xsl:apply-templates select="root/tree/item"/>
</form>

</body>
</html>
</xsl:template>

<xsl:template match="item">
	<xsl:choose>
	<!-- 当有子节点的情况 -->
	<xsl:when test="ifChild=1">
		<img src="spacer.gif" align="left" width="{spaceWidth}" height="1"/>      <!-- 放空的图片开始推进 -->
		<img src="minus.gif"  id="img_{id}" onclick="changeDiv({id})"/>  <!-- 加号 减号表示折叠及展开 -->
		<span id="span_{id}" style="cursor:hand" onclick="changeDiv({id})"><xsl:value-of select="name"/></span> <br/>
		<div id="div_{id}">
		<xsl:apply-templates select="child/item"/>
		</div>
	</xsl:when>
	<!-- 当没有子节点的情况,如下为叶子节点 -->
	<xsl:otherwise>
		<img src="spacer.gif" align="left" width="{spaceWidth}" height="1"/> <!-- 放空的图片开始推进,不设置折叠展开图片 -->
		<span id="span_{id}" style="cursor:hand" onclick="return false;"><xsl:value-of select="name"/></span> <br/>
	</xsl:otherwise>
	</xsl:choose>

</xsl:template>

</xsl:stylesheet>
