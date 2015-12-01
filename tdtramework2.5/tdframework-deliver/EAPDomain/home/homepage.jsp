<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.om.dao.menu.MenuColl" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.support.favorite.dao.FavoriteColl" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.PassWord" %>
<%
String webapp=request.getContextPath();
MenuColl menuColl = (MenuColl)request.getAttribute("homepage_mods");

String dateSelect=(String)request.getAttribute("date_select");

	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	StringBuffer paramStr = new StringBuffer();
	String userName = authVO.getWorkNo();
	String passWord = PassWord.decode(authVO.getWorkPwd());
	paramStr.append("j_username=").append(userName).append("&j_password=").append(passWord);


%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>首页</title>

	<!-- 禁止 windows 主题风格 -->
	<meta http-equiv="MSThemeCompatible" content="no" />

	<!-- 禁止缓存 headers -->
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="-1" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<!-- end 禁止缓存 headers -->


<!-- 公共css  -->
<link rel="stylesheet" type="text/css" href="<%=webapp%>/common/css/td_style.css" />
<link rel="stylesheet" type="text/css" href="<%=webapp%>/common/css/td_style_home.css" />
<!-- 公共js  -->
<script type="text/javascript" src="<%=webapp%>/common/js/td_common.js" ></script>
<script type="text/javascript" src="<%=webapp%>/common/js/td_element.js" ></script>

<script type="text/javascript" src="<%=webapp%>/common/js/prototypeajax.js" ></script>

<script language="JavaScript" src="<%=webapp%>/common/js/eccn.js" ></script>

<script language="JavaScript" src="<%=webapp%>/home/homepage.js" ></script>


<!-- 页面级js  -->
<script type="text/javascript">
<!--
// 
var APP_PATH="<%=webapp%>";

var ModTree=new ModTreeClass();

var ModTemplate=[];
ModTemplate[0]=null;
ModTemplate[1]=null;
ModTemplate[2]=null;
var SubModTemplate=[];
SubModTemplate[0]=null;
SubModTemplate[1]="<span class=\"submodLoading\">正在载入中...</span>";
SubModTemplate[2]=null;

var DateSelectTemplate=null;

var hideAll=false;

//ModTree.createMod(ModTree.ROOT_ID,"首页","");
//ModTree.createMod("R0","我的工作计划","");
//ModTree.createMod("R01","工作计划","R0","/query.do?actionMethod=query&ecid=R01form",12);

//ModTree.createMod("R1","我的销售机会","");
//ModTree.createMod("R11","销售机会","R1","/query.do?actionMethod=query&ecid=R11_form",12);

<%

	for (int i=0;i<menuColl.getRowCount();i++){

		out.println("ModTree.createMod("+menuColl.getMenu(i).toParameter()+",'"+paramStr.toString()+"');");
	}

%>


function init(){

	ModTree.loadSubMod();

}

function warnDetail(obj,objindex,workNo,pwd){
  	window.showModalDialog('/crm2/bulletinAction.do?method=getBulletinDetail&bulletinId='+obj.id+'&STAFFNO='+workNo+'&PASSWORD='+pwd, '', "status:no;dialogWidth:495px;dialogHeight:380px");
}
// -->
</script>

</head>

<body  class="mainBody" onLoad="init();" style="padding:0px;">
<!-- =============== 模板 ============= -->
<textarea id="mod_template_s" rows="" cols=""  style="display:none;">
	<div class="modDiv">
	<a name="#{mod_id}_an"></a>
	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="modTable">
	<tr class="modHead">
		<td class="modLeft">&#160;</td><td class="modCenter">
	<table border="0" cellspacing="0" cellpadding="0" width="100%" >
		<tr>
		<td nowrap="nowrap"><span class="modTitle">#{mod_name}</span></td>
		<td align="right"  width="100%" >&#160;</td>
		<td>
			<button class="collapseImgButtonS" type="button" id="#{mod_id}" onClick="showOrHideMod(this)"></button>
		</td>
		</tr>
	</table>
		</td><td class="modRight">&#160;</td>
	</tr>
	<tr class="modBody" id="#{mod_id}_body">
		<td class="modLeft">&#160;</td><td class="modCenter">
</textarea>
<textarea id="mod_template_e" rows="" cols=""  style="display:none;">
		</td><td class="modRight">&#160;</td>
	</tr>
	<tr class="modFoot">
		<td class="modLeft">&#160;</td><td class="modCenter">&#160;</td><td class="modRight">&#160;</td>
	</tr>
	</table>
	</div>
</textarea>
<textarea id="submod_template_s" rows="" cols=""  style="display:none;">
	<div class="subModDiv" >
		<table class="subModHead" border="0" cellspacing="0" cellpadding="0"  >
			<tr>
			<td nowrap="nowrap"><span class="subModTitle">#{submod_name}</span></td>
			<td align="right"  width="70%"  >#{date_select}</td>
			<td align="right"  width="30%" id="#{submod_id}_total" >&#160;</td>
			<td align="right" >
				<input type="button" class="collapseImgButtonS2"  id="#{submod_id}" onClick="showOrHideSubMod(this)" />
			</td>
			</tr>
		</table>
		<div  id="#{submod_id}_body" >
</textarea>
<textarea id="submod_template_e" rows="" cols=""  style="display:none;">
			</div>
		</div>
</textarea>
<textarea id="dateselect_template" rows="" cols=""  style="display:none;">
	显示<select class="dateselect" onChange="reloadSubModByDate('#{submod_id}',this);" >
		<%=dateSelect%>
		<option value="">所有</option>
	</select>的记录
</textarea>
<!-- =============== end of 模板 ============= -->


<table cellspacing="0" cellpadding="0" width="100%" height="100%" style=""  >
<tr>
	<td width="100%" valign="top">

<table border="0" cellspacing="0" cellpadding="0" width="100%"  class="modMenu">
<tr>
	<td onClick="hideMenu();"><a href="javascript:showOrHideAll();hideMenu();" ><img src="<%=webapp%>/home/open_close.gif" width="16" height="16" ondrag="return false"/>
	</a></td>
	<td><a href="javascript:showOrHideMenu();" onMouseOver="showMenu();"><img src="<%=webapp%>/home/guide.gif" width="16" height="16" ondrag="return false"/></a></td>
	<td onClick="hideMenu();"><span id="ajaxWaitng" class="ajaxWaitng" style="visibility:hidden">正在执行操作,请稍候...</span></td>
</tr>
</table>
<div class="bottomShadow" onClick="hideMenu();"></div>
	</td>
</tr>
<tr>
	<td valign="top" width="100%" height="99%" onClick="hideMenu();" >
<div style="width:100%;height:100%;overflow-y:auto;padding-left:2px;padding-right:2px;" >

<script type="text/javascript">
	ModTemplate[0]=$("mod_template_s").value;
	ModTemplate[2]=$("mod_template_e").value;
	SubModTemplate[0]=$("submod_template_s").value;
	SubModTemplate[2]=$("submod_template_e").value;
	DateSelectTemplate=$("dateselect_template").value;
	ModTree.buildMod();
	ModTree.showModTree();
</script>




</div>
	</td>
</tr>
</table>

<div id="menu" style="display:none;position :absolute;z-index:99;top:20px;left:10px;width:100px;border:1px solid #cccccc;background-color:#f9f9f9;padding:2px">
<script type="text/javascript">
ModTree.showNav(document);
</script>
</div>

</body>
</html>
