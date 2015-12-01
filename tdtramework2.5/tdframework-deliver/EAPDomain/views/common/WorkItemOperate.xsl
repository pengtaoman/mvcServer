<?xml version="1.0" encoding="gb2312" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312" />
<xsl:strip-space elements="*"/>

<xsl:template match="/">
	<html>	
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
			<Link rel="stylesheet" href="{root/path}/views/common/css/crm_style.css"
			type="text/css" />
			<title></title>
		</head>
		
		<script language="javascript" src="{root/path}/views/common/js/nas_select_default.js"/>
		<script language="javascript" src="{root/path}/views/common/js/nas_enter_jump.js"/>
		<script language="javascript">
		<xsl:comment><![CDATA[
			var path = "/crm";
		
			function init(){								
				path = document.myform.path.value;
			}			
			
			//查询待办件详细信息
			function queryDetail(){
				var itemID = document.myform.workItemID.value;	
				var itemKind = document.myform.workItemKind.value;
				var itemStatus = document.myform.workItemName.value;	
				var itemQueryType = document.myform.queryType.value;
				var queryForward = document.myform.queryForward.value;
				var queryAction = document.myform.queryAction.value;
				var themeId = document.myform.themeId.value;
				
				document.myform.target = "detailFrame";
				document.myform.action = path+"/retain/" + queryAction + ".do?operType=" + itemQueryType +"&themeId="+themeId;
				document.myform.submit();
				
				/*window.open(path+"/retain/" + queryAction + ".do?OprType=" + itemQueryType + "&workItemID="
					+ itemID + "&workItemKind=" + itemKind + "&queryForward=" + queryForward,
					"","height=400px, width=800px, top=160px, left=150px,toolbar =no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=yes");		
				*/		
			}
			
			//打开工作项处理，shwoModalDialog不可以定向到XSL
			function operateWorkItem(){
				
				var itemID = document.myform.workItemID.value;	
				var itemKind = document.myform.workItemKind.value;
				var operateAction = document.myform.operateAction.value;
				var operateForward = document.myform.operateForward.value;
				var operateType = document.myform.operateType.value;
				var itemName = document.myform.workItemName.value;
				var aiid = document.myform.aiid.value;
				var themeId = document.myform.themeId.value;
				var ret = window.showModalDialog(path+"/retain/workItemOperate.do?OprType=operate&workItemID="
										+ itemID + "&workItemKind=" + itemKind +"&operateAction=" + operateAction
										+"&operateForward=" + operateForward + "&operateType=" + operateType 
										+"&workItemName=" + itemName + "&aiid=" + aiid + "&themeId="+themeId, "",
				"dialogWidth:800px;dialogHeight:600px;center:yes;resizable:yes;status:no;scroll:yes;");	
										
				
				if(ret == "workClose"){
					delOneRow("workTable", curRowIndex);
					document.myform.detailBt.disabled = true;
					document.myform.operateBt.disabled = true;
				}			
			}
			
			function delOneRow(tableName,rowIndex)
			{
				var objTable = document.getElementById(tableName);
				if(objTable.rows.length==1 || rowIndex==0)
				{
					return;
				}		
				objTable.deleteRow(rowIndex);
				currRowIndex = 0;
			}
			
			
			var curRowIndex;
			function selectRow(objTR)
			{	
				var objTable = objTR.parentElement;			
				for(var i=1;i<objTable.rows.length;i++)
					objTable.rows[i].bgColor = "#ECF3FB";			
				objTR.bgColor="#c6cfde";
				curRowIndex = objTR.rowIndex;
				initSelectValue(objTR);
				document.myform.freshBt.disabled = false;
				document.myform.operateBt.disabled = false;
				queryDetail();
			}
			
			function initSelectValue(object){
				document.myform.workItemID.value = object.workItemID;
				document.myform.workItemKind.value = object.workItemKind;
				document.myform.workItemName.value = object.workItemName;
				document.myform.operateAction.value = object.operateAction;
				document.myform.queryAction.value = object.queryAction;
				document.myform.operateForward.value = object.operateForward;
				document.myform.queryForward.value = object.queryForward;	
				document.myform.operateType.value = object.operateType;
				document.myform.queryType.value = object.queryType;
				document.myform.aiid.value = object.aiid;
				document.myform.themeId.value = object.themeId;//liuying 2004-11-26
			}
			
			function freshWork(){
				window.detailFrame.location.href = path + "/blank.html";
				//document.myform.target = "detailFrame";
				document.myform.action = path+"/retain/workItemOperate.do";
				document.myform.submit();
			}
			
		]]></xsl:comment>
		</script>
		
		<body onload="init()" class="BODY">
			<form method="POST" name="myform" >
				<xsl:apply-templates select="root" />
				<input type="hidden" name="path" value="{root/path}" />
				<input type="hidden" name="workItemID" value="" />
				<input type="hidden" name="workItemKind" value="" />
				<input type="hidden" name="workItemName" value="" />
				<input type="hidden" name="operateAction" value="" />
				<input type="hidden" name="queryAction" value="" />
				<input type="hidden" name="operateForward" value="" />
				<input type="hidden" name="queryForward" value="" />
				<input type="hidden" name="operateType" value="" />
				<input type="hidden" name="queryType" value="" />
				<input type="hidden" name="aiid" value="" />
				<input type="hidden" name="themeId" value="" />
			</form>
		</body>
	</html>
