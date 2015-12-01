dojo.addOnLoad(function() {

});

var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
function createTab() {
	
	var parentTdHeight = parent.parent.getTdTabHeight();
	//alert(parentTdHeight);
	new unieap.tdextend.layout.crm_TabContainer_middle({
		id : 'createTab',
		style : {
			width : '100%',
			height : parentTdHeight-parentTdHeight*0.01
		}
	}).placeAt(dojo.byId('getTabButton'), 'after').startup();

}


function getSelectTab() {

	var mainContainer = unieap.byId('createTab');

	return mainContainer.getSelectedTab();

}

function addTab(tabTitle, tabHref, menuId, systemId) {

	var mainContainer = unieap.byId('createTab');
	if (mainContainer == null) {
		parent.frames("subframe").addTab(tabTitle, tabHref, menuId, systemId);
		return;
	}
	
	var children = mainContainer.getChildrenContainer();
	
	for ( var i = 0; i < children.length; i++) {
		var paneUrl = children[i].href;
		if (paneUrl == tabHref) {
			mainContainer.selectChild(children[i]);
			return;
		}
	}
	var cp = new unieap.layout.ContentPane({
		title : tabTitle,
		closable : "true",
		href : tabHref,
		menuId : menuId,
		systemId : systemId
	});

	unieap.byId('createTab').addChild(cp);
	var btn=unieap.byId('menuDropDownBtn');

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
	if (t && t.selectedChildWidget)
		alert("id :" + t.selectedChildWidget.id + "\r\ntitle :"
				+ t.selectedChildWidget.title)

}

function menuNaviBtn(btn) {
	
	var comBoxMenuNavi = unieap.byId('comboxMenuNavi');

	comBoxMenuNavi.setText("请输入搜索内容"); 
	//alert(document.getElementsByName("comboxMenuNaviInput")[0].style.font);
	dojo.style(comBoxMenuNavi.inputNode,'color','#cccccc');
}
