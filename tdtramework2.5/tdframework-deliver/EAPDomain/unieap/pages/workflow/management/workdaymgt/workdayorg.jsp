<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<uniflow:style />
<title>组织结构列表</title>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="javascript">
function ok_onclick(){
var selectId=document.frames["actsel"].getSelectedID();
var parName=document.frames["actsel"].getSelectedName();
opener.unitorg=parName;
opener.unitorgId=selectId;
opener.set_textvalue();
window.close();
}


function cancle_onclick(){
window.close();
}
</script>
</head>
<body>
<uniflow:m_table style="main_title_table">
<tr>
<td><iframe id="actsel" src="<%=request.getContextPath() %>/oneactorsel.do?selType=2&openallChild=openunit&treeType=2" width="300" 
height="190" scrolling="yes" frameboder="0"></iframe></td>
</tr>
</uniflow:m_table>
<uniflow:p_action>
<uniflow:button id="ok" action="javascript:ok_onclick()" name="确定"></uniflow:button>
<uniflow:button  id="cancle" action="javascript:cancle_onclick()" name="取消"></uniflow:button>
</uniflow:p_action>
</body>
</html:html>