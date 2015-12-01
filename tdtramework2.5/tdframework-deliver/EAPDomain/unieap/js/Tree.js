/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ �ű������� ���Ϳؼ�Tree�õ�Js��
+ ��    ���� ��� lixiangyu@neusoft.com
+ �޸������� 2003-05-01�������� shaosl@neusoft.com
+            ��CommonTree��SelectTree�ϲ����������ʽ����
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * ������ֻ����
 */
function CommonTree() {

	//��ʼ��
	this.init = function(treeName) {
		var xmlData = document.all(treeName).documentElement;

		var divTree = document.all("div_tree_" + treeName);

		//��Ӷ�onNodeSelecting�¼��Ĵ���
		divTree.onNodeSelecting = function() {
			//��ʾ�˵���Ӧ�Ĺ���ҳ��
			showContent(event.treenode);
		}

		loadSubMenu(divTree, xmlData, divTree.getRootNode());
	}


	//�����Ӳ˵�
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

			//����ڵ�û���ƶ���ʾҳ�棬û�����ӣ�����ʾ�»���
			if(oTreeNodeInitInfo.data==null)
			//����û���»���
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
			divTree.insertNode(oParentNode, oTreeNode);

			if (oXMLNodes[i].nodeName == "Tree") {
				//����û���»���
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
				//�ݹ�
				loadSubMenu(divTree, oXMLNodes[i], oTreeNode);
			}
		}

	}


	//���ڵ���˵���Ĵ���
	function showContent(oTreeNode) {
		var sLinkName = oTreeNode.data;

		if ( (sLinkName==null) || (sLinkName == "") )
			return;

		//��ʾ�˵����Ӧ������
		window.open(sLinkName);
	}

}


/**
 * ������ѡ����
 */
function SelectTree() {

	//��ʼ��
	this.init = function(treeName) {
		var xmlData = document.all(treeName).documentElement;

		var divTree = document.all("div_tree_" + treeName);

		//��Ӷ�onNodeSelecting�¼��Ĵ���
		divTree.onNodeSelecting = function() {
			//��ʾ�˵���Ӧ�Ĺ���ҳ��
			showContent(event.treenode);
		}

		//����onNodeCheckboxClick�¼���ע�⣺���¼�����ʱ����δʹ��ѡ��״̬�ı䡣
		divTree.onNodeChecked = function() {
			//�����ӽڵ�ĸ�ѡ��ѡ������
			var oChildNodes = event.treenode.childNodes;
			for (var i=0; i<oChildNodes.length; i++) {
				divTree.checkedNode(oChildNodes[i], event.treenode.checked);

			}
		}

		loadSubMenu(divTree, xmlData, divTree.getRootNode());
	}


	//�����Ӳ˵�
	function loadSubMenu(divTree, xmlData, oParentNode) {
		var oXMLNodes = xmlData.childNodes;
		var strMenuID, strMenuLabel, strMenuTitle, strLinkName;
		for (var i=0; i<oXMLNodes.length; i++) {
			strMenuID = oXMLNodes[i].selectSingleNode("@id").text;
			strMenuLabel = oXMLNodes[i].selectSingleNode("@label").text;
			strMenuTitle = oXMLNodes[i].selectSingleNode("@title").text;
                        //modified by jiangby 2003-07-23
// ԭʼ����
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

			//��ʾcheckbox��
			oTreeNodeInitInfo.hasCheckbox = true;
	        	oTreeNodeInitInfo.checked = strMenuCheckedValue ;


			var oTreeNode = divTree.createNode(oTreeNodeInitInfo);

			//����ڵ�û���ƶ���ʾҳ�棬û�����ӣ�����ʾ�»���
			if(oTreeNodeInitInfo.data==null)
			//����û���»���
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
			divTree.insertNode(oParentNode, oTreeNode);

			if (oXMLNodes[i].nodeName == "Tree") {
				//����û���»���
				oTreeNode.htmlContainer.all.tags("SPAN")[1].style.borderBottom = "none";
				//�ݹ�
				loadSubMenu(divTree, oXMLNodes[i], oTreeNode);
			}
		}

	}

	//���ڵ���˵���Ĵ���
	function showContent(oTreeNode) {
		var sLinkName = oTreeNode.data;

		if ( (sLinkName==null) || (sLinkName == "") )
			return;

		//��ʾ�˵����Ӧ������
		window.open(sLinkName);
	}

}

