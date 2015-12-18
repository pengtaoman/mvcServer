<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.ArrayList" %>

<%
	String path = request.getContextPath();
	SystemColl sysColl = (SystemColl)request.getAttribute("sysColl");
	AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
	List appNames = (List)request.getAttribute("appNames");
	if(appNames==null)
		appNames = new ArrayList();
	String workNo = authorizeVO.getWorkNo();
	String areaName = authorizeVO.getAreaName();
	String organName = authorizeVO.getOrganName();
	if(authorizeVO.getDealerName()!=null && authorizeVO.getDealerName().length()>1)
			organName = authorizeVO.getOrganName() + "|"+ authorizeVO.getDealerName();
	else
			organName = authorizeVO.getOrganName();
	
	String inst = TDConfigHelper.getHeaderSearch();
	if(inst==null)
	{
		inst="false";	
	}
	//SystemColl perSysColl = TDConfigHelper.getPermittedSystemColl() ;
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>页面标题</title>
<contextPath value="<%=path%>"/>
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Expires" content="-1" />
<link rel="stylesheet" href="<%=path%>/tdframework/mainframe/css/td_style_top_lt.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/cookeiutil.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/mainmenu_lt.js" ></script>
<script type="text/javascript" src="<%=path%>/unieap/js/Globals.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/top_lt.js" ></script>
<script type="text/javascript" src="<%=path%>/common/js/prototypeajax.js" ></script>

<!-- 页面级js  -->
<script type="text/javascript">
<!--
/*初始化函数*/
window.onbeforeunload = onbeforeunload_handler;   
//window.onunload = onunload_handler;   
function onbeforeunload_handler(){   
  if((document.body.clientWidth-event.clientX)<20&&event.clientY<0||event.altKey){
  var paramters = "storeValue=aa";
  var result = executeRequest("login","logout",paramters);
  }
}     
       
function onunload_handler(){   
       // var warning="谢谢光临";   
        //alert(warning);   
}   

function keydown(){
	if ((event.ctrlKey)&&(event.keyCode==78))
	{ 
		event.returnValue=false;
	}
}

function init(){
	//topHeaderControl();
	MenuBar.defaultMenuNum=7;
	MenuBar.cookieId="U_<%=workNo%>";
	<%
		for(int i=0;i<sysColl.getRowCount();i++) {		
			SystemVO vo = (SystemVO)sysColl.getSystem(i);	
	%>
			MenuBar.createTopMenu("System<%=vo.getSystemId()%>","<%=vo.getSystemName()%>");
			<%
			 SystemColl subSysColl = (SystemColl)vo.getSubSystemColl();
  				if(subSysColl!=null){
					for(int j=0;j<subSysColl.getRowCount();j++) {		
						SystemVO subvo = (SystemVO)subSysColl.getSystem(j);	
			%>
							MenuBar.createSubMenu("<%=subvo.getSystemId()%>","<%=subvo.getSystemName()%>","System<%=vo.getSystemId()%>");

			<%
					 }
 
				}

		}
			%>

		MenuBar.loadFromCookie();
		MenuBar.buildTopMenu();
		MenuBar.buildSubMenu();

		if (MenuBar.getTopMenuNum()<=MenuBar.defaultMenuNum){
			//$("menutools").style.display="none";
		}

		MenuBar.activeTopMenuByIndex(0);
		initMarquee();
		setWarnTimer();
	<%
		Iterator it = appNames.iterator();
		int i=0;
		while(it.hasNext()) {		
			String uStr = (String)it.next();	
	%>
		refreshUrls["<%=i%>"] = "<%=uStr%>";
	<%   i++; 
	}%>	
}

// -->
// 跳转叶面：  一级菜单id 二级菜单id 目的菜单id
// MenuBar.activeTopMenuById('System87','875','875GE');

