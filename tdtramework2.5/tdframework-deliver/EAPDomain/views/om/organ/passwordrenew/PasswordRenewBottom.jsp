<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.area.AreaColl" %>
<%@ page import="com.neusoft.om.dao.duty.DutyColl" %>
<%@ page import="com.neusoft.om.dao.organkind.OrganKindColl" %>
<%@ page import="com.neusoft.om.dao.organ.OrganColl" %>
<%@ page import="com.neusoft.om.bo.OMDictionaryBO" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeColl" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="java.lang.String"%>
<%
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	String operType = (String)request.getAttribute("OperType");
	String operFlag = (String)request.getAttribute("OperFlag");
	String busDutyId = "";
	String gender = "";
	String educateLevel = "";
	String income= "";
	String marriageStatus= "";
	String areaId= "";
	String organId= "";
	String dutyId = "";
	EmployeeVO employeeVO = (EmployeeVO)request.getAttribute("EmployeeVO");
	if(employeeVO != null){
		busDutyId = String.valueOf(employeeVO.getBusDutyId());
		gender = String.valueOf(employeeVO.getGender());
		educateLevel=String.valueOf(employeeVO.getEducateLevel());
		income= String.valueOf(employeeVO.getIncome());
		marriageStatus= String.valueOf(employeeVO.getMarriageStatus());
		areaId= employeeVO.getAreaId();
		organId=employeeVO.getOrganId();
		dutyId= String.valueOf(employeeVO.getDutyId());
	}
	if(message == null){
		message = "";
	}
	//得到动态下拉框数据
	DutyColl dutyColl = (DutyColl)request.getAttribute("DutyColl");
	OrganColl organColl = (OrganColl)request.getAttribute("OrganColl");
	AreaColl areaColl = (AreaColl)request.getAttribute("AreaColl");
	OrganKindColl organKindColl = (OrganKindColl)request.getAttribute("OrganKindColl");
	
	//得到参数信息
	ParamObjectCollection busDutyColl = (ParamObjectCollection)request.getAttribute("busDutyColl");//职位
	ParamObjectCollection genderColl = (ParamObjectCollection)request.getAttribute("genderColl");//性别
	ParamObjectCollection educateLevelColl = (ParamObjectCollection)request.getAttribute("educateLevelColl");//教育水平
	ParamObjectCollection incomeColl = (ParamObjectCollection)request.getAttribute("incomeColl");//收入
	ParamObjectCollection marriageStatusColl = (ParamObjectCollection)request.getAttribute("marriageStatusColl");//婚姻状况
%>
<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/passwordrenew/PasswordRenewBottom.xsl"?>

<root>
<create>
	<!--职位下拉框数据-->
<crm:FiltedParamList tagName="BusDuty" paramObjectCollection="<%=busDutyColl%>" paramId="<%=busDutyId%>" ifAll="0" tabs="2"/>
<!--性别下拉框数据-->
<crm:FiltedParamList tagName="Gender" paramObjectCollection="<%=genderColl%>" paramId="<%=gender%>" ifAll="0" tabs="2"/>
<!--教育程度下拉框数据-->
<crm:FiltedParamList tagName="EducateLevel" paramObjectCollection="<%=educateLevelColl%>" paramId="<%=educateLevel%>" ifAll="0" tabs="2"/>
<!--收入下拉框数据-->
<crm:FiltedParamList tagName="Income" paramObjectCollection="<%=incomeColl%>" paramId="<%=income%>" ifAll="0" tabs="2"/>
<!--婚姻状况下拉框数据-->
<crm:FiltedParamList tagName="MarriageStatus" paramObjectCollection="<%=marriageStatusColl%>" paramId="<%=marriageStatus%>" ifAll="0" tabs="2"/>
<!--区域下拉框-->
<om:AreaTag name = "Area"  code = "<%=areaId%>" areaColl = "<%=areaColl%>" />
<!--组织机构下拉框-->
<om:OrganTag name = "Organ" code = "<%=organId%>" organColl = "<%=organColl%>"/>
<!--职务下拉框-->
<om:DutyTag name = "Duty"  code = "<%=dutyId%>" dutyColl = "<%=dutyColl%>" />
<!--组织机构类型和职务关联下拉框-->

		<!--是否内部职员下拉框数据-->
		<InnerEmployee>
			<option>
				<value>1</value>
				<caption>是</caption>
			</option>
			<option>
				<value>0</value>
				<caption>否</caption>
			</option>
			<selected><%if(employeeVO!=null){%><%=employeeVO.getEmployeeType()%><%}%></selected>
		</InnerEmployee>
	<EmployeeInfo>
		<%if(employeeVO!=null){%>
			<%=employeeVO.toString(3)%>
		<%}%>
	</EmployeeInfo>
	<Message><%= message%></Message>
	<OperType><%=operType%></OperType>
	<OperFlag><%=operFlag%></OperFlag>
	<path><%=path%></path> 
</create>
</root>
