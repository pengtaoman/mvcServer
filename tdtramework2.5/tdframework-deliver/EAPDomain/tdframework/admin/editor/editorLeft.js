//var APP_PATH = document.getElementsByTagName("contextPath")[0].value;

var APP_PATH = getcontext();
var editMenuStorePart;
//alert(APP_PATH);

dojo.rawXhrPost({
			url : APP_PATH + "/FavoriteHandler.do?method=getEditorLeft",
			sync : true,
			load : function(text, args) {
				try {
					//alert(text);
					var editMenuRowSet = eval("(" + text + ")");
					//alert(systemRowSet[0]["systemName"]);
					editMenuStorePart = new unieap.ds.DataStore("editMenuStorePart",
							editMenuRowSet);
					dataCenter.addDataStore(editMenuStorePart);
				} catch (e) {
					alert(e);
				}
			}
		});
		

function editorClick(node) {
	var menuName = node.getLabel();
	var menuUrl = node.getData()["pageLink"];
	var menuId = node.getData()["menuId"];
	var ifDiffContext = node.getData()["ifDiffContext"];
	var systemId = node.getData()["systemId"];
	var ifChild = node.getData()["ifChild"];
	
	var editorNaviTree = unieap.byId('editorNaviTree');
	
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
				if (url.indexOf("http") < 0){
				url = APP_PATH +"/"+ url;
				}
			}
		}

		parent.frames['editorContent'].location.href=url;
	} else {
		if (!node.isOpend()) {
			editorNaviTree.expandNode(node); 
		} else {
			editorNaviTree.collapseNode(node); 
		}
	}
}
