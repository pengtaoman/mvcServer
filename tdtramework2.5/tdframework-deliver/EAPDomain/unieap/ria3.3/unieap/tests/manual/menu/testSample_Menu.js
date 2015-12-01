dojo.require('unieap.menu.Menu');

function nodeContextMenu(treeNode){
		if(treeNode.getLabel()=="叶子A"){
			var menu=new unieap.menu.Menu();
			menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
			menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
			menu.addChild(new unieap.menu.MenuItem({label:'法国'}));
			menu.addChild(new unieap.menu.MenuItem({label:'英国'}));
			menu.startup();
			menu.popup();
		}
		if(treeNode.getLabel()=="叶子B"){
			var menu=new unieap.menu.Menu();
			menu.addChild(new unieap.menu.MenuItem({label:'辽宁'}));
			menu.addChild(new unieap.menu.MenuItem({label:'吉林'}));
			menu.addChild(new unieap.menu.MenuItem({label:'黑龙江'}));
			menu.addChild(new unieap.menu.MenuItem({label:'北京'}));
			menu.startup();
			menu.popup();
		}
		if(treeNode.getLabel()=="树根1"){
			var menu=new unieap.menu.Menu();
			menu.addChild(new unieap.menu.MenuItem({label:'法国'}));
			menu.addChild(new unieap.menu.MenuItem({label:'英国'}));
			menu.addChild(new unieap.menu.MenuItem({
				label:'delete',
				onClick: function(){
						unieap.byId("tree1").deleteNode(treeNode,true); //删除树节点
			}}));
			menu.startup();
			menu.popup();
		}	
}

///////////////////属性测试///////////////////////////////

