<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.unieap.ria.config.RIAConfig" %>
<%@ page import="com.neusoft.unieap.service.org.Person" %>

<%
	String path = request.getContextPath();
    String appPath = EAPConfigHelper.getApplicationContextPath(request);
    String cmpPath = request.getRequestURI(); //获取页面路径地址
    String themePath = path + "/unieap/ria3.3/unieap/themes/blue/css";
    boolean dialogRelogin= RIAConfig.DIALOGRELOGIN;//设置是否使用Dialog进行重新登录
	boolean isEncrypt = RIAConfig.ENCRYPT;//是否使用加密
	Person person = (Person) session.getAttribute("userinfo");
%>
<style>
	body{
		margin : 0px;
		visibility : hidden;
	}
</style>
<script type="text/javascript">
	//var beginTime = new Date();
	//初始化系统参数
	unieap = {};
	unieap.WEB_APP_NAME = "<%=path%>";
	unieap.appPath = "<%=appPath%>";
	unieap.cmpPath = "<%=cmpPath%>"; //unieap.cmpPath用于grid自定义中
	unieap.dialogRelogin="<%=dialogRelogin%>";
	unieap.isEncrypt = "<%=isEncrypt%>";
	unieap.loginAccount = '<%=(person!=null?person.getAccount():"")%>';
	unieap.locale = "zh_CN";
</script>
 
<link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" charset="utf-8"></link>
<link rel="stylesheet" type="text/css" href="<%=themePath%>/unieap.css" ></link>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/patch/dojo-patch.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dijit/dijit.js" ></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/nls/application_zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/global.js"></script>
<script type="text/javascript" src="<%=path%>/orderaccept/custom/unieapconfig/unieap-combo.js" ></script>

<script type="text/javascript">
	//var jsTime = new Date();
	dojo.addOnLoad(function(){
		dojo.style(document.body,"visibility","visible");
		//设置容器的大小
		//unieap.fireContainerResize();	
		//解决在dojo.addOnLoad方法里控件聚焦的问题
		unieap.blurWidget();
		
	});
	unieap.session.dialogRelogin=<%=dialogRelogin%>;
</script>

