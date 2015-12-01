/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ 脚本描述： 轻型控件Tree用到Js库
+ 创    建： 李降宇 lixiangyu@neusoft.com
+ 修改履历： 2003-05-01，邵树力 shaosl@neusoft.com
+            将CommonTree和SelectTree合并，以类的形式存在
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * 类名：只读树
 */
function CommonTree() {

	//初始化
	this.init = function(treeName) {
		var xmlData = document.all(treeName).documentElement;

		var divTree = document.all("div_tree_" + treeName);

		//添加对onNodeSelecting事件的处理
		divTree.onNodeSelecting = function() {
			//显示菜单对应的功能页面
			showContent(event.treenode);
		}

		loadSubMenu(divTree, xmlData, divTree.getRootNode());
	}


	//载入子菜单
	function loadSubMenu(divTree, xmlData, oParentNode) {
		var oXMLNodes = xmlData.childNodes;
		var strMenuID, strMenuLabel, strMenuTitle, strLinkName;
		for (var i=0; i<oXMLNodes.length; i++) {
			strMenuID = oXMLNodes[i].selectSingleNode("@id").text;
			strMenuLabel = oXMLNodes[i].selectSingleNode("@label").text;
			strMenuTitle = oXMLNodes[i].selectSingleNode("@title").text;
			if (oXMLNodes[i].selectSingleNode("@link") != null)
				strLinkName = oXMLNodes[i].selectSingleNode("@link").text;
			else
				strLinkName = null;

			var oTreeNodeInitInfo = divTree.newNodeInitInfo(strMenuID, strMenuLabel, strMenuTitle, null, strLinkName);
			if (oXMLNodes[i].nodeName == "TreeNode") {
				oTreeNodeInitInfo.isLeaf = true;
				oTreeNodeInitInfo.imgSelect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_leaf_select.gif";
				oTreeNodeInitInfo.imgUnselect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_leaf_unselect.gif";
			} else {
				oTreeNodeInitInfo.imgSelect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_branch_select.gif";
				oTreeNodeInitInfo.imgUnselect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_branch_unselect.gif";
			}

			var oTreeNode = divTree.createNode(oTreeNodeInitInfo);

			//如果节点没有制定显示页面，没有链接，则不显示下滑线
			if(oTreeNodeInitInfo.data==null)
			//设置没有下划线
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
			divTree.insertNode(oParentNode, oTreeNode);

			if (oXMLNodes[i].nodeName == "Tree") {
				//设置没有下划线
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
				//递归
				loadSubMenu(divTree, oXMLNodes[i], oTreeNode);
			}
		}

	}


	//对于点击菜单项的处理
	function showContent(oTreeNode) {
		var sLinkName = oTreeNode.data;

		if ( (sLinkName==null) || (sLinkName == "") )
			return;

		//显示菜单项对应的内容
		window.open(sLinkName);
	}

}


/**
 * 类名：选择树
 */
function SelectTree() {

	//初始化
	this.init = function(treeName) {
		var xmlData = document.all(treeName).documentElement;

		var divTree = document.all("div_tree_" + treeName);

		//添加对onNodeSelecting事件的处理
		divTree.onNodeSelecting = function() {
			//显示菜单对应的功能页面
			showContent(event.treenode);
		}

		//处理onNodeCheckboxClick事件。注意：该事件触发时，尚未使复选框状态改变。
		divTree.onNodeChecked = function() {
			//设置子节点的复选框选中属性
			var oChildNodes = event.treenode.childNodes;
			for (var i=0; i<oChildNodes.length; i++) {
				divTree.checkedNode(oChildNodes[i], event.treenode.checked);

			}
		}

		loadSubMenu(divTree, xmlData, divTree.getRootNode());
	}


	//载入子菜单
	function loadSubMenu(divTree, xmlData, oParentNode) {
		var oXMLNodes = xmlData.childNodes;
		var strMenuID, strMenuLabel, strMenuTitle, strLinkName;
		for (var i=0; i<oXMLNodes.length; i++) {
			strMenuID = oXMLNodes[i].selectSingleNode("@id").text;
			strMenuLabel = oXMLNodes[i].selectSingleNode("@label").text;
			strMenuTitle = oXMLNodes[i].selectSingleNode("@title").text;
                        //modified by jiangby 2003-07-23
// 原始程序
//			if (oXMLNodes[i].selectSingleNode("@link") != null)
//				strLinkName = oXMLNodes[i].selectSingleNode("@link").text;
//			else
//				strLinkName = null;
                        strMenuLink =oXMLNodes[i].selectSingleNode("@link");
                        strMenuChecked =oXMLNodes[i].selectSingleNode("@isChecked");
                        if (strMenuLink!=null) {
                           strLinkName = strMenuLink.text;
                        } else {
	                   strLinkName = null;
                        }
                        if (strMenuChecked!=null) {
                           strMenuCheckedValue = strMenuChecked.text;
//                           alert(strMenuLabel+">>>"+strMenuCheckedValue);
                        } else {
                           strMenuCheckedValue = null;
                        }
                        //modified end.
			var oTreeNodeInitInfo = divTree.newNodeInitInfo(strMenuID, strMenuLabel, strMenuTitle, null, strLinkName,strMenuCheckedValue);
			if (oXMLNodes[i].nodeName == "TreeNode") {
				oTreeNodeInitInfo.isLeaf = true;
				oTreeNodeInitInfo.imgSelect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_leaf_select.gif";
				oTreeNodeInitInfo.imgUnselect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_leaf_unselect.gif";
			} else {
				oTreeNodeInitInfo.imgSelect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_branch_select.gif";
				oTreeNodeInitInfo.imgUnselect = unieap.WEB_APP_NAME + "/images/unieap/tree/tree_branch_unselect.gif";
			}

			//显示checkbox树
			oTreeNodeInitInfo.hasCheckbox = true;
	        	oTreeNodeInitInfo.checked = strMenuCheckedValue ;


			var oTreeNode = divTree.createNode(oTreeNodeInitInfo);

			//如果节点没有制定显示页面，没有链接，则不显示下滑线
			if(oTreeNodeInitInfo.data==null)
			//设置没有下划线
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
			divTree.insertNode(oParentNode, oTreeNode);

			if (oXMLNodes[i].nodeName == "Tree") {
				//设置没有下划线
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
				//递归
				loadSubMenu(divTree, oXMLNodes[i], oTreeNode);
			}
		}

	}

	//对于点击菜单项的处理
	function showContent(oTreeNode) {
		var sLinkName = oTreeNode.data;

		if ( (sLinkName==null) || (sLinkName == "") )
			return;

		//显示菜单项对应的内容
		window.open(sLinkName);
	}

}

