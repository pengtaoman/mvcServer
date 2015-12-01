<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>lazyLoadTree</title>
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
			src="<%=appPath%>/pages/samples/tree/lazyLoadTree.js"></script>	
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件懒加载说明">
			·树控件支持懒加载，在大数据量情况下会有较好的性能；<br>
			·通过配置loader属性确定如何到后台取数据。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件懒加载样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" id="lazyTree"    label="UniEAP" loader="{'url':'getLazyData.do?method=getData',onBeforeLoad : beforeLoad}" binding = "{'leaf':'leaf','store':treeStoreForLazyLoad,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:''}}">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件懒加载源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 id="lazyTree" 
					 label="UniEAP" 
					 loader="{'url':'getLazyData.do?method=getData',onBeforeLoad : beforeLoad}" 
					 binding = "{'leaf':'leaf','store':treeStoreForLazyLoad,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:''}}">
				</div>
			</textarea>
		</div>
	</body>
</html>