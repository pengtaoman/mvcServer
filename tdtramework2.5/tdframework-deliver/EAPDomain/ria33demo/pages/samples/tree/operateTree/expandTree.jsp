<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>expandTree</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/data.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/operateTree/expandTree.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树展开功能说明">
			·树可以按照指定路径展开树节点；<br>
			·树可以按照给定节点的id，将节点显示出来，如必要将会发送请求得到数据；<br>
			·树支持按照层级展开节点。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树展开功能样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" label="UniEAP"  id="tree4expand"  binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:480px">
						利用路径（/1213062976264/1229578772421）展开节点，即展开“表格控件/表格应用”节点:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="expandNodeByPath" onclick="expandNodeByPath()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:480px">
						显示id为"query"的节点，即“表格控件/表格API使用/查询表格”节点:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="showNodesById" onclick="showNodesById()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:480px">
						按照层级展开节点（展开所有第一层级的节点）:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="expandNodeByLevel" onclick="expandNodeByLevel()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树展开功能源码">
			<textarea name="code" class="js">
			function expandNodeByPath(){
			   unieap.byId('tree4expand').collapseAllNodes();
			   unieap.byId('tree4expand').expandNodeByPath("/1213062976264/1229578772421");
			}
			function showNodesById(){
			   unieap.byId('tree4expand').collapseAllNodes();
			   unieap.byId('tree4expand').showNodesById('query');
			}
			function expandNodeByLevel(){
			   unieap.byId('tree4expand').expandNodeByLevel(1);
			}
			</textarea>
		</div>
	</body>
</html>