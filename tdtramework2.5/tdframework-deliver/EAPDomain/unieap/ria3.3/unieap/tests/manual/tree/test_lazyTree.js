function deleteLazyNode(){
	var node = unieap.byId("lazytree").getCurrentNode();
	if(!node){
		alert("请选中一节点");
	}else{
		unieap.byId("lazytree").deleteNode(node);
	}
}
function deleteLazyItem(){
	var node = unieap.byId("lazytree").getCurrentNode();
	if(!node){
		alert("请选中一节点");
	}else{
		var parent = node.getParent();
		unieap.byId("lazytree").getBinding().deleteItem(node.getItem(),
			node.getParent().getItem(),
			function(){
				parent.refresh();
			});
		
	}
}
function getStores(){
	unieap.debug(unieap.byId("lazytree").getBinding().getStores());
}
var neusoft=new unieap.ds.DataStore('neusoft_store', [{
				UP_TREE_TEST_ID:'1',
				UP_TREE_TEST_LABEL:'基础软件',
				UP_TREE_TEST_PARENTID:'',
				leaf:false
},
{
				UP_TREE_TEST_ID:'2',
				UP_TREE_TEST_LABEL:'基础软件2',
				UP_TREE_TEST_PARENTID:'1',
				leaf:true
}]);

dataCenter.addDataStore(neusoft);	
function setDataStore(){
	var node = unieap.byId("lazytree").getCurrentNode();
	if(!node){
		alert("请选中一节点");
		return;
	}
	var arg={query:{name:'UP_TREE_TEST_ID',relation:'=',value:''}}; 
	unieap.byId("lazytree").getBinding().setDataStore(node,neusoft,arg); 
}

function setDataStore2(){
	var node = unieap.byId("lazytree").getCurrentNode();
	if(!node){
		alert("请选中一节点");
		return;
	}
	var arg={query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'1'}}; 
	unieap.byId("lazytree").getBinding().setDataStore(node,neusoft,arg); 
}
function expandAllNodes(){
	unieap.byId("lazytree").expandAllNodes();
}
function deleteLazyData(){
	var obj = unieap.byId("lazytree").getLoader();
	var ds=unieap.byId("lazytree").getBinding().getStores()[0];
	ds.getRowSet().deleteRows([0]);
	unieap.byId("lazytree").getRootNode().refresh();
}
var jsondata = "[{data:{id:'01',text:'01'}},{data:{text:'02',leaf:true}}]"
 
function deleteNode(){
	var node = unieap.byId("jsontree").getCurrentNode();
	if(!node){
		alert("请选中一节点");
	}else{
		unieap.byId("jsontree").deleteNode(node);
	}
}


function getData(){
	var obj = unieap.byId("jsontree").getBinding().getData();
	unieap.debug(obj);
}
function expandJsonNodes(){
	unieap.byId("jsontree").expandAllNodes();
}
