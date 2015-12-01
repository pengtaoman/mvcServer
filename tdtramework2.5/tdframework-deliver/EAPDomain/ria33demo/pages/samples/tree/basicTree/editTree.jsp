<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>editTree</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/basicTree/editTree.js"></script>
			

	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·创建一棵可以编辑的树，选中节点后单击可修改数据；<br>
			·可设置是否可以使修改后的数据为空，默认为不许为空，即如果为空则回复原数据。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例">
			<div style="font-size: 13px;font-family: 宋体" colspan="2">
				可编辑的树:
			</div>
			<div dojoType="unieap.tree.Tree" 
				id="editTree" 
				label="UniEAP" 
				treeEditor ="{allowBlank:false}"
				binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
			</div>
			<table>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置修改后数据可以为空:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="修改数据可以为空" onClick="setBlank()"></div>
					</td>
				</tr>
			</table>
					
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 id="basicTree" 
					 label="UniEAP" 
					 treeEditor ="{allowBlank:false}"//设置该树为可编辑且默认不可为空
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
		</div>
	</body>
</html>