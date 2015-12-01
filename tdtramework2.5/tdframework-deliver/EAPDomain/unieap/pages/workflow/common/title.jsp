<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ page import="com.neusoft.uniflow.web.util.SessionManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html>
<HEAD>
<uniflow:style/>
<script language="JavaScript" src='<%=request.getContextPath()%>/unieap/pages/workflow/js/OpenWin.js' ></script>
<script language="JavaScript">
function perferenceSetting(){
    var url = "<%=request.getContextPath()%>/pref.do";
	open_windows(url,390,230);
}
function logout(){
    parent.logout(); 
}
function help(){
    var url = "http://developer.neusoft.com";
    window.open(url);
}

function refresh(){
   window.location.reload();
   try{
      parent.page.refresh();
   }catch(e){
      return;
   }   
}
function delrefresh(){
  window.location.reload();
}
	
</script>
</HEAD>
<body 	style="margin-left: 0px;margin-right: 0px;">
<table width="100%" height="68" border="0" cellpadding="0" cellspacing="0" >
  <tr>
    <td width="182"><img src="<%=request.getContextPath() %>/unieap/pages/workflow/stylesheet/style1/main_img/head_logo_UniEAP.png" width="182" height="68" /></td>
    <td class="head_bg_black"><table width="100%" height="68" border="0" cellpadding="0" cellspacing="0">
     <tr>
        <td height="40" align="right" class="head_bg_blue"><table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50" align="left" nowrap="nowrap"><a href="javascript:perferenceSetting()">
            <img src="<%=request.getContextPath() %>/unieap/pages/workflow/stylesheet/style1/main_img/set.gif" alt="自定义配置" 
                width="16" height="16" border="0" align="middle" /></a>&nbsp;<a href="javascript:perferenceSetting()" class="link_tab_12_bk"><bean:message bundle="uniflow" key="workflow.common.title.setting" /></a></td>
            <td width="50" align="left" nowrap="nowrap"><a href="javascript:logout()"  >
            <img src="<%=request.getContextPath() %>/unieap/pages/workflow/stylesheet/style1/main_img/logout.gif" 
            alt="<%=request.getAttribute("current_user")%>" width="16" height="16" 
            border="0" align="middle" /></a>&nbsp;<a href="javascript:logout()" class="link_tab_12_bk"><bean:message bundle="uniflow" key="workflow.common.title.exit" /></a></td>
			<td width="50" align="left" nowrap="nowrap"><a href="javascript:help()"  >
			<img src="<%=request.getContextPath() %>/unieap/pages/workflow/stylesheet/style1/main_img/help.gif" alt="在线帮助" width="16" height="16" border="0" align="middle" /></a>&nbsp;<a href="javascript:help()"   class="link_tab_12_bk"><bean:message bundle="uniflow" key="workflow.common.title.help" /></a></td>
            <td width="120" align="right"><img src="<%=request.getContextPath() %>/unieap/pages/workflow/stylesheet/images/head_logo_neusoft.gif" width="101" height="14" /></td>
            <td width="37">&nbsp;</td>
          </tr>
        </table></td>
      </tr>
            <tr>
        <td height="28" valign="bottom">
        <table height="28" border="0" cellpadding="0" cellspacing="0">
         <tr>
            <td align="left" width="13px">&nbsp;</td>
            <td align="right" nowrap="nowrap" class="Text_12_wt"><%=request.getAttribute("current_user")%><%=request.getAttribute("agent_info")%></td> 
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>