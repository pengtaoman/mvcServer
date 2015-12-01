function expandNodeByPath(){
	unieap.byId('t_tree').expandNodeByPath("/1231035443386");
}

function coolapse(){
	var treeNode = unieap.byId('t_tree').getNodeById("1231035443386");
	unieap.byId('t_tree').collapseNode(treeNode);
}
dojo.addOnLoad(function(){
	
});