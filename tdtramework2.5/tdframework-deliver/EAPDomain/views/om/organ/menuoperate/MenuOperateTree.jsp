<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/om_taglibs.tld" prefix="om" %>
<%@ taglib uri="/WEB-INF/tld/frame_taglibs.tld" prefix="frame" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/menuoperate/MenuOperateTree.xsl"?>

<root>
<dutyId>111</dutyId>

<FuncExec>
<om:MenuOperateTree/>
</FuncExec>

<frame:ControllerData/>
<actionJS>/views/om/organ/duty/dutyprivilege/MenuTree.js</actionJS>
</root>