</script>
</head>
<body class="mainframeBody" onLoad="init();" >
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr class="head" id="head">
    <td>
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td class="head-logo" align="left"><img src="<%=path%>/tdframework/mainframe/images/head_logo.gif"></td>
				<td align="left" valign="top">
					<table height="29" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td width="15" height="18"></td>
							<td></td>
							<td width="15" height="18"></td>
						</tr>
						<tr>
							<td align="left">&nbsp;</td>
							<td align="left" nowrap><span class="head-companyname">BSS系统|辽宁</span></td>
							<td align="left" nowrap>&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</td>
    <td align="right" valign="top" width="65%">
		<table width="100%" height="56"  border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="23" align="right" valign="middle">
					<table border="0" cellpadding="0" cellspacing="0">
					  <tr>
						<td nowrap>&nbsp;</td>
						<td nowrap class="head-infobox">部门：</td>
						<td nowrap class="head-infobox"><%=organName%></td>
						<td nowrap>&nbsp;</td>
						<td nowrap class="head-infobox">ID：</td>
						<td nowrap class="head-infobox"><%=workNo%></td>
						<td width="15" align="right" nowrap class="head-infobox">&nbsp;<img src="<%=path%>/tdframework/mainframe/images/head_infobox_diver.gif" width="1" height="13">&nbsp;</td>
						<td nowrap class="head-infobox"><a href="#" id="tit1" class="infoT-switch" >[公告]</a></td>
						<td nowrap class="head-infobox"><a href="#" id="tit2" onClick="help();return false;" class="infoT-title">[帮助]</a></td>
						<td nowrap class="head-infobox"><a href="#" id="tit3" onClick="updatePassword();return false;" class="infoT-title">[修改密码]</a></td>
						<td width="15" align="right" nowrap class="head-infobox">&nbsp;<img src="<%=path%>/tdframework/mainframe/images/head_infobox_diver.gif" width="1" height="13">&nbsp;</td>
						<td nowrap ><a href="#" onClick="relogin();return false;"><img alt="退出" src="<%=path%>/tdframework/mainframe/images/head_button_exit.gif" width="36" height="14" border="0" onMouseOver="this.src='<%=path%>/tdframework/mainframe/images/head_button_exit_over.gif'" onMouseOut="this.src='<%=path%>/tdframework/mainframe/images/head_button_exit.gif'"></a></td>
						<td width="5" class="head-infobox">&nbsp;</td>
					  </tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2" align="right" class="head-line"><img src="<%=path%>/tdframework/mainframe/images/size.gif"></td>
			</tr>
			<tr>
			  <td>
			  	<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
					  <td width="250px">
					  <div id="nav3" style="width:250px;overflow-x:hidden;overflow-y:hidden;" onmouseover="window.marqueeMove=false;" onmouseout="window.marqueeMove=true;"></div>
					  </td>
					  <td colspan="2" align="right" valign="middle" id="tabs"><!--一级菜单-->
						<span class="top-menu-button-on " onClick="onclickTab(0)" onMouseOver="changeTabClass(0)" onMouseOut="outTabClass(0)">CRM</span>&nbsp;<img src="<%=path%>/tdframework/mainframe/images/top_line.gif" width="2" height="13" align="absmiddle">&nbsp;<span class="top-menu-button" onClick="onclickTab(1)" onMouseOver="changeTabClass(1)" onMouseOut="outTabClass(1)">计费帐务</span>&nbsp;<!-- img src="<%=path%>/tdframework/mainframe/images/top_line.gif" width="2" height="13" align="absmiddle">&nbsp;<span class="top-menu-button" onClick="onclickTab(2)" onMouseOver="changeTabClass(2)" onMouseOut="outTabClass(2)">PRM</span>&nbsp;<img src="<%=path%>/tdframework/mainframe/images/top_line.gif" width="2" height="13" align="absmiddle"-->&nbsp;<!-- span class="top-menu-button" onClick="onclickTab(3)" onMouseOver="changeTabClass(3)" onMouseOut="outTabClass(3)">监控</span>&nbsp;<img src="<%=path%>/tdframework/mainframe/images/top_line.gif" width="2" height="13" align="absmiddle">&nbsp;--><!-- span class="top-menu-button" onClick="onclickTab(3)" onMouseOver="changeTabClass(3)" onMouseOut="outTabClass(3)">经营分析</span-->
						<!--/一级菜单-->
					  </td>
					</tr>
					</table>
				 </td>
			</tr>
			
		</table>
		
	</td>
  </tr>
  <tr>
    <td height="50" colspan="3"><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          	<div id="level2_menu">
              <div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td id="topMenuBar">
						<div id="l2_menu1" class="l2_menu">
						</div>
						<div id="l2_menu2" style="display:none" class="l2_menu">
						</div>
						<div id="l2_menu3" style="display:none" class="l2_menu">
						</div>
					 </td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="l3_menu">
                    	<div id="nav1" class="l3_menu">
                    	</div>
                    </td>
                  </tr>
                </table>
              </div>
			 </div>
		 </td>
          <td valign="top" nowrap class="body-menu-layoutswitcherstd"><!--布局切换-->
            <a href="workarea/360统一客户视图.html" target="pagebody"><img src="<%=path%>/tdframework/mainframe/images/layout_switcher_0.gif" alt="统一客户视图" name="layout0" width="18" height="17" border="0"  id="layout0" onClick="layoutSwitch(0)" ></a> <img src="<%=path%>/tdframework/mainframe/images/layout_switcher_1_on.gif" alt="恢复默认窗口" name="layout1" width="18" height="17"  id="layout1"onClick="layoutSwitch(1)" > <img src="<%=path%>/tdframework/mainframe/images/layout_switcher_2.gif" alt="收缩页头" name="layout2" id="layout2"onClick="layoutSwitch(2)" > <img src="<%=path%>/tdframework/mainframe/images/layout_switcher_3.gif" alt="隐藏导航树" name="layout3" id="layout3"onClick="layoutSwitch(3)"> <img src="<%=path%>/tdframework/mainframe/images/layout_switcher_4.gif" alt="加入收藏夹" name="layout4"id="layout4"onClick="layoutSwitch(4)"> <!-- img src="<%=path%>/tdframework/mainframe/images/layout_switcher_5.gif" alt="收藏夹" name="layout5" id="layout5"onClick="layoutSwitch(5)"-->
            <!--/布局切换-->
          </td>
        </tr>
      </table></td>
  </tr>
</table>

<!-- ==================================================================  -->
</body>
</html>
