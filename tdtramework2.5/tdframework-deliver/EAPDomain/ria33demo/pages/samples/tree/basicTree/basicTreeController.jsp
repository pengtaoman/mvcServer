<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>basicTreeController</title>
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
			src="<%=appPath%>/pages/samples/tree/basicTree/basicTreeController.js"></script>
		
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体;height:12%" dojoType="unieap.layout.TitlePane" title="树控件说明">
			·树的各种基本操作(其中选中节点为复选框被勾选中的节点，当前的节点为当前光标聚焦的节点)。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件样例" style="height:88%;width:100%">
		<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%">
		<div dojoType="unieap.layout.ContentPane" title="树的节点相关" >	
			<div dojoType="unieap.tree.Tree" 
				id="basicTree1"
				checkLogic="{}" 
				label="UniEAP" 
				binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
			 </div>
			 <table>										
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获取当前节点父节点:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getParent()" width="150px" onClick="getParent()"></div>
					</td>
					<td>
						如为根节点则提示该节点为根节点
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得根节点:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getRoot()" width="150px" onClick="getRoot()"></div>
					</td>
					<td>
						获取根节点并使用getLabel()方法获得根节点的值
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得根节点的显示值:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getText()" width="150px" onClick="getText()"></div>
					</td>
					<td>
						使用getText()方法获得根节点的显示值
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得选中节点组:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getSelectedNodes()" width="150px" onClick="getSelectedNodes()"></div>
					</td>
					<td>
						提示选中的节点组的值，用逗号分隔
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得当前节点所有子节点:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getChildren()" width="150px" onClick="getChildren()"></div>
					</td>
					<td>
						点击观看所有子节点，当前节点未展开时将返回null
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得当前节点的上一个兄弟节点:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getPreviousChild()" width="150px" onClick="getPreviousChild()"></div>
					</td>
					<td>
						如果不存在当前节点的上一个兄弟节点，将返回null
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						获得当前节点的下一个兄弟节点:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="getNextChild()" width="150px" onClick="getNextChild()"></div>
					</td>
					<td>
						如果不存在当前节点的下一个兄弟节点，将返回null
					</td>					
				</tr>
			</table>

		<div dojoType="unieap.layout.TitlePane" title="树的节点相关代码">
			<textarea name="code" class="html">
				<script type="text/javascript">
					//获得当前节点的父节点
					function getParent(){
						var node = unieap.byId("basicTree1").getCurrentNode();
						if(node && !node.isRoot()){
							alert("当前节点父节点label为：" + node.getParent().getLabel());
						}
						if(node && node.isRoot()){
							alert("当前节点为根节点");
						}
					}
					//获得当前树的根节点
					function getRoot(){
						alert("根节点内容为：" + unieap.byId("basicTree1").getRootNode().getLabel());
					}
					//获得当前树的根节点的显示值
					function getText(){
						alert("根节点显示值为：" + unieap.byId("basicTree1").getText());
					}
					//获得选中节点
					function getSelectedNodes(){
						var nodesArray = unieap.byId("basicTree1").getSelectedNodes();
						var alertNodes = "选中节点label为：";
						dojo.forEach(nodesArray,function(x){
							alertNodes += x.getLabel() + ",";
						});
						if("选中节点为：" == alertNodes){
							alert("未选中任何节点");
						}
						else{
							alert(alertNodes);
						}
					}
					//获得当前节点字节点
					function getChildren(){
						var node = unieap.byId("basicTree1").getCurrentNode();
						if(node){
							unieap.debug(node.getChildren());
						}
						else{
							alert("无当前节点");
						}
					}
					//获得当前节点上一个兄弟节点
					function getPreviousChild(){
						var node = unieap.byId("basicTree1").getCurrentNode();
						if(node){
							if(node.getPreviousChild() != null){	
							alert("该节点的上一个兄弟节点label为：" + node.getPreviousChild().getLabel());
							}
							else{
								alert(node.getPreviousChild());
							}
						}
						else{
							alert("无当前节点");
						}
					}
					//获得当前节点下一个兄弟节点
					function getNextChild(){
						var node = unieap.byId("basicTree1").getCurrentNode();
						if(node){
							if(node.getNextChild() != null){	
							alert("该节点的下一个兄弟节点label为：" + node.getNextChild().getLabel());
							}
							else{
								alert(node.getNextChild());
							}
						}
						else{
							alert("无当前节点");
						}
					}
				</script>
			</textarea>
			</div>
		</div>		
		<div dojoType="unieap.layout.ContentPane" title="树的全选及读属性">	
			<div dojoType="unieap.tree.Tree" 
				id="basicTree"
				checkLogic="{}" 
				label="UniEAP" 
				binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
			 </div>
			<table>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置全选或全部取消:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="selectAll(true)" width="150px" onClick="selectAllNode()"></div>
					</td>					
					<td>
						<div dojoType="unieap.form.Button" label="selectAll(false)" width="150px" onClick="deSelectAllNode()"></div>
					</td>
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置或取消选中节点为ReadOnly:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="setReadOnly(true)" width="150px" onClick="setReadOnly()"></div>
					</td>					
					<td>
						<div dojoType="unieap.form.Button" label="setReadOnly(false)" width="150px" onClick="cancelReadOnly()"></div>
					</td>
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置或取消选中节点为disabled:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="setDisabled(true)" width="150px" onClick="setDisabled()"></div>
					</td>					

					<td>
						<div dojoType="unieap.form.Button" label="setDisabled(false)" width="150px" onClick="cancelDisabled()"></div>
					</td>
				</tr>
			</table>
		<div dojoType="unieap.layout.TitlePane" title="树的全选及读属性代码">
			<textarea name="code1" class="html">
				<script type="text/javascript">
					//设置选中所有节点
					function selectAllNode(){
						unieap.byId("basicTree").selectAll(true);
					}
					//取消选中的所有节点
					function deSelectAllNode(){
						unieap.byId("basicTree").selectAll(false);
					}
					//设置成为只读状态
					function setReadOnly(){
						var node = unieap.byId("basicTree").getSelectedNodes();				
						node && dojo.forEach(node,function(x){
							x.setReadOnly(true);
						});
					}
					//取消只读状态
					function cancelReadOnly(){
						var node = unieap.byId("basicTree").getSelectedNodes();
						node && dojo.forEach(node,function(x){
							x.setReadOnly(false);
						});
					}
					//设置成为disabled状态
					function setDisabled(){
						var node = unieap.byId("basicTree").getSelectedNodes();
						node && dojo.forEach(node,function(x){
							x.setDisabled(true);
						});
					}
					//取消disabled状态
					function cancelDisabled(){
						var node = unieap.byId("basicTree").getSelectedNodes();
						node && dojo.forEach(node,function(x){
							x.setDisabled(false);
						});
					}
				</script>
			</textarea>
			</div>
		</div>
		<div dojoType="unieap.layout.ContentPane" title="树的其它功能代码">	
			<div dojoType="unieap.tree.Tree" 
				id="basicTree2"
				checkLogic="{}" 
				label="UniEAP" 
				binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
			 </div>
			 <table>		
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置当前节点的选中状态
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="setChecked()" width="150px" onClick="setChecked()"></div>
					</td>
					<td>
						如果当前节点被选中，则取消选中状态，否则置状态为选中
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						设置指定节点Label值:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="setLabel()" width="150px" onClick="setLabel()"></div>
					</td>
					<td>
						设置当前节点的Label值
					</td>					
				</tr>
				<tr height="20px">
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						改变指定节点store:
					</td>
					<td width="160px">
						<div dojoType="unieap.form.Button" label="setDataStore()" width="150px" onClick="setDataStore()"></div>
					</td>
					<td>
						改变当前节点store,用该方法设置store将删除所有子节点(展开可看到效果)
					</td>					
				</tr>						
			</table>
			<div dojoType="unieap.layout.TitlePane" title="树的其它操作">
			<textarea name="code2" class="html">
				<script type="text/javascript">
					//设置当前节点的选中状态
					function setChecked(){
						var node = unieap.byId("basicTree2").getCurrentNode();
						if(node){
							if (node.isChecked()) {
								node.setChecked(false);
							}
							else {
								node.setChecked(true);
							}
						}
						else{
							alert("无当前节点");
						}
					}
					//设置当前节点的label值
					function setLabel(){
						var node = unieap.byId("basicTree2").getCurrentNode(); 
			 			unieap.byId("basicTree").getBinding().setLabel(node,"新label值");
					}
					//改变当前节点的datastore
					function setDataStore(){
						var node = unieap.byId("basicTree2").getCurrentNode();
						var arg={query:{name:'id',relation:'=',value:'1'}}; 
						unieap.byId("basicTree").getBinding().setDataStore(node,neusoft,arg); 
					}				
				</script>
			</textarea>
			</div>
			</div>
			</div>		
		</div>

	</body>
</html>