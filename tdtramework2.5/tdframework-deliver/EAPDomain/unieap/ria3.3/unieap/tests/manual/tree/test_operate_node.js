var test1 = {
	id: "attributeRowSet",
	title: '属性',
	init: test1init,
	test: [{
		title: "addNode",
		summary: "新建一个节点",
		fun : addNode
	},{
		title: "deleteNode",
		summary: "删除节点及其关联节点",
		fun : deleteNode
	}]
}
test = [];
test.push(test1);	
function test1init(){
	var c = new unieap.tree.Tree({label:"UniEAP",binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
}
function test1clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('attributeWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('attributeWidgetRowSet'));
}
function addNode(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",id:'treeForAddNode',binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var inner2 = "点击按钮，查看“数据结构”节点下是否增添一个显示值为“新增节点测试”的节点<br><button onclick=\"addNodeForTest();\">新增节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('attributeWidgetRowSet'));
	return  "查看树是否增加了一个节点及其数据结构的变化";
}

function addNodeForTest(){
	var parentNode = dijit.byId("treeForAddNode").getNodeById("1231035443386");
	var data = {"id": "1233211234567", "label": "新增节点测试","parentID": "1231035443386", "leaf": true}
	dijit.byId("treeForAddNode").createNode(data,parentNode);
}

function deleteNode(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",id:'treeForDeleteNode',binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var inner2 = "点击按钮，会将显示值为“验证码”的节点删除<br><button onclick=\"deleteNodeForTest();\">删除节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('attributeWidgetRowSet'));
	return  "查看树是否删除了一个指定节点及其数据结构的变化";
}
function deleteNodeForTest(){
	var node = dijit.byId("treeForDeleteNode").getNodeById("1228896990281");
	if (!node) {
		alert("节点不存在");
	}
	else {
		dijit.byId("treeForDeleteNode").deleteNode(node);
	}
}

