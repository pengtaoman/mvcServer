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
var selectName=document.frames["actsel"].getSelectedName();
var selectType=document.frames["actsel"].getSelectedType();
opener.assigneeName=selectName;
opener.assigneeType=selectType
opener.assigneeId=selectId;
var textfalg=opener.openfalg;
opener.set_textvalue(textfalg);
window.close();
}


function cancle_onclick(){
window.close();
}
</script>
</head>
<body>
<uniflow:m_table style="main_title_table">
<tr height="20"></tr>
<tr>
<td width="280" ><iframe id="actsel" src="<%=request.getContextPath() %>/oneactorsel.do?selType=1&treeType=1" width="280" 
height="190" scrolling="yes" frameboder="0"></iframe></td>
</tr>
</uniflow:m_table>
<uniflow:p_action>
<uniflow:button id="ok" action="javascript:ok_onclick()" name="确定"></uniflow:button>
<uniflow:button  id="cancle" action="javascript:cancle_onclick()" name="取消"></uniflow:button>
</uniflow:p_action>
</body>
</html:html>