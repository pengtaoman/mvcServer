package com.neusoft.uniflow.web.management.timermgt.actions;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.util.UniflowManager;

public class Util {
	
	private static NWSession session = UniflowManager.getNWSession();

	public static String getStateName(String type, int state) {
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
	
	public static String getInstName(String instID, String type) throws NWException {
		String instName = "";
		if (type.equals("activity")) {
			instName = session.getActInst("", instID).getName();
		} else if (type.equals("proc")) {
			instName = session.getProcInst("", instID).getName();
		} else if (type.equals("workitem")) {
			instName = session.getWorkItem("", instID).getName();
		}
		return instName;
	}
	
	public static String getProcName(String instID, String type) throws NWException {
		String procName = "";
		if (type.equals("activity")) {
			procName = session.getActInst("", instID).getProcInst().getName();
		} else if (type.equals("proc")) {
			procName = session.getProcInst("", instID).getName();
		} else if (type.equals("workitem")) {
			procName = session.getWorkItem("", instID).getProcInst().getName();
		}

		return procName;
	}
}
