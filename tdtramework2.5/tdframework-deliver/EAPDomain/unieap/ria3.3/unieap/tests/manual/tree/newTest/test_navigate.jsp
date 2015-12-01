<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>basicTree</title>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>
	    <script type="text/javascript">
	       function clickEnter(node){
                alert("在'"+node.getLabel()+"'上点击了回车键");
		       }
	    </script>
	</head>
	<body class="unieap">
	    <p style="font-size:18pt">在树上选择一个节点后，点击上下键将会移动当前节点；点击home键，将会选中第一个可见节点；点击end键将会选中最后一个可见节点。</p>
		 <p style="font-size:18pt">在树上选择一个节点后，若为非叶子节点，点击右键将会使其展开，若已经展开将选中第一个子节点；点击左键，若本节点已经展开则将其收起，若已经收起或为叶子节点则会选中当前节点的父节点。</p>
		 <p style="font-size:18pt">在树节点上点击回车键，将会触发onEnterKeyPress事件</p>
		<div onEnterKeyPress="clickEnter"  dojoType="unieap.tree.Tree" id="basicTree" label="UniEAP" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
	    </div>
	</body>
</html>