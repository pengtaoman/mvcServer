var test1 = {
	id: "attributeRowSet",
	title: '属性',
	init: test1init,
	test: [{
		title: "label-新根节点",
		summary: "配置树的Label属性",
		fun : setLabel
	},{
		title: "expandRoot-false",
		summary: "是否展开根结点，默认会展开",
		fun : setExpandRoot
	},{
		title: "pathSeparator-#",
		summary: "设置节点的路径分隔符",
		fun : setPathSeparator
	}
	]
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
function setLabel(){
	test1clear();
	var c = new unieap.tree.Tree({label:"新根结点",binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re= "1.查看新生成的树根结点标示是否为：新根结点";
	return re;
}
function setExpandRoot(){
		test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",expandRoot:false,binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
	var re= "1.查看新生成的树根结点是否处于未展开状态";
	return re;
}
function setPathSeparator(){
	test1clear();
    var inner = "<div dojoType=\"unieap.tree.Tree\" id=\"separatorTree\" label = \"根结点\" pathSeparator=\"#\" binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('attributeWidgetRowSet').innerHTML = inner;
    var inner2 = "请选中一个节点，然后点击按钮，将会得到该节点的path<button onclick=\"getPathForSeparatorTree();\">getValue</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('attributeWidgetRowSet'));
    dojo.parser.parse(dojo.byId('attributeWidgetRowSet'));
    return "1.选中树的一个节点<br>2.点击getValue按钮,查看弹出值是否以'#'分隔";
}

function  getPathForSeparatorTree(){
	var node = dijit.byId('separatorTree').getCurrentNode();
	if(!node){
		alert("请选择一个节点");
	}
	else{
	    alert(dijit.byId('separatorTree').getPath(node));	
	}
}
var test2 = {
	id: "funRowSet",
	title: '方法',
	init: test2init,
	test: [{
		title: "getIconClass",
		summary: "重写树的getIconClass方法，自定义图标样式",
		fun : getIconClass
	},{
		title: "getLabelClass",
		summary: "重写树的getLabelClass方法，自定义显示文本的样式",
		fun : getLabelClass
	},{
		title: "getIconStyle",
		summary: "重写树的getIconStyle方法，自定义图标样式，此函数返回值是一个关于样式的对象",
		fun : getIconStyle
	},{
		title: "getLabelStyle",
		summary: "重写树的getLabelStyle方法，自定义显示文本样式，此函数返回值是一个关于样式的对象",
		fun : getLabelStyle
	},{
		title: "expandNodeByLevel",
		summary: "根据层级展开节点",
		fun : expandNodeByLevel
	},{
		title: "expandNodeByPath",
		summary: "根据路径展开节点",
		fun : expandNodeByPath
	},{
		title: "expandAllNodes",
		summary: "展开所有节点，对于大数据量的情况慎用该方法",
		fun : expandAllNodes
	},{
		title: "collapseAllNodes",
		summary: "收起所有节点",
		fun : collapseAllNodes
	},{
		title: "expandNode",
		summary: "展开指定节点",
		fun : expandNode
	},{
		title: "collapseNode",
		summary: "收起指定节点",
		fun : collapseNode
	},{
		title: "getPath",
		summary: "得到指定节点的路径",
		fun : getPath
	},{
		title: "setCurrentNode",
		summary: "将指定节点设置为当前节点",
		fun : setCurrentNode
	},{
		title: "getCurrentNode",
		summary: "得到当前节点",
		fun : getCurrentNode
	},{
		title: "getNodeById",
		summary: "根据id得到指定节点",
		fun : getNodeById
	},{
		title: "getText",
		summary: "得到根结点的显示值",
		fun : getText
	},{
		title: "refresh",
		summary: "刷新指定节点",
		fun : refresh
	},{
		title: "getChildren",
		summary: "得到指定节点的子节点",
		fun : getNodeChildren
	},{
		title: "getRow",
		summary: "Rowset结构的树得到节点对应的row",
		fun : getRow
	},{
		title: "setLabel",
		summary: "给指定节点设置显示值",
		fun : setLabelFun
	},{
		title: "setNodeChecked",
		summary: "将指定设为选中",
		fun : setNodeChecked
	}
	
	
	
	
	]
}
test.push(test2);	
function test2init(){
	var c = new unieap.tree.Tree({label:"UniEAP",binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('funWidgetRowSet'), 'first')
}
function test2clear(){
	treeStore.getRowSet().discardUpdate();
    dojo.forEach(dijit.findWidgets(dojo.byId('funWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('funWidgetRowSet'));
}

function getIconClass(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\" getIconClass=\"selfDefineIconClass\" id=\"selfDefineIcon\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
    return "1.查看叶子节点的图标是否发生了变化<br>2.id字段可被2整除的为女性图标，其余的用男性图标";
}
function selfDefineIconClass(item,opened, isExpandable){
	    if (item&&this.isLeafByData(item)) {
            var id = this.getBinding().getId(item);
			if(id%2==0){
				return "testTreeIconForFemale";
			}else{
				return "testTreeIconForMale";
			}
        }
	 var clsName = (!item || isExpandable) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
      return clsName
}
function getLabelClass(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\" getLabelClass=\"selfDefineLabelClass\" id=\"selfDefineLabel\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
    return "1.查看节点的文字部分样式是否发生<br>2.叶子节点的背景色为红色，非叶子节点的背景色为蓝色";
}

function selfDefineLabelClass(item,opened, isExpandable){
	 if (item&&this.isLeafByData(item)) {
           return "testTreeLabelForLeaf";
        }
      return "testTreeLabel"
}
function getIconStyle(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\" getIconStyle=\"selfDefineIconStyle\" id=\"selfDefineIconStyle\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
    return "1.查看叶子节点的图标是否发生了变化<br>2.id字段可被2整除的为女性图标，其余的用男性图标<br>3.重写此函数的返回值类似于{backgroundImage: \"url('images/user.png')\"}，用户自定义";
}

function selfDefineIconStyle(item,opened, isExpandable){
	 if (item&&this.isLeafByData(item)) {
            var id = this.getBinding().getId(item);
			if(id%2==0){
				return {backgroundImage: "url('images/user.png')"};
			}else{
				return {backgroundImage: "url('images/user_female.png')"};
			}
        }
}

function getLabelStyle(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\" getLabelStyle=\"selfDefineLabelStyle\" id=\"selfDefineLabelStyle\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
    return "1.查看节点的文字部分样式是否发生<br>2.叶子节点的背景色为红色，非叶子节点的背景色为蓝色<br>3.重写函数的返回值类似于{backgroundColor:\"red\"}，用户自定义}";
}

function selfDefineLabelStyle(item,opened, isExpandable){
	 if (item&&this.isLeafByData(item)) {
           return {backgroundColor:"red"};
        }
      return  {backgroundColor:"blue"};
}


function expandNodeByLevel(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"expandNodeByLevel\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	dijit.byId('expandNodeByLevel').expandNodeByLevel(2)
    return "1.查看节点是否展开第二级";
}


function expandNodeByPath(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"expandNodeByPath\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	dijit.byId('expandNodeByPath').expandNodeByPath("/1213062976264/1229578655109")
    return "1.是否展开到\"表格API使用\"";
}

function expandAllNodes(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"expandAllNodesWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	dijit.byId('expandAllNodesWidget').expandAllNodes()
    return "展开所有节点";
}

function collapseAllNodes(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"collapseAllNodesWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	dijit.byId('collapseAllNodesWidget').collapseAllNodes()
    return "收起所有节点";
}

function collapseAllNodes(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"collapseAllNodesWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	dijit.byId('collapseAllNodesWidget').collapseAllNodes()
    return "收起所有节点";
}

function expandNode(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"expandNodeWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "请选中一个非叶子节点，然后点击按钮，将会展开该节点<button onclick=\"expandNodeImpl()\">展开该节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "将指定的节点展开";
}

function expandNodeImpl(){
	var node = dijit.byId('expandNodeWidget').getCurrentNode();
	if(node)
       dijit.byId('expandNodeWidget').expandNode(node);
    else
      alert("请选择一个非叶子节点展开");
}

function collapseNode(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"collapseNodeWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "请选中一个已展开节点，然后点击按钮，将会收起该节点<button onclick=\"collapseNodeForTree()\">收起该节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "将指定的节点收起";
}
function collapseNodeForTree(){
	var node = dijit.byId('collapseNodeWidget').getCurrentNode();
	if (!node) {
	   alert("请选中一个已经展开的节点");
	}
	else {
		dijit.byId('collapseNodeWidget').collapseNode(node)
	}
}

function getPath(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getPathWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "请选中一个节点，然后点击按钮，将会得到节点的路径<br><button onclick=\"getPathForTree();\">显示该节点的路径</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "得到选中节点的路径，是其各级父节点及本节点自身的标示字段与指定分隔符（默认为/）形成的字符串";
}

function getPathForTree(){
	var node = dijit.byId('getPathWidget').getCurrentNode();
	if(!node){
		alert("请选择一个节点");
	}
	else{
	    alert(dijit.byId('getPathWidget').getPath(node));	
	}
}
function setCurrentNode(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"setCurrentNodeWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "点击按钮将会是显示值为“异常处理”的节点设为当前节点<br><button onclick=\"setCurrentNodeForTree();\">设置当前节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "显示值为“异常处理”的节点设为当前节点，并更改样式";
}
function setCurrentNodeForTree(){
	var node = dijit.byId("setCurrentNodeWidget").getNodeById("1213063141603");
	dijit.byId("setCurrentNodeWidget").setCurrentNode(node);
}

function getCurrentNode(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getCurrentNodeWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "点击按钮将会弹出当前节点<br><button onclick=\"getCurrentNodeForTree();\">得到当前节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "得到当前节点";
}

function getCurrentNodeForTree(){
	var node = dijit.byId("getCurrentNodeWidget").getCurrentNode();
	if (node) {
		unieap.debug(node);
	}
	else {
		alert("树没有指定当前节点");
	}
}

function getNodeById(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getNodeByIdWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "得到指定id的节点<br><button onclick=\"getNodeByIdForTree();\">根据id得到节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "1.若“数据结构”节点已经被展开过，将会弹出id为“1231035446808”的节点的显示值即“DataCenter”，反之，给出提示节点不存在";
}
function getNodeByIdForTree(){
	var node = dijit.byId("getNodeByIdWidget").getNodeById("1231035446808");
	if(node){
		alert(dijit.byId("getNodeByIdWidget").getBinding().getLabel(node.getItem()))
	}else{
		alert("节点不存在");
	}
}

function getText(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getTextWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "弹出根结点的显示值<br><button onclick=\"alert(dijit.byId('getTextWidget').getText())\">得到根节点的显示值</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "弹出根结点的显示值即“UniEAP”";
}

function  refresh(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"refreshWidget\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "<br><button id=\"testRefresh\" onclick=\"refreshNode()\">刷新指定节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
	this.setDisabled(true);
    return "展开“数据结构”节点，点击按钮后会删除“数据结构”下的“DataCenter”对应的数据并刷新。为了保持数据的一致性，只能执行一次refresh操作，要重复执行，需刷新页面。";
}

function refreshNode(){
	 var node = dijit.byId("refreshWidget").getNodeById("1231035443386");
	 dijit.byId("refreshWidget").expandNode(node);
	 treeStore.getRowSet().deleteRow(26);
	 node.refresh();
	 document.getElementById("testRefresh").disabled = true;
}

function getNodeChildren(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getNodeChildren\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "<br><button id=\"testNodeChildren\" onclick=\"getChildrenNode()\">得到子节点</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "选中一个节点并点击按钮能够得到该节点对应的子节点对象，若节点从未展开过，则返回空";
}

function getChildrenNode(){
	var node = dijit.byId("getNodeChildren").getCurrentNode();
	if (node) {
		unieap.debug(node.getChildren())
	}
	else {
		alert("请在树上选择一个节点");
	}
}

function getRow(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"getRowTree\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "<br><button id=\"testGetRow\" onclick=\"getNodeRow()\">得到节点的Row</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "选择一个节点点击按钮，能够得到节点对应的row，根结点因为是虚节点，将会返回null";
}

function getNodeRow(){
	var node = dijit.byId("getRowTree").getCurrentNode();
	if (node) {
		unieap.debug(dijit.byId("getRowTree").getBinding().getRow(node))
	}
	else {
		alert("请在树上选择一个节点");
	}
}

function setLabelFun(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"setLabelTree\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "<br><button  onclick=\"setNodeLabel()\">设置节点的显示值</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "选择一个节点点击按钮，将会设置其显示值为“test”，对根结点无效";
}

function setNodeLabel(){
	var node = dijit.byId("setLabelTree").getCurrentNode();
	if (node) {
		dijit.byId("setLabelTree").getBinding().setLabel(node,"test")
	}
	else {
		alert("请在树上选择一个节点");
	}
}

function setNodeChecked(){
	test2clear();
	var inner = "<div dojoType=\"unieap.tree.Tree\" label=\"UniEAP\"  id=\"nodeChecked\"  binding = \"{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}\"></div>";
    dojo.byId('funWidgetRowSet').innerHTML = inner;
    dojo.parser.parse(dojo.byId('funWidgetRowSet'));
	 var inner2 = "<br><button  onclick=\"setRowChecked()\">将节点对应的数据选中</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('funWidgetRowSet'));
    return "将节点对应的数据选中";
}

function setRowChecked(){
	var node = dijit.byId("nodeChecked").getCurrentNode();
	if (node) {
		if (node.isRoot()) {
		    alert("根结点是虚节点，因此不能设置其对应的Row选中");
		}else {
			dijit.byId("nodeChecked").getBinding().getRow(node).setRowSelected(true);
			unieap.debug(dijit.byId("nodeChecked").getBinding().getRow(node));
		}
	}
	else {
		alert("请在树上选择一个节点");
	}
}


var test3 = {
	id: "treeJson",
	title: "json树",
	init: test3init,
	test: [
	]
}
test.push(test3);	
function test3init(){
    var c = new unieap.tree.Tree({label:"根结点",binding:{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf','jsonData':jsondata,'label':'text',id:'text'}})
	dojo.place(c.domNode, dojo.byId('treeJsonWidget'), 'first')
}



