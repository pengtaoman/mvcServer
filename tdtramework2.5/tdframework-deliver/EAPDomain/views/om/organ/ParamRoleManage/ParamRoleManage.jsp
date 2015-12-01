<%
/* JSP程序简要描述信息
 **************************************************************
 * 程序名	    : ParamRoleManage.jsp
 * 建立日期	: 2006-07-12
 * 作者		: wangwei
 * 模块		: 参数角色维护
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
  String paramRoleManage = path + "/views/om/organ/ParamRoleManage/ParamRoleManageButton.jsp";
  String paramRoleList = path + "/om/ParamRoleManage.do?OperType=init";
  String paramRoleAdjust = path + "/blank.html";
  String hidden = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title></title>
	</head>

	<frameset rows="*" cols="350,*,0" framespacing="0" frameborder="no" border="0">
		<frameset rows="130,*" cols="*" framespacing="0" frameborder="no" border="0">
			<frame src="<%=paramRoleManage%>" name="RoleManage" scrolling="no" noresize="noresize" />
			<frame src="<%=paramRoleList%>" name="ParamRoleList" scrolling="auto" noresize="noresize" />
		</frameset>
		<frame src="<%=paramRoleAdjust%>" name="ParamRoleAdjust" scrolling="yes" noresize="noresize" />
<!--		</frameset>-->
		<frame src="<%=hidden%>" name="Hidden" scrolling="no" noresize="noresize" />
	</frameset>

	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>