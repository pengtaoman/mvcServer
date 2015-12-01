<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ page import="com.neusoft.om.dao.organ.OrganVO" %>
<%@ page import="com.neusoft.om.bo.OMDictionaryBO" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>

<% 
	String operType = (String)request.getAttribute("OperType");
	OrganVO organVO = (OrganVO)request.getAttribute("OrganVO");
	//得到参数信息
	//组织机构类型
	ParamObjectCollection organKindColl = OMDictionaryBO.instance.getOrganKindColl();
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/organ/OrganMaintanceQuery.xsl"?>

<root>
	<create>
    <path><%=path%></path> 
    <Organ>
    	<%=organVO.toString(2)%>
    </Organ>
    <OperType><%=operType%></OperType>
    <crm:FiltedParamList tagName="OrganKind" paramObjectCollection="<%=organKindColl%>" paramId="<%=String.valueOf(organVO.getOrganKind())%>" ifAll="0" tabs="2"/>
   	<OrganStatus>
   		<option>
				<value>1</value>
				<caption>报批</caption>
			</option>
   		<option>
				<value>2</value>
				<caption>正式</caption>
			</option>
			<option>
				<value>4</value>
				<caption>废弃</caption>
			</option>
			<selected><%=organVO.getOrganStatus()%></selected>
		</OrganStatus>
		<InnerDuty>
			<option>
				<value>0</value>
				<caption>否</caption>
			</option>
   		<option>
				<value>1</value>
				<caption>是</caption>
			</option>
			<selected><%=organVO.getInnerDuty()%></selected>
		</InnerDuty>
   </create> 
</root>