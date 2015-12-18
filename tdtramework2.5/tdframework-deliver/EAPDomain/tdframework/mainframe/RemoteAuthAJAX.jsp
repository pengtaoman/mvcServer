<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.tdframework.authorization.RemoteAuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.authorization.RemoteAuthorizeColl" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeFactory" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.common.util.PassWord" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeUtil" %>
<%@ page import="com.neusoft.unieap.bl.context.AppContext" %>
<%@ page import="com.neusoft.unieap.bl.context.impl.AppContextImpl" %>
<%@ page import="com.neusoft.unieap.bl.interaction.InteractionObjectFactory" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	StringBuffer channelPara = new StringBuffer();
    channelPara.append("?user_id=").append(authVO.getWorkNo()).append("&user_name=").append(authVO.getEmployeeName()).append("&area_id=").append(authVO.getCityCode()).append("&city_id=").append(authVO.getAreaId());
	
	String userName = authVO.getWorkNo();
	String passWord = DESUtil.encrypt(PassWord.decode(authVO.getWorkPwd()));
	String orgPassWord = PassWord.decode(authVO.getWorkPwd());
	//String phpAuthUri = "http://192.168.216.15:9999/authenticate_crm.php?UserName=" + userName + "&PassWord=" + passWord;

	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("");
	AuthorizeFactory authFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, appContext);

	RemoteAuthorizeColl remoteAuthColl = authFactory.getRemoteAuthorizeColl();
	

%>
<html>


  <head>
    <base href="<%=basePath%>">
   
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
   <script type="text/javascript" src="<%=path%>/common/js/prototypeajax.js" ></script>

   	<script type="text/javascript">
var windowMap={};

function authInit() {
	try {

<%
StringBuffer iframehtml=new StringBuffer();
if(remoteAuthColl!=null){
		for(int i=0;i<remoteAuthColl.getRowCount();i++) {
			RemoteAuthorizeVO vo = remoteAuthColl.getRemoteAuthorizeVO(i);
			if(vo.isIfValid()) {
				String authUrl = "";
			
				if(vo.getAuthUrl().indexOf("initsession.do")>0){
					authUrl = vo.getAuthUrl() + channelPara.toString();
			    
			    }else{
			    	if(vo.getEncry().equals("true"))
						authUrl = vo.getAuthUrl() + "?" + vo.getUserKey() + "=" + userName + "&" + vo.getPasswordKey() + "=" + passWord;
					else
						authUrl = vo.getAuthUrl() + "?" + vo.getUserKey() + "=" + userName + "&" + vo.getPasswordKey() + "=" + orgPassWord;
				}
			
			
			
			//1：表示ajax方式
			//2：表示iframe方式
			//3：标识 window.open方式
			String authType = vo.getAuthType();
				if ("1".equals(authType)){
					out.println("new Ajax.Request( \"" + authUrl + "\",{  onComplete: doNothing } );");
				}else if ("2".equals(authType)) {
					iframehtml.append("<iframe style=\"border:0px;\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" border=\"0\" width=\"0\" height=\"0\"");
					iframehtml.append(" id=\"").append(vo.getName());
					iframehtml.append("\" name=\"").append(vo.getName());
					iframehtml.append("\" src=\"").append(authUrl).append("\" ></iframe>");
					iframehtml.append("\n");
				}else if ("3".equals(authType)) {
					out.println("windowMap[\""+vo.getName() + "\"]=window.open(\"" + authUrl + "\",\"" + vo.getName() + "\",\"left=3000,top=3000,height=1,width=1,status=no,toolbar=no,menubar=no,location=no\");");
					out.println("window.focus()");
				  	out.println("window.setTimeout(\"windowMap[\"" + vo.getName() + "\"].close()\"," + vo.getTimeWait() +");");
				}
		  	}
		}
	}
%>

	}catch(e){
		alert("无法跨域访问指定的URL.");
	}

}
//succeed fail
function doNothing(originalRequest){
var authResult=originalRequest.responseText;
var r=authResult.split("\n");
if (r.length>1){
	if (r[0].toLowerCase().indexOf("fail")>0){
		alert("对不起,对 "+r[1].replace("<"+"!--","").replace("--"+">","")+"的认证失败!");
	}
}
}
	</script>
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
  </head>
  
  <body onload="authInit();return false;">
    This is the remote auth page. <br>
    <%=iframehtml%>
  </body>
</html>
