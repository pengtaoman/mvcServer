<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>展开收起节点</title>
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
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/basicTree/expandAllNode.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·调用expandAllNodes方法展开树上所有节点；<br>
			·调用collapseAllNodes方法将会收起树上的所有节点。
		</div>

			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree"  label="UniEAP" id="basicTree"  binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					</td>
				</tr>
				<tr>
				  <td style="font-size: 13px;font-family: 宋体;width:280px">
				          展开所有节点
				  </td>
				  <td> 
				     <div dojoType="unieap.form.Button" label="expandAllNodes" onclick="expandAllNodes">
				  </td>
				</tr>
				<tr>
				  <td style="font-size: 13px;font-family: 宋体;width:280px">
				          收起所有节点
				  </td>
				  <td> 
				     <div dojoType="unieap.form.Button" label="collapseAllNodes" onclick="collapseAllNodes">
				  </td>
				</tr>
			</table>
	
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
			<textarea name="code" class="js">
			  function expandAllNodes(){
			    unieap.byId('basicTree').expandAllNodes();
			   }
			   function collapseAllNodes(){
			    unieap.byId('basicTree').collapseAllNodes();
			   }
			</textarea>
		</div>
	</body>
</html>