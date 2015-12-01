dojo.require("unieap.form.RadioButtonGroup");
var test_attr={
	id:'attribute',
	test:[{
		summary:'生成单选按钮组',
		title:'dataProvider={}',
		fun:attr_dataProvider
	},{
		summary:'设置单选按钮文字位置',
		title:'labelAlign=left',
		fun:attr_labelAlign,
		args:['left']
	},{
		summary:'设置单选按钮文字位置',
		title:'labelAlign=right',
		fun:attr_labelAlign,
		args:['right']
	},{
		summary:'设置单选按钮文字位置',
		title:'labelAlign=top',
		fun:attr_labelAlign,
		args:['top']
	},{
		summary:'设置单选按钮文字位置',
		title:'labelAlign=bottom',
		fun:attr_labelAlign,
		args:['bottom']
	},{
		summary:'指定每行显示多少个单选按钮',
		title:'cols=3',
		fun:attr_cols
	}]
}

var test_fn={
	id:'fn',
	init:attr_dataProvider,
	test:[{
		summary: '选中指定的按钮',
		title: 'setValue(3)',
		fun: fn_setValue
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
	var group=new unieap.form.RadioButtonGroup(
	{
		id:'group',
		cols:6,
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:40px'
	});
	
	group.placeAt('widget');
	return "生成一组单选按钮"
}
//labelAlign

function attr_labelAlign(align){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.RadioButtonGroup(
	{
		id:'group',
		cols:6,
		labelAlign:align,
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px'
	});
	
	group.placeAt('widget');
	switch(align){
		case 'left':return "文字在单选按钮左边";break;
		case 'right':return "文字在单选按钮右边";break;
		case 'top':return "文字在单选按钮上面";break;
		case 'bottom':return "文字在单选按钮下面";break;
	}
	
}

//cols属性

function attr_cols(){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.RadioButtonGroup(
	{
		id:'group',
		cols:3,
		labelAlign:'left',
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px'
	});
	
	group.placeAt('widget');
	return "单选按钮显示成两列,每列显示3个"
}

///////////////////////////////////////方法测试//////////////////////////

//setValue
function fn_setValue(){
	attr_dataProvider();
	dijit.byId('group').setValue(3);
	return "请查看温州是否被选中";
}

//setDataStore
function fn_setDataStore(){
	dijit.byId('group').getDataProvider().setDataStore('province_store');
	return "重新生成了一组单选按钮组"
}

/////////////////////////////////////////事件测试//////////////////////////

function evt_onChange(){
	dijit.byId('group')&&dijit.byId('group').destroy();
	var group=new unieap.form.RadioButtonGroup(
	{
		id:'group',
		cols:6,
		labelAlign:'left',
		dataProvider:{store:'city_store'},
		style:'border:1px solid gray;width:450px;height:55px',
		onChange:function(){
			alert('当前按钮实际值为'+group.getValue()+",显示值为"+group.getText())
		}
	});
	
	group.placeAt('widget');
	
	group.setValue('3')
	
	return "选中单选按钮组中的另外一个按钮,会弹出单选按钮组的实际值和显示值"
}
