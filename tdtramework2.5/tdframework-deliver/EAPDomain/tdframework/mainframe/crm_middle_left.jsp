<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%
//left.jsp
    boolean basLog = TDConfigHelper.isBasLogPermitted();
AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
String userName = authorizeVO.getWorkNo();
StringBuffer paramStr = new StringBuffer();
String passWord = (String)request.getSession(true).getAttribute("decodedPass");
String d_flag = (String)session.getAttribute("double_flag");
String endpassword = DESUtil.encrypt(passWord);
paramStr.append("'STAFFNO=").append(userName).append("&PASSWORD=").append(endpassword).append("&double_flag=").append(d_flag).append("'");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>

		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<link href="<%=path%>/common/dx20/css/crm6_tab_middle.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/crm_tab_middle.js"></script>
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/crm_menuNavigation_middle.js"></script>
		<script>
		dojo.require("unieap.tdextend.layout.TabContainer");
		dojo.require("unieap.form.DropDownButton_crm_middle");
		</script>
		<script type="text/javascript">
var APP_PATH='<%=path%>';
var BAS_LOG=<%=basLog%>;

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
	<body class="unieap">
		<input type="hidden" id="warningSearchMenu" value='请输入搜索内容'>
         <div dojoType='unieap.form.FieldSet' flexible='false' id='menuFieldSet' jsId='divFieldSet' height='500px' width='200px' border="0px" style='overflow:auto;border:none'>
        
        <!--  //SysID menu BEGIN-->
        <div dojoType='unieap.form.DropDownButton_crm_middle' label='请选择系统' id='sysDropDownBtn'>
        <div dojoType='unieap.form.FieldSet' flexible='false' id='sysFieldSet' jsId='divSysFieldSet' height='400px' style='overflow:auto;background:#def0f9'>
        <div dojoType='unieap.tree.Tree' id='sysNaviTree' onClick='sysClick'  binding="{'leaf':'ifChild','id':'stmId','store':systemtreeStorePart,'label':'stmName','parent':'parentStmId',query:{name:'parentStmId',relation:'=',value:'PSYSK'}}">
		</div></div>
        </div>
         <!--  //SysID menu END-->
        <br><input type=text id='foc' style='display:none'><div dojoType='unieap.form.ComboBox' hasDefault='true' jsId='combobox1' onFocus='inputSearchMenu' onIconClick='searchMenu' onEnter='searchMenu' id='comboxMenuNavi' name='comboxMenuNaviInput'></div>
		<div dojoType='unieap.tree.Tree' style='height:665px;overflow-x:hidden;overflow-y:auto' id='menuNaviTree' onClick='menuClick' binding="{'leaf':'ifChild','id':'menuId','store':initStore,'label':'menuName','parent':'parentMenuId',query:{name:'parentMenuId',relation:'=',value:''}}">
		</div></div>
		<script type="text/javascript">
		var parentTdHeight = parent.parent.getTdTabHeight();
		dojo.byId('menuFieldSet').height = parentTdHeight-15;
		if (document.readyState=="complete"){
			var sysDropButtonDomain = unieap.byId('sysDropDownBtn');
			sysDropButtonDomain.setBtnWidth(200-2);
			if (sysDropButtonDomain.getBtnText().indexOf('功能导航')!=-1) {
			    sysDropButtonDomain.setBtnText('请选择要操作系统');
			}
		}
		</script>
	</body>
</html>