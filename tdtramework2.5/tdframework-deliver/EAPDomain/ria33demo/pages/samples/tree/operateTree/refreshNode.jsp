<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>refreshNode</title>
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
			src="<%=appPath%>/pages/samples/tree/operateTree/refreshNode.js"></script>		
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树展开功能说明">
			·当某节点数据发生了变化，调用节点的refresh方法，将会把该节点的子节点重新生成。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树刷新节点"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" label="UniEAP"  id="refreshNode"  binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:260px">
						  在"数据结构"节点新增两条数据，并刷新该节点:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="refresh" onclick="refresh()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="刷新树节点">
			<textarea name="code" class="js">
			function refresh(){
			    //在RowSet中新增两条记录
				treeStorePart.getRowSet().addRow({id:(new Date()),label:"新增节点1","parentID": "1231035443386",leaf:true});
				treeStorePart.getRowSet().addRow({id:(new Date()),label:"新增节点2","parentID": "1231035443386",leaf:true});
				//刷新节点
				refreshNode.getNodeById("1231035443386").refresh();
			}
			</textarea>
		</div>
	</body>
</html>