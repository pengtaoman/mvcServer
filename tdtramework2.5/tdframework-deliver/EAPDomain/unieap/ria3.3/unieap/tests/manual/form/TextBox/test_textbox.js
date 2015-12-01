dojo.require("unieap.form.TextBox");

//属性测试
var test_attr={
	id:'attribute',
	test:[
		{
			summary:'设置TextBox控件的必填项',
			title:'required=true',
			fun:attr_requried,
			args:[true]
		},
		{
			summary:'设置TextBox控件的必填项',
			title:'required=false',
			fun:attr_requried,
			args:[false]
		},
		{
			summary:'是否禁用TextBox控件',
			title:'disabled=true',
			fun:attr_disable,
			args:[true]
		},
		{
			summary:'是否禁用TextBox控件',
			title:'disabled=false',
			fun:attr_disable,
			args:[false]	
		},
		{
			summary:'TextBox控件是否只读',
			title:'readOnly=true',
			fun:attr_readOnly,
			args:[true]
		},
		{
			summary:'TextBox控件是否只读',
			title:'readOnly=false',
			fun:attr_readOnly,
			args:[false]	
		},
		{
			summary:'TextBox控件为密码框',
			title:'password=true',
			fun:attr_password
		},
		{
			summary:'TextBox文本对齐方式',
			title:'TextAlign=right',
			fun:attr_textAlign
		},
		{
			summary:'TextBox文本的最小长度',
			title:'minLength=3',
			fun:attr_minLength
		},
		{
			summary:'TextBox文本的最大长度',
			title:'maxLength=3',
			fun:attr_maxLength
		},
		{
			summary:'去掉TextBox文本的前后空格',
			title:'trim=true',
			fun:attr_trim
		},
		{
			summary:'设置控件的宽度(绝对宽度)',
			title:'width=500px',
			fun:attr_width,
			args:["500px"]
		},
		{
			summary:'设置控件的宽度(宽度百分比)',
			title:'width=60%',
			fun:attr_width,
			args:["60%"]
		},
		{
			summary:'设置控件的高度(绝对高度)',
			title:'height=80px',
			fun:attr_height,
			args:["80px"]
		},
		{
			summary:'设置控件的高度(高度百分比)',
			title:'height=50%',
			fun:attr_height,
			args:["50%"]
		},
		{
			summary:'设置TextBox的校验器',
			title:"validator={regExp:/^\\d+$/,errorMsg:'只能为数字'}",
			fun:attr_validator
		},
		{
			summary:'设置TextBox的校验器',
			title:"validator={regExp:/^\\d+$/,errorMsg:'只能为数字',realTime:true}",
			fun:attr_validator_instance
		},
		{
			summary:'设置TextBox的过滤器',
			title:"validator={inputFilter={filterRule:/[0-9]/}}",
			fun:attr_filter
		},
		{
		summary:'设置editFormatter属性',
		title:'点击设置',
		fun:attr_editClass
		},
		{
			summary:'设置TextBox的提示信息',
			title:'设置提示信息',
			fun:attr_prompt
		},
		{
			summary:'同时设置required和disabled属性',
			title:'同时设置required和disabled属性',
			fun:attr_required_disabled
		}
	]
}

