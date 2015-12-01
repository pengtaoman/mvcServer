<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>展开和收起节点的事件</title>
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
			src="<%=appPath%>/pages/samples/tree/basicTree/expandEvent.js"></script>		
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·通过重写onBeforeExpand、onAfterExpand方法，监听树节点展开事件；<br>
			·通过重写onBeforeCollapse、onAfterCollapse方法，监听树节点收起事件；<br>
			·以上方法均将接受当前节点为参数；<br>
			·若onBeforeExpand的返回值为false，将会阻止节点的展开；<br>
			·若onBeforeCollapse的返回值为false，将会阻止节点的收起。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例"
			style="width: 100%;">
			<table width="100%">
			    <tr>
			      <td>
			                    显示值为“数据结构”的节点被禁止展开，显示值为“表单构件”的节点展开后被禁止收起。
			      </td>
			    </tr>
				<tr>
					<td>
						<div dojoType="unieap.tree.Tree" label="UniEAP" id="basicTree" 
						onBeforeExpand = "testBeforeExpand" onAfterExpand = "testAfterExpand" 
						onBeforeCollapse = "testBeforeCollapse"  onAfterCollapse = "testAfterCollapse"
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
					 onBeforeExpand = "testBeforeExpand" 
					 onAfterExpand = "testAfterExpand" 
					 onBeforeCollapse = "testBeforeCollapse"  
					 onAfterCollapse = "testAfterCollapse"
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
			<textarea name="code" class="js">
			function testBeforeExpand(node){
				var label = node.getLabel();
				if(label=="数据结构"){
					alert("onBeforeExpand : "+node.getLabel()+"。返回false，阻止展开");
	                return false;
			     }else{
			    	 alert("onBeforeExpand : "+node.getLabel());
		             return true;
				 }
                
            }
			function  testAfterExpand(node){
			    alert("onAfterExpand : " + node.getLabel());
			}
			function  testBeforeCollapse(node){
				var label = node.getLabel();
				if(label=="表单构件"){
					alert("onBeforeCollapse : "+node.getLabel()+"。返回false，阻止收起");
	                return false;
			     }else{
	              alert("onBeforeCollapse : " + node.getLabel());
	              return true;
			     }
			}
			function testAfterCollapse(node){
			    alert("onAfterCollapse : " + node.getLabel());
			}
			</textarea>
		</div>
	</body>
</html>