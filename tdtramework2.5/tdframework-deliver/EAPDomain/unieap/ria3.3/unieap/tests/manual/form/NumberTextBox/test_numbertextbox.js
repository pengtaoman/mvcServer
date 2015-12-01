dojo.require("unieap.rpc");
dojo.require("unieap.form.Form");
dojo.require("unieap.form.NumberTextBox");
dojo.require("unieap.form.Button");
var test_attr={
	id:'attribute',
	test:[{
		summary:'设置格式化属性',
		title:"displayFormatter={dataFormat:'$###,###.00'}",
		fun:attr_displayFormatter
	},{
		summary:'scale&precision属性',
		title:'precision=7,scale=3',
		fun:attr_scale_precision
	},{
		summary:'设置数字的范围',
		title:'range:{max:10,min:5}',
		fun:attr_range
	}]
}

var test_fn={
	id:'fn',
	init:createNumberTextBox,
	test:[{
		summary:'调用setValue',
		title:"setValue(3000)",
		fun:fn_setValue
	}]
}

var test=[test_attr,test_fn]


///////////////////////////////////////属性测试//////////////////////////

function createNumberTextBox(){
	dojo.require("unieap.form.NumberTextBox");
	var box=new unieap.form.NumberTextBox({
		id:'box',
		displayFormatter:{
			dataFormat:'$####,###.00'
		}
	});
	box.placeAt('widget');
}

function attr_displayFormatter(){
	dijit.byId('box').destroy();
	var box=new unieap.form.NumberTextBox({
		id:'box',
		value:'333333',
		displayFormatter:{
			dataFormat:'$####,###.00'
		}
	});
	box.placeAt('widget');
	return "比如输入数字333333,控件失去焦点后会显示$333,333.00,重新获得焦点后变为333333";
}

//精度测试
function attr_scale_precision(){
	dijit.byId('box').destroy();
	var box=new unieap.form.NumberTextBox({
		id:'box',
		precision:7,
		scale:3
	});
	box.placeAt('widget');
	return "数字文本框中数字的整数部分最大为4位，小数最大为3位，否则会提示错误";
}

//范围测试

function attr_range(){
	dijit.byId('box').destroy();
	var box=new unieap.form.NumberTextBox({
		id:'box',
		range:{
			max:10,
			min:5
		}
	});
	box.placeAt('widget');
	return "数字文本框能输入的最大值为10,最小值为5";
}



////////////////////////////方法测试//////////////////////

function fn_setValue(){
	dijit.byId('box').destroy();
	var box=new unieap.form.NumberTextBox({
		id:'box',
		displayFormatter:{
			dataFormat:'$####,###.00'
		}
	});
	box.placeAt('widget');
	dijit.byId('box').setValue(3000)
	return "调用setValue,控件会显示成$3,000.00";	
}

var store = new unieap.ds.DataStore("emp",[{
		salary:1200
	}]);
var meta={primaryKey:true,label:"工资",dataType:4,nullable:false,precision:4};	
store.addMetaData("salary",meta);
dataCenter.addDataStore(store);
function getSalaryValue(){
	alert(unieap.byId("salary").getValue());
}

