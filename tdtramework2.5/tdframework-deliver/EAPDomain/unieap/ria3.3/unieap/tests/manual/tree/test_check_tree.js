var test1 = {
	id: "attributeRowSet",
	title: '属性',
	init: test1init,
	test: [{
		title: "model-cascade",
		summary: "设置复选逻辑为cascade",
		fun : setModelCascade
	},{
		title: "model-parentCascade",
		summary: "设置复选逻辑为parentCascade",
		fun : setModelParentCascade
	},{
		title: "model-childCascade",
		summary: "设置复选逻辑为childCascade",
		fun : setModelChildCascade
	},{
		title: "model-single",
		summary: "设置复选逻辑为single",
		fun : setModelSingle
	},{
		title: "model-halfChecked",
		summary: "设置复选逻辑为halfChecked",
		fun : setModelHalfChecked
	}]
}
test = [];
test.push(test1);	
function test1init(){
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic :{},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
}
function test1clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('attributeWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('attributeWidgetRowSet'));
}
function  setModelCascade(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic:{model:'cascade'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re = "此时选中节点时会关联父子节点";
	return re;
}


function setModelParentCascade(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic:{model:'parentCascade'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re = "此时选中节点时会关联父节点";
	return re;
}

function setModelChildCascade(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic:{model:'childCascade'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re = "此时选中节点时会关联子节点";
	return re;
}
function setModelSingle(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic:{model:'single'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re = "此时只能有一个节点处于选中状态";
	return re;
}
function setModelHalfChecked(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic:{model:'halfChecked'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re = "当一个节点的部分子节点处于选中时，该节点的状态为半选，数据不被选中";
	return re;
}

var test2 = {
	id: "funRowSet",
	title: '属性',
	init: test2init,
	test: [{
		title: "setChecked",
		summary: "设置某节点选中或非选中，并按照规定的逻辑关联节点",
		fun : setChecked
	},{
		title: "getSelectedItems",
		summary: "得到所有选中的数据组成的数组，若此时数据尚未载入，会按照逻辑加载相关数据",
		fun : getSelectedItems
	},{
		title: "getSelectNodes",
		summary: "得到所有选中的节点组成的数组，只包含已生成的节点",
		fun : getSelectNodes
	}]
}
test.push(test2);	
function test2init(){
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic :{model:'childCascade'},binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('funWidgetRowSet'), 'first')
}
function test2clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('funWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('funWidgetRowSet'));
}

function setChecked(){
	test2clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic :{model:'childCascade'},id:'toBeSetChecked',binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('funWidgetRowSet'), 'first')
	var inner2 = "请点击一个节点，然后点击按钮，将会将该节点选中，并按照关联子节点的逻辑，关联子节点<br><button onclick=\"setNodeChecked();\">选中该节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
	return  "查看树的当前节点及其子节点是否被选中";
}

function getSelectedItems(){
	test2clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic :{model:'childCascade'},id:'toGetSelectedItems',binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('funWidgetRowSet'), 'first')
	var inner2 = "选择部分节点，然后点击按钮，将会得到所有选中的数据，即使节点不存在<br><button onclick=\"showSelectedItems();\">得到选中数据对象</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
	return  "查看数据是否与选中的节点相对应";
}

function getSelectNodes(){
	test2clear();
	var c = new unieap.tree.Tree({label:"UniEAP",checkLogic :{model:'childCascade'},id:'toGetSelectedNodes',binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('funWidgetRowSet'), 'first')
	var inner2 = "选择部分节点，然后点击按钮，将会得到所有选中节点TreeNode对象组成的数组<br><button onclick=\"showSelectedNodes();\">得到选中节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
	return  "查看节点数组是否与选中的节点相对应";
}

function setNodeChecked(){
	var node = dijit.byId("toBeSetChecked").getCurrentNode();
	if(!node){
		alert("请选择节点")
	}
	else{
		dijit.byId("toBeSetChecked").setChecked(node,true);
	}
}
function showSelectedItems(){
	var onComplete = function (items){
		unieap.debug(items,true)
	}
	var items = dijit.byId("toGetSelectedItems").getCheckLogic().getSelectedItems(onComplete);
}

function showSelectedNodes(){
	var nodes = dijit.byId("toGetSelectedNodes").getSelectedNodes();
	unieap.debug(nodes,true)
}

var test3 = {
	id: "treeJson",
	title: '属性',
	init: test3init,
	test: [
	]
}
test.push(test3);	
function test3init(){
	var c = new unieap.tree.Tree({label:"根结点",checkLogic :{},binding:{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf','jsonData':jsondata,'label':'text',id:'text'}})
	dojo.place(c.domNode, dojo.byId('treeJsonWidget'), 'first')
}