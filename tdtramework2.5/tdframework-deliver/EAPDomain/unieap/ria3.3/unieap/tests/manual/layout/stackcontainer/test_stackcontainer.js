var ds = new unieap.ds.DataStore('demo',[{attr_empno:'DEMO_123',attr_name:"姓名",attr_job:"软件开发工程师",attr_sal:'2345.67'}]);
dataCenter.addDataStore(ds);

function back(){
	unieap.byId('tsc').back();
	var selected=unieap.byId('tsc').getSelectedChild();
	if(!selected) return;
	if(selected.isFirstChild){
		unieap.byId('backBtn').setDisabled(true);
		!selected.isLastChild&&unieap.byId('forwardBtn').setDisabled(false);
	}else{
		unieap.byId('backBtn').setDisabled(false);
		unieap.byId('forwardBtn').setDisabled(false);
	}
}

function forward(){
	unieap.byId('tsc').forward({dc:dataCenter,title:"新增加的页面"});
	var selected=unieap.byId('tsc').getSelectedChild();
	if(!selected) return;
	if(selected.isLastChild){
		unieap.byId('forwardBtn').setDisabled(true);
		!selected.isFirstChild&&unieap.byId('backBtn').setDisabled(false);
	}else{
		unieap.byId('backBtn').setDisabled(false);
		unieap.byId('forwardBtn').setDisabled(false);
	}
}

function addChild(){
	var id = new Date().getTime()+'';
	unieap.byId('tsc').addChild(new unieap.layout.ContentPane({id:id,href:'demo.jsp'}),false);
}

function removeChild(){
	unieap.byId('tsc').removeChild(unieap.byId('tsc').getSelectedChild());
}

function removeChildByIndex(){
	unieap.byId('tsc').removeChild(1);
}

function removeChildByID(){
	unieap.byId('tsc').removeChild("FP");
}

function hide(){
	var isHidden = unieap.byId('tsc').isHidden();
	if(!isHidden){
		unieap.byId('tsc').hide();
	}
	
}

function show(){
	var isHidden = unieap.byId('tsc').isHidden();
	if(isHidden){
		unieap.byId('tsc').show();
	}
}

function change(){
	unieap.byId('tsc').setHeight("250px");
	unieap.byId('tsc').setWidth("500px");
}

function selectChild(){
	unieap.byId('tsc').selectChild("SP",{title:"隐藏当前，显示指定"});
}