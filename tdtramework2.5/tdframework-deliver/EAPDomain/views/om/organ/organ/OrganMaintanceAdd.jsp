<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ page import="com.neusoft.om.dao.organ.OrganVO" %>
<%@ page import="com.neusoft.om.bo.OMDictionaryBO" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>

<% 
	String operType = (String)request.getAttribute("OperType");
	String message = (String)request.getAttribute("Message");
	//��֯��������
	ParamObjectCollection organKindColl = OMDictionaryBO.instance.getOrganKindColl();
	String path = request.getContextPath();
	
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/organ/OrganMaintanceAdd.xsl"?>

<root>
	<create>
    <path><%=path%></path> 
    <OperType><%=operType%></OperType>
    <Message><%=message%></Message>
    <crm:FiltedParamList tagName="OrganKind" paramObjectCollection="<%=organKindColl%>" paramId="" ifAll="0" tabs="2"/>
   	<OrganStatus>
   		<option>
				<value>2</value>
				<caption>��ʽ</caption>
			</option>
   		<option>
				<value>1</value>
				<caption>����</caption>
			</option>
			<option>
				<value>4</value>
				<caption>����</caption>
			</option>
			<selected></selected>
		</OrganStatus>
		<InnerDuty>
			<option>
				<value>1</value>
				<caption>��</caption>
			</option>
   		<option>
				<value>0</value>
				<caption>��</caption>
			</option>
			<selected></selected>
		</InnerDuty>
   </create> 
</root>