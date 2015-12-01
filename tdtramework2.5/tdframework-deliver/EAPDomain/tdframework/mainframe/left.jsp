<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.support.favorite.dao.FavoriteColl" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%

	String path = request.getContextPath();
	String sysId = request.getParameter("systemId");
	String defaultMenuId = request.getParameter("defaultMenuId");
	defaultMenuId=defaultMenuId==null?"":defaultMenuId;
	
	String show_fav = "unshow";
	String show = (String)request.getAttribute("ifShowFav");
	if(show!=null && show.trim().intern()!="".intern()) {   
		show_fav = "show"; 
	}
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	StringBuffer paramStr = new StringBuffer();
	String userName = authVO.getWorkNo();
	String passWord = (String)request.getSession(true).getAttribute("decodedPass");
	String d_flag = (String)session.getAttribute("double_flag");
	
	//paramStr.append("j_username=").append(userName).append("&j_password=").append(passWord).append("&double_flag=").append(d_flag);
	String endpassword = DESUtil.encrypt(passWord);
	paramStr.append("STAFFNO=").append(userName).append("&PASSWORD=").append(endpassword).append("&double_flag=").append(d_flag);
	//获取数据信息
	FrameMenuColl frameMenuColl = (FrameMenuColl)request.getAttribute("frameMenuColl");
	FavoriteColl framefavoriteColl = (FavoriteColl)request.getAttribute(FavoriteColl.REQUEST_ATTRIBUTE);
	boolean basLog = TDConfigHelper.isBasLogPermitted();
%>

<html>
<head>
<base target="main"/>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>菜单区</title>	
<contextPath value="<%=path%>"/>
<link rel="stylesheet" href="<%=path%>/tdframework/mainframe/css/td_style_left_lt.css" type="text/css"/>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/type.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/common.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/menutree_lt.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/left_lt.js" ></script>
<script type="text/javascript">

var APP_PATH='<%=path%>';
var FIRST_PAGE='System80';

var sysId="<%=sysId%>";
var BAS_LOG=<%=basLog%>;

