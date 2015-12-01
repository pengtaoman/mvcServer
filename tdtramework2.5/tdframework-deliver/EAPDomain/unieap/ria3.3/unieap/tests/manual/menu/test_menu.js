dojo.require("unieap.menu.Menu");

var test_attr={
	id:'attribute',
	title:'属性',
	test:[{
		summary:'创建菜单',
		title:'点击创建',
		fun:attr_createMenu
	},{
		summary:'绑定菜单到指定dom节点',
		title:'点击绑定',
		fun:attr_targetNodeIds
		
	},{
		summary:'屏蔽系统右键',
		title:'点击屏蔽',
		fun:attr_contextMenu
	},{
		summary:'设置菜单项图标',
		title:'点击创建菜单项图标',
		fun:attr_iconClass
	},{
		summary:'多级菜单创建',
		title:'点击创建多级菜单',
		fun:attr_multiMenu
	}]
}

var test_fn = {
	id: 'fn',
	title: '方法',
	test:[{
		summary:'绑定菜单到指定dom节点',
		title:'点击绑定',
		fun:fn_bindDomNode
	},{
		summary:'解除菜单和dom节点的绑定',
		title:'点击取消绑定',
		fun:fn_unBindDomNode
	}]
}

var test_evt={
	id:'evt',
	title:'事件',
	test:[{
		summary:'菜单项点击事件',
		title:'点击创建菜单事件',
		fun:evt_onClick
	}]
}

var test=[test_attr,test_fn,test_evt]



/////////////////////////////////属性测试////////////////////////
///创建菜单
function attr_createMenu(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	var menu=new unieap.menu.Menu({targetNodeIds:['btn'],id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	return "右键点击页面左上角的按钮会看到菜单";
	
}

//绑定菜单到指定节点

function attr_targetNodeIds(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	dojo.place('<span>&nbsp;&nbsp;</span>','widget');
	var btn1=new unieap.form.Button({label:'右键点击我',id:'btn1'});
	btn1.placeAt('widget');
	var menu=new unieap.menu.Menu({targetNodeIds:['btn','btn1'],id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	return "右键点击页面左上角的2个按钮会看到菜单";
}

//屏蔽系统右键

function attr_contextMenu(){
	destroy();
	var menu=new unieap.menu.Menu({id:'menu',contextMenuForWindow:true});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	return "在页面的任何地方点击右键会看到新建的菜单"
	
	
}

//iconClass属性

function attr_iconClass(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国',iconClass:'plusIcon'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	menu.bindDomNode('btn');
	return "右键点击页面左上角的按钮会看到菜单,菜单前会出现一个绿色的图片+号"
	
}

//多级菜单

function attr_multiMenu(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	var menu=new unieap.menu.Menu({id:'menu',targetNodeIds:['btn']});
	menu.addChild(new unieap.menu.MenuItem({
		label:'美国'
	}))
	var childMenu=new unieap.menu.Menu();
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'辽宁'
	}));
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'吉林'
	}));
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'黑龙江'
	}));
	
	childMenu.addChild(new unieap.menu.MenuSeparator());
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'河北'
	}));
	var popMenu=new unieap.menu.PopupMenuItem({
		label:'中国',
		popup:childMenu
	})
	menu.addChild(popMenu)
	menu.startup();
	
	return "右键点击页面左上角的按钮会看到菜单,菜单项还拥有子菜单";
	
}

/////////////////////////////方法测试//////////////////////////

//绑定菜单
function fn_bindDomNode(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	var menu=new unieap.menu.Menu({id:'menu',contextMenuForWindow:true});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	menu.bindDomNode(btn.domNode);
	return "右键点击页面左上角的按钮会看到菜单";
}

//解除菜单和dom节点的绑定

function fn_unBindDomNode(){
	var menu=dijit.byId('menu');
	if(menu){
		dijit.byId('btn')&&menu.unBindDomNode('btn');
		dijit.byId('btn1')&&menu.unBindDomNode('btn1');
		menu.contextMenuForWindow&&menu.unBindDomNode(dojo.body());
	}
	return "菜单和按钮将不再绑定";
}

////////////////////////////////事件测试////////////////////////

function evt_onClick(){
	destroy();
	var btn=new unieap.form.Button({label:'右键点击我',id:'btn'});
	btn.placeAt('widget');
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({
		label: '中国',
		onClick: function(){alert('CHINA')}
	}));
	menu.addChild(new unieap.menu.MenuItem({
		label: '美国',
		onClick: function(){alert('USA')}
	}));
	menu.startup();
	menu.bindDomNode(btn.domNode);
	
	return "右键点击页面左上角的按钮会看到菜单,点击菜单项会看到弹出信息"
	
}


function destroy(){
	dijit.byId('btn')&&dijit.byId('btn').destroy();
	dijit.byId('btn1')&&dijit.byId('btn1').destroy();
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	dojo.empty('widget');
}



