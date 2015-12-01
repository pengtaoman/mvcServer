dojo.require("unieap.form.ComboBoxTree");
var test_attr={
	id:'attribute',
	test:[{
		summary:'treeJson生成下拉单选树',
		title:'treeJson={}',
		fun:attr_treeJson
	},{
		summary:'treeJson生成下拉复选树',
		title:'treeJson={}',
		fun:attr_treeJson,
		args:[true]
	}]
}

var test_fn={
	id:'fn',
	init:createComboBoxTree,
	test:[{
		summary:'清空下拉树中的数据',
		title:'clear()',
		fun:fn_clear
	},{
		summary:'重新生成一棵树',
		title:'setTreeJson()',
		fun:fn_setTreeJson
	}]
}
var test_evt={
	id:'evt',
	test:[{
		summary:'下拉树的onChange事件',
		title:'onChang=fn',
		fun:fn_onChange
	}]
}

var test=[test_attr,test_fn,test_evt];

///////////////////////////////////属性测试///////////////////////

function attr_treeJson(bool){
	dijit.byId('combo_tree')&&dijit.byId('combo_tree').destroy();
	var treeJson={label:'根节点'};
	dojo.mixin(treeJson,{
		binding:{
			store:'person_store',
			leaf:'leaf',
			query:{
				name:'parent',
				relation:'=',
				value:''
			}
		}
	})
	if(bool){
		dojo.mixin(treeJson,{checkLogic:{model:'multiple'}});
	}
	var combo_tree=new unieap.form.ComboBoxTree({
		id:'combo_tree',
		treeJson:treeJson
	});
	combo_tree.placeAt('widget');
	
	if(bool){
			combo_tree.setValue('1,11');
			return "点击下拉按钮,就会出现一棵复选树,同时文本框中显示人类和学生";
	}
	combo_tree.setValue('1');
	return "点击下拉按钮,就会出现一棵单选树,同时文本框中显示人类";
}

///////////////////////方法测试/////////////////////////////////////////
function createComboBoxTree(){
	attr_treeJson();
}

function fn_clear(){
	dijit.byId('combo_tree').clear();
	return "下拉树文本框的数据被清空,如果是复选树,展开的节点将全部收拢"
}

function fn_setTreeJson(){
	dijit.byId('combo_tree').setTreeJson({
		label:'新的树,新的开始',
		binding:{
			leaf:'leaf',
			store:'neusoft_store',
			query:{
				name:'parent',
				relation:'=',
				value:''
			}
		}
	});
	dijit.byId('combo_tree').setValue(1);
	
	return "重新构建一棵下拉树"
}
//////////////////////////////////事件测试////////////////////////////////////

function fn_onChange(){
	createComboBoxTree();
	var combo_tree=dijit.byId('combo_tree').onChange=function(id,label){
		alert(id+"-->"+label);
	}
	return "点击标签会弹出该标签对应的id和label,默认显示为人类,选择其他标签会触发该事件"
}
