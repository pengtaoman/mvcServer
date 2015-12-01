package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.actions;

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

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.beans.RDBean;
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms.CreateProcInstForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CreateProcInstAction extends Action {
	public ActionForward execute(ActionMapping mapping,
						 ActionForm form,
						 HttpServletRequest request,
						 HttpServletResponse response) throws Exception{
		CreateProcInstForm procInstForm = (CreateProcInstForm)form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String procdefID = request.getParameter("selectedID");
		String procdefVer = new String(request.getParameter("v").getBytes("iso-8859-1"));
		if(procdefVer.indexOf('?')!=-1){
			procdefVer = request.getParameter("v");
		}
		boolean needCreatRole = new Boolean(request.getParameter("needCreatRole")).booleanValue();
		procInstForm.setProcDefID(procdefID+"#"+procdefVer);
		procInstForm.setNeedCreatorRole(needCreatRole);
		procInstForm.setOperation("");
		

	    String userID  = (String)session.getAttribute(SessionManager.BIZ_USERID);		
	    procInstForm.setProcInstName(nwsession.getProcDef(userID,procdefID,procdefVer,0).getName());
	    
		NWProcDef procdef = null;
		Vector reldatas = new Vector();
		boolean hasRD = false;				
		ArrayList roleinfo = new ArrayList();
		RDBean rdBean;

		try {				
		  procdef = nwsession.getProcDef(userID,procdefID, 0);
		  //handle the role list if it need role;				  				  
		  if(needCreatRole){					
			NWOrg org = WorkflowManager.getNWOrg();;
			NWPerson person = org.getPerson((String)session.getAttribute(SessionManager.BIZ_USERID));
			Vector roles = person.openBelongRoleList();
			for(int i=0;i<roles.size();i++){
				NWRole role = (NWRole)roles.elementAt(i);
				roleinfo.add(new LabelValueBean(role.getName(),role.getID()));
			}
			if(roleinfo.size()<1)
				procInstForm.setNeedCreatorRole(false);
		  }
		  //handler procdef RD
		  //save the rd to the list as bean ;
		  reldatas = procdef.openRelDataList();
		  int j = 0;
		  for (int i = 0; i < reldatas.size(); i++) {
			NWRelData reldata = (NWRelData) reldatas.elementAt(i);
			int rd_type = reldata.getType();
			if (rd_type == 1 || rd_type == 0) {
			  rdBean = new RDBean();
			  rdBean.setName(reldata.getName());
			  rdBean.setType(reldata.getType());
			  rdBean.setRd_value(reldata.getDefaultValue());
			  procInstForm.setRdIndexed(j, rdBean);
			  hasRD = true;
			  j++;
			}
		  }
		}
		catch (Exception e) {
		    session.setAttribute(SessionManager.ERROR,
				                 new UniException(e, "error.invokeinterface"));
		    return mapping.findForward("error");
		}				
		procInstForm.setHasRD(hasRD);				
		request.setAttribute("roleinfo",roleinfo);
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), procInstForm);
		else
			session.setAttribute(mapping.getAttribute(), procInstForm);
		return mapping.findForward("success");
						 	
	}

}
