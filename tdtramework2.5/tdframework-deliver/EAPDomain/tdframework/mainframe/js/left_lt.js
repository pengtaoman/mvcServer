var APP_PATH = document.getElementsByTagName("contextPath")[0].value;

if (top && (top.lastMenus==null || typeof(top.lastMenus)=="undefined" ) ){
	top.lastMenus=[];
}
if (top && (top.maxLastMenus==null || typeof(top.maxLastMenus)=="undefined" ) ){
	top.maxLastMenus=5;
}
function stopContextMenu(){
	var s=top.location+"";
	if(s.indexOf("debug=true")<10){
		return false;
	}
	return true;
}
document.oncontextmenu=stopContextMenu;


window.currentNode=null;
window.currentLeaf=null;
window.openNodeList={};

window.onresize=changeMenuWidth;

function resetMenuWidth(){
	//top.mainFrame.cols="156,*";
	changeMenuWidth();
}

function changeMenuWidth(){

	var menuBox=document.getElementById("menuBox");

	menuBox.style.width=(window.frameElement.offsetWidth-2)+"px";
}


var defaultPara='';


function showHomePage(){
	if (top.DefaultHomePageId) {
		MenuTree.showNode(top.DefaultHomePageId);
	}

	if (top.top_page.MenuBar.getCurrentTopMenu()!=null && FIRST_PAGE==top.top_page.MenuBar.getCurrentTopMenu().id){
		//MenuTree.showNode("080AA");
		
		var firstPageId="";
		var mObj=document.getElementById(firstPageId);
		if ( isValid(mObj) ) {
			mObj.fireEvent("onclick");
		}
		//document.getElementById("myworkspace").style.display="block";
		//document.getElementById("mymenuspace").style.display="none";
		//document.getElementById("td_xs").innerHTML="首页";
		//document.getElementById("td_xs").title="首页";
	}else{
		//document.getElementById("myworkspace").style.display="none";
		//document.getElementById("mymenuspace").style.display="block";
	}
	
}

function dealNode(obj){
	
	var objDiv=document.getElementById("sub_"+obj.id);
	var isOpen=isOpenNode(obj);
	if (isOpen){
		hideElement(objDiv);
		delete window.openNodeList[obj.id];
		obj.className=obj.className.replace("open","");

		/*for (var key in window.openNodeList ){
			if (isParentNodeId(obj.id,key)){
				var oldObj=document.getElementById(key);
				var oldObjDiv=document.getElementById("sub_"+key);
				hideElement(oldObjDiv);
				delete window.openNodeList[key];
				oldObj.className=oldObj.className.replace("open","");
			}
		}*/

	}else{
		showElement(objDiv);
		window.openNodeList[obj.id]=true;
		obj.className=obj.className+"open";
		//fireFirstChild(obj.id);
	}
	/////////
	return;
	/////////
	for (var key in window.openNodeList ){
		if (!isParentNodeId(key,obj.id)){
			var oldObj=document.getElementById(key);
			var oldObjDiv=document.getElementById("sub_"+key);
			hideElement(oldObjDiv);
			delete window.openNodeList[key];
			oldObj.className=oldObj.className.replace("open","");
		}
	}

}

function isParentNodeId(objP,objS){
	return objS.indexOf(objP)==0;
}

function isParentNode(objP,objS){
	return objS.id.indexOf(objP.id)==0;
}

function isOpenNode(obj){
	var objDiv=document.getElementById("sub_"+obj.id);
	if (objDiv.style.display=="none"){
		return false;
	}
	return true;
}


/*
function dealNode2(obj){
	var objDiv=document.getElementById("sub_"+obj.id);
	
	if (window.currentNode ==null){
		showElement(objDiv);
		obj.className=obj.className+"open";
		fireFirstChild(obj.id);
		window.currentNode=obj;
	}else if (window.currentNode.id!=obj.id){
		var oldObjDiv=document.getElementById("sub_"+window.currentNode.id);
		hideElement(oldObjDiv);
		window.currentNode.className=window.currentNode.className.replace("open","");
		showElement(objDiv);
		obj.className=obj.className+"open";
		fireFirstChild(obj.id);
		window.currentNode=obj;
	}else{
		hideElement(objDiv);
		obj.className=obj.className.replace("open","");
		window.currentNode=null;
	}
}
*/


function dealLast(obj){
	if (window.currentLeaf!=null){
		window.currentLeaf.firstChild.style.color="";
	}
	window.currentLeaf=obj;
	window.currentLeaf.firstChild.style.color="red";

	var pageLink=obj.getAttribute("pagelink");
	var menuName=obj.getAttribute("menuname");
	document.myform.favoriteName.value = menuName;
	document.myform.currentLocation.value = pageLink;
	document.myform.menuId.value = obj.id;

    var menuId = document.myform.menuId.value;
	var systemId = document.myform.systemId.value;
	//alert(menuId);
	var subsystemname ="最近访问";

    if(BAS_LOG){
		parent.main.location.href = APP_PATH + "/basLog.do?method=log&menuId="+menuId+"&systemId="+systemId+"&destUrl="+pageLink;
    }else{
		parent.main.location.href = pageLink;
	}
	var navpatharr=[];
	navpatharr[0]=menuName;
	if(typeof(MenuTree.allMenuNodes[menuId])=="undefined")
		parent.work_items.setNav( navpatharr);
	else
		parent.work_items.setNav(  MenuTree.getAllParentNodes(MenuTree.allMenuNodes[menuId]) );
	if(BAS_LOG)
		parent.work_items.fireExtraIcons(obj.id);
	
	//parent.work_items.setNav(subsystemname, menuName);
}

