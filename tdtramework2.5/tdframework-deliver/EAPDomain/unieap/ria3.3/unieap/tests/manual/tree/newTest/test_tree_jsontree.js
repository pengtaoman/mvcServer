var jsondata = "[" +
		"{data:{id:'01',text:'01'},children:[" +
		"{data:{text:'01-01',leaf:true}}," +
		"{data:{text:'01-02'},children:[" +
		"{data:{text:'01-02-01',leaf:true}}," +
		"{data:{text:'01-02-02',leaf:true}}]}," +
		"{data:{text:'01-03',leaf:true}}]}," +
		"{data:{text:'02',leaf:true}}," +
		"{data:{text:'03',leaf:true}}" +
		"]";


function getData(){
	var data = checkTree.getBinding().getData();
	unieap.debug(data);
}

function removeTreeNode(){
	var treeNode = checkTree.getCurrentNode();
	if(treeNode==null){
		alert("请选择删除树节点");
		return;
	}
	checkTree.deleteNode(treeNode); 
}
function getData(){
	var obj = unieap.byId("checkTree2").getBinding().getData();
	unieap.debug(obj);
}