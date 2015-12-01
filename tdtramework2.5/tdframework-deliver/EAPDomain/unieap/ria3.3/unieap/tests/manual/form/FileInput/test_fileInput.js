dojo.require("unieap.form.FileInput");
var test_attr={
	id:'attribute',
	test:[{
		summary:'设置上传、取消标签',
		title:"label='Up',cancelText='No'",
		fun:attr_label
	},{
		summary:'限制上传的文件',
		title:'fileFilter:\"jpg,png,doc\"',
		fun:attr_filter
	}]
}

var test_fn={
	id:'fn',
	init:createFileInput,
	test:[{
		summary:'获得文件全路径',
		title:'getFullPath',
		fun:fn_getFullPath
	},{
		summary:'获得文件的名称',
		title:'getFileName',
		fun:fn_getFileName
	}]
}

var test_evt={
	id:'evt',
	test:[{
		summary:'点击取消回调事件',
		title:'onBeforeCancel=function(){return false}',
		fun:evt_onBeforeCancel
	}]
}

var test=[test_attr,test_fn,test_evt];

////////////////////////////////////属性测试///////////////////////////////

//删除按钮label设置
function attr_label(){
	dijit.byId('file').destroy();
	dojo.empty('widget');
	var file=new unieap.form.FileInput({
		id:'file',
		label:'Up',
		cancelText:'No',
		width:'500px'
	});
	file.placeAt('widget');
	return "上传按钮显示为Up,取消按钮显示为No"
	
}

//限制文件的后缀名

function attr_filter(){
	dijit.byId('file').destroy();
	dojo.empty('widget');
	var file=new unieap.form.FileInput({
		id:'file',
		fileFilter:'jpg,png,doc',
		width:'500px'
	});
	file.placeAt('widget');
	return "只能上传jpg、png以及doc文件"
}

/////////////////////////方法测试/////////////////////////////////////////

function createFileInput(){
	var file=new unieap.form.FileInput({
		id:'file',
		width:'500px'
	})
	file.placeAt('widget');
}

//获得文件全路径
function fn_getFullPath(){
	dijit.byId('file')&&dijit.byId('file').destroy();
	createFileInput();
	var file=dijit.byId('file');
	if(dijit.byId('btn')){
		dijit.byId('btn').destroy();
	}
	var btn=new unieap.form.Button({
		id:'btn',
		label:'获得全路径',
		onClick:function(){
			alert("文件的全路径为: "+file.getFullPath())	;
		}
	})
	btn.placeAt('widget');
	return "可以获得文件的全路径"
}

//获得文件名称
function fn_getFileName(){
	dijit.byId('file')&&dijit.byId('file').destroy();
	createFileInput();
	var file=dijit.byId('file');
	if(dijit.byId('btn')){
		dijit.byId('btn').destroy();
	}
	var btn=new unieap.form.Button({
		id:'btn',
		label:'文件名称',
		onClick:function(){
			alert("文件的名称: "+file.getFileName())	;
		}
	});
	btn.placeAt('widget');

	return "可以获得文件的名称"
	
}

///////////////////////////////////事件测试///////////////////////////////

function evt_onBeforeCancel(){
	dijit.byId('file').destroy();
	dojo.empty('widget');
	var file=new unieap.form.FileInput({
		id:'file',
		width:'500px',
		onBeforeCancel:function(){
			alert('点击取消按钮前触发');
			return false;
		}
	})
	file.placeAt('widget');
	return "点取消按钮无法清空"
}
