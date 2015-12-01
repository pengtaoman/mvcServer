<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>点击事件</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js""></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>
			<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/basicTree/clickEvent.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·通过重写onBeforeClick、onClick、onAfterClick方法，监听点击事件；<br>
			·以上方法均将接受当前节点为参数；<br>
			·若onBeforeClick的返回值为false，将不会执行后续的默认操作；<br>
			·onClick是在默认操作完成后执行的，若返回为false，将不会执行onAfterClick。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例"
			style="width: 100%;">
			<table width="100%">
			   <tr>
			     <td>
			       点击“数据结构”节点，onBeforeClick返回的是false，将会组织后续事件的执行。
			     </td>
			   </tr>
				<tr>
					<td>
						<div dojoType="unieap.tree.Tree" label="UniEAP" id="basicTree" onBeforeClick = "testBeforeClick" onClick = "testClick" onAfterClick = "testAfterClick"
						 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 label="UniEAP" 
					 id="basicTree" 
					 onBeforeClick = "testBeforeClick" 
					 onClick = "testClick" 
					 onAfterClick = "testAfterClick"
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
			<textarea name="code" class="js">
			function testBeforeClick(node){
				var label = node.getLabel();
				if(label == "数据结构"){
					alert("onBeforeClick : "+node.getLabel()+"。返回false，阻止后续事件");
	                return false;
				}else{
				    alert("onBeforeClick : "+node.getLabel());
		            return true;
				}
            }
			function  testClick(node){
			   alert("onClick : " + node.getLabel());
			}
			function  testAfterClick(node){
			  alert("onAfterClick : " + node.getLabel());
			}
			</textarea>
		</div>
	</body>
</html>