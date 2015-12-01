/*
 * Created on 2004-11-30
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.monitor.procinst.actions;

import java.util.ArrayList;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWActInstManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.monitor.procinst.forms.RollBackForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class RollBackAction extends Action{
	public ActionForward execute(ActionMapping mapping, ActionForm form,
						 HttpServletRequest request,
						 HttpServletResponse response)throws NWException{
	
	 RollBackForm rollBackForm = (RollBackForm) form;
	 HttpSession session = request.getSession();
	 NWSession nwsession = WorkflowManager.getNWSession();
	 String userID = (String) session.getAttribute(SessionManager.BIZ_USERID);
	 String action = request.getParameter("action");
	 if(action!=null&&action.equals("ok")){
		request.setAttribute("close","close");
	 	String actCurInstID = rollBackForm.getRunningAct();
	 	String actRollInstID = rollBackForm.getRollBackAct();
		if(actRollInstID!=null&&!actRollInstID.equals("")){	
	        try{
	        	NWActInstManager actInstManager = nwsession.getActInstManager();
	        	actInstManager.doRollBack(actCurInstID,userID,actRollInstID);
				request.setAttribute("sucessful","true");
	        }catch(NWException e){
				request.setAttribute("sucessful","false");
				e.printStackTrace();
	        }
		}
		ArrayList rollbackinfo = new ArrayList();
		rollbackinfo.add(new LabelValueBean("",""));
		request.setAttribute("actsinfo",rollbackinfo);
		return mapping.findForward("success");
	 }
	 String aiID = request.getParameter("actInstID");
	 NWActInst actInst = nwsession.getActInst("", aiID);
	 Vector canRollBackList = null;
	 try{
		canRollBackList = actInst.openRollbackableActList();
	 }catch(NWException  e){
	 	e.printStackTrace();
	 }
	 if(canRollBackList==null){
	 	canRollBackList = new Vector();
	 }
	 NWActInst tmp;
	 ArrayList rollbackinfo = new ArrayList();
	 rollbackinfo.add(new LabelValueBean("",""));
	 for(int i=0;i<canRollBackList.size();i++){
	 	tmp = (NWActInst)canRollBackList.elementAt(i);
	 	rollbackinfo.add(new LabelValueBean(tmp.getName(),tmp.getActInstID()));
	 }
	 rollBackForm.setRollBackAct("");
	 rollBackForm.setRunningAct(actInst.getActInstID());
	 rollBackForm.setRollBackActName(actInst.getName());	 
	 request.setAttribute("actsinfo",rollbackinfo);
	 return mapping.findForward("success");
	}

}
