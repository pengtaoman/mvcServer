<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.def.NWActDef"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWActDef actdefInfo = (NWActDef) request.getAttribute("actdefInfo");
%>

<html:html locale="true">
<head>
<uniflow:style />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>
<script language="javascript">
</script>
</head>
<uniflow:p_body width="92%">
	<uniflow:p_title>
      节点定义详细信息
</uniflow:p_title> <uniflow:p_content_comm_wrapper width="100%">
		<uniflow:p_content_table>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap>属性</td>
				<td class="main_label_td" valign="middle" nowrap>属性值</td>
			</tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>模板标识</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>节点名称</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getName()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>操作级别</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getOperInfo(actdefInfo
							.getOperationLevel(),request.getSession())%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>办理方式</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getRuleInfo(actdefInfo
							.getParallelRule(),request.getSession())%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>耦合类型</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getCoupleInfo(actdefInfo
							.getCoupleType(),request.getSession())%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>生存期</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getLimitTime()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>应用程序</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getAppID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>消息接收者</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getMsgReceiver()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时动作</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getOvertimeAction()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时应用</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getOvertimeAppID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>前置条件</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPreCondition()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>后置条件</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPostCondition()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>扩展属性</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getExtProp()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>分类</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getCategory()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>描述</td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getDescription()%>&nbsp;</td>
			</uniflow:p_content_tr>
		</uniflow:p_content_table>
	</uniflow:p_content_comm_wrapper>
	<uniflow:p_action>
        <uniflow:button id="cancel" action="javascript:window.close()" name="关闭"></uniflow:button>
    </uniflow:p_action>
    <table>
       <td height="20"></td>
    </table>
</uniflow:p_body>
</html:html>