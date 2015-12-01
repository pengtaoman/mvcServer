<!--

var treeData = null;
defaultImageURL = "pages/purview/images/";

img01 = new Image();
img02 = new Image();

function Collection()
{
	this.length = 0;
	this.add = add;
	return this;
}

function add(obj)
{
	this[this.length ++] = obj;
}

function RootNode(id, name, icon)
{
	this.id   = id;
	this.name = name;
	this.icon = icon;
	this.type = 'root';
	return this;
}

/**
 * type: folder/leaf
 */
function TreeNode(id, parent, name, icon, rightflag,
				  view, viewapp, type, childrenNum,isPagePurviewSet,location)
{
	this.id        = id;
	this.parent    = parent;
	this.name      = name;
	this.icon      = icon;
	this.rightflag = rightflag;
	this.view      = view;
	this.viewapp   = viewapp;
	this.type      = type;
	this.childrennum=childrenNum;
	this.open      = 0;
	this.line = new Collection();
	this.addline = addline;
	this.nodeline = new Collection();
	this.addnodeline = addnodeline;
	this.isPagePurviewSet = isPagePurviewSet;
	this.location = location;
	return this;
}

function addline(obj)
{
	this.line.add(obj);
}

function addnodeline(obj)
{
	this.nodeline.add(obj);
}
///////////////////////////////////////////////////////////////////////////////
function indexOfNode(id)
{
	var currentIndex = 0;
	while (currentIndex < treeData.length)
	{
		if (treeData[currentIndex].type == 'root' || treeData[currentIndex].type == 'folder')
		{
			if (treeData[currentIndex].id == id)
			{
				return currentIndex;
			}
		}
		currentIndex ++;
	}
	return -1;
}

function indexOfLeaf(id)
{
	var currentIndex = 0;
	while (currentIndex < treeData.length)
	{
		if (treeData[currentIndex].type == 'leaf')
		{
			if (treeData[currentIndex].id == id)
			{
				return currentIndex;
			}
		}
		currentIndex ++;
	}
	return -1;
}

function extractChildrenOf(node)
{
	var children = new Collection();
	var currentIndex = 0;
	while (currentIndex < treeData.length)
	{
		if (treeData[currentIndex].parent == node)
		{
			children.add(treeData[currentIndex]);
		}
		currentIndex ++;
	}
	return children;
}

// toggleFolder() - open / close folder nodes
function toggleFolder(id)
{
	var nodeIndex = indexOfNode(id);
	var ptNode = treeData[nodeIndex];
	var status = 1 - ptNode.open;
	var tmpImgObj = eval("document.folderimg" + id);

	treeData[nodeIndex].open = status;

	var disProp = (status == 1 ? "block" : "none");
	tmpImgObj.src = defaultImageURL + ptNode.nodeline[status];
	tmpImgObj.title = (status == 1 ? "关闭" : "展开");

	var children = new Collection();
	children = extractChildrenOf(id);
	for (var i = 0; i < children.length; i ++)
	{	
	  	//alert(children[i].id);
	  	eval("document.all.div" + children[i].id).style.display = disProp;
			
	}
}

///////////////////////////////////////////////////////////////////////////////
function start()
{
	loadData();	// load the tree data;

	if (treeData.length == 0)
	{
		return;
	}
	drawTree();
	initDisplay();
}

function initDisplay()
{
	var divObj;
   	for (var i = 0; i < treeData.length; i ++)
	{
		if (treeData[i].parent == treeData[0].id)
		{
			divObj = eval("document.all.div" + treeData[i].id);
			divObj.style.display = "block";
		}
	}
}

function drawTree()
{
	document.write("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"T_song12\"><tr><td class=\"T_song12_bt\">");
	document.write("<img src=\"" + defaultImageURL + treeData[0].icon
					+ "\" align=\"absmiddle\" border=\"0\" title=\"应用根节点\">"
					+"<input type=\"text\" name=\"rootname\" value=\""
					+treeData[0].name +"\" size=\"30\"  class=\"bg_input\" readonly>"
					+"<br>\n</td></tr><tr><td>");
	drawBranch(treeData[0].id);
	document.write("</table>");
}

