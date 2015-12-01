package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.common.processtree.beans.ProcessTree;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.NextActForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class NextActAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String userID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		NextActForm nextActForm = (NextActForm) form;
		String action = nextActForm.getAction();
		String workItemID = nextActForm.getWorkitemID();

		if (action != null && action.equals("")) {// 列出
			try {
				NWWorkItem workitem = nwsession.getWorkItem(userID, workItemID);
				NWProcDef process = workitem.getProcDef();
				String currentActId = workitem.getActDef().getID();
				ProcessTree proctree = (ProcessTree) session
						.getAttribute(workItemID);
				if (proctree != null) {
					if (!nextActForm.getExpand().equals(""))
						proctree.expandNode(nextActForm.getExpand());
					if (!nextActForm.getSelect().equals("")){
						NWActDef selectAct = process.getActivity(nextActForm.getSelect());
						Vector alreadyNexttoList = proctree.getNextActList();
						if (alreadyNexttoList.contains(selectAct.getID())){
							alreadyNexttoList.remove(selectAct.getID());
						}else{
							this.setAlreadyNexttoList(process,selectAct,alreadyNexttoList);
						}
					}					
				} else {
					Vector alreadyNexttoList = workitem.openAppointedNextActList();
					proctree = new ProcessTree(process, currentActId);
					proctree.setNextActList(alreadyNexttoList);
				}			
				session.setAttribute(workItemID, proctree);
				nextActForm.setExpand("");
				nextActForm.setSelect("");

			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}

		} else {// OK click
			try{
				NWWorkItem workitem = nwsession.getWorkItem(userID, workItemID);
				ProcessTree proctree = (ProcessTree) session.getAttribute(workItemID);
				if (proctree != null) {
					Vector alreadyNexttoList = proctree.getNextActList();
					workitem.assignNextAct(alreadyNexttoList);
					NWProcDef process = workitem.getProcDef();
					for (int i=0;i<alreadyNexttoList.size();i++){
						String actid = (String) alreadyNexttoList.elementAt(i);
						NWActDef actdef = process.getActivity(actid);
						if (actdef.getType()==1){
							Vector NextActParticipant = (Vector)session.getAttribute(actid);
							if (NextActParticipant!=null)
								workitem.assignNextActParticipant(NextActParticipant, actid);
							session.setAttribute(actid, null);
						}
					}
				}				
			}catch(Exception e){
				session.setAttribute(SessionManager.ERROR, new UniException(e,
				"error.invokeinterface"));
				return mapping.findForward("error");
			}
			nextActForm.setAction("ok");
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), nextActForm);
		else
			session.setAttribute(mapping.getAttribute(), nextActForm);

		return mapping.findForward("success");
	}
	private void setAlreadyNexttoList(NWProcDef process,NWActDef selectAct,Vector alreadyNexttoList)throws Exception{
		boolean isBranch = false;
		for (int i=0;i<alreadyNexttoList.size();i++){
			String actdefid = (String) alreadyNexttoList.elementAt(i);
			NWActDef actdef = process.getActivity(actdefid);
			if (selectAct.getParentActDefID().equals(actdef.getParentActDefID())&&selectAct.getType()==19)
				isBranch = true;
		}
		if (!isBranch){
			alreadyNexttoList.clear();
			alreadyNexttoList.add(selectAct.getID());
		}else{
			alreadyNexttoList.add(selectAct.getID());
		}
	}

}