//控件方法测试
var test_fn = {
	id:'fn',
	init:createTextBox,
    test: [{
        summary: "设置TextBox控件是否被修改",
        title: "setModified(true)",
        fun: fn_setModified,
		args:[true]
    },{
        summary: "设置TextBox控件是否被修改",
        title: "setModified(false)",
        fun: fn_setModified,
		args:[false]
    },{
        summary: "设置TextBox控件是否禁用",
        title: "setDisabled(true)",
        fun: fn_setDisable,
		args:[true]
    },{
        summary: "设置TextBox控件是否",
        title: "setDisabled(false)",
        fun: fn_setDisable,
		args:[false]
    },{
        summary: "设置TextBox控件是否只读",
        title: "setReadOnly(true)",
        fun: fn_setReadOnly,
		args:[true]
    },{
        summary: "设置TextBox控件是否只读",
        title: "setReadOnly(false)",
        fun: fn_setReadOnly,
		args:[false]
    },{
        summary: "设置TextBox控件的宽度",
        title: "setWidth(500px)",
        fun: fn_setWidth,
		args:['500px']
    },{
        summary: "设置TextBox控件的宽度",
        title: "setWidth(60%)",
        fun: fn_setWidth,
		args:['60%']
    },{
        summary: "设置TextBox控件的高度",
        title: "setHeight(80px)",
        fun: fn_setHeight,
		args:['80px']
    },{
        summary: "设置TextBox控件的高度",
        title: "setHeight(50%)",
        fun: fn_setHeight,
		args:['50%']
    }]
}

//事件测试

var test_evt={
	id:'evt',
	test:[{
		summary:'TextBox的点击事件',
		title:'onClick=fn',
		fun:evt_onClick
	},{
		summary:'TextBox的双击事件',
		title:'onDblClick=fn',
		fun:evt_onDblClick
	},{
		summary:'TextBox的复制事件',
		title:'onCopy=fn',
		fun:evt_onCopy
	},{
		summary:'TextBox的粘贴事件',
		title:'onPaste=fn',
		fun:evt_onPaste
	},{
		summary:'TextBox的剪切事件',
		title:'onCut=fn',
		fun:evt_onCut
	},{
		summary:'TextBox的OnChange事件',
		title:'onChange=fn',
		fun:evt_onChange
	},{
		summary:'TextBox的OnKeyDown事件',
		title:'onKeyDown=fn',
		fun:evt_onKeyDown
	},{
		summary:'TextBox的OnKeyUp事件',
		title:'onKeyUp=fn',
		fun:evt_onKeyUp
	},{
		summary:'TextBox的OnKeyPress事件',
		title:'onKeyPress=fn',
		fun:evt_onKeyPress
	},{
		summary:'TextBox的OnBlur事件',
		title:'onBlur=fn',
		fun:evt_onBlur
	},{
		summary:'TextBox的OnFoucs事件',
		title:'onFocus=fn',
		fun:evt_onFocus
	},{
		summary:'TextBox的OnBeforeClick件',
		title:'onBeforeClick=function(){return false;}',
		fun:evt_onBeforeClick
	},{
		summary:'TextBox的OnBeforeCopy件',
		title:'onBeforeCopy=function(){return false;}',
		fun:evt_onBeforeCopy
	},{
		summary:'TextBox的OnBeforePaste件',
		title:'onBeforePaste=function(){return false;}',
		fun:evt_onBeforePaste
	},{
		summary:'TextBox的OnBeforeCut件',
		title:'onBeforeCut=function(){return false;}',
		fun:evt_onBeforeCut
	}]
}

var test = [test_attr,test_fn,test_evt];


/////////////////////////////属性测试////////////////////////////////////

function attr_requried(bool){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({required:bool,id:'box'});
	textbox.placeAt('widget');
	if(bool){
		return "TextBox控件的值必须,控件右侧会出现红色星号";
	}
	return "TextBox控件的值可以为空";
}

//设置disabled属性
function attr_disable(bool){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({disabled:bool,id:'box',value:11});
	textbox.placeAt('widget');
	if(bool){
		return "TextBox控件被禁用了,文本域文字灰显,同时光标不可置入";
	}
	return "TextBox已经解禁";
}

//设置只读属性
function attr_readOnly(bool){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({readOnly:bool,id:'box',value:'11'});
	textbox.placeAt('widget');
	if(bool){
		return "TextBox控件为只读控件,当ie<8时光标无法置入文本域.ie8和firefox可以置入光标";
	}
	return "TextBox可以编辑了";	
}

//设置密码框

