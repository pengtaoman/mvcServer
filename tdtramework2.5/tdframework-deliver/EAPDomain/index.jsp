<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%@ page import="java.util.StringTokenizer" %>

<%
	String path=EAPConfigHelper.getContextPath(request);
	//��ȡrequest�е��û�����Ϣ��
	String tokenStr = (String)request.getParameter("token");  //��ȡrequest �е���֤token��
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
		username = stra[1];  //��ȡ��֤token�е��û����ֶ�
		password = stra[2];  //��ȡ��֤token�е������ֶ�
		au = stra[0];  //��ȡ��֤token�е���֤��
		oname = stra[3];  //��ȡ��֤token�еĵ������û����ֶ�
	}
	if (au.equals("1")) {%>
<script type="text/javascript" >
document.location.href = "<%=path%>/ssologin.do?token=<%=tokenStr%>&double_flag=<%=double_flag%>";
</script>
<%} else {%>
<jsp:forward page="/tdframework/mainframe/login.jsp" />
<%}%>