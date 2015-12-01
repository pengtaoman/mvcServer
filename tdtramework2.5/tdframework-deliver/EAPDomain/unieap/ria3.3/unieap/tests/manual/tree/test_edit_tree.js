var test1 = {
	id: "editRowSet",
	title: '属性',
	init: test1init,
	test: [{
		title: "allowBlank-true",
		summary: "设置是否允许显示字段为空",
		fun : setAllowBlank
	}
	]
}
test = [];
test.push(test1);	
function test1init(){
	var c = new unieap.tree.Tree({label:"UniEAP",treeEditor :{allowBlank:false} ,binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('editWidgetRowSet'), 'first')
}
function test1clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('editWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('editWidgetRowSet'));
}
function  setAllowBlank(){
	test1clear();
	var c = new unieap.tree.Tree({label:"UniEAP",treeEditor :{allowBlank:true} ,binding:{'leaf':'leaf','store':treeStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}});
    dojo.place(c.domNode, dojo.byId('editWidgetRowSet'), 'first')
	var re = "此时允许要编辑的显示字段为空";
	return re;
}


var test2 = {
	id: "editJson",
	title: '属性',
	init: test2init,
	test: [
	]
}
test.push(test2);	
function test2init(){
	var c = new unieap.tree.Tree({label:"根结点",treeEditor :{allowBlank:false},binding:{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf','jsonData':jsondata,'label':'text',id:'text'}})
	dojo.place(c.domNode, dojo.byId('editWidgetJson'), 'first')
}