function attr_password(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({password:true,id:'box'});
	textbox.placeAt('widget');
	return "TextBox控件现在为密码框,密码框中的文字不可复制、粘贴和剪切";		
}

//设置文本对齐方式
function attr_textAlign(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({textAlign:'right',id:'box'});
	textbox.placeAt('widget');
	return "TextBox控件中文字向右对齐";	
}

//设置文本最小长度

function attr_minLength(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({minLength:'3',id:'box'});
	textbox.placeAt('widget');
	return "TextBox控件至少输入3个字符,不然提示出错";		
}

//设置文本最大长度

function attr_maxLength(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({maxLength:'3',id:'box'});
	textbox.placeAt('widget');
	return "TextBox控件最多只能输入3个字符";		
}

//设置文本框的trim属性

function attr_trim(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({trim:true,id:'box'});
	textbox.placeAt('widget');
	return "在失去焦点时,TextBox控件中的前后空格会被去掉";	
}

//设置控件的宽度

function attr_width(value){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({width:value,id:'box'});
	textbox.placeAt('widget');
	return "请检查控件是否变宽";		
}

//设置控件的高度

function attr_height(value){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({height:value,id:'box'});
	textbox.placeAt('widget');
	return "请检查控件是否变高";		
}

//设置校验器

function attr_validator(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({id:'box',validator:{
		regExp:/^\d+$/,
		errorMsg:'只能输入数字'
	}});
	textbox.placeAt('widget');
	return "TextBox控件只能输入数字,不然控件失去焦点后会提示错误信息";	
}

//设置校验器,及时检验

function attr_validator_instance(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({id:'box',validator:{
		regExp:/^\d+$/,
		errorMsg:'只能输入数字',
		realTime:true
	}});
	textbox.placeAt('widget');
	return "TextBox控件只能输入数字,控件会实时进行检查。不合法就提示错误信息";		
}

//设置过滤器

function attr_filter(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({id:'box',inputFilter:{
		filterRule:/[0-9]/
	}});
	textbox.placeAt('widget');
	
	setTimeout(function(){
		dijit.byId('box').destroy();
		createTextBox();
		dijit.scrollIntoView(dojo.byId('widget'));
	},"10000");
	return "TextBox控件只能输入数字,其他字符无法输入进去。<br/>但在开启输入法时无法控制";	
}

//自定义editFormatter
function attr_editClass(){
	dijit.byId('box').destroy();
	var txtBox=new unieap.form.TextBox({
		id:'box',
		value:'2000',
		editFormatter:{
			dataFormat:'USA',
			declaredClass:'unieap.tests.manual.form.TextBox.demo.EditClassDemo'
		},
		displayFormatter:{
			dataFormat:'USA',
			declaredClass:'unieap.tests.manual.form.TextBox.demo.DisplayClassDemo'
		}
	});
	
	txtBox.placeAt('widget');
	
	return "控件的实际值为2000,显示为\"美元2000\",编辑时显示\"$2000\"";
}

//控件提示信息

function attr_prompt(){
	dijit.byId('box').destroy();
	var txtBox=new unieap.form.TextBox({
		id:'box',
		value:'2000',
		prompt:{
			promptMsg:'你好,可以慢慢输入'
		}
	});
	
	txtBox.placeAt('widget');
	
	return "光标置入文本框,可以看到提示信息,1s后或者控件失去焦点,提示信息会消失";
}
function attr_required_disabled(){
	dijit.byId('box').destroy();
	var textbox=new unieap.form.TextBox({required:true,disabled:true,id:'box'});
	textbox.placeAt('widget');
	return "只显示diabled的样式<button onclick=\"dijit.byId('box').setDisabled(!dijit.byId('box').disabled)\">设置（不）可用</button>";
}

////////////////////////////////方法测试//////////////////////////////////////

function createTextBox(){
	dojo.require("unieap.form.TextBox");
	var box=new unieap.form.TextBox({id:'box'});
	box.placeAt('widget');
}

