<%
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: ��������ά��
* ��������: 
* ����		: chenzt
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-��ɫ��Ϣ�б�
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1
* 2
**************************************************************
*/
%>

<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.om.omutil.OMRequestParameter" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>
<%@ taglib uri="/WEB-INF/tld/om_taglibs.tld" prefix="om" %>
<%@ taglib uri="/WEB-INF/tld/frame_taglibs.tld" prefix="frame" %>

<%
String path = request.getContextPath();
String employeeId = "";
String workNo = "";
EmployeeVO employeeVO = (EmployeeVO)request.getAttribute(OMRequestParameter.EMPLOYEE_INFO);
if(employeeVO != null){
	employeeId = employeeVO.getEmployeeId();
	workNo = employeeVO.getWorkNo();
}

String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/menu/MenuTree.xsl"?>

<root>
<FuncExec>
<om:MenuTree/>
</FuncExec>

<frame:ControllerData/>
<actionJS>/views/om/organ/poweradjust/MenuTree.js</actionJS>
<employeeId><%=employeeId%></employeeId>
<workNo><%=workNo%></workNo>
</root>
