<%@ page import="com.neusoft.tdframework.authorization.RemoteAuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.authorization.RemoteAuthorizeColl" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeFactory" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.common.util.PassWord" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeUtil" %>
<%@ page import="com.neusoft.unieap.bl.context.AppContext" %>
<%@ page import="com.neusoft.unieap.bl.context.impl.AppContextImpl" %>
<%@ page import="com.neusoft.unieap.bl.interaction.InteractionObjectFactory" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	String userName = authVO.getWorkNo();
	String passWord = PassWord.decode(authVO.getWorkPwd());
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
   <!-- script language="JavaScript" src="<%=path%>/common/js/prototypeajax.js" ></script -->

   	<script type="text/javascript">
	var windowMap={};
	
	function authInit() {
	
	<%
		if(remoteAuthColl!=null){
			for(int i=0;i<remoteAuthColl.getRowCount();i++) {
				RemoteAuthorizeVO vo = remoteAuthColl.getRemoteAuthorizeVO(i);
				if(vo.isIfValid()) {
				String authUrl = vo.getAuthUrl() + "?" + vo.getUserKey() + "=" + userName + "&" + vo.getPasswordKey() + "=" + passWord;
	%>
	
	var url="<%=authUrl%>";
	var winId="<%=vo.getName()%>";
	var waitTime="<%=vo.getTimeWait()%>";
	windowMap[winId]=window.open(url,winId,"left=2000,top=2000,height=1,width=1,status=no,toolbar=no,menubar=no,location=no");
	top.focus();
	window.setTimeout("windowMap[\""+winId+"\"].close()",waitTime);
	
	<%
				//out.println(vo.getName() + "=window.open(\"" + authUrl + "\",\"" + vo.getName() + "\",\"left=3000,top=3000,height=1,width=1,status=no,toolbar=no,menubar=no,location=no\");");
				//out.println("window.focus()");
			  	//out.println("window.setTimeout(\"" + vo.getName() + ".close()\"," + vo.getTimeWait() +");");
	
				//out.println("new Ajax.Request( \"" + authUrl + "\",{  onComplete: doNothing } );");
			  	}
			}
		}
	%>
	
	}

	function doNothing(){
	}
	</script>

    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
  </head>
  
  <body onload="authInit();return false;">
    This is my remote auth page. <br>
  </body>
</html>
