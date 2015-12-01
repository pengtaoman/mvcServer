<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>dragBetweenTree</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/operateTree/dragBetweenTree.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件拖拽说明">
			·树控件既可以在一棵树内部进行拖拽操作，也可以在树之间进行拖拽。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件拖拽样例">
			<table width="100%">
				<tr>
					<td width="50%" valign="top">
						<div dojoType="unieap.tree.Tree" treeDnd="{}" getLabelStyle="selfDefineLabelStyle" label="Left" id="dragTreeLeft"  binding = "{id:'UP_TREE_TEST_ID','store':'menuTree','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:''}}">
						</div>
					</td>
					<td width="50%" valign="top">
						<div dojoType="unieap.tree.Tree" treeDnd="{}" getLabelStyle="selfDefineLabelStyle" id="dragTreeRight"   label="Right" binding = "{id:'UP_TREE_TEST_ID','store':'treeStore','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}" >
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:"200px" colspan="2">
						保存修改后的"Right"树:
						<div dojoType="unieap.form.Button" label="saveRightTree" onclick="save()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件拖拽源码">
			<textarea name="code" class="html">
				Left树:
				<div dojoType="unieap.tree.Tree" 
					 treeDnd="{}" 
					 getLabelStyle="selfDefineLabelStyle"
					 label="Left" 
					 id="dragTreeLeft"  
					 binding = "{id:'UP_TREE_TEST_ID','store':'menuTree','label':'UP_TREE_TEST_LABEL',
					 'parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:''}}">
				</div>
				
				Right树:
				<div dojoType="unieap.tree.Tree" 
					 treeDnd="{}" 
					 getLabelStyle="selfDefineLabelStyle"
					 id="dragTreeRight" 
					 label="Right" 
					 binding = "{id:'UP_TREE_TEST_ID','store':'treeStore','label':'UP_TREE_TEST_LABEL',
					 'parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}" >
				</div>
			</textarea>
		</div>
	</body>
</html>