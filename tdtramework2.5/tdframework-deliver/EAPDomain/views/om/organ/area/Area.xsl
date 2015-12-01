<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<title></title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
					  
				  
	<script language="javascript" src="{root/create/path}/views/om/organ/area/Area.js"></script> 
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_enter_jump.js"/>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"></script>
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
		<form method="POST" name="myform" action="{root/create/path}/om/areaaction.do">
			<xsl:apply-templates select="root/create"/>		
		</form>
	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/create">
<table align="center"  border="0" cellspacing="0" cellpadding="0" class="tab_line">
			<tr>
				<td  class="h14">区域维护</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="15"/>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td width="35%">
				<div style="position:absolute; left:10px; top:30px; width:98%; height:400px;z-index:1; overflow-x:hidden;overflow-y:auto;MARGIN: 0px">
				<script>
					init();
					dealtree();
				</script>
				</div>
			</td>
			<td>
				<input type="hidden" name="OprType" value=""></input>
				<input type="hidden" name="Code" value=""></input>
				<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
				    <tr class="trcolorT">
				    	<td class="tdlabelStyle"> 选择操作方式* </td>
						<td class="tdtextStyle">
							<select class="dropDownStyle" name="Act_mode" onChange="change(this);" >
						    	<option value=""></option>
						    	<option value="query">查询</option>
						    	<option value="add">增加</option>	
								<option value="modify">修改</option>
								<option value="delete">删除</option>
							</select>
						</td> 
						<td class="tdlabelStyle">区域编码*</td>
			  			<td class="tdtextStyle">
			  				<input type="text"  name="Area_id"  maxlength ="32" size="20" value="" onkeydown="nas_enter();" class="textStyle"> </input>
			  			</td>
			  			</tr>
				    <tr class="trcolorT">
						<td  class="tdlabelStyle" >区域名称*</td>
			  			<td class="tdtextStyle">
			  				<input type="text" class="textStyle" name="Area_name"  maxlength ="8" size="20" value="" onkeydown="nas_enter();"> </input>
			  			</td>
			  			<td class="tdlabelStyle">邮政编码</td>
			  			<td class="tdtextStyle">
			  				<input type="text" class="textStyle" name="Postal_code"  maxlength ="6" size="20" value="" 	onkeydown="nas_enter();"> </input>
			  			</td>
			  			</tr>
				    <tr class="trcolorT">
				  		<td  class="tdlabelStyle" >长途区号</td>
			  			<td class="tdtextStyle">
			  				<input type="text" class="textStyle" name="Area_code"  maxlength ="4" size="20" value=""  onkeydown="nas_enter();"> </input>		
			  			</td>
			  			<td  class="tdbuttonStyle" colspan = "2">
			  				<input type="button" value="提 交" name="BSubmit"  onclick="apply_form();" class="btn3_mouseout" 			 								onmouseover="this.className='btn3_mouseover'" onmouseout="this.className='btn3_mouseout'" 											onmousedown="this.className='btn3_mousedown'" onmouseup="this.className='btn3_mouseup'"/>
								<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;							&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
			  			</td>
					</tr>	
				</table>
	</td>
	</tr>
</table>
</xsl:template>

</xsl:stylesheet>