function fireFirstChild(mid){
	var menuObj=MenuTree.allMenuNodes[mid];
	if (menuObj.SubNum==1){
		for(var k in menuObj.childrenMap){
			var cid=menuObj.childrenMap[k].menuId;
			document.getElementById(cid).fireEvent("onclick");
			break;
		}
	}
}



function addLastMenu(mid,mname,pageLink){
	var menu=MenuTree.allMenuNodes[mid];
	if (menu==null){
		var menu={
			menuId : mid,
			menuName : mname,
			pageLink : pageLink
		};
	}

	var lastNo=top.lastMenus.length;

	for (var i=0;i<lastNo;i++ ){
		if (top.lastMenus[i].menuId==menu.menuId || top.lastMenus[i].pageLink==menu.pageLink){
			top.lastMenus=delArray(top.lastMenus,i);
			break;
		}
	}

	lastNo=top.lastMenus.length;
	if (lastNo<top.maxLastMenus){
		top.lastMenus[lastNo]=cloneObject(menu);
	}else{
		top.lastMenus=delArray(top.lastMenus,0);
		top.lastMenus[top.lastMenus.length]=cloneObject(menu);
	}

	buildLastMenu();

}


function buildLastMenu(){
	var rs="";
	var lastNo=top.lastMenus.length;
	for (var i=lastNo-1;i>=0;i-- ){
		var menu=top.lastMenus[i];
		rs+="<span onclick=\"dealLast(this);\" id=\""+menu.menuId+"\" class=\"mLevel2c\" ";
		rs+="menuname=\""+menu.menuName+"\" pagelink=\""+menu.pageLink+"\" >";
		rs+="<a href=\"#\" onclick=\"ignore();\">"+menu.menuName+"</a></span><br />\n";
	}

	document.getElementById("lastMenuDiv").innerHTML=rs;
}



function dealFav(obj){
	if (window.currentLeaf!=null){
		window.currentLeaf.firstChild.style.color="";
	}
	window.currentLeaf=obj;
	window.currentLeaf.firstChild.style.color="red";

	var pageLink=obj.getAttribute("pagelink");
	var menuName=obj.getAttribute("menuname");
	var sid=obj.getAttribute("sid");
	document.myform.favoriteName.value = menuName;
	document.myform.currentLocation.value = pageLink;
	document.myform.menuId.value = obj.id.substr(4);
    var menuId = document.myform.menuId.value;
    //alert(menuId)
	addLastMenu(menuId,menuName,pageLink);

	var subsystemname ="收藏夹";

	parent.main.location.href = pageLink;
	//parent.work_items.setNav(subsystemname, menuName);
	//parent.work_items.setNav(MenuTree.getAllParentNodes(MenuTree.allMenuNodes[menuId]) );
	var navpatharr=[];
	navpatharr[0]=menuName;
	if(typeof(MenuTree.allMenuNodes[menuId])=="undefined")
		parent.work_items.setNav( navpatharr);
	else
		parent.work_items.setNav(  MenuTree.getAllParentNodes(MenuTree.allMenuNodes[menuId]) );
	if(BAS_LOG)
		parent.work_items.fireExtraIcons(obj.id.substr(4));
}

function showFavMenu(menuId,employeeId,menuName,systemId,order,pageLink){
	document.writeln(createFavMenu(menuId,employeeId,menuName,systemId,order,pageLink));
}
function createFavMenu(menuId,employeeId,menuName,systemId,order,pageLink){
	var rs=document.getElementById("favTemplate").value;
	rs=replaceAll(rs,"{menuId}","fav_"+menuId);
	rs=replaceAll(rs,"{menuName}",menuName);
	rs=replaceAll(rs,"{pageLink}",pageLink);
	rs=replaceAll(rs,"{order}",order);
	rs=replaceAll(rs,"{systemId}",systemId);
	return rs;
}

function addFavMenu(menuId,employeeId,menuName,systemId,order,pageLink){
	var divObj=document.getElementById("favMenu");
	if (divObj!=null) {
		divObj.innerHTML+=createFavMenu(menuId,employeeId,menuName,systemId,order,pageLink);
	}
}

function delFavMenu(menuId){
	var oo=document.getElementById("fav_"+menuId);
	if (oo!=null){
		oo.nextSibling.removeNode(true);
		oo.removeNode(true);
	}
}



function refreshFavorite(menuId,favoriteName,systemId,pageLink){
	addFavMenu(menuId,0,favoriteName,systemId,'0',pageLink);
	//alert("加入 "+fname+" , 刷新收藏夹脚本 comming soon....");
}

function init()
{

	var sysname="子系统标题信息";
	
	if (top.currentSysNameValue){
		sysname=top.currentSysNameValue;
		if (sysname.indexOf("◆")==0){
			sysname=sysname.substr(1);
		}
	}else{
		sysname="河北联通BSS"
	}

	//document.getElementById("td_xs").innerHTML=sysname;
	//document.getElementById("td_xs").title=sysname;

buildLastMenu();

showFirstPage();
//resetMenuWidth();

}













