var systemtreeStorePart;
var systemTreeRowSet;
var menuSystemID;
var menuSystemDifStorePart;
var newtreeStorePart;
var initStore = new unieap.ds.DataStore();
dataCenter.addDataStore(initStore);
var APP_PATH = parent.getcontext();

function getSysNavi() {
    dojo.rawXhrPost({
			url : APP_PATH + "/menuNavigation.do?method=getSystemNavigation",
			//parameters:{j_username: "SUPER", j_password: "super0"},
			sync : false,
			load : function(text, args) {
				try {
					var systemRowSet = eval("(" + text + ")");
					systemtreeStorePart = new unieap.ds.DataStore("systemStorePart",
							systemRowSet);
					dataCenter.addDataStore(systemtreeStorePart);
				    var tree = new unieap.tree.Tree({
						 	id:"sysNaviTree",
						 	style:'height: 385px;overflow-x: hidden; overflow-y: auto',
						 	onClick:sysClick,
						 	binding:{'leaf':'ifChild','id':'stmId','store':systemtreeStorePart,'label':'stmName','parent':'parentStmId',query:{name:'parentStmId',relation:'=',value:'PSYSK'}}
						 });
					tree.placeAt('sysNaviDiv');
				} catch (e) {
					console.log("初始化系统失败。" + e);
				}
			}
		});
}
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
				sync : false,
				load : function(text, args) {
					try {
						//alert(text);
						var newRowSet = eval("(" + text + ")");
						
						newtreeStorePart = new unieap.ds.DataStore("newbasicTree" + sysId,
								newRowSet);
								
						dataCenter.addDataStore(newtreeStorePart);
						menuSystemDifStorePart = newtreeStorePart.getRowSet();

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
					} catch (e) {
						parent.document.getElementById("favoSub").src=APP_PATH + "/tdframework/mainframe/session_invalid.jsp";
					}
				}
			});
		} else {
			try {
				dataCenter.addDataStore(newtreeStorePart);
				menuSystemDifStorePart = newtreeStorePart.getRowSet();

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
			} catch (e) {
				parent.document.getElementById("favoSub").src=APP_PATH + "/tdframework/mainframe/session_invalid.jsp";
			}
		}
        
	} else {
		if (!node.isOpend()) {
			sysNaviTree.expandNode(node); 
		} else {
			sysNaviTree.collapseNode(node); 
		}
	}

}

function menuClick(node, reflashFlag) {
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
				if (url.indexOf("http")>-1) {
					//do nothing
				} else {
				    url = "/"+url;
				}
			} else {
				//alert("44444");
				url = APP_PATH +"/"+ url;
			}
		}
		if (reflashFlag) {
			addTab(menuName, url, menuId, systemId, false, true);
		} else {
	        addTab(menuName, url, menuId, systemId);
		}
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
		comBoxMenuNavi.setValue("");
		//alert( "????????????");
	}
	//var comBoxMenuNavi = unieap.byId('comboxMenuNavi');
	dojo.style(comBoxMenuNavi.inputNode,'color','#000000');
	comBoxMenuNavi.focus();
	//var dropBtn = unieap.byId('menuDropDownBtn');
	//dropBtn.onArrowClick();
}

function searchMenu() {

	var box = unieap.byId('comboxMenuNavi');
	var boxValue = box.getText();
	//box.setValue(boxValue);
	var menuTree = unieap.byId('menuNaviTree');
	var rowSet = menuSystemDifStorePart;

	var root = menuTree.getRootNode();
    //alert("??????  " + boxValue);
	if (boxValue == "" || boxValue == dojo.byId('warningSearchMenu').value) {
        if (rowSet && rowSet != null) {
			newtreeStorePart.setRowSet(rowSet);
			menuTree.getBinding().setDataStore(root, newtreeStorePart, null);
			root.refresh();
        } else {
        	return false;
        }
	} else {
        /*
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
	    */
		 dojo.rawXhrPost({
				url : APP_PATH + "/menuNavigation.do?method=getMenuForSearch&searchKey=" + boxValue,
				//parameters:{j_username: "SUPER", j_password: "super0"},
				sync : true,
				load : function(text, args) {
					try {
						var newRowSet = eval("(" + text + ")");
						var menuStoreForSearch = new unieap.ds.DataStore("menuStoreForSearch",
								newRowSet);
						var rowSet01 = menuStoreForSearch.getRowSet();
						var tempRowSet01 = new unieap.ds.RowSet();
						rowSet01.forEachFilter(function(row) {
							var menuName = row.getData()["menuName"];
							var menuIsChild = row.getData()["ifChild"];
							var sysId = row.getData()["systemId"];
							var data = dojo.clone(row.getData());
							data["parentMenuId"] = "";
							tempRowSet01.addRow(data, true, false);
	
						});
						menuStoreForSearch.setRowSet(tempRowSet01);
						menuTree.getBinding().setDataStore(root, menuStoreForSearch, null);
						root.refresh();
					} catch (e) {
						parent.document.getElementById("favoSub").src=APP_PATH + "/tdframework/mainframe/session_invalid.jsp";
					}
				}
			});
	}
	return false;
}