<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<script language=JavaScript>
function back(){
  alert('<%=MessageUtil.getString("form.upload.fail",session) %>');
  
  location.href="<%=request.getContextPath()%>/unieap/pages/form/import.jsp";
}
</script>
<body onload="javascript:back();">
</body>