package com.neusoft.uniflow.web.management.timermgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.timer.TimerExecutionMgr;
import com.neusoft.uniflow.timer.checker.TimeOutInst;
import com.neusoft.uniflow.util.Util;

public class ErrorTimertaskMgrAction extends DispatchAction {

	public ActionForward resetErrorTimertask(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		String selectedID = request.getParameter("selectedID");
		String type = request.getParameter("type");
		String state = request.getParameter("state");
		try{
			if (type.equals("procID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupID = null;
				String procinstID = selectedID;
				if (state.equals("error")) {
					groupID = timerexecutionMgr
							.getErrorTimertaskGroupIDInProc(procinstID);
					timerexecutionMgr.resetErrorTimertask(groupID);
				} else if (state.equals("running")) {
					groupID = timerexecutionMgr
							.getRunningTimertaskGroupIDInProc(procinstID);
					timerexecutionMgr.resetRunningTimertask(groupID);
				}

			} else if (type.equals("groupID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupIDs = new Vector();
				String[] groupID = selectedID.split(",");
				for (int i = 0; i < groupID.length; i++) {
					String tempID = groupID[i];
					groupIDs.add(tempID);
				}
				if (state.equals("error")) {
					timerexecutionMgr.resetErrorTimertask(Util.filter(groupIDs));
				} else if (state.equals("running")) {
					timerexecutionMgr.resetRunningTimertask(Util.filter(groupIDs));
				}
			}
		}catch(StorageException e){
			e.printStackTrace();
		}
		
		return null;
	}

	public ActionForward deleteErrorTimertask(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		String selectedID = request.getParameter("selectedID");
		String type = request.getParameter("type");
		String state = request.getParameter("state");
		try{
			if (type.equals("procID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupID = null;
				String procinstID = selectedID;
				if (state.equals("error")) {
					groupID = timerexecutionMgr
							.getErrorTimertaskGroupIDInProc(procinstID);
					timerexecutionMgr.deleteErrorTimertask(groupID);
				} else if (state.equals("running")) {
					groupID = timerexecutionMgr
							.getRunningTimertaskGroupIDInProc(procinstID);
					timerexecutionMgr.deleteRunningTimertask(groupID);
				}

			} else if (type.equals("groupID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupIDs = new Vector();
				String[] groupID = selectedID.split(",");
				for (int i = 0; i < groupID.length; i++) {
					String tempID = groupID[i];
					groupIDs.add(tempID);
				}
				if (state.equals("error")) {
					timerexecutionMgr.deleteErrorTimertask(Util.filter(groupIDs));
				} else if (state.equals("running")) {
					timerexecutionMgr.deleteRunningTimertask(Util.filter(groupIDs));
				}
			}
		}catch(StorageException e){
			e.printStackTrace();
		}
		return null;
	}

	public ActionForward getErrorTimertaskNum(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		int procNum = 0;
		int actNum = 0;
		int workitemNum = 0;
		String type = request.getParameter("type");
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		try{
			if (type.equals("errorTimertasks")) {
				procNum = timerexecutionMgr
						.getErrorTimertaskNum(TimeOutInst.INST_TYPE_PROC);
				actNum = timerexecutionMgr
						.getErrorTimertaskNum(TimeOutInst.INST_TYPE_ACT);
				workitemNum = timerexecutionMgr
						.getErrorTimertaskNum(TimeOutInst.INST_TYPE_WORKITEM);
			} else if (type.equals("runningTimertasks")) {
				procNum = timerexecutionMgr
						.getRunningTimertaskNum(TimeOutInst.INST_TYPE_PROC);
				actNum = timerexecutionMgr
						.getRunningTimertaskNum(TimeOutInst.INST_TYPE_ACT);
				workitemNum = timerexecutionMgr
						.getRunningTimertaskNum(TimeOutInst.INST_TYPE_WORKITEM);
			}
		}catch(StorageException e){
			e.printStackTrace();
		}
		request.setAttribute("procNum", String.valueOf(procNum));
		request.setAttribute("actNum", String.valueOf(actNum));
		request.setAttribute("workitemNum", String.valueOf(workitemNum));
		return mapping.findForward(type);
	}

}
