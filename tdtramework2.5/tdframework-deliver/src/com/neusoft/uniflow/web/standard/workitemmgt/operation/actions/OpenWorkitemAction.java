package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.AO.WorkItemAO;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;

public class OpenWorkitemAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		String workItemID = request.getParameter("workitemID");
		WorkItemAO workitemAO = WorkItemAO.getInstance();

		try {
			NWWorkItem workItem = workitemAO.getWorkItem(request, workItemID);
			int state=workItem.getCurState();
			if(state==1){
				workItem.doHandlerFlag();
				workItem.doOpen();
			}
			
			String userID = (String) request.getSession().getAttribute("uni_biz_userid");
			String appurl="";
			if (workItem.getAppType().indexOf("|")>0){
				appurl = "/unieap/pages/workflow/standard/workitem/operation/allapplications.jsp";
				appurl = appurl + "?activityid=" +workItem.getActDef().getID();
	    		String uid="";
	    		int entType = workItem.getEntityType();
	    		if(entType==0||entType==1){
	    		    uid = workItem.getEntityID(); 
	    		}else{
	    		    uid=String.valueOf(entType);
	    		}
	    		
				appurl = appurl + "&opstring=" + workItem.getWorkItemID()+","+workItem.getProcInstID()+","+uid+","+userID;
				if (state!= 1&&state!= 2) 
					appurl=appurl+",1";
			}else{
				appurl = workitemAO.getRealAppURL(request, workItem);
				if (!appurl.equals(""))
				{
					appurl = appurl + "&userID=" + userID;
				}
				else
					appurl="/display.do"+ "?userID=" + userID;
				if (state!= 1&&state!= 2) 
					appurl=appurl+"&filter=1";
			}
			
			
			request.setAttribute("appURL", appurl);
			if (state!= 1&&state!= 2)
				return mapping.findForward("taskviewer");
			else
				return mapping.findForward("taskhandler");
		} catch (Exception e) {
			request.getSession().setAttribute(SessionManager.ERROR,
					new UniException(e));
			return mapping.findForward("error");
		}
		
	}
}