function drawBranch(startNode)
{
	var children = new Collection();
	children = extractChildrenOf(startNode);

	var msg = "";
	var i   = 0;
	var n   = 0;
	var strBuf = "";
	var icon = "";
	var ptNode;
	var ptType;
	for (var currentIndex = 0; currentIndex < children.length; currentIndex ++)
	{
	
	
	  
		ptNode = children[currentIndex];
		document.write("\n<div valign='middle' id=\"div" + children[currentIndex].id + "\" style=\"display:none;Height:16\">");
		icon = ptNode.icon;

		for (i = 0; i < ptNode.line.length; i ++)
		{
			document.write("<img src='" + defaultImageURL + ptNode.line[i] + "' align=\"absmiddle\" border=\"0\">");
		}
		if (ptNode.nodeline.length == 1)
		{
			document.write("<img src='" + defaultImageURL + ptNode.nodeline[0] + "' name='folderimg" + ptNode.id + "' align=\"absmiddle\" border=\"0\">");
		}
	    else
	    {
	    	strBuf = "toggleFolder('" + ptNode.id + "')";
	    	n = ptNode.open;
	    	msg = (n == 1 ? "关闭" : "展开");
		    document.write("<a href=\"JavaScript:" + strBuf + "\"><img src='" + defaultImageURL + ptNode.nodeline[n] + "' name='folderimg" + ptNode.id + "' align=\"absmiddle\" title='" + msg + "' border=\"0\"></a>");
	    }

	    ptType = ptNode.type;

	    if (ptNode.rightflag == 0)
	    {
	    	msg = ptType =="leaf" ? "无访问权限" : "无该节点所有子节点的访问权限";
	    }
		else if (ptNode.rightflag == 1)
		{
			msg = ptType =="leaf" ? "具有访问权限" : "具有该节点所有子节点的访问权限";
		}
		else if (ptNode.rightflag == 2)
		{
			msg = ptType =="leaf" ? "该节点无对应视图" : "该节点所有子节点无对应视图";
		}
	    document.write("<img src='" + defaultImageURL + ptNode.icon + "' name='orgimg" + ptNode.id + "' title='" + msg + "' align=\"absmiddle\" border=\"0\">");
	    if(ptNode.isPagePurviewSet==true){//ptNode.isPagePurviewSet==true) 
		    if (ptNode.type=='folder')
		    {
		    	if (ptNode.rightflag == 0)
		    	{
	    			document.write("<input type='checkbox' id='" + ptNode.id + "' parent='"+ptNode.parent+"' name='viewfolder" + ptNode.id + "' style='height:16' onclick='changeRightForFolder(\""+ptNode.id+"\")'>");
	    		}
	    		else if (ptNode.rightflag == 1)
	    		{
	    			document.write("<input type='checkbox' id='" + ptNode.id + "' parent='"+ptNode.parent+"' name='viewfolder" + ptNode.id + "' style='height:16' checked onclick='changeRightForFolder(\""+ptNode.id+"\")'>");
	    		}
		    }
			else
			{
			    if (ptNode.rightflag == 0)
			    {
			    	document.write("<input type='checkbox' id='" + ptNode.id + "' parent='"+ptNode.parent+"' name='viewrolemap" + ptNode.id + "' style='height:16' onclick='changeRightForLeaf(\""+ptNode.id+"\")'>");
			    }
				else if (ptNode.rightflag == 1)
				{
					document.write("<input type='checkbox' id='" + ptNode.id + "' parent='"+ptNode.parent+"' name='viewrolemap" + ptNode.id + "' style='height:16' checked onclick='changeRightForLeaf(\""+ptNode.id+"\")'>");
				}
		    }
		 }	    	  
	    //{ 
	   
	    //document.write("<a href = JavaScript:openPermissionJsp('"+ptNode.location+"') >");	  
	    //}
	    document.write(ptNode.name);
	    document.write("</a>")
	    if (ptNode.childrennum > 0)
	    	drawBranch(ptNode.id);

	    document.write("\n</div>");
	}
}

function changeRight(nodeID)
{
	var nodeIndex = indexOfLeaf(nodeID);
	var tmpImg = eval("document.orgimg" + nodeID);
	var node = treeData[nodeIndex];

	changeLeafRightOnly(node, node.rightflag == 0);
	rearrangeimage(nodeIndex);
}

function changeLeafRightOnly(ptNode, bflag)
{
	if (ptNode.rightflag > 1)
	{
		return;
	}
	var tmpImg = eval("document.orgimg" + ptNode.id);
	if (bflag)
	{
		ptNode.rightflag = 1;
		ptNode.icon = img01.src;
		tmpImg.src = img01.src;
		tmpImg.title = "具有访问权限";
	}
	else
	{
		ptNode.rightflag = 0;
		ptNode.icon = img02.src;
		tmpImg.src = img02.src;
		tmpImg.title = "无访问权限";
	}
}

function changeLeafCheckOnly(ptNode, bflag)
{
	if (ptNode.rightflag > 1)
		return;
	var chkObj = eval("document.all.viewrolemap" + ptNode.id);
	if (chkObj != null)
		chkObj.checked = bflag;
}

function changeFolderRightOnly(ptNode, bflag)
{
	if (ptNode.rightflag > 1)
	{
		return;
	}
	var tmpImg = eval("document.orgimg" + ptNode.id);
	if (bflag)
	{
		ptNode.rightflag = 1;
		ptNode.icon = img01.src;
		tmpImg.src = img01.src;
		tmpImg.title = "具有该节点所有子节点的访问权限"
	}
	else
	{
		ptNode.rightflag = 0;
		ptNode.icon = img02.src;
		tmpImg.src = img02.src;
		tmpImg.title = "无该节点所有子节点的访问权限"
	}
}

