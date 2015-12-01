<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>根节点的显示</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>
			
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·通过设置树的label属性确定是否显示根节点；<br>
			·若不设置该属性，将不会显示根节点。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例"
			style="width: 100%;">
			<table width="100%">
			    <tr>
			      <td style="font-size: 13px;font-family: 宋体;">
			                     不配置Label属性将不会显示根节点，效果如下：
			      </td>
			    </tr>
				<tr>
					<td>
						<div dojoType="unieap.tree.Tree"  id="basicTree"  binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 id="basicTree" 
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
		</div>
	</body>
</html>