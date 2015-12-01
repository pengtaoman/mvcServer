<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<script language=JavaScript>
function back(){
  alert('<%=MessageUtil.getString("form.privilege.noprivilege",session) %>');
  history.back();
}
</script>
<body background="css/images/bg.gif" onload="javascript:back()">
</body>