<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<html>
<head>
<uniflow:style/>
<script language="javascript">
</script>

</head>

<body>
 <uniflow:m_table style="main_button">
	<tr><td>
		<uniflow:m_button_table>
		 	<uniflow:button id="ok" action="javascript:parent.rightframe.save()"name="button.ok"/>
		 	<uniflow:button id="cancel" action="javascript:history.back()"name="button.back"/>
		</uniflow:m_button_table>
	</td></tr>
</uniflow:m_table>
</BODY>
</html>