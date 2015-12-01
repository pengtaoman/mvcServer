<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
	<title>引擎事件</title>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/events.js"></script>
	<body onload="initEvents()">
		<input type="hidden" id="path" value="" />
		<br>
		<div class="main_label_outline">
			<table width="95%">
				<tr>
					<td style="font-size: 13px; width: 80px; height: 20px">
						事件接收者：
					</td>
					<td style="font-size: 13px; width: 430px; height: 20px">
						<input type="text" id="msgReceiver" onkeypress="validateInput()"
							value="" style="width: 400px" maxlength="20">
					</td>
				</tr>
			</table>
			<fieldset style="width: 550px;">
				<legend>
					事件监控
				</legend>
				<table>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procSuspendEventType" value="504">
							<input type="hidden" id="procSuspendEventAction" value="">
							<input type="checkbox" id="procSuspendEvent" name="events"
								onpropertychange="ock_check('procSuspendEvent')" value="">
							挂起
						</td>
						<td>
							<input id="procSuspendEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procSuspendEventButton" name="procSuspendEvent"
								class="button_small" onclick="openApp(event)" type="button"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procCompletedEventType" value="508">
							<input type="hidden" id="procCompletedEventAction" value="">
							<input type="checkbox" id="procCompletedEvent" name="events"
								onpropertychange="ock_check('procCompletedEvent')" value="">
							完成
						</td>
						<td>
							<input id="procCompletedEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procCompletedEventButton" type="button"
								class="button_small" name="procCompletedEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procAbortEventType" value="503">
							<input type="hidden" id="procAbortEventAction" value="">
							<input type="checkbox" id="procAbortEvent" name="events"
								onpropertychange="ock_check('procAbortEvent')" value="">
							终止
						</td>
						<td>
							<input id="procAbortEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procAbortEventButton" type="button"
								class="button_small" name="procAbortEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procStartEventType" value="502">
							<input type="hidden" id="procStartEventAction" value="">
							<input type="checkbox" id="procStartEvent" name="events"
								onpropertychange="ock_check('procStartEvent')" value="">
							启动
						</td>
						<td>
							<input id="procStartEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procStartEventButton" type="button"
								class="button_small" name="procStartEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procRestartEventType" value="507">
							<input type="hidden" id="procRestartEventAction" value="">
							<input type="checkbox" id="procRestartEvent" name="events"
								onpropertychange="ock_check('procRestartEvent')" value="">
							重启动
						</td>
						<td>
							<input id="procRestartEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procRestartEventButton" type="button"
								class="button_small" name="procRestartEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procResumeEventType" value="505">
							<input type="hidden" id="procResumeEventAction" value="">
							<input type="checkbox" id="procResumeEvent" name="events"
								onpropertychange="ock_check('procResumeEvent')" value="">
							恢复
						</td>
						<td>
							<input id="procResumeEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procResumeEventButton" type="button"
								class="button_small" name="procResumeEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procCreateEventType" value="501">
							<input type="hidden" id="procCreateEventAction" value="">
							<input type="checkbox" id="procCreateEvent" name="events"
								onpropertychange="ock_check('procCreateEvent')" value="">
							创建
						</td>
						<td>
							<input id="procCreateEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procCreateEventButton" type="button"
								class="button_small" name="procCreateEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="procDeleteEventType" value="506">
							<input type="hidden" id="procDeleteEventAction" value="">
							<input type="checkbox" id="procDeleteEvent" name="events"
								onpropertychange="ock_check('procDeleteEvent')" value="">
							删除
						</td>
						<td>
							<input id="procDeleteEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="procDeleteEventButton" type="button"
								class="button_small" name="procDeleteEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
				</table>
			</fieldset>
		</div>
		<table style="width:100%" class="main_button">
			<tr>
				<td align="right">
					<input type="button" value="提交" class="button_normal"
						onclick="setParentValue()" />
					&nbsp;
					<input type="button" value="取消" class="button_normal"
						onclick="window.close()" />
				</td>
			</tr>
		</table>
		<input type="hidden" value='<%=request.getContextPath()%>'
			id="projectPath">
		<input type="hidden" value='<%=java.net.URLDecoder.decode(request.getParameter("events"),"utf-8")%>'
			id="eventString">
		<input type="hidden" value='<%=request.getParameter("msgReceiver")%>'
			id="msgReceiverString">
	</body>
</html>