<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>persistTree</title>
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
			src="<%=appPath%>/pages/samples/tree/persistTree.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件持久化说明">
			·通过使用TreeEditor模块，树节点的显示值是可以进行编辑的，选中一个节点并再次点击文字部分将会进入编辑；<br>
			·树可以增加和删除节点；<br>
			·可以将修改后的树持久化。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件持久化样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td colspan="2">
						<div dojoType="unieap.tree.Tree" id="persistTree"  treeEditor="{allowBlank:false}"  label="UniEAP" binding = "{id:'UP_TREE_TEST_ID','store':'treeStore','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}" >
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						为当前节点添加子节点:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="addNode" onclick="addNode()"></div>&nbsp;
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						删除选中节点:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="deleteNode" onclick="deleteNode()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						查看数据中心:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="check" onclick="check()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						保存:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="save" onclick="save()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件持久化源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.tree.Tree" 
					 id="persistTree" 
					 treeEditor="{allowBlank:false}"  
					 label="UniEAP" 
					 binding = "{id:'UP_TREE_TEST_ID','store':'treeStore','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',
					 query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}" >
				</div>
			</textarea>
			<textarea name="code" class="js">
			//保存
			function save(){ 
				var dc =new unieap.ds.DataCenter();
				dc.addDataStore(dataCenter.getDataStore("treeStore"));
				unieap.Action.requestData({
						url:unieap.WEB_APP_NAME+ "/getLazyData.do?method=save", 
						parameters:{"synLoadStatistics":true},
						sync:true,
						load:function(a){
							alert("成功");
						}
					},dc);
				dc.getDataStore("treeStore").getRowSet().resetUpdate();
			}
			//添加节点
			function addNode(){
				var node = unieap.byId("persistTree").getCurrentNode();
				if (!node) {
					alert("请选择节点");
				}
				else{
					var parentId="";
					if(node.isRoot()){
						parentId = 'unieap_ria_tree_id_for_root';
					 }else{
						 parentId = unieap.byId("persistTree").getBinding().getId(node.getItem());
				     } 
				    var randomId = new Date().getTime();
				    var data = {"UP_TREE_TEST_ID": randomId, "UP_TREE_TEST_LABEL": "新增节点测试","UP_TREE_TEST_PARENTID": parentId}
				    unieap.byId("persistTree").createNode(data,node);
				}
			}
			//删除节点
			function deleteNode(){
				var node = unieap.byId("persistTree").getCurrentNode();
				if (!node) {
					alert("请选择节点");
				}
				else {
					unieap.byId("persistTree").deleteNode(node);
				}
			}
			</textarea>
		</div>
	</body>
</html>