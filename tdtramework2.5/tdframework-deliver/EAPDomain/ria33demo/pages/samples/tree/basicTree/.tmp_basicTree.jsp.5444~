<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>basicTree</title>
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
			src="<%=appPath%>/pages/samples/tree/basicTree/basicTree.js"></script>
			
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·通过unieap.tree.Tree标签得到一棵树；<br>
			·树的数据来源于一个DataStore。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例">

						<div dojoType="unieap.tree.Tree" id="basicTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 id="basicTree" 
					 label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
		</div>
	</body>
</html>