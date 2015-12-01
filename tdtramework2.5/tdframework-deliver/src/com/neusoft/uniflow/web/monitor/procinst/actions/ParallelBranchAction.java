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
import com.neusoft.uniflow.api.handler.NWParallelUnitActInst;
import com.neusoft.uniflow.common.NWException;

import com.neusoft.uniflow.web.monitor.procinst.beans.ActParaBean;
import com.neusoft.uniflow.web.monitor.procinst.forms.ParallelBranchForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ParallelBranchAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String userID = (String) session.getAttribute(SessionManager.BIZ_USERID);
		ParallelBranchForm nextActForm = (ParallelBranchForm) form;
		String action = nextActForm.getAction();
		String parallel_act_id = request.getParameter("parallelID");
        if(nextActForm.getParallelid()==null || nextActForm.getParallelid().equals(""))
        	nextActForm.setParallelid(parallel_act_id);
        NWParallelUnitActInst parallelUnit;
    	Vector branch_defs;
    	Vector branch_insts ;
    	Hashtable ht = new Hashtable();
        try{
        	parallelUnit = nwsession.getParallelUnitActInst(userID, nextActForm.getParallelid());
        	branch_defs = parallelUnit.openAllBranchDefList();
        	branch_insts = parallelUnit.openAllBranchInstList(-1);
        	for (int i=0;i<branch_insts.size();i++){
        		NWActInst actinst = (NWActInst)branch_insts.elementAt(i);
        		ht.put(actinst.getActDefID(), actinst);
        	}


        }catch (NWException e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e,
					"error.invokeinterface"));
			return mapping.findForward("error");
		}
        
        
		if (action != null && action.equals("")) {
			Vector list = new Vector(10, 5);
			try {
				NWActDef actDef;
				for (int i = 0; i < branch_defs.size(); i++) {
					ActParaBean actpara = new ActParaBean();
					actDef = (NWActDef) branch_defs.elementAt(i);
					if (ht.get(actDef.getID())!=null){
						NWActInst act = (NWActInst) ht.get(actDef.getID());
						actpara.setActName(actDef.getName()+" ("+ CommonInfoManager.getStateStr(act.getCurState(), request.getSession())+")");
					}else
						actpara.setActName(actDef.getName());
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
				for (int i = 0; i < branch_defs.size(); i++) {
					NWActDef actdef = (NWActDef) branch_defs.elementAt(i);
					for (int j = 0; j < checked.length; j++) {
						if (checked[j].equalsIgnoreCase(actdef.getID())) {
							parallelUnit.startBranch(actdef.getID());
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
				for (int i = 0; i < branch_defs.size(); i++) {
					NWActDef actdef = (NWActDef) branch_defs.elementAt(i);
					for (int j = 0; j < checked.length; j++) {
						if (checked[j].equalsIgnoreCase(actdef.getID()) && ht.get(actdef.getID())!=null) {
							//System.out.println("=========="+(String)ht.get(actdef.getID()));
							NWActInst act = (NWActInst) ht.get(actdef.getID());
							parallelUnit.removeBranch(act.getActInstID());
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