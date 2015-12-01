<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>checkTree</title>
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
			src="<%=appPath%>/pages/samples/tree/basicTree/checkTree.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="多选树说明">
		    ·树形控件通过设置checkLogic属性以支持节点的复选；<br>
		    ·checkLogic可以通过model设置复选逻辑，默认为“multiple”，即多选且不关联任何节点；<br>
		    ·通过调用树复选模块的getSelectedItems方法，能够按照复选逻辑得到所有选中的item。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="多选树样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" checkLogic="{}" id="checkTree"  label="UniEAP" binding="{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf','jsonData':jsondata,'label':'text',id:'text'}">
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得选中节点的标签值:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="getSelectedItems" onclick="getCheckedValue()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="多选树源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{}" 
					 id="checkTree" 
					 label="UniEAP" 
					 binding="{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf','jsonData':jsondata,'label':'text',id:'text'}">
				</div>
			</textarea>
			<textarea name="code" class="js">
			   function getCheckedValue(){
				unieap.byId('checkTree').getCheckLogic().getSelectedItems(
					function(items){
						var str="";
						if(items.length<1){
							alert("请选择节点");
						}else{
							for (var i=0;i<items.length;i++){
								str += unieap.byId('checkTree').getBinding().getLabel(items[i]) + ",";
							}
							alert(str.substring(0,str.length-1));
							}
						}
					);
			}
			</textarea>
		</div>
	</body>
</html>