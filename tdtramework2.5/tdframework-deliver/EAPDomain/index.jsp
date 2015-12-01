<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%@ page import="java.util.StringTokenizer" %>

<%
	String path=EAPConfigHelper.getContextPath(request);
	//获取request中的用户名信息：
	String tokenStr = (String)request.getParameter("token");  //获取request 中的认证token段
	String username = null;
	String password = null;
	String oname = null;
	String au = "";
	String double_flag = (String)request.getParameter("double_flag"); 
	if(double_flag==null)
		double_flag ="";
	//if(double_flag.equals("1"))
		//double_flag ="on";
		
	if(tokenStr!=null){
		String tokenStra = DESUtil.decrypt(tokenStr);
		String[] stra = tokenStra.split("&");
		username = stra[1];  //获取认证token中的用户名字段
		password = stra[2];  //获取认证token中的密码字段
		au = stra[0];  //获取认证token中的认证段
		oname = stra[3];  //获取认证token中的第三方用户名字段
	}
	if (au.equals("1")) {%>
<script type="text/javascript" >
document.location.href = "<%=path%>/ssologin.do?token=<%=tokenStr%>&double_flag=<%=double_flag%>";
</script>
<%} else {%>
<jsp:forward page="/tdframework/mainframe/login.jsp" />
<%}%>