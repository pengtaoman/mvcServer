<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>

<%
  String[] prefixes = EAPConfigHelper.getStartedApplicationPrefixes(pageContext);
  System.out.println(prefixes);
  String strLength = String.valueOf(prefixes.length);
  boolean isSingle=true;
  if(prefixes.length!=1){
  	isSingle=false;
  }
%>

<html>
<head>
<title>业务应用一览</title>
<meta http-equiv="目录类型" content="文本/html; 字符集=gb2312">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<LINK href="<%= EAPConfigHelper.getContextPath(request)%>/unieap/css/Style.css" rel=stylesheet>
<script language="javascript">
<!--

//设置页面元素的CSS
//eleName 页面元素名称
//className 要切换的CSS名称
function setClass(eleName,clsName) {
	document.all(eleName).className = clsName;
}

//-->
</script>

</head>

<body  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"  bgcolor="#ffffff">
   <% if (isSingle){ 
  String singurl=EAPConfigHelper.getContextPath(request)+"/enterapp.do?name="+prefixes[0]+"&welcome="+request.getContextPath().concat(prefixes[0]).concat(EAPConfigHelper.getApplicationConfig(pageContext, prefixes[0]).getWelcome());
  %>
       <jsp:forward page="<%=singurl%>" />
  <% } %>
  
<table width="100%" border="0"   bordercolordark="#FFFFFF" bordercolorlight="#cccccc" cellspacing="0" class="T_song12bk2" height="90%">
  <tr > 
      
    <td height="30" nowrap class="td" align="center" valign="top"> 
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <table width="586" border="0" cellpadding="0" cellspacing="0">
        <tr> 
          <td class="login_bg2" height="185" valign="top"> 
            <p>&nbsp;</p>
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr> 
                <td height="110">&nbsp;</td>
              </tr>
              <tr>
                <td align="center"> 
                  <table border="0" cellpadding="0" cellspacing="0">
      
			
          <logic:iterate id="currentPrefix" collection="<%= prefixes %>"
                         type="java.lang.String" offset="0" length="<%= strLength%>">
                 <tr> 
                      <td height="30" width="30"><img src="<%= EAPConfigHelper.getContextPath(request)%>/unieap/images/login_icon.gif" width="20" height="20"></td>
                      <td height="30">
                      <a href="<%= EAPConfigHelper.getContextPath(request)%>/enterapp.do?name=<%= currentPrefix%>&welcome=<%= request.getContextPath().concat(currentPrefix).concat(EAPConfigHelper.getApplicationConfig(pageContext, currentPrefix).getWelcome()) %>" class="T_song14_bk">
                      <%= EAPConfigHelper.getApplicationConfig(pageContext, currentPrefix).getTitle() %>
                      </a>
                      </td>
                 </tr>
          </logic:iterate>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
    </tr>
  </table>

</body>
</html>

