/*
 * Created on 2005-8-18
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.uniflow.web.management.engineaudit.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.management.engineaudit.forms.AuditForm;
import com.neusoft.uniflow.web.util.WorkflowManager;

/**
 * @author TianJun
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class DetailAction extends Action{
	
	public ActionForward execute(ActionMapping mapping,ActionForm form,
            HttpServletRequest request,HttpServletResponse response) 
                        throws Exception {
      NWSession nwsession = WorkflowManager.getNWSession();
      AuditForm auditForm = (AuditForm) form;         
      Vector list=new Vector();
      String messageID=request.getParameter("selectedID");
      NWFilter filter = new NWFilter(); 
      filter.addFilter(NWFilter.Log_MessageID,NWFilter.OP_E,messageID,NWFilter.OP_AND);
      list=nwsession.newStatMgrInstance().auditAllUserMessage(filter);
      auditForm.setList(list);         
      return mapping.findForward("auditdetail");
     }
}
