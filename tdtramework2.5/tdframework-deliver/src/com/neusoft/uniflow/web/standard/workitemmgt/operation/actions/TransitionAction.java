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
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.beans.TransitionBean;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.TransitionForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class TransitionAction extends Action {
	public ActionForward execute(ActionMapping mapping,ActionForm form,
			HttpServletRequest request,HttpServletResponse response){
		
		TransitionForm transitionForm=(TransitionForm)form;
		String workItemId=transitionForm.getWorkItemId();
		
		HttpSession session=request.getSession();
		String userId=(String)session.getAttribute(SessionManager.BIZ_USERID);
		NWSession nwsession=WorkflowManager.getNWSession();
		try {
			NWWorkItem workItem=nwsession.getWorkItem(userId, workItemId);
			//Vector outTransation=openOutTransationList(workItem);
			transitionForm.setTransitionList(convertTransationtoBeanList(workItem));
		} catch (NWException e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}
	
	public Vector convertTransationtoBeanList(NWWorkItem workItem) throws NWException{
		NWActDef actdef=workItem.getActDef();
		Vector transitionList=actdef.openInOrOutActTranstitionList(NWActDef.OUT_ACT_TRANS_LIST);
		Vector transitionBeanlist=new Vector();
		int size=transitionList.size();
		for(int i=0;i<size;i++){
			NWTransition tran=(NWTransition)transitionList.elementAt(i);
			String condition=tran.getCondition();
			String transitionName=tran.getName();
			String transitionId=tran.getID();
			NWActDef nextactdef=workItem.getProcDef().getActivity(tran.getNextActID());
			boolean conditionValue=workItem.evaluateCondition(condition);
			//System.out.print(conditionValue);
			TransitionBean transitionbean=new TransitionBean();
			transitionbean.setCondition(condition);
			if(transitionName==null||transitionName.equals(""))
				transitionbean.setTransitionName(transitionId);
			else
				transitionbean.setTransitionName(transitionName);
			
			transitionbean.setConditionValue(conditionValue);
			//System.out.print(transitionbean.getConditionValue());
			transitionbean.setTransitionId(transitionId);
			transitionbean.setNwactdef(nextactdef);
			transitionbean.setActdefId(nextactdef.getID());
			transitionbean.setActdefName(nextactdef.getName());
			transitionbean.setType(nextactdef.getType());
			transitionbean.setCondition(condition);
			//System.out.print(transitionbean.getType());
			transitionBeanlist.add(transitionbean);
		}
		return transitionBeanlist;
	}
	
}
