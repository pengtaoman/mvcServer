<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<% 
AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);

String userNameDs = authVO.getWorkNo();
String passWordDs = (String)request.getSession(true).getAttribute("decodedPass");
String endpasswordDES = DESUtil.encrypt(passWordDs);

StringBuffer para = new StringBuffer();
para.append("&STAFFNO=").append(userNameDs).append("&PASSWORD=").append(endpasswordDES);

String authParam = para.toString();
%>
<script type="text/javascript">
var last = "<%=authParam%>";
</script>