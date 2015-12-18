//dojo.addOnLoad(function() {
//
//});

//var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
var APP_PATH = getcontext();
function createTab() {
	//alert(parent.getTdTabHeight());
	var parentTdHeight = parent.getTdTabHeight();
	new unieap.tdextend.layout.TabContainer({
		id : 'createTab',
		style : {
			width : '100%',
			height : parentTdHeight - 2
		}
	}).placeAt(dojo.byId('getTabButton'), 'after').startup();
	
}


function getSelectTab() {

	var mainContainer = unieap.byId('createTab');

	return mainContainer.getSelectedTab();

}

function addTab(tabTitle, tabHref, menuId, systemId, isFirstPage, isReflesh) {
	var mainContainer = unieap.byId('createTab');
	var children = mainContainer.getChildrenContainer();
	if (children.length > 5) {
		mainContainer.removeChild(children[0]);
	}
	
	for ( var i = 0; i < children.length; i++) {
		//var paneUrl = children[i].href;
		//alert(children[i]["menuId"]);
		var paneMenuId = children[i]["menuId"];
		if (paneMenuId == menuId) {
			mainContainer.selectChild(children[i]);
			if (isReflesh) {
				children[i].setHref(tabHref);
			}
			return;
		}
	}

	var cp;
	if (!isFirstPage) {
		cp = new unieap.layout.ContentPane({
			title : tabTitle,
			closable : "true",
			href : tabHref,
			menuId : menuId,
			systemId : systemId
		});
		
	} else {
		cp = new unieap.layout.ContentPane({
			title : tabTitle,
			closable : "true",
			href : tabHref,
			menuId : menuId,
			onShow: disMouse,
			systemId : systemId//,
			//onClose : function() {var ifWin = this.getContentWindow();ifWin.onbeforeunload_handler(); return true;}
		});
		
	}
    
	unieap.byId('createTab').addChild(cp);
	var btn=unieap.byId('menuDropDownBtn');
}

function disMouse() {
	
}

function showColCon(panel) {
	//alert("showColCon!!!!!!!!!!!");
	var ifWin = panel.getContentWindow();
	ifWin.onbeforeunload_handler();
}

function removeTab() {
	var t = unieap.byId('createTab');
	var c = t.getChildren();
	var n = Math.ceil(Math.random() * (c.length - 1));
	if (c[n]) {
		t.removeChild(c[n]);
	}
}

function getTab() {
	var t = unieap.byId('createTab');
	//if (t && t.selectedChildWidget)
		//alert("id :" + t.selectedChildWidget.id + "\r\ntitle :"
		//		+ t.selectedChildWidget.title)

}

function menuNaviBtn(btn) {
	var comBoxMenuNavi = unieap.byId('comboxMenuNavi');
	comBoxMenuNavi.setText("请输入搜索内容"); 
	//alert(document.getElementsByName("comboxMenuNaviInput")[0].style.font);
	dojo.style(comBoxMenuNavi.inputNode,'color','#cccccc');
	var sysDropButtonDomain = unieap.byId('sysDropDownBtn');
	//
	if (sysDropButtonDomain.getBtnText().indexOf('功能导航')!=-1) {
	    sysDropButtonDomain.setBtnText('请选择系统');

	}

}
function addSystemMenu() {
	//alert("AAAAAA1111");
	var menu = new unieap.menu.Menu({id:"systemMenu"});
	menu.addChild(new unieap.menu.MenuItem(
			{//id:'menuItemFavo',
			 label:'aaaaa',
			 onClick:function(e){alert("AAAAAA");},
			 menuId:'sysysysy'}));
    //var dropBtn=new unieap.form.DropDownButton({label:'',conClass:'newBtn',id:'favoDorp',dropDown:menu});
	var favoMenu = unieap.byId("menuDropDownBtn");
	//dropBtn.placeAt("favoMenu");
	menu.bindDomNode(favoMenu);
	menu._openPopup();

}

function showSubMenu(label,evt) {
	//alert("label  : " + label);
	var menuDropDownBtn = unieap.byId("menuDropDownBtn");
	menuDropDownBtn._processDropDown();
	
}
