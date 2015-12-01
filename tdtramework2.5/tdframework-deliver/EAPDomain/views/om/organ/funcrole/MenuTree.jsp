<%
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 行政区域维护
* 建立日期: 
* 作者		: chenzt
* 模块		: 权限
* 描述		: 权限系统-角色信息列表
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1
* 2
**************************************************************
*/
%>

<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/om_taglibs.tld" prefix="om" %>
<%@ taglib uri="/WEB-INF/tld/frame_taglibs.tld" prefix="frame" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/menu/MenuTree.xsl"?>

<root>
<roleId><%=request.getParameter("roleId")%></roleId>
<dutyId><%=request.getParameter("dutyId")%></dutyId>

<FuncExec>
<om:MenuTree/>
</FuncExec>

<frame:ControllerData/>

<actionJS>views/om/organ/funcrole/MenuTree.js</actionJS>
</root>
