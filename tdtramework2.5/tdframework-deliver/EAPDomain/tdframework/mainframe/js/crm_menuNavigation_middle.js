
var systemtreeStorePart;
var systemTreeRowSet;

var menuSystemID;

var menuSystemDifStorePart;

var newtreeStorePart;

var initStore = new unieap.ds.DataStore();

dataCenter.addDataStore(initStore);

dojo.rawXhrPost({
			url : APP_PATH + "/menuNavigation.do?method=getSystemNavigation",
			//parameters:{j_username: "SUPER", j_password: "super0"},
			sync : true,
			load : function(text, args) {
				try {
					//alert(text);
					var systemRowSet = eval("(" + text + ")");
					//alert(systemRowSet[0]["systemName"]);
					systemtreeStorePart = new unieap.ds.DataStore("systemStorePart",
							systemRowSet);
					dataCenter.addDataStore(systemtreeStorePart);
				} catch (e) {
					alert("初始化系统失败。");
				}
			}
		});
		
function sysClick(node) {
	//alert("===="+node.getData()["stmId"]+"++++");
	var sysNaviTree = unieap.byId('sysNaviTree');
	var ifChild = node.getData()["ifChild"];
	
	if (ifChild) {
        var sysId = node.getData()["stmId"];
        
		newtreeStorePart = dataCenter.getDataStore("newbasicTree" + sysId);
		if (newtreeStorePart == null) {
	        dojo.rawXhrPost({
				url : APP_PATH + "/menuNavigation.do?method=getMenuNavigation&systemId=" + sysId,
				//parameters:{j_username: "SUPER", j_password: "super0"},
				sync : true,
				load : function(text, args) {
					try {
						//alert(text);
						var newRowSet = eval("(" + text + ")");
						
						newtreeStorePart = new unieap.ds.DataStore("newbasicTree" + sysId,
								newRowSet);
								
						dataCenter.addDataStore(newtreeStorePart);
						menuSystemDifStorePart = newtreeStorePart.getRowSet();
					} catch (e) {
						alert("初始化系统菜单失败。");
					}
				}
			});
		}
		var menuTree = unieap.byId('menuNaviTree');
		var root = menuTree.getRootNode();
		if (newtreeStorePart.getRecordCount() != 0) {
			menuTree.getBinding().setDataStore(root, newtreeStorePart, null);
		} 
        var sysDrop = unieap.byId('sysDropDownBtn');
        sysDrop.setBtnText(node.getData()["stmName"]);
        //sysDrop.setBtnWidth(20);
        menuSystemID = sysId;
        root.refresh();
        var foc = dojo.byId('foc');
        dojo.style(foc,'display','block');
        foc.focus();
        dojo.style(foc,'display','none');

	} else {
		if (!node.isOpend()) {
			sysNaviTree.expandNode(node); 
		} else {
			sysNaviTree.collapseNode(node); 
		}
	}

}

function menuClick(node) {
	var menuName = node.getLabel();
	var menuUrl = node.getData()["pageLink"];
	var menuId = node.getData()["menuId"];
	var ifDiffContext = node.getData()["ifDiffContext"];
	var systemId = node.getData()["systemId"];
	var ifChild = node.getData()["ifChild"];
	
	var menuTree = unieap.byId('menuNaviTree');
	
	if (ifChild) {
		var url = menuUrl;
        url = dealLeaf(node);
        //alert("########### " + url);
		if (menuUrl.indexOf("/") == 0) {
			if (ifDiffContext == "1") {
				//alert("11111");
				url = url;
			} else {
				//alert("22222");
				url = APP_PATH + url;
			}
		} else {
			if (ifDiffContext == "1") {
				//alert("33333");
				url = "/"+url;
			} else {
				//alert("44444");
				url = APP_PATH +"/"+ url;
			}
		}
        //alert(url);
	    addTab(menuName, url, menuId, systemId);
	} else {
		if (!node.isOpend()) {
			menuTree.expandNode(node); 
		} else {
			menuTree.collapseNode(node); 
		}
	}
}

function inputSearchMenu() {
	
	var comBoxMenuNavi = unieap.byId('comboxMenuNavi');
	if (comBoxMenuNavi.getText() == dojo.byId('warningSearchMenu').value) {
		comBoxMenuNavi.setText("");
	}
	var comBoxMenuNavi = unieap.byId('comboxMenuNavi');
	dojo.style(comBoxMenuNavi.inputNode,'color','#000000');
	comBoxMenuNavi.focus();
}

function searchMenu() {

    if (menuSystemID == null || menuSystemID == "") {
    	return false;
    }
	var box = unieap.byId('comboxMenuNavi');
	var boxValue = box.getText();

	var menuTree = unieap.byId('menuNaviTree');
	var rowSet = menuSystemDifStorePart;

	var root = menuTree.getRootNode();

	if (boxValue == "" || boxValue == dojo.byId('warningSearchMenu').value) {

		newtreeStorePart.setRowSet(rowSet);
		menuTree.getBinding().setDataStore(root, newtreeStorePart, null);
		root.refresh();
		
	} else {

		var tempRowSet = new unieap.ds.RowSet();
		
		rowSet.forEachFilter(function(row) {
			
			var menuName = row.getData()["menuName"];
			var menuIsChild = row.getData()["ifChild"];
			var sysId = row.getData()["systemId"];
			if (menuName.indexOf(boxValue) != -1 && menuIsChild && sysId == menuSystemID) {
				
				var data = dojo.clone(row.getData());
				data["parentMenuId"] = "";
				tempRowSet.addRow(data, true, false);
				
			} else {
				
			}
		});
		newtreeStorePart.setRowSet(tempRowSet);
		menuTree.getBinding().setDataStore(root, newtreeStorePart, null);
		root.refresh();
	}
	var menuDrop = unieap.byId('menuDropDownBtn');
	menuDrop._closeDropDown();
	menuDrop._openDropDown();
    var foc = dojo.byId('foc');
    dojo.style(foc,'display','block');
    foc.focus();
    dojo.style(foc,'display','none');

}