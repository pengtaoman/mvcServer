dojo.require("unieap.form.TextBox");

//属性测试
var test_attr = {
    id: 'attribute',
    init: createButton,
    test: [{
        summary: '显示button的显示值',
        title: 'label=\'你好\'',
        fun: attr_label,
        args: ['你好']
    },{
		summary:'配置Button的快捷键',
		title:"accessKey=j'",
		fun:attr_accessKey,
		args:['j']
	},{
		summary:'设置图标的css样式',
		title:'iconClass=icon1',
		fun:attr_iconClass,
		args:['icon-red']
		
	},{
		summary:'设置图标的css样式',
		title:'iconClass=icon2',
		fun:attr_iconClass,
		args:['icon-blue']
		
	},{
		summary:'设置高度',
		title:'height="40px"',
		fun:attr_height,
		args:['40px']
	}]
}

//控件方法测试
var test_fn = {
    id: 'fn',
    test: [{
		summary:'设置button的显示文本',
		title:'setLabel',
		fun:fun_setLabel,
		args:['test_setLabel']
	},{
		summary:'设置button的图标的css样式',
		title:'setIconClass',
		fun:fun_setIconClass,
		args:['icon-blue']
	},{
		summary:'设置button为disabled',
		title:'setDisabled',
		fun:fun_setDisabled,
		args:[]
	}]
}

//事件测试

var test_evt = {
    id: 'evt',
    test: [{
		summary:'button的onclick事件',
		title:'onclick',
		fun:evt_onClick
	}]
}

var test = [test_attr, test_fn, test_evt];



//////

function createButton(arg){
    var button = new unieap.form.Button(dojo.mixin({
		label:'测试Button',
        id: 'button'
    }, arg||{})).placeAt('widget');
}
function getButton(){
	return dijit.byId('button');
}
function destroyButton(){
	getButton().destroy();
}

/////////////////////////////属性测试////////////////////////////////////

function attr_label(label){
    destroyButton();
   	createButton({label:label});
    return "button显示值为'你好'";
}

function attr_accessKey(key){
	destroyButton();
   	createButton({accessKey:key,onClick:function(){
		alert('click me');
	}});
    return "按下"+(dojo.isFF?"Alt+Shift+":"Alt+")+key+",触发button的onclick事件,将弹出内容'click me'";
}

function attr_iconClass(name){
	destroyButton();
   	createButton({iconClass:name});
    return "显示的style为"+(name=='icon-red'?'红色图标':'蓝色图标');
}
function attr_height(h) {
	destroyButton();
	createButton({height:h});
	return "设置按钮高度为40px";
}
////////////////////////////////方法测试//////////////////////////////////////


function fun_setLabel(l){
	getButton().setLabel(l);
	return "button的显示值为"+l;
}

function fun_setIconClass(c){
	getButton().setIconClass(c);
	return "button图标显示的为一蓝色图标";
}

function fun_setDisabled() {
	getButton().setDisabled(!getButton().disabled);
	return "button被设置为disabled="+getButton().disabled;
}

/////////////////////////////////////事件测试/////////////////////////////////

//点击
function evt_onClick(){
    destroyButton();
    createButton({onClick:function(){
        alert('click me');
    }});
   
    return "点击button会出现click me"
}
