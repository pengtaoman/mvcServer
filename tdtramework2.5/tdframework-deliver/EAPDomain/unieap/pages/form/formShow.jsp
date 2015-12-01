<%@ page language="java" pageEncoding="GBK" %>

<%@page import="java.util.Properties"%>

<%@page import="com.neusoft.form.api.FormPersistManager"%>
<%@page import="com.neusoft.form.api.FormDef"%>
<%@page import="com.neusoft.form.api.PersistEntry"%>
<%@page import="com.neusoft.form.engine.persist.DBConnectionsInfo"%>
<%@page import="com.neusoft.form.engine.util.Configuration"%>
<%@page import="com.neusoft.form.engine.util.FormConstants"%>
<%@page import="com.neusoft.form.pool.JDBCPoolMetaData"%>

<%@page import="com.neusoft.unieap.config.EAPConfigHelper"%>
<%@page import="com.neusoft.unieap.service.org.Person"%>
<%@page import="com.neusoft.unieap.service.org.Org"%>
<%@page import="com.neusoft.unieap.service.org.OrgFactory"%>

<%
String path = request.getContextPath();
String fid = request.getParameter("fid");
if(fid==null || fid.equals("")) {
	out.print("必须指定fid参数");
	return;
}

String uid = request.getParameter("uid");
if(uid==null || uid.equals("")) { // 如果没有传入uid，则自动获取当前用户的帐号信息
	// 获取登录用户名
	Person psn = EAPConfigHelper.getUserInfo(request);

	// 获取用户帐号
	String psnId = psn.getID();
	Org org = OrgFactory.getOrgFactory().getOrg();
	uid = org.getPsnByID(psnId).getAccount();
}

String rpath = "unieap/pages/form";
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String formUrl = basePath + "formlistener?fid=" + fid + "&uid=" + uid;
%>

<%!

public static String getFormName(String formID, HttpServletRequest request) throws Exception{
	// 表单初始化
	String webrootRealPath = request.getSession().getServletContext().getRealPath("/");
	String formPropRealPath = webrootRealPath + "WEB-INF/conf/unieap/form/form.properties";
	Configuration.load(formPropRealPath);
	
	//取表单系统数据源名称
	String datasource = Configuration.getProperty(Configuration.FORM_DS,"UNIEAP");
	//取表单名称
	Properties props = getProperties(datasource);
	JDBCPoolMetaData meta = new JDBCPoolMetaData(props);
	FormPersistManager formPersitManager = PersistEntry.createFormPersistManager(meta);
	FormDef formDef = formPersitManager.loadFormByID(formID);
	String formName = formDef.getName();
	return formName;
}

private static Properties getProperties(String datasource) throws Exception{
	try {
		
		if(DBConnectionsInfo.getInstance().size()==0){
			String provider = Configuration.getProperty(Configuration.PROVIDER,"JDBC");
			String webroot = Configuration.getProperty("webroot","");
			if(provider.equalsIgnoreCase("JDBC")){
				DBConnectionsInfo.getInstance().load(null,webroot+"WEB-INF/conf/unieap/form/datasources.xml");
			}
		}
		Properties props = DBConnectionsInfo.getInstance().getDBConnectionInfo(datasource);
		String provider = Configuration.getProperty(Configuration.PROVIDER,"JDBC");
		if(props == null){
			if(provider.equalsIgnoreCase("JDBC")){
				throw new Exception("数据源"+datasource+"的连接信息不存在，请检查数据库连接。");
			} else {
				props = new Properties();
				props.setProperty("id",datasource);
				props.setProperty("name",datasource);
				if(provider.equalsIgnoreCase("DRM")){
					props.setProperty(Configuration.PROVIDER, "DRM");
				}
				else if(provider.equalsIgnoreCase("TOMCAT")){
					props.setProperty(FormConstants.CONFIG_PREFIX + Configuration.JNDI, "java:comp/env/"+datasource);
					props.setProperty(Configuration.PROVIDER, "DATASOURCE");
				}else{
					props.setProperty(FormConstants.CONFIG_PREFIX + Configuration.JNDI, datasource);
					props.setProperty(Configuration.PROVIDER, "DATASOURCE");
				}
				DBConnectionsInfo.getInstance().addDBServerInfo(props);
				props = DBConnectionsInfo.getInstance().getDBConnectionInfo(datasource);
				
			}
		}
		
		return props;
	} catch (Exception e) {
		throw e;
	}

}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">

    <title>Form Show</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="Form">
	<meta http-equiv="description" content="Form Show">

	<link rel="stylesheet" type="text/css" href="css/css.css">

  </head>

  <body leftmargin="0" topmargin="0">

		<table  border="0" cellspacing="0" cellpadding="0">
		  <tr>
		    <td height="30">
			  <table width="100%" border="0" cellspacing="0" cellpadding="0">
		        <tr>
		          <td background="<%=rpath%>/css/images2/table_B.jpg" width="1%" height="16"></td>
		          <td background="<%=rpath%>/css/images2/table_B.jpg" width="2%"><img src="<%=rpath%>/css/images2/jian.gif" width="16" height="16"></td>
		          <td background="<%=rpath%>/css/images2/table_B.jpg" width="53%" 
		          	style="font-size: 11pt; font-weight: 100">
		          	<strong>
		          		&nbsp;<%=getFormName(fid, request)%>
		          	</strong>
		          </td>
		          <td background="<%=rpath%>/css/images2/table_B.jpg" width="42%"><div align="right">
		              <table width="59%" border="0" cellpadding="0" cellspacing="0" class="Font12">
		                <tr valign="bottom">
		                  <td width="25%" valign="middle">
		                    <div align="center">
		                    	<img src="<%=rpath%>/css/images2/save.gif" width="40" height="15" 
		                    		onclick="alert(frm_formContent.formComplete()?'保存成功' : '保存失败');"
		                    		style="cursor: hand;">
		                    </div>
		                  </td>
		                  <td width="25%" valign="middle">
		                    <div align="center">
		                     	<img src="<%=rpath%>/css/images2/print.gif" width="40" height="15"
		                    		onclick="frm_formContent.printAll();"
		                    		style="cursor: hand;">
		                    </div>
		                  </td>
		                  <td width="25%" valign="middle">
		                    <div align="center">
		                    	<img src="<%=rpath%>/css/images2/see.gif" width="40" height="15"
		                    		onclick="frm_formContent.previewAll();"
		                    		style="cursor: hand;">
		                    </div>
		                  </td>
		                  <td width="25%" valign="middle">
		                  </td>
		                  <td width="2%" background="<%=rpath%>/css/images2/table_B.jpg">
		                  	<div align="right">
		                  		<img src="<%=rpath%>/css/images2/table_C.jpg" width="3" height="28">
		                  	</div>
		                  </td>
		                </tr>
		              </table>
		             </div>
					</td>
		         </tr>

		       </table>
			 </td>
		  </tr>
		  <tr>
		  	<td>
		       <iframe id="frm_formContent" name="frm_formContent" 
		         frameborder="0"
		       	 height="480" width="820" frameBorder="1" src="<%=formUrl%>">
		       </iframe>
		    </td>
		  </tr>
		</table>

  	
    <br>
  </body>
</html>
