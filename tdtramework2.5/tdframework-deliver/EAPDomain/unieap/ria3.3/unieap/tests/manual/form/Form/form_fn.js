//性别转义表
var sexStore=new unieap.ds.DataStore("sexStore",[{
	CODEVALUE:1,
	CODENAME:'男'
},{
	CODEVALUE:0,
	CODENAME:'女'
}]);

dataCenter.addDataStore(sexStore);

//form绑定的datastore
var ds=new unieap.ds.DataStore('demo',[{
	name:'张三',
	sex:1,
	address:'辽宁大连',
	birth:'1985-01-01'
},{
	name:'玛丽',
	sex:0,
	address:'美国福罗里达州',
	birth:'1990-01-01'
	
}]);

dataCenter.addDataStore(ds);

function animate(str){
	dojo.animateProperty({
		node:'info',
		properties:{
			backgroundColor:{
				start:'yellow',
				end:'white'
			}
		},
		duration:2000
	}).play();
	
	dojo.byId('info').innerHTML=str;
}

//清空控件的值
function clear(){
	form.clear();
	animate('Form控件的值被清空了');
}

//还原初始数据
function reset(){
	form.reset();
	animate("Form控件的值还原了")
}

//数据校验
function validate(){
	form.validate();
	animate("对Form控件下的控件进行校验")
}

//数据收集
function collectData(){
	var info=form.getHelper().collectData();
	animate("查看收集到的数据")
	unieap.debug(info);
}

//数据重新绑定

function bind(){
	var row=ds.getRowSet().getRow(1);
	if (form.getBinding().row.data == row.data) {
		form.getBinding().bind(ds.getRowSet().getRow(0));
	}
	else {
		form.getBinding().bind(row);
	}
	animate("Form重新进行了数据绑定")
}

//获取form绑定的datastore

function getDataStore(){
	var store=form.getBinding().getDataStore();
	animate("获得form绑定的datastore");
	unieap.debug(store)
}

//设置form的datastore

function setDataStore(){
	var row=ds.getRowSet().getRow(1);
	if (form.getBinding().row.data == row.data) {
		form.getBinding().setDataStore(ds,0)
	}
	else {
		form.getBinding().setDataStore(ds,1);
	}
	animate("重新设置了form绑定的datastore");
}

//判断form绑定的datastore是否被修改了

function isModified(){
	var modified=form.isModified();
	if(modified){
		animate("form绑定的datastore发生了变化");
	}else{
		animate("form绑定的datastore没有发生变化");
	}
}
