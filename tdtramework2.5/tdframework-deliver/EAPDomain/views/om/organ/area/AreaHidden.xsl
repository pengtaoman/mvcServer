<?xml version="1.0" encoding="gb2312"?>
<!--
/**
 * <p>Title:区域管理隐藏帧</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Company: neusoft</p>
 * @author jiangyun 
 * @version 3.0
 */
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>

<xsl:template match="/">
	<HTML>
	<meta http-equiv="pragma" content="no-cache"/> 
	<meta http-equiv="cache-control" content="no-cache"/> 
	<meta http-equiv="expires" content="0"/>
	<meta http-equiv="content-type" content="text/html; charset=gb2312"/>
	<SCRIPT language="JavaScript">
	<xsl:comment>
	<![CDATA[	
	function init(){
		var doc = document.XMLDocument;
		var items = doc.selectNodes("root/create/Area");
		var actMode = window.parent.frames[0].document.all.Act_mode.value;
		for(var i = items.nextNode();i != null; i = items.nextNode())
		{
			var areaId = i.selectNodes("Area_id").nextNode().text;
			var areaName = i.selectNodes("Area_name").nextNode().text;	
			//var areaLevel = i.selectNodes("Area_level").nextNode.text;
			var postalCode = i.selectNodes("Postal_code").nextNode.text;
			var areaCode = i.selectNodes("Area_code").nextNode.text;
			document.myform.Area_id.value = areaId;
			document.myform.Area_name.value = areaName;
			//document.myform.Area_level.value = areaLevel;
			document.myform.Postal_code.value = postalCode;
			document.myform.Area_code.value = areaCode;
			
			if(actMode != "add"){
				window.parent.frames[0].document.all.Area_id.value = areaId;
				window.parent.frames[0].document.all.Area_name.value = areaName;
				//window.parent.frames[0].document.all.Area_level.value = areaLevel;
				window.parent.frames[0].document.all.Postal_code.value = postalCode;
				window.parent.frames[0].document.all.Area_code.value = areaCode;
				if(actMode == "" ){
					window.parent.frames[0].document.all.Act_mode.value = "query";
					window.parent.frames[0].document.all.BSubmit.disabled = true;
				}
			}
		}
		var oprFlag = doc.selectNodes("root/create/OprFlag").nextNode().text;
		if(oprFlag == "0")
			alert("增加失败！");
		
	}
		
		
	]]>
	</xsl:comment>
	</SCRIPT>
	<body>
	<form name="myform">
		<xsl:apply-templates select="root/create"/>   
	</form>
	</body> 
	</HTML>
</xsl:template>
<xsl:template match="root/create">
	<input type="text" name="Area_id" value=""></input>
	<input type="text" name="Area_name"></input>
	<input type="text" name="Postal_code"></input>
	<input type="text" name="Area_code"></input>
<script>
	init();
</script>
</xsl:template> 

</xsl:stylesheet>