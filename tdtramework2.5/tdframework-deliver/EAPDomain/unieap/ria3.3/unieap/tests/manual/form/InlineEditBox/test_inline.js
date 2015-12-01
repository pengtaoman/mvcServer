var test_attr={
	id:'attribute',
	test:[{
		summary:'设置是否显示下划线',
		title:'showUnderLine=true',
		fun:attr_showUnderLine,
		args:[true]
	},{
		summary:'设置是否显示下划线',
		title:'showUnderLine=false',
		fun:attr_showUnderLine,
		args:[false]
	},{
		summary:'设置是否禁用控件',
		title:'disabled=true',
		fun:attr_disabled,
		args:[true]
	},{
		summary:'设置是否禁用控件',
		title:'disabled=false',
		fun:attr_disabled,
		args:[false]
	},{
		summary:'设置转码',
		title:"decoder={store:'ds',valueAttr:'value',displayAttr:'display'}",
		fun:attr_decoder
	},{
		summary:'设置编辑器',
		title:"editor={editorClass:'unieap.form.DateTextBox'}",
		fun:attr_editor
	},{
		summary:'设置编辑器参数',
		title:"editor={editorProps:{width:'500px'}}",
		fun:attr_editor_args
	},{
		summary:'控件值格式化(日期)',
		title:"displayFormatter={declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy/MM/dd HH:mm:ss'}",
		fun:attr_date_displayFormatter
	},{
		summary:'控件值格式化(数字)',
		title:"displayFormatter={declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'###,###'}",
		fun:attr_number_displayFormatter
	}]
}

var test_fn={
	id:'fn',
	init:createInline,
	test:[{
		summary:'设置转码',
		title:'setDecoder(obj)',
		fun:fn_setDecoder
		
	}]
}

var test_evt={
	id:'evt',
	test:[{
		summary:'onChagne事件',
		title:'onChange=fn',
		fun:fn_onChange
		
	}]	
}

var test=[test_attr,test_fn,test_evt]

///////////////////////////////////属性测试//////////////////////

//是否显示下划线
function attr_showUnderLine(bool){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		showUnderLine:bool,
		id:'inline',
		value:bool?"我有下划线":"我没有下划线"
	})
	inline.placeAt('widget');
	if(bool){
		return "InlineEditBox控件显示下划线"
	}
	return "InlineEditBox控件不显示下划线";
	
}

//是否禁用
function attr_disabled(bool){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		disabled:bool,
		id:'inline',
		value:bool?"我被禁用啦":"我可以编辑"
	})
	inline.placeAt('widget');
	if(bool){
		return "InlineEditBox控件被禁用"
	}
	return "InlineEditBox控件可以编辑";
}

//转码
function attr_decoder(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		decoder:{
			store:'city_store',
			valueAttr:'CODEVALUE',
			displayAttr:'CODENAME'
		},
		id:'inline',
		value:1
	})
	inline.placeAt('widget');
	return "控件显示宁波,编辑输入2会显示宁海,输入3会显示……"
}

//日期格式化
function attr_date_displayFormatter(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		value:'1242975812625',
		displayFormatter:{
			declaredClass:'unieap.form.DateDisplayFormatter',
			dataFormat:'yyyy/MM/dd HH:mm:ss'
		}
	})
	inline.placeAt('widget');
	return "控件显示2009/05/02 15:03:32,编辑时显示长整数1242975812625"
}

//数字格式化
function attr_number_displayFormatter(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		value:'40000',
		displayFormatter:{
			declaredClass:'unieap.form.NumberDisplayFormatter',
			dataFormat:'###,###'
		}
	})
	inline.placeAt('widget');
	return "控件显示40,000,编辑时显示40000"
}

//编辑器类型

function attr_editor(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		editor:{
			editorClass:'unieap.form.DateTextBox'
		},
		displayFormatter:{
			declaredClass:'unieap.form.DateDisplayFormatter',
			dataFormat:'yyyy年MM月dd日'
		}
	})
	inline.placeAt('widget');
	return "编辑控件时会出现一个日历框"
}

//带参数的编辑器

function attr_editor_args(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		editor:{
			editorProps:{
				width:'500px'
			}
		}
	})
	inline.placeAt('widget');
	return "编辑器宽度变为500px"
}

//////////////////////////////////方法测试///////////////////////////

function createInline(){
	dojo.require("unieap.form.InlineEditBox");
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		value:'我是一个InlineEditBox控件'
	});
	inline.placeAt('widget');
}

function fn_setDecoder(){
	var inline=dijit.byId('inline');
	inline.setValue(1);
	inline.setDecoder({
		store:'city_store'
	});
	return "控件显示宁波";
}

//////////////////////////////////事件测试/////////////////////
function fn_onChange(){
	dijit.byId('inline').destroy();
	var inline=new unieap.form.InlineEditBox({
		id:'inline',
		onChange:function(value){
			alert('数据发生了改变');
		}
	})
	inline.placeAt('widget');
	return "控件的值发生变化时会触发"	
}

