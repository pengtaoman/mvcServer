<%
/* JSP程序简要描述信息
 **************************************************************
 * 程序名	    : index.jsp
 * 建立日期	: 2007-08-22
 * 作者		: ylm
 * 模块		: 数据角色维护
 * 描述		: 
 * 备注		: 
 * ------------------------------------------------------------
 * 修改历史
 * 序号		日期		修改人			修改原因
 * 1
 * 2
 **************************************************************
 */
%>
<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String path = request.getContextPath();
  //String paramRoleManage = path + "/om/ParamRoleManage.do?OperType=initManagePage";
  String paramRoleManage = path + "/views/om/organ/dataParamRole/dataRoleManage/ParamRoleManage.jsp";
  String paramRoleList   = path + "/om/ParamRoleManage.do?OperType=init";
  String paramRoleAdjust = path + "/blank.html";
  String hiddenPage = path + "/blank.html";//path + "/views/om/organ/dataParamRole/dataRoleManage/hiddenPage.jsp";
%>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title></title>
	</head>

	<frameset rows="*" cols="350,*,0" framespacing="0" frameborder="no" border="0">
		<frameset rows="130,*" cols="*" framespacing="0" frameborder="no" border="0">
			<frame src="<%=paramRoleManage%>" name="RoleManage" scrolling="no" noresize="noresize" />
			<frame src="<%=paramRoleList%>" name="ParamRoleList" scrolling="auto" noresize="noresize" />
		</frameset>
		<frame src="<%=paramRoleAdjust%>" name="ParamRoleAdjust" scrolling="auto" noresize="noresize" />
		<frame src="<%=hiddenPage%>" name="Hidden" scrolling="no" noresize="noresize" />
	</frameset>

	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>