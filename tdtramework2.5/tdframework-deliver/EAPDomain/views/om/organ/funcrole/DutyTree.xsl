<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>

<xsl:template match="/">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
<LINK REL="stylesheet" HREF="{root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
<title></title>
</head>
<SCRIPT language="javascript">
<xsl:comment><![CDATA[
function selectMenu(webPath,dutyId) {
	parent.bottom.location=webPath + "/om/funcRoleAdmin.do?operType=roleListQuery&dutyId="+dutyId;
	parent.right.location=webPath + "/blank.html";
}
function showTree(){
	var outStr = "";
	var source = document.XMLDocument;
	var webPath = source.selectNodes("/root/path").nextNode().text;
	var orgKindContent = source.selectNodes("/root/organKindDutyColl/organKind");
	for(t=orgKindContent.nextNode();t;t=orgKindContent.nextNode()){
		var organId = t.selectNodes("kindId").nextNode().text;		
		var organName = t.selectNodes("kindDesc").nextNode().text;
		outStr=outStr + "<span style='cursor:hand' id="+organId+" onclick=showOrganKind(id)>"+organName+"</span><br/>";
		outStr=outStr + "<div id='div"+organId+"'>";
		var dutyContent = t.selectNodes("duty");
		for(m=dutyContent.nextNode();m;m=dutyContent.nextNode()){
			var dutyId = m.selectNodes("dutyId").nextNode().text;
			var dutyName = m.selectNodes("dutyName").nextNode().text;
			var dutyLevel = m.selectNodes("dutyLevel").nextNode().text;
			var spaceVal = "";
			for(i=0;i<dutyLevel;i++){
				spaceVal = spaceVal + "&nbsp;&nbsp;&nbsp;&nbsp;";//没小一级错后两个空格
			}
			radioBut = "<input name=\"dutyRodio\" type=\"radio\" onclick=\"selectMenu('" + webPath + "','" + dutyId + "')\"/>"; 
			outStr=outStr + spaceVal + radioBut + "<span id="+dutyId+">"+dutyName+"</span><br/>";
		}
	}
	document.write(outStr);
}
//展开
function showOrganKind(organId) {
	var organDivId = "div" + organId;
	if(document.all.item(organDivId).style.display == "none"){
		document.all.item(organDivId).style.display = "block";
	}
	else {
		document.all.item(organDivId).style.display = "none";
	}
}
]]></xsl:comment>
</SCRIPT>

<body class="BODY">
<form name="myform" method="POST">
<script>
showTree();
</script>
</form>

</body>
</html>
</xsl:template>

<xsl:template name="dutyParent">

</xsl:template>
</xsl:stylesheet>
