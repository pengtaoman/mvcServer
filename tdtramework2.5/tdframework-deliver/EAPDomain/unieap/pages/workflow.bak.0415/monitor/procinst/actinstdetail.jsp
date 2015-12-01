<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWActInst"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWActInst actinstInfo = (NWActInst) request
					.getAttribute("actinstInfo");
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
      节点实例详细信息
</uniflow:p_title> <uniflow:p_content_comm_wrapper width="100%">
		<uniflow:p_content_table>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap>属性</td>
				<td class="main_label_td" valign="middle" nowrap>属性值</td>
			</tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>实例标识</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getActInstID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>节点名称</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getName()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>办理方式</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getRuleInfo(actinstInfo
							.getParallelType(),request.getSession())%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>节点状态</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getStateStr(actinstInfo.getCurState(),request.getSession())%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>开始时间</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getStartTimeString()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>完成时间</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getCompleteTimeString()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>生存期</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getLimitTime()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时时间</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getProlongTime()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>优先级</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPriority()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>应用程序</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getAppDefID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时动作</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getOvertimeAction()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时应用</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getOvertimeAppDefID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>超时次数</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getOvertimeCount()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>前置条件</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPreCondition()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>后置条件</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPostCondition()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>分类</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getCategory()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>描述</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getDescription()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap>前一节点实例标识</td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPreActInstID()%>&nbsp;</td>
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