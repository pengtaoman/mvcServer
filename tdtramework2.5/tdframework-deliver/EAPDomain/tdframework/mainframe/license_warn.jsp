<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String path=EAPConfigHelper.getContextPath(request);
String projectNo = (String)request.getParameter("projectNo");
String projectName = (String)request.getParameter("projectName");
String licenseNo = (String)request.getParameter("licenseNo");
String expiredDate = (String)request.getParameter("expiredDate");
projectName = new String(projectName.getBytes("iso-8859-1"),"GBK");

//String expireStatus = (String)request.getParameter("expireStatus");
String firstLineMsg = "��ҵ������֤(license)�Ѿ����ڣ�����ϵ����Ա��";
String secondLineMsg = "��Ŀ��ţ�" + projectNo + ";��Ŀ���ƣ�" + projectName;
String thirdLineMsg = "�����գ�" + expiredDate + ";���֤��ţ�" + licenseNo;
System.out.println("��Ŀ���ƣ�"+projectName);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>license�Ѿ����ڣ�����ϵ����Ա</title>
<style type="text/css">
<!--
.loginform {
	font-size: 14px;
}
.bk {
	background-image: url(<%=path%>/tdframework/mainframe/images/login_ok.gif);
	font-size: 14px;
}
.buttonbk {
    background: transparent;
	background-image: url(<%=path%>/tdframework/mainframe/images/login_button.gif);
	width: 88;
	height: 36;
	border: 0; 
	font-size: 14px;
}

.reloginbutton {
    background: transparent;
	background-image: url(<%=path%>/tdframework/mainframe/images/relogin.gif);
	width: 72;
	height: 27;
	border: 0; 
	font-size: 14px;
}

-->
</style>

<script type="text/javascript">
<!--

var APP_PATH="<%=path%>";
//-->
</script>

</head>
<body >
<form  name="logonform" method="post" >
<table align="left" valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" height="30%">
<tr>
	<td id="headBg" width="100%" height="100%">
	  <table align="center" border="0" cellpadding="0" cellspacing="0" width="598" >
        <tr>
          <td height="34" colspan="2" ><font color="red"><%=firstLineMsg%></font></td>
        </tr>
        <tr>
          <td  height="34" colspan="2" ><font color="red"><%=secondLineMsg%></font></td>
        </tr>
        <tr>
           <td height="34" colspan="2"><font color="red"><%=thirdLineMsg%></font></td>
       </tr>
	  </table>
	</td>
</tr>
</table>

</form>
</body>
</html>