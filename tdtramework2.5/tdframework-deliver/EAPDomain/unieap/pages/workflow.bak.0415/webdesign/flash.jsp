<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html>
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style />
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function download(){
  location.href = "<%=request.getContextPath()%>/FLASHPlugInDownload";
  var info = "<%=(String)request.getSession().getAttribute("causation")%>";
  if (info=="noplugin"){
     alert("<%=MessageUtil.getString("workflow.skip.alert.error",request.getSession())%>");
     location.href ="<%=request.getContextPath()%>/unieap/pages/workflow/webdesign/flash.jsp" ;
  }
}
function success_download(){
  opener.close();
  window.close();
}

</script>
</head>  
<body>
<center>
<table border="0" cellpadding="0"   cellspacing="0"   >
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" >Flash插件下载</td>
        </tr>
    </table>
        <table width="366" height="119" border="0" cellpadding="0" cellspacing="0" class="warn_bg">
          <tr>
            <td align="center"><table border="0" cellpadding="0" cellspacing="0" class="table_base">
              <tr>
                <td width="50" height="50"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/images/j1.gif" width="33" height="33"></td>
                <td nowrap>您的浏览器没有安装Flash插件<br>
               	 安装插件后请重新打开此页面<br>
                <a href="javascript:download()">下载</a>
                </td>
                </tr>
            </table></td>
          </tr>
        </table>
        <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                     <!-- uniflow:button id="start" action="javascript:success_download()"name="button.start"/> -->
                     <uniflow:button id="success" action="success_download()"name="button.back"/>
                </tr>
            </table></td>
          </tr>
      </table></td>
  </tr>
</table>
</center>
</body>
</html>
