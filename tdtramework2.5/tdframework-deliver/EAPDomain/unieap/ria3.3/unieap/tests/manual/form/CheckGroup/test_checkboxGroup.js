dojo.require("unieap.form.CheckBoxGroup");
var test_attr={
	id:'attribute',
	test:[{
		summary:'生成复选框按钮组',
		title:'dataProvider={}',
		fun:attr_dataProvider
	},{
		summary:'设置复选框旁的文字位置',
		title:'labelAlign=left',
		fun:attr_labelAlign,
		args:['left']
	},{
		summary:'设置复选框旁的文字位置',
		title:'labelAlign=right',
		fun:attr_labelAlign,
		args:['right']
	},{
		summary:'设置复选框旁的文字位置',
		title:'labelAlign=top',
		fun:attr_labelAlign,
		args:['top']
	},{
		summary:'设置复选框旁的文字位置',
		title:'labelAlign=bottom',
		fun:attr_labelAlign,
		args:['bottom']
	},{
		summary:'指定每行显示多少个复选框按钮',
		title:'cols=3',
		fun:attr_cols
	}]
}

var test_fn={
	id:'fn',
	init:attr_dataProvider,
	test:[{
		summary: '选中指定的按钮',
		title: 'setValue(\"2,3\")',
		fun: fn_setValue
	},{
		summary:'复选按钮组反选',
		title:'checkReverse',
		fun:fun_checkReverse
	},{
		summary: '改变datastore',
		title: 'getDataProvider().setDataStore()',
		fun: fn_setDataStore
	}]
}

var test_evt={
	id:'evt',
	test:[{
		summary:'onChange事件',
		title:'onChange=fn',
		fun:evt_onChange
	}]
}
var test=[test_attr,test_fn,test_evt]

/////////////////////////////////属性测试////////////////////////

//dataProvider属性
function attr_dataProvider(){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.CheckBoxGroup(
	{
		id:'group',
		cols:6,
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:40px'
	});
	
	group.placeAt('widget');
	return "生成一组复选框按钮"
}
//labelAlign

function attr_labelAlign(align){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.CheckBoxGroup(
	{
		id:'group',
		cols:6,
		labelAlign:align,
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px'
	});
	
	group.placeAt('widget');
	switch(align){
		case 'left':return "文字在复选框左边";break;
		case 'right':return "文字在复选框右边";break;
		case 'top':return "文字在复选框上面";break;
		case 'bottom':return "文字在复选框下面";break;
	}
	
}

//cols属性

function attr_cols(){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.CheckBoxGroup(
	{
		id:'group',
		cols:3,
		labelAlign:'left',
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px'
	});
	
	group.placeAt('widget');
	return "复选框按钮显示成两列,每列显示3个"
}

///////////////////////////////////////方法测试//////////////////////////

//setValue
function fn_setValue(){
	attr_dataProvider();
	dijit.byId('group').setValue('2,3');
	return "请查看宁海和温州是否被选中";
}

//setDataStore
function fn_setDataStore(){
	dijit.byId('group').getDataProvider().setDataStore('province_store');
	return "重新生成了一组复选框"
}

function fun_checkReverse(){
	dijit.byId('group').checkReverse();
	return "复选按钮组反选,以前被选中的将被取消选中,没有被选中的将被勾选";
}
/////////////////////////////////////////事件测试//////////////////////////

function evt_onChange(){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.CheckBoxGroup(
	{
		id:'group',
		cols:6,
		labelAlign:'left',
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px',
		onChange:function(x){
			alert('当前按钮组的实际值为'+group.getValue()+",显示值为"+group.getText())
		}
	});
	
	group.placeAt('widget');
	
	group.setValue('3')
	
	return "选中按钮组中的按钮,会弹出控件的实际值和显示值"
}
