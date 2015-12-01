package com.neusoft.uniflow.web.common.login.actions;

//import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.Globals;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.login.forms.LogonForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;

public class LogonAction extends Action
{
    NWSession privateNWSession;
	public ActionForward execute(ActionMapping mapping,
					             ActionForm form,
					             HttpServletRequest request,
					             HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		String username = ( (LogonForm) form).getUsrname();
		String password = ( (LogonForm) form).getPwd();
		String language = ( (LogonForm) form).getLanguage();
		try {			
            if (language.equals("zh"))
            	request.getSession().setAttribute(Globals.LOCALE_KEY,Locale.CHINA);                        
            else if (language.equals("jp")){ 
            	request.getSession().setAttribute(Globals.LOCALE_KEY, Locale.JAPAN);
            	session.setAttribute("logonerrorkey", "Sorry! Now,can not support Japanese,is developing...");
            	throw new UniException("Sorry! Now,can not support Japanese,is developing...");
            }else if (language.equals("en"))                       
            	request.getSession().setAttribute(Globals.LOCALE_KEY, Locale.ENGLISH);                        
            else                       
            	request.getSession().setAttribute(Globals.LOCALE_KEY, Locale.ENGLISH);
		    NWOrg org = WorkflowManager.getNWOrg();
		    if (username==null||username.equals("")){
		    	session.setAttribute("logonerrorkey", "workflow.error.logon.password.validate");
		    	throw new UniException("workflow.error.logon.password.validate");
		    }
		    if (org==null){
		    	session.setAttribute("logonerrorkey", "workflow.error.logon.org.validate");
		    	throw new UniException("workflow.error.logon.org.validate");
		    }
		    NWPerson person = org.getPersonByAccount(username);
		    if(person!=null && !org.validatePassword(username,password)){
		    	session.setAttribute("logonerrorkey", "workflow.error.logon.password.validate");
		    	throw new UniException("workflow.error.logon.password.validate");
		    }else if(person==null){
		    	session.setAttribute("logonerrorkey", "workflow.error.logon.user.validate");
		    	throw new UniException("workflow.error.logon.user.validate");
		    }
		    
		    //String current_user = person.getName();
	        //request.setAttribute("current_user", current_user);
	        
		   	WorkflowManager.initUniflow(person.getID(),username,request,response);
		   	
		    String current_user = CommonInfoManager.getUserInfo((String)request.getSession().getAttribute(SessionManager.USER),request.getSession());
	        String agent_info = CommonInfoManager.getAgentInfo((String)request.getSession().getAttribute(SessionManager.USER),request.getSession());
	        request.setAttribute("current_user", current_user);
	        request.setAttribute("agent_info", agent_info);
	        
		}catch(UniException e1){
			return mapping.findForward("relogon");
	    }catch (NWException e) {
			session.setAttribute(SessionManager.ERROR,new UniException(e, "workflow.error.logon.workflow.initial"));
			return mapping.findForward("error");
		}catch (Throwable t) {
			session.setAttribute(SessionManager.ERROR,new UniException(t, "workflow.error.logon.other"));
			return mapping.findForward("error");
		}
		//return mapping.findForward("main");	
		String style = request.getParameter("StyleSet");
		if("Style2009".equals(style)) return mapping.findForward("FW2009_Main");
		else return mapping.findForward("main");
   }
}