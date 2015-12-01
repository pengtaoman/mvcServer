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
							<input type="hidden" id="actOpenEventType" value="530">
							<input type="hidden" id="actOpenEventAction" value="">
							<input type="checkbox" id="actOpenEvent" name="events"
								onpropertychange="ock_check('actOpenEvent')" value="">
							打开
						</td>
						<td>
							<input id="actOpenEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actOpenEventButton" name="actOpenEvent"
								onclick="openApp(event)" type="button" class="button_small"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actCloseEventType" value="531">
							<input type="hidden" id="actCloseEventAction" value="">
							<input type="checkbox" id="actCloseEvent" name="events"
								onpropertychange="ock_check('actCloseEvent')" value="">
							关闭
						</td>
						<td>
							<input id="actCloseEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actCloseEventButton" type="button"
								class="button_small" name="actCloseEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actSuspendEventType" value="524">
							<input type="hidden" id="actSuspendEventAction" value="">
							<input type="checkbox" id="actSuspendEvent" name="events"
								onpropertychange="ock_check('actSuspendEvent')" value="">
							挂起
						</td>
						<td>
							<input id="actSuspendEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actSuspendEventButton" type="button"
								class="button_small" name="actSuspendEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actRollbackEventType" value="526">
							<input type="hidden" id="actRollbackEventAction" value="">
							<input type="checkbox" id="actRollbackEvent" name="events"
								onpropertychange="ock_check('actRollbackEvent')" value="">
							回退
						</td>
						<td>
							<input id="actRollbackEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actRollbackEventButton" type="button"
								class="button_small" name="actRollbackEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actAbortEventType" value="523">
							<input type="hidden" id="actAbortEventAction" value="">
							<input type="checkbox" id="actAbortEvent" name="events"
								onpropertychange="ock_check('actAbortEvent')" value="">
							终止
						</td>
						<td>
							<input id="actAbortEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actAbortEventButton" type="button"
								class="button_small" name="actAbortEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actCompletedEventType" value="529">
							<input type="hidden" id="actCompletedEventAction" value="">
							<input type="checkbox" id="actCompletedEvent" name="events"
								onpropertychange="ock_check('actCompletedEvent')" value="">
							完成
						</td>
						<td>
							<input id="actCompletedEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actCompletedEventButton" type="button"
								class="button_small" name="actCompletedEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actStartEventType" value="522">
							<input type="hidden" id="actStartEventAction" value="">
							<input type="checkbox" id="actStartEvent" name="events"
								onpropertychange="ock_check('actStartEvent')" value="">
							启动
						</td>
						<td>
							<input id="actStartEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actStartEventButton" type="button"
								class="button_small" name="actStartEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actResumeEventType" value="525">
							<input type="hidden" id="actResumeEventAction" value="">
							<input type="checkbox" id="actResumeEvent" name="events"
								onpropertychange="ock_check('actResumeEvent')" value="">
							恢复
						</td>
						<td>
							<input id="actResumeEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actResumeEventButton" type="button"
								class="button_small" name="actResumeEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actCreateEventType" value="521">
							<input type="hidden" id="actCreateEventAction" value="">
							<input type="checkbox" id="actCreateEvent" name="events"
								onpropertychange="ock_check('actCreateEvent')" value="">
							创建
						</td>
						<td>
							<input id="actCreateEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actCreateEventButton" type="button"
								class="button_small" name="actCreateEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="actDeleteEventType" value="528">
							<input type="hidden" id="actDeleteEventAction" value="">
							<input type="checkbox" id="actDeleteEvent" name="events"
								onpropertychange="ock_check('actDeleteEvent')" value="">
							删除
						</td>
						<td>
							<input id="actDeleteEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="actDeleteEventButton" type="button"
								class="button_small" name="actDeleteEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
				</table>
			</fieldset>
			<fieldset style="width: 550px;">
				<legend>
					工作项监控
				</legend>
				<table>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="openEventType" value="542">
							<input type="hidden" id="openEventAction" value="">
							<input type="checkbox" id="openEvent" name="events"
								onpropertychange="ock_check('openEvent')" value="">
							打开
						</td>
						<td>
							<input id="openEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="openEventButton" name="openEvent" class="button_small"
								onclick="openApp(event)" type="button" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="closeEventType" value="543">
							<input type="hidden" id="closeEventAction" value="">
							<input type="checkbox" id="closeEvent" name="events"
								onpropertychange="ock_check('closeEvent')" value="">
							关闭
						</td>
						<td>
							<input id="closeEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="closeEventButton" type="button" name="closeEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="suspendEventType" value="547">
							<input type="hidden" id="suspendEventAction" value="">
							<input type="checkbox" id="suspendEvent" name="events"
								onpropertychange="ock_check('suspendEvent')" value="">
							挂起
						</td>
						<td>
							<input id="suspendEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="suspendEventButton" type="button" name="suspendEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="rollbackEventType" value="546">
							<input type="hidden" id="rollbackEventAction" value="">
							<input type="checkbox" id="rollbackEvent" name="events"
								onpropertychange="ock_check('rollbackEvent')" value="">
							回退
						</td>
						<td>
							<input id="rollbackEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="rollbackEventButton" type="button"
								class="button_small" name="rollbackEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="reassignEventType" value="545">
							<input type="hidden" id="reassignEventAction" value="">
							<input type="checkbox" id="reassignEvent" name="events"
								onpropertychange="ock_check('reassignEvent')" value="">
							重指派
						</td>
						<td>
							<input id="reassignEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="reassignEventButton" type="button"
								class="button_small" name="reassignEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="completedEventType" value="544">
							<input type="hidden" id="completedEventAction" value="">
							<input type="checkbox" id="completedEvent" name="events"
								onpropertychange="ock_check('completedEvent')" value="">
							完成
						</td>
						<td>
							<input id="completedEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="completedEventButton" type="button"
								class="button_small" name="completedEvent"
								onclick="openApp(event)" disabled="disabled"
								style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="abortEventType" value="549">
							<input type="hidden" id="abortEventAction" value="">
							<input type="checkbox" id="abortEvent" name="events"
								onpropertychange="ock_check('abortEvent')" value="">
							终止
						</td>
						<td>
							<input id="abortEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="abortEventButton" type="button" name="abortEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="resumeEventType" value="548">
							<input type="hidden" id="resumeEventAction" value="">
							<input type="checkbox" id="resumeEvent" name="events"
								onpropertychange="ock_check('resumeEvent')" value="">
							恢复
						</td>
						<td>
							<input id="resumeEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="resumeEventButton" type="button" name="resumeEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="createEventType" value="541">
							<input type="hidden" id="createEventAction" value="">
							<input type="checkbox" id="createEvent" name="events"
								onpropertychange="ock_check('createEvent')" value="">
							创建
						</td>
						<td>
							<input id="createEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="createEventButton" type="button" name="createEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
						<td style="width: 20px">
						</td>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="deleteEventType" value="550">
							<input type="hidden" id="deleteEventAction" value="">
							<input type="checkbox" id="deleteEvent" name="events"
								onpropertychange="ock_check('deleteEvent')" value="">
							删除
						</td>
						<td>
							<input id="deleteEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="deleteEventButton" type="button" name="deleteEvent"
								class="button_small" onclick="openApp(event)"
								disabled="disabled" style="font-size: 12px" value="选择">
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px; width: 80px">
							<input type="hidden" id="commissionEventType" value="551">
							<input type="hidden" id="commissionEventAction" value="">
							<input type="checkbox" id="commissionEvent" name="events"
								onpropertychange="ock_check('commissionEvent')" value="test">
							代办
						</td>
						<td>
							<input id="commissionEventText" type="text"
								style="font-size: 12px; height: 20px" readonly="readonly"
								disabled="disabled" value="">
						</td>
						<td>
							<input id="commissionEventButton" type="button"
								class="button_small" name="commissionEvent"
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