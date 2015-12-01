<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="com.neusoft.om.dao.checkPerson.CheckPersonVO"%>

<%String path = request.getContextPath();
            String message = (String) request.getAttribute("message") == null ? "" : (String) request
                    .getAttribute("message");

            %>
<html>
	<head>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=path%>/views/om/organ/checkPerson/js/list.js"></script>
		<script language="JavaScript">
		
	</script>
	</head>
	<body onLoad="init('<%=message%>')" class="mainBody">
		<ec:table items="cheObjs" var="che" rowsDisplayed="10" action="${pageContext.request.contextPath}/checkperson.do?method=query">
			<ec:row>
				<ec:column cell="radiobox" headerCell="radiobox"  onclick="getWorkNO('${che.fWorkNO}','${che.checkFlag}')" alias="workno" width="20"/>
				<ec:column property="fWorkNO"     title="¹¤ºÅ" />
				<ec:column property="checkFlag"      title="ÉóºË×´Ì¬" />
				<ec:column property="checkPerson" title="ÉóºËÈË" />
				<ec:column property="checkDate"   title="ÉóºËÈÕÆÚ" />
			</ec:row>
		</ec:table>
	</body>
</html>