//////////////////绑定菜单到targetNodeIds中的节点//////////////////
function attr_targetNodeIds(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({targetNodeIds:['btn','btn1'],id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'韩国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'日本'}));
	menu.startup();
}

/////////////////////////屏蔽系统右键/////////////////////////
function attr_contextMenu(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu',contextMenuForWindow:true});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
}

//////////////////////iconClass属性测试////////////////////
function attr_iconClass(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国',iconClass:'plusIcon'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	menu.popup();
}

///////////////////方法测试////////////////////////////////

///////////////////创建菜单////////////////////////////////
function fn_bindById(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.startup();
	menu.bindDomNode("btn");	
}

///////////////////绑定菜单到domNode////////////////////////
function fn_bindDomNode(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'法国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'德国'}));
	menu.startup();
	menu.bindDomNode(dojo.byId("btn"));
}

//////////////////////setDisabled功能测试////////////////////
function fn_setDisabled(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	var item=new unieap.menu.MenuItem({label:'德国'});
	item.setDisabled(true);
	menu.addChild(item);
	menu.addChild(new unieap.menu.MenuItem({label:'英国'}));
	menu.startup();
	menu.popup();
}

function fn_setAbled(){
	var menu=unieap.byId('menu');
	var children=menu.getChildren();
	dojo.forEach(children,function(child){
		if(child.disabled){
			child.setDisabled(false);
		}
	});
	menu.popup();
}

//////////////////////带有MenuSeparator的菜单的测试////////////////////
function fn_withSeparator(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({label:'中国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'美国'}));
	menu.addChild(new unieap.menu.MenuSeparator());
	menu.addChild(new unieap.menu.MenuItem({label:'英国'}));
	menu.startup();
	menu.popup();
}

//////////////////////////多级菜单测试//////////////////////
function fn_multiMenu(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({
		label:'美国'
	}));	
	
	var childMenu=new unieap.menu.Menu();
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'辽宁'
	}));
	childMenu.addChild(new unieap.menu.MenuItem({
		label:'吉林'
	}));
	
	var grandsonMenu=new unieap.menu.Menu();
	grandsonMenu.addChild(new unieap.menu.MenuItem({
		label:'哈尔滨'
	}));
	grandsonMenu.addChild(new unieap.menu.MenuItem({
		label:'齐齐哈尔'
	}));
	var pop1=new unieap.menu.PopupMenuItem({
		label:'黑龙江',
		popup:grandsonMenu
	});
	childMenu.addChild(pop1);

	childMenu.addChild(new unieap.menu.MenuItem({
		label:'河北'
	}));
	var pop2=new unieap.menu.PopupMenuItem({
		label:'中国',
		popup:childMenu
	});
	menu.addChild(pop2);
	menu.addChild(new unieap.menu.MenuItem({label:'法国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'日本'}));
	menu.addChild(new unieap.menu.MenuItem({label:'韩国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'澳大利亚'}));
	menu.startup();
	menu.popup();
}

//////////////////////////弹出菜单被禁用测试//////////////////////
function fn_disabledPopup(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({
		label:'美国'
	}));	
	
	var childMenu1=new unieap.menu.Menu();
	childMenu1.addChild(new unieap.menu.MenuItem({
		label:'辽宁'
	}));
	childMenu1.addChild(new unieap.menu.MenuItem({
		label:'吉林'
	}));
	childMenu1.addChild(new unieap.menu.MenuItem({
		label:'河北'
	}));
	var pop1=new unieap.menu.PopupMenuItem({
		label:'中国',
		popup:childMenu1
	});
	menu.addChild(pop1);
	menu.addChild(new unieap.menu.MenuItem({label:'法国'}));
	var childMenu2=new unieap.menu.Menu();
	childMenu2.addChild(new unieap.menu.MenuItem({
		label:'东京'
	}));
	childMenu2.addChild(new unieap.menu.MenuItem({
		label:'大阪'
	}));
	var pop2=new unieap.menu.PopupMenuItem({
		label:'日本',
		popup:childMenu2
	});
	pop2.setDisabled(true);
	menu.addChild(pop2);
	menu.addChild(new unieap.menu.MenuItem({label:'韩国'}));
	menu.addChild(new unieap.menu.MenuItem({label:'澳大利亚'}));
	menu.startup();
	
	menu.popup();
}

///////////////////////点击事件绑定测试////////////////////////
function evt_onClick(){
	dijit.byId('menu')&&dijit.byId('menu').destroy();
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
	menu.popup();
}

/////////////////////////主动弹出测试///////////////////////////
function fn_popup1(){
	dijit.byId('menu1')&&dijit.byId('menu1').destroy();
	var menu=new unieap.menu.Menu({id:'menu1'});
	menu.addChild(new unieap.menu.MenuItem({label: '中国'}));
	menu.addChild(new unieap.menu.MenuItem({label: '美国'}));
	menu.startup();
	menu.popup({x:10,y:10});
}

function fn_popup2(){
	dijit.byId('menu1')&&dijit.byId('menu1').destroy();
	var menu=new unieap.menu.Menu({id:'menu1'});
	menu.addChild(new unieap.menu.MenuItem({label: '中国'}));
	menu.addChild(new unieap.menu.MenuItem({label: '美国'}));
	menu.startup();
	menu.popup({around:dojo.byId("btn")});
}

function fn_popup3(){
	dijit.byId('menu1')&&dijit.byId('menu1').destroy();
	var menu=new unieap.menu.Menu({id:'menu1'});
	menu.addChild(new unieap.menu.MenuItem({label: '中国'}));
	menu.addChild(new unieap.menu.MenuItem({label: '美国'}));
	menu.startup();
	menu.popup();
}

///////////////////////setObject测试/////////////////////////
function fn_setObj(){
	dijit.byId('menutest')&&dijit.byId('menutest').destroy();
	var menutest=new unieap.menu.Menu({id:'menutest'});
	
	menutest.setObject(menutest);
}

function fn_getObj(){
	alert(dijit.byId("menutest")&&dijit.byId("menutest").getObject());
}

////////////////////////解除菜单绑定//////////////////////////////
function fn_unBindDomNodebyId(){
	var menu=dijit.byId('menu');
	if(menu){
		dijit.byId('btn')&&menu.unBindDomNode('btn');
		menu.contextMenuForWindow&&menu.unBindDomNode(dojo.body());
		dijit.byId('menu')&&dijit.byId('menu').destroy();
	}
}

function fn_unBindDomNode(){
	var menu=dijit.byId('menu');
	if(menu){
		dijit.byId('btn')&&menu.unBindDomNode(dojo.byId('btn'));
		menu.contextMenuForWindow&&menu.unBindDomNode(dojo.body());
		dijit.byId('menu')&&dijit.byId('menu').destroy();
	}
}
