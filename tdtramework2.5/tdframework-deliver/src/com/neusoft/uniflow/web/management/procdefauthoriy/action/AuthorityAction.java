package com.neusoft.uniflow.web.management.procdefauthoriy.action;

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
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWAuthority;
import com.neusoft.uniflow.api.mgmt.NWAuthorityObject;
import com.neusoft.uniflow.api.mgmt.NWAuthorityObjectImpl;

import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.management.procdefauthoriy.form.AuthorityForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class AuthorityAction extends Action
{
	/**
	 *��̶�����Ȩʵ��
	 *������ôʵ���ˣ��Ժ���ڶ�����Ȩ��ʽ���ط���Ҫ�޸ģ����ܲ��������б���Ȩ�ķ�ʽ 
	 **/
	public ActionForward execute(ActionMapping mapping, ActionForm form,
					     HttpServletRequest request,
					     HttpServletResponse response) throws NWException
	{
		AuthorityForm adhocForm = (AuthorityForm) form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		NWAuthority authority=nwsession.getAuthority(NWAuthority.DESIGNER);
		NWOrg org = WorkflowManager.getNWOrg();;
		String action = adhocForm.getAction();
		try {
			if (action != null && action.equals("")) { //��ad-hocҳ��
				Vector steplist=new Vector();
				steplist=this.openAutList(authority, org);
				adhocForm.setAction(AuthorityForm.ACTION_UPDATE);
				request.setAttribute("steplist", steplist);
			}else if (action != null && (action.equals(AuthorityForm.ACTION_UPDATE_OK)||action.equals(AuthorityForm.ACTION_UPDATE))) { //update
				Vector list = new Vector(15);
					String[] steps = adhocForm.getSteps();
					String step = "";
					for (int i = 0; i < steps.length; i++) {
						step = steps[i];
						NWAuthorityObject obj=new NWAuthorityObjectImpl();
						obj.setEntityType(Integer.parseInt(
						    step.substring(0, 1)));
						obj.setEntityId(step.substring(1));
						list.add(obj);
					}
					authority.resetMemberList(list);
					Vector steplist=new Vector();
					steplist=this.openAutList(authority, org);
					adhocForm.setAction(AuthorityForm.ACTION_UPDATE_OK);
					request.setAttribute("steplist", steplist);
				}
		}
		catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), adhocForm);
		else
			session.setAttribute(mapping.getAttribute(), adhocForm);

		return mapping.findForward("success");
	}
	/**
	 * ȡ����Ȩ��Ϣ�б?
	 * */
	private Vector openAutList(NWAuthority authority,NWOrg org) throws Exception{
		Vector steplist=new Vector();
		
		Vector authrityList=authority.openAuthObjectList();
		for(int i=0;i<authrityList.size();i++){
			NWAuthorityObject authobj=(NWAuthorityObject)authrityList.elementAt(i);
			if(authobj.getEntityType()==0){
				NWPerson person=org.getPerson(authobj.getEntityId());
				if(person!=null){
					steplist.add(new
						    LabelValueBean(person.
						    getAccount(),
						    0 + person.getID()));
				}else{
					steplist.add(new
						    LabelValueBean(
						    authobj.getEntityId(),
						    0 + authobj.getEntityId()));
				}
			}else if(authobj.getEntityType()==1){
				NWRole role=org.getRole(authobj.getEntityId());
				if(role!=null){
					steplist.add(new LabelValueBean(role.getName(),1+role.getID()));
				}else{
					steplist.add(new LabelValueBean(authobj.getEntityId(),1+authobj.getEntityId()));
				}
			}
		}
		return steplist;
	}
}