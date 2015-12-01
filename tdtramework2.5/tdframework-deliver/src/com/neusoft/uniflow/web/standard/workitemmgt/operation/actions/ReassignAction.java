package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.ReassignForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class ReassignAction extends Action
{
  public ActionForward execute(ActionMapping mapping,
			     ActionForm form,
			     HttpServletRequest request,
			     HttpServletResponse response)// throws Exception
  {
    HttpSession session = request.getSession();
    NWSession nwsession = WorkflowManager.getNWSession();
    NWOrg org = WorkflowManager.getNWOrg();;
    ReassignForm reassignForm = (ReassignForm)form;
    String action = reassignForm.getOperation();
    String workItemID = reassignForm.getWorkitemID();
    if(action!=null&&action.equals(""))
    {//列出
	//取得可send节点
	Vector reassigntoList = null;
	try{
	reassigntoList = org.openPersonList(1,Integer.MAX_VALUE-1,NWPerson.PSN_ACCOUNT);
	}catch(Exception e)
	{
	session.setAttribute(SessionManager.ERROR,new UniException(e,"error.todolist.worklist.openpersonlist"));
	return mapping.findForward("error");
	}

	NWPerson person;
	for(int i=0;i<reassigntoList.size();i++)
	{
	person = (NWPerson)reassigntoList.elementAt(i);
	String personInfo = person.getName()+"["+person.getAccount()+"]";
	reassigntoList.setElementAt(new LabelValueBean(personInfo,person.getID()),i);
	}
	request.setAttribute("reassigntoList",reassigntoList);
    }
    else
    {//OK click
	//取得send节点ID
	boolean submitAuthority = reassignForm.isSubmitAuthor();
	String assignTo[] = reassignForm.getAssignTo();
	Vector assignToList = new Vector(assignTo.length);
	for(int i=0;i<assignTo.length;i++)
	{
	assignToList.add(assignTo[i]);
	}
	try{
//	NWWorkItem workitem = nwsession.getWorkItem((String)session.getAttribute(SessionManager.BIZ_USERID),workItemID);
	NWWorkItemManager wiManager = nwsession.getWorkItemManager();
	if(!submitAuthority)
	{//commision
		wiManager.doCommission(workItemID,(String)session.getAttribute(SessionManager.BIZ_USERID),assignToList);
//	   workitem.doCommission(assignToList);
	}else
	{
		wiManager.doReassign(workItemID,(String)session.getAttribute(SessionManager.BIZ_USERID),assignToList);

//	  workitem.doReassign(assignToList);
	}
	}catch(NWException e)
	{
	session.setAttribute(SessionManager.ERROR,new UniException(e,"error.todolist.worklist.reassign"));
	return mapping.findForward("error");
	}
	reassignForm.setOperation("ok");
	request.setAttribute("reassigntoList",new Vector(1));
    }

    if ("request".equals(mapping.getScope()))
	  request.setAttribute(mapping.getAttribute(), reassignForm);
    else
	  session.setAttribute(mapping.getAttribute(), reassignForm);
      return mapping.findForward("success");
  }

}