function changeFolderCheckOnly(ptNode, bflag)
{
	if (ptNode.rightflag > 1)
	{
		return;
	}
	var chkObj = eval("document.all.viewfolder" + ptNode.id);
	if (chkObj != null)
		chkObj.checked = bflag;
}

//function rearrangeimage(nodeIndex)
//{
//	var parentNodeIndex = indexOfNode(treeData[nodeIndex].parent);
//	if (treeData[parentNodeIndex].type == "folder")
//	{
//		var imgObj;
//		var chkObj;
//		var noRightFlag = 0;
//
//		var parentNode = treeData[parentNodeIndex];
//		var childCollection = new Collection();
//		childCollection = extractChildrenOf(parentNode.id);
//
//		var num = childCollection.length;
//		for (var i = 0; i < num; i ++)
//		{
//			if (childCollection[i].rightflag == 0)
//			{
//				noRightFlag ++;
//			}
//		}
//
//		changeFolderRightOnly(treeData[parentNodeIndex], noRightFlag == 0);
//		changeFolderCheckOnly(treeData[parentNodeIndex], noRightFlag == 0);
//		rearrangeimage(parentNodeIndex);
//	}
//}
//
//function changeFolderRight(nodeID)
//{
//  var nodeIndex = indexOfNode(nodeID);
//
//	var ptCur;
//	ptCur = treeData[nodeIndex];
//
//	changeFolderRightOnly(ptCur, ptCur.rightflag == 0);
//	rearrangeimage(nodeIndex);
//	changeFolderDownRight(ptCur, ptCur.rightflag);
//}
//
//function changeFolderDownRight(ptNode, bflag)
//{
//	var children = new Collection();
//	var ptChild;
//	children = extractChildrenOf(ptNode.id);
//	for (var i = 0; i < children.length; i ++)
//	{
//		ptChild = children[i];
//		if (ptChild.type == 'leaf')
//		{
//			changeLeafRightOnly(ptChild, ptNode.rightflag);
//			changeLeafCheckOnly(ptChild, ptNode.rightflag);
//		}
//		else if (ptChild.type == 'folder')
//		{
//			changeFolderRightOnly(ptChild, ptNode.rightflag);
//			changeFolderCheckOnly(ptChild, ptNode.rightflag);
//
//			changeFolderDownRight(ptChild, ptNode.rightflag);
//		}
//	}
//}

//改变选中策略
//add by wangyanzhong control folder
function changeRightForFolder(nodeID)
{
    var nodeIndex = indexOfNode(nodeID);
	var ptCur;
 	ptCur = treeData[nodeIndex];
	changeFolderRightOnly(ptCur, ptCur.rightflag == 0);
    if(ptCur.rightflag==1)
    {
     	changeFolderUpRight(nodeIndex);
    }
    else
    {
        changeFolderUnderRight(ptCur)
    }
//	changeFolderDownRight(ptCur, ptCur.rightflag);
}

function changeFolderUpRight(nodeIndex)
{
	var parentNodeIndex = indexOfNode(treeData[nodeIndex].parent);

	if (treeData[parentNodeIndex].type == "folder")
	{
		var imgObj;
		var chkObj;
//		var noRightFlag = 0;

		var parentNode = treeData[parentNodeIndex];

		changeFolderRightOnly(treeData[parentNodeIndex], true);
		changeFolderCheckOnly(treeData[parentNodeIndex], true);
		changeFolderUpRight(parentNodeIndex);
	}
}

function changeFolderUnderRight(ptNode)
{
    var children = new Collection();
	var ptChild;
	children = extractChildrenOf(ptNode.id);
	for (var i = 0; i < children.length; i ++)
	{
		ptChild = children[i];
		if (ptChild.type == 'leaf')
		{
			changeLeafRightOnly(ptChild, false);
			changeLeafCheckOnly(ptChild, false);
		}
		else if (ptChild.type == 'folder')
		{
			changeFolderRightOnly(ptChild, false);
			changeFolderCheckOnly(ptChild, false);
			changeFolderUnderRight(ptChild);
		}
	}

}
function openPermissionDialog(location)
{   
  
      
     
      openPermissionJsp(location);
   
   
}

//add by wangyanzhong control leaf
function changeRightForLeaf(nodeID)
{
    var nodeIndex = indexOfLeaf(nodeID);
	var tmpImg = eval("document.orgimg" + nodeID);
	var node = treeData[nodeIndex];
   	changeLeafRightOnly(node, node.rightflag == 0);
        changeFolderUpRight(nodeIndex);

}
//-->

function showMenuTree(if_open){
	var ptNode;
	for (var currentIndex = 0; currentIndex < treeData.length; currentIndex ++)
	{
		ptNode = treeData[currentIndex];
		
		if (ptNode.open == 0&&ptNode.type!="leaf")
		{		
			if(if_open == 1){
				toggleFolder(ptNode.id);
			}
		}else if(ptNode.open == 1&&ptNode.type!="leaf"){
		
			if(if_open == 0){				
				toggleFolder(ptNode.id);
			}
			
		}	    
	}
}