//设置文本框是否修改
function fn_setModified(bool){
	dijit.byId('box')&&dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').setModified(bool);
	if(bool){
		return "请检查控件左上角是否出现红色小三角";
	}
	return "请检查控件左上角的红色小三角是否消失";
}

//设置是否禁用文本框
function fn_setDisable(bool){
	dijit.byId('box')&&dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').setValue('11');
	dijit.byId('box').setDisabled(bool);
	if(bool){
		return "请检查控件是否被禁用了，禁用后文字灰显";
	}
	return "请检查控件是否解禁了";
}

//设置控件是否只读

function fn_setReadOnly(bool){
	dijit.byId('box')&&dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').setValue('11');
	dijit.byId('box').setReadOnly(bool);
	if(bool){
		return "请检查控件是否是只读的";
	}
	return "请检查控件是否可以编辑了";
}

//设置控件宽度
function fn_setWidth(value){
	dijit.byId('box')&&dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').setWidth(value);
	return "请检查控件是否变宽了";
}

//设置控件高度
function fn_setHeight(value){
	dijit.byId('box')&&dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').setHeight(value);
	return "请检查控件是否变高了";
}

/////////////////////////////////////事件测试/////////////////////////////////

//点击
function evt_onClick(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onClick=function(){
		alert('click');
	}
	return "点击文本框会出现click"
}

//双击
function evt_onDblClick(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onDblClick=function(){
		alert('dblClick');
	}
	return "双击文本框会出现dblClick"
}


//复制
function evt_onCopy(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onCopy=function(){
		alert('copy');
	}
	return "复制文本框会出现copy"
}

//粘贴
function evt_onPaste(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onPaste=function(){
		alert('paste');
	}
	return "粘贴文本框会出现paste"
}

//剪切
function evt_onCut(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onCut=function(){
		alert('cut');
	}
	return "剪切文本框会出现cut"
}

//keyup
function evt_onKeyUp(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onKeyUp=function(){
		alert('keyup');
	}
	return "在文本框中键盘释放时会出现keyup"
}

//keydown
function evt_onKeyDown(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onKeyDown=function(){
		alert('keydown');
	}
	return "在文本框中键盘按下时会出现keydown"
}

//keypress
function evt_onKeyPress(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onKeyPress=function(){
		alert('keypress');
	}
	return "在文本框中键盘释放时会出现onkeypress"
}

//onchange
function evt_onChange(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onChange=function(value){
		alert(value);
	}
	return "在文本的值发生改变时会显示该值"
}

//onblur
function evt_onBlur(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onBlur=function(value){
		alert('blur');
	}
	return "文本框失去焦点时会出现blur"
}

//onfocus
function evt_onFocus(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onFocus=function(value){
		alert('foucs');
	}
	return "文本框获得焦点时会出现focus"
}

//onBeforeClick
function evt_onBeforeClick(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onClick=function(){
		alert('click');
	}
	dijit.byId('box').onBeforeClick=function(){
		return false;
	}
	return "onBeforeClick返回为false,文本框现在点击无效"
}

//onBeofreCopy
function evt_onBeforeCopy(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onCopy=function(){
		alert('copy');
	}
	dijit.byId('box').onBeforeCopy=function(){
		return false;
	}
	return "onBeforeCopy返回为false,文本框现在不可复制"
}

//onBeforePaste
function evt_onBeforePaste(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onPaste=function(){
		alert('paste');
	}
	dijit.byId('box').onBeforePaste=function(){
		return false;
	}
	return "onBeforePaste返回为false,文本框现在不可粘贴"
}

//onBeforeCut
function evt_onBeforeCut(){
	dijit.byId('box').destroy();
	createTextBox();
	dijit.byId('box').onCut=function(){
		alert('paste');
	}
	dijit.byId('box').onBeforeCut=function(){
		return false;
	}
	return "onBeforeCut返回为false,文本框现在不可剪切"
}





