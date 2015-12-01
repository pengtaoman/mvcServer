dojo.require("unieap.form.DropDownButton");
dojo.require("unieap.menu.Menu");

var attr_test={
	id:'attribute',
	title:'属性测试',
	test:[{
		summary:'创建下拉按钮',
		title:'点击创建',
		fun:attr_createDropDownBtn
		}]
}

var test_evt={
	id:'evt',
	title:'事件测试',
	test:[{
		summary:'按钮点击事件',
		title:'点击创建事件',
		fun:attr_onClick
	},{
		summary:'下拉箭头点击事件',
		title:'点击创建事件',
		fun:attr_onArrowClick
	},{
		summary:'下拉箭头点击回调事件',
		title:'点击创建事件',
		fun:attr_onBeforeArrowClick
	}]
}
var test=[attr_test,test_evt]

//////////////////////////////属性测试///////////////////////////

//创建Menu
function createMenu(){
	var menu=new unieap.menu.Menu({id:'menu'});
	menu.addChild(new unieap.menu.MenuItem({
		label:'中国'
	}));
	menu.addChild(new unieap.menu.MenuItem({
		label:'美国'
	}));
	menu.startup();
}

//创建下拉菜单
function attr_createDropDownBtn(){
	destroy();
	createMenu();
	var btn=new unieap.form.DropDownButton({
		id:'btn',
		label:'点击我',
		width:'150px',
		dropDown:dijit.byId('menu')
	});
	btn.placeAt('widget');
	return "页面左上角会显示一个下拉按钮,点击下拉箭头会显示菜单"
}

///////////////////////////事件测试////////////////////////////

//按钮点击事件
function attr_onClick(){
	destroy();
	createMenu();
	var btn=new unieap.form.DropDownButton({
		id:'btn',
		label:'点击我',
		width:'150px',
		dropDown:dijit.byId('menu'),
		onClick:function(){alert('您点击了下按钮')}
	});
	btn.placeAt('widget');
	return "点击页面左上角的按钮会弹出\"您点击了下按钮\""
	
}

//下拉箭头点击事件
function attr_onArrowClick(){
	destroy();
	createMenu();
	var btn=new unieap.form.DropDownButton({
		id:'btn',
		label:'点击我',
		width:'150px',
		dropDown:dijit.byId('menu'),
		onArrowClick:function(){alert('您点击了下拉箭头')}
	});
	btn.placeAt('widget');
	return "点击页面左上角按钮的下拉箭头,会弹出\"您点击了下拉箭头\""
	
}

//下拉箭头回调事件
function attr_onBeforeArrowClick(){
	destroy();
	createMenu();
	var btn=new unieap.form.DropDownButton({
		id:'btn',
		label:'点击我',
		width:'150px',
		dropDown:dijit.byId('menu'),
		onBeforeArrowClick:function(){
			alert('您点击了下拉箭头,但是下拉菜单不会出现');
			return false;
		}
	});
	btn.placeAt('widget');
	return "点击页面左上角按钮的下拉箭头,不会出现下拉菜单"
	
}

function destroy(){
	dijit.byId('btn')&&dijit.byId('btn').destroy();
	dijit.byId('menu')&&dijit.byId('menu').destroy();
}
