<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%
//left.jsp

String requestHead = request.getHeader("User-Agent");
if (requestHead.indexOf("Firefox") == -1) {
	out.println("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
}
String webpath = request.getContextPath();
    boolean basLog = TDConfigHelper.isBasLogPermitted();
AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
String userName = authorizeVO.getWorkNo();
StringBuffer paramStr = new StringBuffer();
String passWord = (String)request.getSession(true).getAttribute("decodedPass");
String d_flag = (String)session.getAttribute("double_flag");
String endpassword = DESUtil.encrypt(passWord);
paramStr.append("'STAFFNO=").append(userName).append("&PASSWORD=").append(endpassword).append("&double_flag=").append(d_flag).append("'");

%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache"> 
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"> 
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<title>Tab样例</title>
        <%out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");%>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/tdextend/layout/TabContainer.js"></script>
		<contextPath value="<%=path%>"/>
		<link href="<%=path%>/common/dx20/css/crm6_tab.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/tab.js"></script>
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/menuNavigation.js"></script>
		<script>
		//dojo.require("unieap.tdextend.layout.TabContainer");
		dojo.require("unieap.form.DropDownButton_crm");
		</script>
		<script type="text/javascript">
var APP_PATH='<%=path%>';
var BAS_LOG=<%=basLog%>;

dojo.addOnLoad(function(){
	/*
	 var ctabHeight = dojo.byId("createTab").style.height;
	 alert(ctabHeight);
	 
	  var pxIndex = ctabHeight.indexOf("px");
	 if (pxIndex >= 0) {
		 ctabHeight = ctabHeight.substring(0,pxIndex);
	 }
	
	 dojo.byId("createTab").style.height = (parseInt(ctabHeight) + 5) + "px";
	 */
	 var sysNaviDiv = dojo.byId("sysNaviDiv");
	 if (sysNaviDiv && sysNaviDiv != null) {
		 //do nothing
	 } else {
		 createTab();
		 parent.addFristPageTab();
	 }
	 getSysNavi();
	
	 var iconNode = unieap.byId("comboxMenuNavi").iconNode;
	 unieap.byId("comboxMenuNavi").textValidate = false;
	 iconNode.onclick=function() {
		 searchMenu();
	 };
});


//可能跳转到其他应用的时候会用到   暂时保留
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

	var defaultMenuId="defaultMenuId";
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
	}else{
	}
}

function dealLeaf(obj){
	var node=obj;
	
	var menuName = node.getLabel();
	var menuUrl = node.getData()["pageLink"];
	var menuId = node.getData()["menuId"];
	var ifDiffContext = node.getData()["ifDiffContext"];
	var systemId = node.getData()["systemId"];
	var ifChild = node.getData()["ifChild"];
	
	if (menuUrl.indexOf('?')<0){
		menuUrl=menuUrl+'?';
	} else {
		menuUrl=menuUrl+'&';
	}
	
	var authPara = <%=paramStr.toString()%>;
	
	var pl=APP_PATH+"/blank.html";
	var mtd = node.getData()["openMethod"];
	if(BAS_LOG)
	{
		mtd = "b";
	}

	menuUrl=menuUrl + authPara;
	//alert("	000000  " + menuUrl);
	if(mtd=="0"){
		/*
		document.myform.favoriteName.value = menuObj.menuName;
		document.myform.currentLocation.value = pl;
		document.myform.menuId.value = menuObj.menuId;*/
		//menuUrl = pl+defaultPara;   defaultPara   没找到使用的地方  一直是 空
		//alert("	1111111  " + menuUrl);
	}else if(mtd=="1"){
		window.open(menuUrl, "", "");
		return;
	}else if(mtd=="b"){
		//alert("	22222  " + menuUrl);
		var menuId = node.menuId;
		var systemId = systemId;
		//var menuUrl = pl+defaultPara;   defaultPara   没找到使用的地方  一直是 空
		var tmpLocation = APP_PATH + "/basLog.do?method=log&menuId="+menuId+"&systemId="+systemId+"&destUrl="+menuUrl;
		document.myform.currentLocation.value = tmpLocation;
		menuUrl = APP_PATH + "/basLog.do?method=log&menuId="+menuId+"&systemId="+systemId+"&destUrl="+destUrl;
	}
	//alert("	33333  " + menuUrl);
	return menuUrl;
}
</script>
	</head>
	<body class="unieap" style="margin:0;padding:0;">
	<input type="hidden" id="warningSearchMenu" value='请输入搜索内容'>
						<div tabPosition="right-h" style="margin:0;padding:0;height:100%">
								<div id='getTabButton' style="margin:0;padding:0;">
								</div>
							</div>
	<form name="myform">
		<input type="hidden" name="systemId"/>
		<input type="hidden" name="currentLocation" />	
		<input type="hidden" name="menuId" value=""/>
		<input type="hidden" name="favoriteName" />
		<input type="hidden" name="SubSystemName" value="" />
   </form>	
	</body>
</html>