</xsl:template>

<xsl:template match="root">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" 
    		background="{/root/path}/views/common/images/map_maintop.gif" >
	    <tr>
	      <td width="5%" align="center">
	      	<img src="{/root/path}/views/common/images/icon_arrow_button.gif" align="center" width="15" height="16" />
	      </td>
	      <td width="95%" class="h14">待办件</td>
	    </tr>
	    <tr><td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td></tr>
  	</table>
	<table width="95%" border="0" bordercolor="#000000" align="center" 
		   cellpadding="0" cellspacing="1"  class="tablebluemore" id="workTable">
		<tr class="trcolor">
			<td class='h14'>待办件主题</td>
			<td class='h14'>处理事项</td>
			<td class='h14'>到达时间</td>
			<td class='h14'>办理期限</td>
			<td class='h14'>提交人</td>
		</tr>
		<xsl:for-each select="create/workItem">
			<tr bgcolor="#ECF3FB" onClick="selectRow(this)" 
			    workItemID="{workItemID}" workItemName="{workItemName}" workItemKind="{workItemKind}" 
			    queryAction="{queryAction}" queryType="{queryType}" queryForward="{queryForward}"
			    operateAction="{operateAction}" operateType="{operateType}" operateForward="{operateForward}"
			    aiid="{aiid}" themeId="{themeId}">
				<td><xsl:value-of select="workItemName" /></td>
				<td ><xsl:value-of select="nextOperate" /></td>
				<td ><xsl:value-of select="uploadDate" /></td>
				<td ><xsl:value-of select="expireDate" /></td>
				<td ><xsl:value-of select="uploader" /></td>
			</tr>		
		</xsl:for-each>
		
	</table>
	<table width="95%" border="0" bordercolor="#000000" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
		<tr class="trcolor">
			<td class="tdbuttonStyle"  align="center" >
				<input class="buttonStyle" type="button" value="刷新" name="freshBt" 
				disabled="true" onClick="freshWork()" />
			</td>	
			<td class="tdbuttonStyle"  align="center"  >
				<input class="buttonStyle" type="button" value="事件处理" name="operateBt" 
				disabled="true" onClick = "operateWorkItem()" />
			</td>	
		</tr>
	</table>
	<iframe id="detailFrame" name="detailFrame" frameborder="0" scrolling="yes" marginwidth="0" marginheight="0" style="height:80%;width:98%;"/>
</xsl:template>
</xsl:stylesheet>