package com.neusoft.uniflow.web.monitor.procinst.actions;

import java.util.Hashtable;
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
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWParlEndActInst;
import com.neusoft.uniflow.common.NWException;

import com.neusoft.uniflow.web.monitor.procinst.beans.ActParaBean;
import com.neusoft.uniflow.web.monitor.procinst.forms.OldParallelBranchForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class OldParallelBranchAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String userID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		OldParallelBranchForm nextActForm = (OldParallelBranchForm) form;
		String action = nextActForm.getAction();
		String parallel_act_id = request.getParameter("parallelID");
        if(nextActForm.getParallelid()==null || nextActForm.getParallelid().equals(""))
        	nextActForm.setParallelid(parallel_act_id);
        NWParlEndActInst endParallel;
        NWActInst startParallel;
        NWActInst oprationActivity;
        Vector alreadyNexttoList;
		Hashtable ht = new Hashtable();
        try{
			endParallel = nwsession.getParlEndActInst(userID,nextActForm.getParallelid());
			startParallel = nwsession.getActInst(userID,endParallel.getBranchMatchActID());
			oprationActivity = nwsession.getActInst(userID,startParallel.getPreActInstID());
			alreadyNexttoList = oprationActivity.openNextActList();
			Vector avis = nwsession.getProcInst(userID, oprationActivity.getProcInstID()).openActInstList(-1);
			//System.out.println(avis.size());
			for (int i=0;i<alreadyNexttoList.size();i++){
				NWActDef aii= (NWActDef)alreadyNexttoList.elementAt(i);
				for (int j=0;j<avis.size();j++){
					NWActInst aij= (NWActInst)avis.elementAt(j);
					if (aii.getID().equals(aij.getActDefID())){
						ht.put(aij.getActDefID(), aij.getActInstID());
					}
				}
			}

        }catch (NWException e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e,
					"error.invokeinterface"));
			return mapping.findForward("error");
		}
        
        
		if (action != null && action.equals("")) {// 列出
			Vector list = new Vector(10, 5);
			try {
				NWActDef actDef;
				for (int i = 0; i < alreadyNexttoList.size(); i++) {
					ActParaBean actpara = new ActParaBean();
					actDef = (NWActDef) alreadyNexttoList.elementAt(i);
					if (ht.get(actDef.getID())!=null)
					    actpara.setActName(actDef.getName()+" [已运行分支]");
					else
						actpara.setActName(actDef.getName()+" [未运行分支]");
					actpara.setActID(actDef.getID());
					list.add(actpara);
				}
				nextActForm.setList(list);

			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
		} else if (action.equals("start")){
			try {
				String[] checked = nextActForm.getChecked();
				for (int i = 0; i < alreadyNexttoList.size(); i++) {
					NWActDef actdef = (NWActDef) alreadyNexttoList.elementAt(i);
					for (int j = 0; j < checked.length; j++) {
						if (checked[j].equalsIgnoreCase(actdef.getID())) {
							endParallel.startBranch(actdef.getID());
						}
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
				return mapping.findForward("error");
			}
			request.setAttribute("closeflag", "successful");
			nextActForm.setAction("");
		} else if (action.equals("delete")){
			try{
				String[] checked = nextActForm.getChecked();
				for (int i = 0; i < alreadyNexttoList.size(); i++) {
					NWActDef actdef = (NWActDef) alreadyNexttoList.elementAt(i);
					for (int j = 0; j < checked.length; j++) {
						if (checked[j].equalsIgnoreCase(actdef.getID()) && ht.get(actdef.getID())!=null) {
							//System.out.println("=========="+(String)ht.get(actdef.getID()));
							endParallel.removeBranch((String)ht.get(actdef.getID()));
						}
					}
				}
			}catch (Exception e){
				e.printStackTrace();
				return mapping.findForward("error");
			}
			request.setAttribute("closeflag","successful");
			nextActForm.setAction("");
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), nextActForm);
		else
			session.setAttribute(mapping.getAttribute(), nextActForm);

		return mapping.findForward("success");
	}

}