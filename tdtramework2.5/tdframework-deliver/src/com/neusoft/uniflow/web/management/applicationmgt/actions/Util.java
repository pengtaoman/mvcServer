package com.neusoft.uniflow.web.management.applicationmgt.actions;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWMessageConst;

public class Util {

	public static String getLiteralStateName(String type, int state) {
		String stateName = "";
		if (type.equals("instState")) {
			switch (state) {
			case NWProcInst.STATE_INITIAL:
				stateName = "初始态";
				break;
			case NWProcInst.STATE_RUNNING:
				stateName = "运行态";
				break;
			case NWProcInst.STATE_ACTIVE:
				stateName = "激活态";
				break;
			case NWProcInst.STATE_SUSPEND:
				stateName = "挂起态";
				break;
			case NWProcInst.STATE_COMPLETE:
				stateName = "完成态";
				break;
			case NWProcInst.STATE_TERMINATE:
				stateName = "终止态";
				break;
			}
		} else if (type.equals("errorState")) {
			switch (state) {
			case 0:
				stateName = "初始态";
				break;
			case 1:
				stateName = "运行态";
				break;
			case 2:
				stateName = "异常态";
				break;
			}
		}
		return stateName;
	}
	
	public static String getLiteralEventName(int eventID) {
		String eventName = "";
		switch (eventID) {
		case NWMessageConst.APP_START_AUTOACT:
			eventName = "运行自动节点";
			break;
		case NWMessageConst.ME_OPENACTIVITY:
			eventName = "打开节点实例";
			break;
		case NWMessageConst.ME_CREATEACTIVITY:
			eventName = "创建节点实例";
			break;
		case NWMessageConst.ME_CLOSEACTIVITY:
			eventName = "关闭节点实例";
			break;
		case NWMessageConst.ME_SUSPENDACTIVITY:
			eventName = "挂起节点实例";
			break;
		case NWMessageConst.ME_ROLLBACKACTIVITY:
			eventName = "节点实例回退";
			break;
		case NWMessageConst.ME_COMPLETETEACTIVITY:
			eventName = "完成节点实例";
			break;
		case NWMessageConst.ME_ABORTACTIVITY:
			eventName = "终止节点实例";
			break;
		case NWMessageConst.ME_STARTACTIVITY:
			eventName = "启动节点实例";
			break;
		case NWMessageConst.ME_RESUMEACTIVITY:
			eventName = "唤醒节点实例";
			break;
		case NWMessageConst.ME_DELETEACTIVITY:
			eventName = "删除节点实例";
			break;
		case NWMessageConst.ME_SUSPENDPROCESS:
			eventName = "挂起流程实例";
			break;
		case NWMessageConst.ME_COMPLETEPROCESS:
			eventName = "流程实例结束";
			break;
		case NWMessageConst.ME_ABORTPROCESS:
			eventName = "终止流程实例";
			break;
		case NWMessageConst.ME_STARTPROCESS:
			eventName = "启动流程实例";
			break;
		case NWMessageConst.ME_RESUMEPROCESS:
			eventName = "恢复流程实例";
			break;
		case NWMessageConst.ME_RESTARTPROCESS:
			eventName = "重新启动流程实例";
			break;
		case NWMessageConst.ME_CREATEPROCESS:
			eventName = "创建流程实例";
			break;
		case NWMessageConst.ME_DELETEPROCESS:
			eventName = "删除流程实例";
			break;
		case NWMessageConst.ME_OPENWORKITEM:
			eventName = "打开工作项";
			break;
		case NWMessageConst.ME_CLOSEWORKITEM:
			eventName = "关闭工作项";
			break;
		case NWMessageConst.ME_SUSPENDWORKITEM:
			eventName = "挂起工作项";
			break;
		case NWMessageConst.ME_ROLLBACKWORKITEM:
			eventName = "工作项回退";
			break;
		case NWMessageConst.ME_REASSIGNWORKITEM:
			eventName = "重新分配工作项";
			break;
		case NWMessageConst.ME_COMMISSIONWORKITEM:
			eventName = "工作项重指派";
			break;
		case NWMessageConst.ME_COMPLETEWORKITEM:
			eventName = "工作项提交";
			break;
		case NWMessageConst.ME_ABORTWORKITEM:
			eventName = "终止工作项";
			break;
		case NWMessageConst.ME_RESUMEWORKITEM:
			eventName = "恢复工作项";
			break;
		case NWMessageConst.ME_CREATEWORKITEM:
			eventName = "创建工作项";
			break;
		case NWMessageConst.ME_DELETEWORKITEM:
			eventName = "删除工作项";
			break;
		case NWMessageConst.APP_WORKITEM_WARNING:
			eventName = "工作项预警";
			break;
		case NWMessageConst.APP_PROC_WARNING:
			eventName = "流程预警";
			break;
		case NWMessageConst.APP_PROC_TIMEOUT:
			eventName = "流程超时";
			break;
		case NWMessageConst.APP_ACT_TIMEOUT:
			eventName = "节点超时";
			break;
		case NWMessageConst.ME_CHANGEARTICIPANT:
			eventName= "变更参与人";
			break;
		case NWMessageConst.ME_CREATEANDSTARTPROCESS:
			eventName = "创建并启动流程";
			break;
		case NWMessageConst.ME_WITHDRAWWORKITEM:
			eventName = "工作项撤回";
			break;
		case NWMessageConst.APP_MANUALNODE_NO_PARTICIPANT:
			eventName = "业务异常处理：手动节点无参与人";
			break;
		case NWMessageConst.PRE_CONDITION_NOT_SATISFY:
			eventName = "业务异常处理：节点前置条件不满足";
			break;
		case NWMessageConst.APP_SUBPROCNODE_NO_SUBPROCESS_DEF:
			eventName = "业务异常处理：无法获取子流程定义";
			break;
		}
		return eventName;
	}
	
	public static String parseDate(long time)
	  {
	    String format = "yyyy-MM-dd HH:mm:ss";
	    SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.US);
	    Date date = new Date(time);
	    return sdf.format(date);
	  }

}