function showFirstPage(){
	
	if (sysId=='80'){
		top.main.location=APP_PATH+"/home/homepage.do?systemId="+sysId;
		parent.work_items.setNav(  ["首页"] );
		return;
	}
	
	var firstLeaf = MenuTree.getFirstLeaf();
	if (firstLeaf){
		$(firstLeaf.menuId).fireEvent("onclick");
	}

	var defaultMenuId="<%=defaultMenuId%>";
	var idx=(document.location+"").indexOf("&defaultParameter&");
	if (idx>0) {
		defaultPara=(document.location+"").substring(idx);
	}

	if (defaultMenuId && defaultMenuId.length>1){
		MenuTree.showNode(defaultMenuId);
	}
	return ;
	
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

function dealLeaf(obj){

	if (window.currentLeaf!=null){
		window.currentLeaf.firstChild.style.color="";
	}
	window.currentLeaf=obj;
	window.currentLeaf.firstChild.style.color="#c50105";

	addLastMenu(obj.id);

	var menuObj=MenuTree.allMenuNodes[obj.id];
	
	if (menuObj.pageLink.indexOf('?')<0){
		menuObj.pageLink=menuObj.pageLink+'?';
	}
	var pl=APP_PATH+"/blank.html";
	var mtd = menuObj.openMethod;
	if(BAS_LOG)
	{
		mtd = "b";
	}
	if (menuObj.pageLink!=null && menuObj.pageLink!=""){
		pl=menuObj.pageLink;
	}
	
	if(mtd=="0"){
		var eStatus = menuObj.expireStatus;
		
		//eStatus = "expired";
		if(typeof(eStatus)=="undefined"){
			document.myform.favoriteName.value = menuObj.menuName;
			document.myform.currentLocation.value = pl;
			document.myform.menuId.value = menuObj.menuId;
			parent.main.location.href = pl+defaultPara;
			//alert(pl+defaultPara);
			
			
		}else if(eStatus=="toExpire"){
			var toExpireWarnMsg = "许可证即将过期，请联系管理人员！项目信息：需求名称：" + menuObj.projectName+";许可证到期日："+menuObj.expiredDate+";许可证编号："+menuObj.licenseNo;
			alert(toExpireWarnMsg);
			document.myform.favoriteName.value = menuObj.menuName;
			document.myform.currentLocation.value = pl;
			document.myform.menuId.value = menuObj.menuId;
			parent.main.location.href = pl+defaultPara;
		}else if(eStatus=="expired"){
			var expiredWarnMsg = "许可证已经过期，请联系管理人员！";
			var expiredWarnPageLink = APP_PATH + "/tdframework/mainframe/license_warn.jsp?projectNo="+menuObj.projectNo+"&projectName="+menuObj.projectName+"&licenseNo="+menuObj.licenseNo+"&expiredDate="+menuObj.expiredDate;
			alert(expiredWarnMsg);
			parent.main.location.href = expiredWarnPageLink;
			
		}else{
			document.myform.favoriteName.value = menuObj.menuName;
			document.myform.currentLocation.value = pl;
			document.myform.menuId.value = menuObj.menuId;
			parent.main.location.href = pl+defaultPara;
		}
	}else if(mtd=="1"){
		window.open(pl, "", "");
		return;
	}else if(mtd=="b"){
		document.myform.favoriteName.value = menuObj.menuName;
		//document.myform.currentLocation.value = pl;
		document.myform.menuId.value = menuObj.menuId;
		var menuId = menuObj.menuId;
		var systemId = document.myform.systemId.value;
		var destUrl = pl+defaultPara;
		var tmpLocation = APP_PATH + "/basLog.do?method=log&menuId="+menuId+"&systemId="+systemId+"&destUrl="+destUrl;
		document.myform.currentLocation.value = tmpLocation;
		parent.main.location.href = APP_PATH + "/basLog.do?method=log&menuId="+menuId+"&systemId="+systemId+"&destUrl="+destUrl;
	}

	var subsystemname =MenuTree.allMenuNodes[menuObj.parentMenuId].menuName;
	//alert( MenuTree.getAllParentNodes(menuObj) );
	parent.work_items.setNav(  MenuTree.getAllParentNodes(menuObj) );
	if(mtd=="b")
		parent.work_items.fireExtraIcons(menuObj.menuId);
}
<%

	for (int i=0;i<frameMenuColl.getRowCount();i++){
		//if(!channelSystem){
		//	out.println("MenuTree.createMenu("+frameMenuColl.getMenu(i).toParameter()+");");
		//}else{
		//	out.println("MenuTree.createMenu("+frameMenuColl.getMenu(i).toParameter(channelPara.toString())+");");
		//}
		if(basLog){
			out.println("MenuTree.createMenu("+frameMenuColl.getMenu(i).toBASParameter(paramStr.toString())+");");
		}else{
			out.println("MenuTree.createMenu("+frameMenuColl.getMenu(i).toParameter(paramStr.toString())+");");
		}
	}
%>
MenuTree.buildMenu();
function keydown(){
	if ((event.ctrlKey)&&(event.keyCode==78))
	{ 
		event.returnValue=false;
	}
}

//-->
</script>
</head>
<body onload="init();" onkeydown="keydown();">
<form name="myform">
		<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" height="100%" >
		<tr> 
			<td width="100%" height="90%">
		<table width="100%" border="0" cellpadding="0" cellspacing="0" height="100%" >
		  <tr> 
			<td width="180" >
		
			<div id="menuBox" style="overflow-x:auto;overflow-y:auto;width:180px;height:100%;display:block;">

<span onclick="showOrHideElementById('mainMenu')"  
id="mainMenuTitle" class="topLevel"><b>主菜单区</b></span>

<div id="mainMenu" >
<script type="text/javascript">
MenuTree.showMenuTree();
</script>
</div>

<textarea style="display:none;" readonly="readonly" id="favTemplate">
	<span onclick="dealFav(this);" class="mLevel2open" id="{menuId}" menuname="{menuName}" pagelink="{pageLink}" order="{order}" sid="{systemId}" >
	<a href="#" onclick="ignore();">{menuName}</a>
	</span>
	<br/>
</textarea>
<% if ("show".equals(show_fav)  )  {%>
<span onclick="showOrHideElementById('favMenu')"  id="favMenuTitle" class="topLevel"><b>收藏夹</b></span>

<div id="favMenu" style="display:none;" >
<script type="text/javascript">
<%
	if(framefavoriteColl!=null){
		for (int i=0;i<framefavoriteColl.getRowCount();i++){

			out.println("showFavMenu("+framefavoriteColl.getFavorite(i).toParameter()+");");
		}
	}
%>
</script>
</div>
<% } %>
 			</div>
			</td></tr>
			</table>
		<input type="hidden" name="systemId" value="<%=sysId%>" />
		<input type="hidden" name="currentLocation" />	
		<input type="hidden" name="menuId" value=""/>
		<input type="hidden" name="favoriteName" />
		<input type="hidden" name="SubSystemName" value="" />
		</td>
		</tr>
<tr >
<td onclick="showOrHideElementById('flist');" 
style="border-top:3px solid #D71920"
><span class="topLevel"><b>最近访问页面</b></span>
</td>
</tr>
<tr id="flist" style="display:none">
<td height="111">
<div id="lastMenuDiv" style="background-color:#f9f9f9;overflow-x:auto;overflow-y:auto;width:100%;height:100%;display:block;">
</div>
</td>
</tr>
</table>

</form>
</body>
</html>
