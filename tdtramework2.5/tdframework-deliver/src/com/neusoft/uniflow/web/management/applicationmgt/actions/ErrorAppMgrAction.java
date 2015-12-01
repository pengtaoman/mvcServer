package com.neusoft.uniflow.web.management.applicationmgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.neusoft.uniflow.appmgr.AppExecutionMgr;
import com.neusoft.uniflow.engine.factory.WorkflowObjectFactory;
import com.neusoft.uniflow.util.Util;

public class ErrorAppMgrAction extends DispatchAction {

	public ActionForward resetErrorApp(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();
		String selectedID = request.getParameter("selectedID");
		String type = request.getParameter("type");
		String state = request.getParameter("state");
		try{
			if (type.equals("procID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupID = null;
				String procinstID = selectedID;
				if (state.equals("error")) {
					groupID = appExecutionMgr.getErrorAppGroupIDInProc(procinstID);
					appExecutionMgr.resetErrorApp(groupID);
				} else if (state.equals("running")) {
					groupID = appExecutionMgr
							.getRunningAppGroupIDInProc(procinstID);
					appExecutionMgr.resetRunningApp(groupID);
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
					appExecutionMgr.resetErrorApp(Util.filter(groupIDs));
				} else if (state.equals("running")) {
					appExecutionMgr.resetRunningApp(Util.filter(groupIDs));
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}

	public ActionForward deleteErrorApp(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();
		String selectedID = request.getParameter("selectedID");
		String type = request.getParameter("type");
		String state = request.getParameter("state");
		try{
			if (type.equals("procID") && selectedID != null
					&& !selectedID.equals("")) {
				Vector groupID = null;
				String procinstID = selectedID;
				if (state.equals("error")) {
					groupID = appExecutionMgr.getErrorAppGroupIDInProc(procinstID);
					appExecutionMgr.deleteErrorApp(groupID);
				} else if (state.equals("running")) {
					groupID = appExecutionMgr
							.getRunningAppGroupIDInProc(procinstID);
					appExecutionMgr.deleteRunningApp(groupID);
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
					appExecutionMgr.deleteErrorApp(Util.filter(groupIDs));
				} else if (state.equals("running")) {
					appExecutionMgr.deleteRunningApp(Util.filter(groupIDs));
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	public ActionForward getErrorApptaskNum(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		int procNum = 0;
		int actNum = 0;
		int workitemNum = 0;
		String type = request.getParameter("type");
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();
		try{
			if (type.equals("errorApps")) {
				procNum = appExecutionMgr
						.getErrorAppNum(WorkflowObjectFactory.PROCESS);
				actNum = appExecutionMgr
						.getErrorAppNum(WorkflowObjectFactory.ACTIVITY);
				workitemNum = appExecutionMgr
						.getErrorAppNum(WorkflowObjectFactory.WORKITEM);
			} else if (type.equals("runningApps")) {
				procNum = appExecutionMgr
						.getRunningAppNum(WorkflowObjectFactory.PROCESS);
				actNum = appExecutionMgr
						.getRunningAppNum(WorkflowObjectFactory.ACTIVITY);
				workitemNum = appExecutionMgr
						.getRunningAppNum(WorkflowObjectFactory.WORKITEM);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		request.setAttribute("procNum", String.valueOf(procNum));
		request.setAttribute("actNum", String.valueOf(actNum));
		request.setAttribute("workitemNum", String.valueOf(workitemNum));
		return mapping.findForward(type);
	}

}
