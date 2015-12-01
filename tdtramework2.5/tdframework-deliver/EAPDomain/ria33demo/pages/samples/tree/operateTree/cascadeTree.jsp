<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>cascadeTree</title>
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
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/operateTree/cascadeTree.js"></script>	
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件级联说明">
			·树组件支持六种复选逻辑:单选（single）、多选（multiple）、关联子节点（childCascade）、关联父节点（parentCascade）、半选（halfChecked）、关联父子节点（cascade）；<br>
			·通过配置checkLogic的model属性实现不同的逻辑；<br>
			·单选（single）：只允许在树上选择一个节点；<br>
			·多选（multiple）：允许选择多个节点，不关联任何父子节点；<br>
			·关联子节点（childCascade）：将会在节点选中的同时，将其所有子节点选中；<br>
			·关联父节点（parentCascade）：将会在当前节点选中的同时，选中其父节点；<br>
			·半选（halfChecked）：当某节点的部分子节点处于选中时，该节点处于半选状态（节点的数据不会被选中）；<br>
			·关联父子节点（cascade）：将会在节点选中时，关联其父子节点。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="树控件级联样例" style="width: 100%;">
		          <label style="line-height:20px;font-size: 13px;font-family: 宋体">为了保证结果的准确性，每当选择不同复选样例时，都会将节点和数据置于未选中状态。</label>
            <div dojoType="unieap.layout.TabContainer" style="height:250px;width:100%;float:left">
				<div dojoType="unieap.layout.ContentPane" title="single" onShow="initSingle">
					<div dojoType="unieap.tree.Tree"  checkLogic="{model:'single'}" id="singleCascadeTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
					</div>
				</div>
                <div dojoType="unieap.layout.ContentPane" title="childCascade" onShow="initChild">
                   	<div dojoType="unieap.tree.Tree"  checkLogic="{model:'childCascade'}" id="childCascadeTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
					</div>
                </div>
                <div dojoType="unieap.layout.ContentPane" title="parentCascade" onShow="initParent">
                     <div dojoType="unieap.tree.Tree"  checkLogic="{model:'parentCascade'}" id="parentCascadeTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
					 </div>
                </div>
                <div dojoType="unieap.layout.ContentPane" title="halfChecked" onShow="initHalf">
                    <div dojoType="unieap.tree.Tree"  checkLogic="{model:'halfChecked'}" id="halfCheckedTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
					</div>
                </div>
                <div dojoType="unieap.layout.ContentPane" title="cascade" onShow="initAll">
                    <div dojoType="unieap.tree.Tree"  checkLogic="{model:'cascade'}" id="cascadeTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
					</div>
                </div>
            </div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件级联源码">
			<textarea name="code" class="html">
				级联方式为single:
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{model:'single'}" 
					 id="singleCascadeTree" label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
				
				级联方式为childCascade:
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{model:'childCascade'}" 
					 id="childCascadeTree" label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
				
				级联方式为parentCascade:
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{model:'parentCascade'}" 
					 id="parentCascadeTree" label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
				
				级联方式为halfChecked:
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{model:'halfChecked'}" 
					 id="halfCheckedTree" label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
				
				级联方式为cascade:
				<div dojoType="unieap.tree.Tree" 
					 checkLogic="{model:'cascade'}" 
					 id="cascadeTree" label="UniEAP" 
					 binding = "{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',
					 query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				</div>
			</textarea>
		</div>
	</body>
</html>