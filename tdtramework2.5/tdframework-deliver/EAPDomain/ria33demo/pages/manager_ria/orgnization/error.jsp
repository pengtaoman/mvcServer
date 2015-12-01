
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.neusoft.unieap.comp.individuation.topic.Topic"%>
<%@ page import="com.neusoft.unieap.config.SystemConfig"%>

<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>

    
    <title>My JSP 'error.jsp' starting page</title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    
    <META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<LINK href="<%=Topic.getInstance().getTopicPrefix(request)%>/common/Style.css"
	rel="stylesheet"></LINK>
  </head>
  
  <body>
     	
<center>
<table border="0" cellpadding="0"   cellspacing="0"   >
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr> 
        <td nowrap class="text_title" >&nbsp;</td>
        </tr>
    </table>
        <table width="366" height="119" border="0" cellpadding="0" cellspacing="0" class="warn_bg">
          <tr>
            <td align="center"><table border="0" cellpadding="0" cellspacing="0" class="table_base">
              <tr>
                <td width="50" height="50"><img src="<%=request.getContextPath()%>/unieap/css/common/images/icon33/j1.gif" width="33" height="33"></td>
                <td nowrap><!--  您无权访问此页面！--><bean:message key="manager.pages.manager.orgnization.error" bundle="<%=SystemConfig.SYSTEM_MANAGER_BUNDLE%>"/></td>
                </tr>
            </table></td>
          </tr>
        </table>
       </td>
  </tr>
</table>
</center>
  </body>
</html>
