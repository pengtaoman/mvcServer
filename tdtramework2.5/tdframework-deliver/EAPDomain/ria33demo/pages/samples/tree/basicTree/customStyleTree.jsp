<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>customStyleTree</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/tree/style/treeTest.css";
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
			src="<%=appPath%>/pages/samples/tree/basicTree/customStyleTree.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="自定义样式树控件说明">
			·可以通过重写树控件的getIconClass、getIconStyle方法，自定义树节点的图标样式；<br>
			·可以通过重写树控件的getLabelClass、getLabelStyle方法，自定义树节点的显示文字的样式。<br>
			·getIconClass和getLabelClass的返回值应该为一css的类名，而getIconStyle和getLabelStyle为描述样式的对象。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="自定义样式树控件样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td style="font-size: 13px;font-family: 宋体" colspan="2">
						自定义节点样式的树:
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" getLabelStyle="selfDefineLabelStyle" label="UniEAP" getIconClass="selfDefineIconClass" id="selfDefineIcon"  binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="自定义样式树控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree"  
					 getLabelStyle="selfDefineLabelStyle"
					 label="UniEAP" 
					 getIconClass="selfDefineIconClass" 
					 id="selfDefineIcon"  
					 binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
			<textarea name="code" class="js">
			  function selfDefineIconClass(item,opened, isExpandable){
				//对叶子节点设置自定义的样式
			    if (item&&this.isLeafByData(item)) {
		            var id = this.getBinding().getId(item);
					if(id%2==0){
						return "testTreeIconForFemale";
					}else{
						return "testTreeIconForMale";
					}
		        }
		         var clsName = (!item || isExpandable) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
		        return clsName
			}
			
			function selfDefineLabelStyle(item,opened, isExpandable){
                 //叶子节点的文字将设为斜体
				 if (item&&this.isLeafByData(item)) {
			      return {fontStyle:"italic"};
				 }
			}
			</textarea>
		</div>
	</body>
</html>